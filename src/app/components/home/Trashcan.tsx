import { useState, useRef, useEffect, useCallback } from "react";
import { Gltf, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useSceneStore } from "@/app/store/scene";
import { useCameraStore } from "@/app/store/camera";
import useAnimateCamera from "@/app/utils/useAnimateCamera";
import {
  CollisionEnterHandler,
  ContactForcePayload,
  IntersectionEnterPayload,
  RapierRigidBody,
  RigidBody,
  type CollisionEnterPayload,
} from "@react-three/rapier";
import { LocationMarkers } from "@/app/store/camera";

//I first tried this flow with Drei DragControls,
//but RigidBody doesnt work well onDrag w/ DragControls, it was causing isssues with the Paper RigidBody.
//see: https://github.com/pmndrs/react-three-rapier/issues/688
//the code was cleaner but it broke stuff, so for now had to use useFrame, useEffects and pointer window listener.

const TRASHCAN_POS = [0.9, 0.03, -0.4];

const TRASHCAN_INTERACT_POS = [0.2, 0, 0.6];
const TRASHCAN_INTERACT_TARGET = [1.4, 0, -1.4];
const TRASHCAN_LOCATION_MARKER_POS = [0.9, 1.8, -0.6];

const TRASHCAN_SCORE_POS = [0.7, 1.6, -0.6];

const Paper = ({ paperKey }: { paperKey: number }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDynamic, setIsDynamic] = useState<boolean>(false);

  const [s] = useState<{ mouse: { x: number; y: number } | null }>({
    mouse: null,
  });

  const paperRef = useRef<RapierRigidBody>(null!);

  const { trashcanGameStatus, setTrashcanGameStatus, setIsPhysicsPaused } =
    useSceneStore((state) => state);

  const { activeMarker, isOrbit, setIsOrbit } = useCameraStore(
    (state) => state
  );

  const { pointer } = useThree();

  useEffect(() => {
    // if (isDragging && isOrbit.current) setIsOrbit(false);
    if (!isDragging) s.mouse = null;
  }, [isDragging]);

  useEffect(() => {
    if (isDynamic) {
      const impulse = { x: 0.001, y: 0, z: -0.001 };
      paperRef.current.applyImpulse(impulse, true);
      setIsDynamic(false);
      setTrashcanGameStatus("thrown");
    }
  }, [isDynamic]);

  useEffect(() => {
    if (
      activeMarker.current === LocationMarkers.Trashcan &&
      trashcanGameStatus === "started"
    ) {
      const handleMouseUp = (): void => {
        console.log("pointer up ran");
        setIsDragging(false);
        setIsDynamic(true);
      };

      window.addEventListener("pointerup", handleMouseUp);

      return () => {
        window.removeEventListener("pointerup", handleMouseUp);
      };
    }
  }, [activeMarker.current, trashcanGameStatus]);

  useFrame(() => {
    if (isDragging) {
      if (!s.mouse) s.mouse = { x: pointer.x, y: pointer.y };
      else {
        const dx = pointer.x - s.mouse.x;
        const dy = pointer.y - s.mouse.y;

        const { x, y, z } = paperRef.current.translation();

        const xTranslate = x + dx * 10;
        const yTranslate = y + dy * 10;
        const zTranslate = z + dx * 10;

        paperRef.current.setNextKinematicTranslation({
          x: xTranslate,
          y: yTranslate,
          z: zTranslate,
        });

        s.mouse = { x: pointer.x, y: pointer.y };
      }
    }
  });

  return (
    <RigidBody
      key={paperKey}
      ref={paperRef}
      type={isDragging ? "kinematicPosition" : "dynamic"}
      colliders="ball"
      position={[0.5, 0.9, 0]}
      name="paper-ball"
    >
      <Gltf
        onPointerDown={() => (
          setIsDragging(true), setTrashcanGameStatus("started")
        )}
        onPointerOver={() => (document.body.style.cursor = "grab")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
        src="./3D/paper.glb"
        scale={0.1}
        // visible={activeMarker.current === LocationMarkers.Trashcan}
      />
    </RigidBody>
  );
};

export default function Trashcan() {
  const [paperKey, setPaperKey] = useState<number>(0);
  const {
    trashcanGameStatus,
    trashcanAttempts,
    trashcanMakes,
    setTrashcanGameStatus,
    setTrashcanAttempts,
    setTrashcanMakes,
  } = useSceneStore((state) => state);
  const { setIsOverlayHidden } = useCameraStore((state) => state);

  const { camGoTo, isLocationDisabled } = useAnimateCamera();

  const { nodes, materials } = useGLTF("./3D/trashcan.glb");
  const trashcanNodes = nodes as Record<string, any>;

  useEffect(() => {
    if (trashcanGameStatus === "thrown") {
      const interval = setInterval(() => {
        setTrashcanGameStatus("idle");
        setPaperKey((prev) => prev + 1);
        setTrashcanAttempts(trashcanAttempts + 1);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [trashcanGameStatus, trashcanAttempts]);

  const onTrashcanClick = (): void => {
    if (isLocationDisabled(LocationMarkers.Trashcan)) return;

    setIsOverlayHidden(true);

    camGoTo(
      {
        pos: TRASHCAN_INTERACT_POS,
        target: TRASHCAN_INTERACT_TARGET,
        orbitEnabled: true,
        activeMarker: LocationMarkers.Trashcan,
      },
      {
        title: "Leave Trashcan",
        position: TRASHCAN_LOCATION_MARKER_POS,
        camPos: TRASHCAN_INTERACT_POS,
        camTarget: TRASHCAN_INTERACT_TARGET,
      }
    );
  };

  const onTrashCollisionGoal: CollisionEnterHandler = useCallback(
    (e: CollisionEnterPayload) => {
      const paper = e.other?.rigidBodyObject;

      const contact = e.manifold?.solverContactPoint(0);

      if (contact && paper?.name === "paper-ball") {
        setTrashcanMakes(trashcanMakes + 1);
      }
    },
    [trashcanMakes]
  );

  return (
    <>
      <Paper paperKey={paperKey} />
      <RigidBody type="fixed" colliders="trimesh">
        <group
          onClick={onTrashcanClick}
          position={[0.9, 0.03, -0.4]}
          scale={0.2}
        >
          <mesh
            material={materials["Mlleimer_Boden"]}
            geometry={trashcanNodes["Object_4"].geometry}
          />
          <mesh
            material={materials["Mlleimer_Gitter_2"]}
            geometry={trashcanNodes["Object_5"].geometry}
          />
        </group>
      </RigidBody>
      <RigidBody
        onCollisionEnter={onTrashCollisionGoal}
        type="fixed"
        colliders="trimesh"
        position={[0.9, 0.03, -0.4]}
      >
        <mesh>
          <cylinderGeometry args={[0.22, 0, 0.01, 32]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
    </>
  );
}
