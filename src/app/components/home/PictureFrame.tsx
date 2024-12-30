import { useState, useRef } from "react";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { Image, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

interface PictureFrameProps {
  imageUrl: string;
  color: number;
  scale?: number[];
  name: string;
  position: number[];
  rotation?: number[];
  disabled?: boolean;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

const GOLDEN_RATIO = 1.61803398875;

export default function PictureFrame({
  imageUrl,
  color,
  scale,
  name,
  position,
  rotation,
  disabled,
  onClick,
}: PictureFrameProps) {
  const [isHover, setIsHover] = useState<boolean>(false);

  const imageRef = useRef<any>(null);
  const pictureFrameRef = useRef<any>(null);

  useCursor(isHover);

  useFrame((_, dt) => {
    easing.dampC(
      pictureFrameRef.current.material.color,
      isHover && !disabled ? "orange" : color ?? "black",
      0.1,
      dt
    );
    easing.damp3(
      imageRef.current.scale,
      [0.85 * (isHover ? 0.99 : 1), 0.9 * (isHover ? 0.905 : 1), 1],
      0.1,
      dt
    );
  });

  return (
    <group
      onClick={disabled ? undefined : onClick}
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...(rotation ?? []))}
    >
      <mesh
        name={name}
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
          scale={[1.1, 1.1, 0.9]}
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
          zoom={1}
        />
      </mesh>
    </group>
  );
}
