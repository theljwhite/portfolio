import { useState, useRef, useEffect, useCallback } from "react";
import { Gltf, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useSceneStore } from "@/app/store/scene";
import { useCameraStore } from "@/app/store/camera";
import useAnimateCamera from "@/app/utils/useAnimateCamera";
import { useScreenSize } from "./ScreenSize";
import {
  CollisionEnterHandler,
  RapierRigidBody,
  RigidBody,
  type CollisionEnterPayload,
} from "@react-three/rapier";
import { LocationMarkers } from "@/app/store/camera";

//I first tried this flow with Drei DragControls,
//but RigidBody doesnt work well onDrag w/ DragControls, it was causing isssues with the Paper RigidBody.
//see: https://github.com/pmndrs/react-three-rapier/issues/688
//the code was cleaner but it broke stuff, so for now had to use useFrame, useEffects and pointer window listener sadly.

//TODO bug when attempts > makes, because of second attempt after already thrown once

const TRASHCAN_INTERACT_POS = [0.1, 0, 0.3];
const TRASHCAN_INTERACT_TARGET = [0.7, 0, -0.7];
const TRASHCAN_LOCATION_MARKER_POS = [0.5, 1.8, -0.2];

const TRASHCAN_INTERACT_POS_MOBILE = [0.2, 0, 0.6];
const TRASHCAN_INTERACT_TARGET_MOBILE = [1.4, 0, -1.4];
const TRASHCAN_LOCATION_MARKER_POS_MOBILE = [0.9, 1.8, -0.6];

const Paper = ({ paperKey }: { paperKey: number }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDynamic, setIsDynamic] = useState<boolean>(false);

  const [s] = useState<{ mouse: { x: number; y: number } | null }>({
    mouse: null,
  });

  const { trashcanGameStatus, setTrashcanGameStatus } = useSceneStore(
    (state) => state
  );
  const { activeMarker, isOrbit, setIsOrbit } = useCameraStore(
    (state) => state
  );

  const paperRef = useRef<RapierRigidBody>(null!);
  const { pointer } = useThree();

  useEffect(() => {
    if (isDragging && isOrbit.current) setIsOrbit(false);
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
        const { x, y, z } = paperRef.current.translation();

        paperRef.current.setNextKinematicTranslation({
          x: x + (pointer.x - s.mouse.x) * 10,
          y: y + (pointer.y - s.mouse.y) * 10,
          z: z + (pointer.x - s.mouse.x) * 10,
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
        onPointerDown={() => {
          if (activeMarker.current !== LocationMarkers.Trashcan) return;
          setIsDragging(true);
          setTrashcanGameStatus("started");
        }}
        onPointerOver={() =>
          activeMarker.current === LocationMarkers.Trashcan &&
          (document.body.style.cursor = "grab")
        }
        onPointerOut={() => (document.body.style.cursor = "auto")}
        src="./3D/paper.glb"
        scale={0.1}
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
  const { activeMarker, setIsOverlayHidden } = useCameraStore((state) => state);

  const { camGoTo, isLocationDisabled } = useAnimateCamera();
  const { isMobile } = useScreenSize();

  const { nodes, materials } = useGLTF("./3D/trashcan.glb");
  const trashcanNodes = nodes as Record<string, any>;

  const trashcanCamPos = isMobile
    ? TRASHCAN_INTERACT_POS_MOBILE
    : TRASHCAN_INTERACT_POS;

  const trashcanCamTarget = isMobile
    ? TRASHCAN_INTERACT_TARGET_MOBILE
    : TRASHCAN_INTERACT_TARGET;

  const trashcanMarkerPos = isMobile
    ? TRASHCAN_LOCATION_MARKER_POS_MOBILE
    : TRASHCAN_LOCATION_MARKER_POS;

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
        pos: trashcanCamPos,
        target: trashcanCamTarget,
        orbitEnabled: true,
        activeMarker: LocationMarkers.Trashcan,
      },
      {
        title: "Leave Trashcan",
        position: trashcanMarkerPos,
        camPos: trashcanCamPos,
        camTarget: trashcanCamTarget,
        clickHandler: resetTrashcanGame,
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

  const resetTrashcanGame = (): void => {
    setTrashcanGameStatus("idle");
    setTrashcanAttempts(0);
    setTrashcanMakes(0);
    setPaperKey((prev) => prev + 1);
  };

  return (
    <>
      <Paper paperKey={paperKey} />
      <RigidBody type="fixed" colliders="trimesh">
        <group
          onClick={
            activeMarker.current !== LocationMarkers.Trashcan
              ? onTrashcanClick
              : undefined
          }
          onPointerOver={() => {
            activeMarker.current === null &&
              (document.body.style.cursor = "pointer");
          }}
          onPointerOut={() => (document.body.style.cursor = "auto")}
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
