import { useState, useRef, Suspense, memo } from "react";
import * as THREE from "three";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Image, Text, useCursor } from "@react-three/drei";
import { useScreenSize } from "./ScreenSize";
import type { Project } from "@/app/constants/projects";
import { easing } from "maath";

interface ProjectFrameProps {
  project: Project;
  selectedProjId: number | null;
}

const GOLDEN_RATIO = 1.61803398875;
const FRAME_MESH_UNSELECTED_SCALE = [0.7, 0.7, 0.05];

function ProjectFrame({ project, selectedProjId }: ProjectFrameProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const selected = selectedProjId === project.id;

  const pictureFrameRef = useRef<any>(null);

  const { viewport } = useThree();
  const { size, isMobile } = useScreenSize();

  const responsiveMeshRatio = viewport.width / 11.8;
  const responsiveFrameSize =
    size === "xxl" ? 0.7 : isMobile ? 0.8 : responsiveMeshRatio;

  useCursor(isHover);

  useFrame((_, dt) => {
    easing.dampC(
      pictureFrameRef.current.material.color,
      isHover || selected ? "orange" : "black",
      0.1,
      dt
    );
  });

  const onImageSlideClick = (e: ThreeEvent<MouseEvent>): void => {
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
    <mesh
      name={`projects-frame-${project.id}`}
      onPointerOver={(e) => (e.stopPropagation(), setIsHover(true))}
      onPointerOut={(e) => (e.stopPropagation(), setIsHover(false))}
      scale={
        new THREE.Vector3(
          ...(selected
            ? [responsiveFrameSize, responsiveFrameSize, 0.05]
            : FRAME_MESH_UNSELECTED_SCALE)
        )
      }
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
          url={project.images[activeImageIndex ?? 0]}
          position={[0, 0, 0.7]}
          zoom={1}
        />
      </Suspense>

      {selected && project.images.length > 1 && (
        <group onClick={onImageSlideClick} position={[1.2, 0, 0]}>
          <Text
            name="forward"
            position={[-0.4, 0, 0]}
            fontSize={0.5}
            color={
              activeImageIndex === project.images.length - 1
                ? 0x8e8e8e
                : 0xffffff
            }
          >
            &#8250;
          </Text>
          <Text
            name="back"
            position={[-2, 0, 0]}
            fontSize={0.5}
            color={activeImageIndex === 0 ? 0x8e8e8e : 0xffffff}
          >
            &#8249;
          </Text>
        </group>
      )}
    </mesh>
  );
}

export default memo(ProjectFrame);
