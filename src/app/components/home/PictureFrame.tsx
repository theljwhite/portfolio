import { useState, useRef } from "react";
import * as THREE from "three";
import { Image, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

interface PictureFrameProps {
  imageUrl: string;
  color: number;
  scale: THREE.Vector3;
  position: THREE.Vector3;
  rotation: THREE.Euler;
}

const GOLDEN_RATIO = 1.61803398875;

export default function PictureFrame({
  imageUrl,
  color,
  scale,
  position,
  rotation,
}: PictureFrameProps) {
  const [isHover, setIsHover] = useState<boolean>(false);

  const imageRef = useRef<any>(null);
  const pictureFrameRef = useRef<any>(null);

  useFrame((state, dt) => {
    easing.dampC(
      pictureFrameRef.current.material.color,
      isHover ? "orange" : "white",
      0.1,
      dt
    );
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh
        // name={name}
        // onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        // onPointerOut={() => hover(false)}
        scale={scale}
        // scale={2}
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
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={imageRef}
          url={imageUrl}
          position={[0, 0, 0.7]}
        />
      </mesh>
    </group>
  );
}
