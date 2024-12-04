import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { useBounds } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { PROJECTS } from "../../constants/projects";
import PictureFrame from "./PictureFrame";

import CameraControls from "camera-controls";

CameraControls.install({ THREE });

export default function ProjectsStage() {
  const COLUMNS = 3;
  const xSpacing = 1.3;
  const zSpacing = 0.02;
  const ySpacing = 1;

  const targetPosition = new THREE.Vector3();
  const targetQuaternion = new THREE.Quaternion();

  const [activeProjFrame, setActiveProjFrame] = useState<string | null>("");

  const clickedRef = useRef<THREE.Group | null>();
  const groupRef = useRef<THREE.Group | null>();
  const nameRef = useRef<string | null>("");
  const focusRef = useRef<THREE.Vector3>();

  const { camera, gl } = useThree();
  const bounds = useBounds();

  const pos = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const focus = new THREE.Vector3();
  const look = new THREE.Vector3();

  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);

  const DEFAULT_CAM_POS_X = -4.4;
  const DEFAULT_CAM_POS_Y = 1.19;
  const DEFAULT_CAM_POS_Z = -3.6;

  const defX = 0;
  const defY = 0.809016994375;
  const defZ = 0;

  // useFrame((state, delta) => {
  //   if (clickedRef.current || clickedRef.current === null) {
  //     if (clickedRef.current && focusRef.current) {
  //       // pos.set(focusRef.current?.x, focusRef.current?.y, focusRef.current?.z);
  //       pos.set(defX, defY, defZ);
  //       look.set(focusRef.current.x, focusRef.current.y, focusRef.current.z);

  //       console.log("was curr", focusRef.current);
  //     }

  //     if (clickedRef.current === null) {
  //       pos.set(0, 0, 5);
  //       look.set(0, 0, 4);

  //       console.log("was null");
  //     }

  //     state.camera.position.lerp(pos, 0.5);
  //     state.camera.updateProjectionMatrix();

  //     controls.setLookAt(
  //       state.camera.position.x,
  //       state.camera.position.y,
  //       state.camera.position.z,
  //       look.x,
  //       look.y,
  //       look.z,
  //       true
  //     );
  //     return controls.update(delta);
  //   }
  // });

  const onProjectFrameClick = (e: ThreeEvent<MouseEvent>): void => {
    const obj = e.object;

    console.log("object is -->", obj);

    if (clickedRef?.current?.name === obj.name) {
      clickedRef.current = null;
      return;
    }

    clickedRef.current = groupRef.current?.getObjectByName(obj.name) as any;
    focusRef.current = obj.parent?.position;
  };

  return (
    <group
      ref={groupRef as any}
      onClick={onProjectFrameClick}
      position={[-0.41, 1, -2.66]}
      rotation={[0, -2.55, 0]}
    >
      {PROJECTS.map((project, index) => {
        const col = index % COLUMNS;
        const row = Math.floor(index / COLUMNS);

        // Adjusted positions for diagonal wall alignment
        const xPos = col * xSpacing;
        const zPos = col * zSpacing;
        const yPos = -row * ySpacing;

        return (
          <PictureFrame
            name={`projects-frame-${project.id}`}
            key={index}
            imageUrl={project.images[0]}
            color={0x00000}
            scale={new THREE.Vector3(0.7, 0.7, 0.05)}
            position={new THREE.Vector3(xPos, yPos, zPos)}
          />
        );
      })}
    </group>
  );
}
