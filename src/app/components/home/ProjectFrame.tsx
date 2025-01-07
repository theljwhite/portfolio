import { useState, useRef, Suspense, memo } from "react";
import * as THREE from "three";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Image, Text, useCursor } from "@react-three/drei";
import { useScreenSize } from "./ScreenSize";
import type { Project } from "@/app/constants/projects";
import { easing } from "maath";

interface ProjectFrameProps {
  project: Project;
  activeProjRef: React.RefObject<Project | null>;
}

type Mesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

const GOLDEN_RATIO = 1.61803398875;
const FRAME_MESH_UNSELECTED_SCALE = [0.7, 0.7, 0.05];

function ProjectFrame({ project, activeProjRef }: ProjectFrameProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const projectFrameRef = useRef<Mesh>(null);
  const pictureFrameRef = useRef<Mesh>(null);
  const caretGroupRef = useRef<THREE.Group>(null);

  const forwardCaretRef = useRef<Mesh>(null);

  const backCaretRef = useRef<Mesh>(null);

  const activeImgIndexRef = useRef<number>(0);

  const { viewport } = useThree();
  const { size, isMobile } = useScreenSize();

  const responsiveMeshRatio = viewport.width / 11.8;
  const responsiveFrameSize =
    size === "xxl" ? 0.7 : isMobile ? 0.8 : responsiveMeshRatio;

  useCursor(isHover);

  useFrame((_, dt) => {
    const selected = project.id === activeProjRef.current?.id;
    if (
      pictureFrameRef.current &&
      caretGroupRef.current &&
      projectFrameRef.current &&
      forwardCaretRef.current &&
      backCaretRef.current
    ) {
      easing.dampC(
        pictureFrameRef.current.material.color,
        isHover || selected ? "orange" : "black",
        0.1,
        dt
      );
      caretGroupRef.current.visible = selected && project.images.length > 1;

      if (selected) {
        projectFrameRef.current.scale.set(
          responsiveFrameSize,
          responsiveFrameSize,
          0.05
        );

        forwardCaretRef.current.material.color.set(
          activeImgIndexRef.current === project.images.length - 1
            ? 0x8e8e8e
            : 0xffffff
        );

        backCaretRef.current.material.color.set(
          activeImgIndexRef.current === 0 ? 0x8e8e8e : 0xffffff
        );
      } else {
        projectFrameRef.current.scale.set(0.7, 0.7, 0.05);
        activeImgIndexRef.current = 0;
      }
    }
  });

  const onImageSlideClick = (e: ThreeEvent<MouseEvent>): void => {
    const caret = e.object.name;
    if (caret === "forward") {
      if (activeImgIndexRef.current === project.images.length - 1) return;
      activeImgIndexRef.current += 1;
    }

    if (caret === "back") {
      if (activeImgIndexRef.current === 0) return;
      activeImgIndexRef.current -= 1;
    }

    setActiveImageIndex(activeImgIndexRef.current);
  };

  return (
    <mesh
      ref={projectFrameRef}
      name={`projects-frame-${project.id}`}
      onPointerOver={(e) => (e.stopPropagation(), setIsHover(true))}
      onPointerOut={(e) => (e.stopPropagation(), setIsHover(false))}
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
          name="project-frame-image"
          raycast={() => null}
          url={project.images[activeImageIndex]}
          position={[0, 0, 0.7]}
          zoom={1}
        />
      </Suspense>
      <group
        ref={caretGroupRef}
        visible={false}
        onClick={onImageSlideClick}
        position={[1.2, 0, 0]}
      >
        <Text
          ref={forwardCaretRef}
          name="forward"
          position={[-0.4, 0, 0]}
          fontSize={0.5}
        >
          &#8250;
        </Text>
        <Text
          ref={backCaretRef}
          name="back"
          position={[-2, 0, 0]}
          fontSize={0.5}
        >
          &#8249;
        </Text>
      </group>
    </mesh>
  );
}

export default memo(ProjectFrame);
