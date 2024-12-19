import { useState, useRef } from "react";
import * as THREE from "three";
import { Html, useGLTF, useBounds } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useSceneStore } from "@/app/store/scene";
import LaptopContent from "./LaptopContent";

//TODO - fix any types

export default function Laptop() {
  const [isLaptopContentChange, setIsLaptopContentChange] =
    useState<boolean>(false);

  const { setCameraValues, cameraValues, resetCameraValues } = useSceneStore(
    (state) => state
  );

  const group = useRef<THREE.Group>(null);

  const { nodes, materials } = useGLTF("./3D/mac-draco.glb");

  const onLaptopClick = (): void => {
    setIsLaptopContentChange(!isLaptopContentChange);

    const laptopView = [0.15, 0, -6.8];

    if (isLaptopContentChange) {
      resetCameraValues();
    } else {
      setCameraValues({
        cachedPos: cameraValues.pos,
        cachedTarget: cameraValues.target,
        pos: [0, 0, 4],
        target: laptopView,
        autoRotate: false,
        orbitEnabled: false,
      });
    }
  };

  return (
    <group
      onClick={onLaptopClick}
      ref={group}
      rotation={[0, -0.2, 0]}
      position={[0.1, 1.2, -1.7]}
      scale={0.125}
      dispose={null}
    >
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={(nodes["Cube008"] as any).geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={(nodes["Cube008_1"] as any).geometry}
          />
          <mesh geometry={(nodes["Cube008_2"] as any).geometry}>
            <Html
              className={
                isLaptopContentChange ? "cursor-default" : "cursor-pointer"
              }
              rotation-x={-Math.PI / 2}
              position={[0, 0.05, -0.09]}
              transform
              occlude="blending"
            >
              <div onPointerDown={(e) => e.stopPropagation()}>
                {isLaptopContentChange ? (
                  <LaptopContent />
                ) : (
                  <img
                    onClick={onLaptopClick}
                    className="w-[334px] h-[216px] object-cover"
                    src="./meFromGH.jpg"
                  />
                )}
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh
        material={materials.keys}
        geometry={(nodes.keyboard as any).geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={(nodes["Cube002"] as any).geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={(nodes["Cube002_1"] as any).geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={(nodes.touchbar as any).geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
}
