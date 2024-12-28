import { useState, useRef, Suspense } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Image, Text, useCursor } from "@react-three/drei";
import { useSceneStore, LocationMarkers } from "@/app/store/scene";
import type { Project } from "@/app/constants/projects";
import { easing } from "maath";

interface ProjectFrameProps {
  project: Project;
  position: number[];
  scale?: number[];
  handleProjectSelection: (e: ThreeEvent<MouseEvent>) => boolean | null;
}

const GOLDEN_RATIO = 1.61803398875;
const ANIMATE_FRAME_POS = [0.9, -0.2, 2];
const ANIMATE_FRAME_ROTATION = [-0.1, -0.08, 0];

export default function ProjectFrame({
  project,
  position,
  scale,
  handleProjectSelection,
}: ProjectFrameProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const activeImageIndexRef = useRef<number>(0);
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
      isHover || project.selected ? "orange" : "black",
      0.1,
      dt
    );
  });

  const onProjectClick = (e: ThreeEvent<MouseEvent>): void => {
    if (activeMarker !== LocationMarkers.Projects) return;

    if (handleProjectSelection(e) === null) return;

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

  const onImageSlideClick = (e: ThreeEvent<MouseEvent>): void => {
    const caret = e.object.name;
    if (caret === "forward") {
      if (activeImageIndexRef.current === project.images.length - 1) return;

      activeImageIndexRef.current += 1;
    }

    if (caret === "back") {
      if (activeImageIndexRef.current === 0) return;
      activeImageIndexRef.current -= 1;
    }
  };

  const onImageSlideClickState = (e: ThreeEvent<MouseEvent>): void => {
    const caret = e.object.name;
    if (caret === "forward") {
      if (activeImageIndex === project.images.length - 1) return;

      setActiveImageIndex(activeImageIndex + 1);
    }

    if (caret === "back") {
      if (activeImageIndex === 0) return;
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  return (
    <animated.group
      onClick={onProjectClick}
      position={groupProps.pos as unknown as THREE.Vector3}
      rotation={groupProps.rotation as unknown as THREE.Euler}
    >
      <mesh
        name={`projects-frame-${project.id}`}
        onPointerOver={(e) => (e.stopPropagation(), setIsHover(true))}
        onPointerOut={(e) => (e.stopPropagation(), setIsHover(false))}
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

        <Suspense
          fallback={
            <Text position={[0, 0, 0.7]} fontSize={0.2}>
              Loading...
            </Text>
          }
        >
          <Image
            raycast={() => null}
            url={project.images[activeImageIndex]}
            position={[0, 0, 0.7]}
            zoom={1}
          />
        </Suspense>

        {project.selected && project.images.length > 1 && (
          <group onClick={onImageSlideClickState} position={[1.2, 0, 0]}>
            <Text
              name="forward"
              position={[-0.4, 0, 0]}
              fontSize={0.3}
              color={
                activeImageIndex === project.images.length - 1
                  ? 0x8e8e8e
                  : 0xffffff
              }
            >{`>`}</Text>
            <Text
              name="back"
              position={[-2, 0, 0]}
              fontSize={0.3}
              color={activeImageIndex === 0 ? 0x8e8e8e : 0xffffff}
            >{`<`}</Text>
          </group>
        )}
      </mesh>
    </animated.group>
  );
}
