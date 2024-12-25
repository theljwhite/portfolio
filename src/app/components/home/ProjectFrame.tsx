import { useState, useRef } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Image, useCursor } from "@react-three/drei";
import { useSceneStore, LocationMarkers } from "@/app/store/scene";
import type { Project } from "@/app/constants/projects";
import { easing } from "maath";

interface ProjectFrameProps {
  project: Project;
  position: number[];
  scale?: number[];
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}

const GOLDEN_RATIO = 1.61803398875;
const ANIMATE_FRAME_POS = [0.9, -0.2, 2]; //x was 1
const ANIMATE_FRAME_ROTATION = [-0.1, -0.08, 0];

export default function ProjectFrame({
  project,
  position,
  scale,
  onClick,
}: ProjectFrameProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const pictureFrameRef = useRef<any>(null);

  const { activeMarker } = useSceneStore((state) => state);

  const [groupProps, springApi] = useSpring(
    {
      pos: position,
      rotation: [0, 0, 0],
      from: {
        pos: position,
        rotation: [0, 0, 0],
      },
      config: config.default,
      reset: true,
      immediate: true,
    },
    []
  );

  useCursor(isHover);

  useFrame((_, dt) => {
    easing.dampC(
      pictureFrameRef.current.material.color,
      isHover ? "orange" : "black",
      0.1,
      dt
    );
  });

  const extendedOnProjectClick = (e: ThreeEvent<MouseEvent>): void => {
    if (activeMarker !== LocationMarkers.Projects) return;

    onClick(e);
    springApi.start({
      to: {
        pos: project.selected ? position : ANIMATE_FRAME_POS,

        rotation: project.selected ? [0, 0, 0] : ANIMATE_FRAME_ROTATION,
      },
      from: {
        pos: project.selected ? ANIMATE_FRAME_POS : position,
        rotation: project.selected ? ANIMATE_FRAME_ROTATION : [0, 0, 0],
      },
      config: config.default,
    });
  };

  return (
    <animated.group
      onClick={extendedOnProjectClick}
      position={groupProps.pos as unknown as THREE.Vector3}
      // rotation={new THREE.Euler(...(rotation ?? []))}
      rotation={groupProps.rotation as unknown as THREE.Euler}
    >
      <mesh
        name={`projects-frame-${project.id}`}
        onPointerOver={(e) => (e.stopPropagation(), setIsHover(true))}
        onPointerOut={() => setIsHover(false)}
        scale={new THREE.Vector3(...(scale ?? [0.7, 0.7, 0.05]))}
        position={[0, GOLDEN_RATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={pictureFrameRef}
          raycast={() => null}
          scale={[1.2, 1.2, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          url={project.images[0]}
          position={[0, 0, 0.7]}
          zoom={1}
        />
      </mesh>
    </animated.group>
  );
}
