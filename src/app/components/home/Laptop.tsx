import { useState, useRef } from "react";
import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import { useSceneStore, LocationMarkers } from "@/app/store/scene";
import LaptopContent from "./LaptopContent";
import Marker from "./Marker";
import { BackArrowIcon, BackCircleIcon, BackDoorIcon } from "../UI/Icons";

//TODO - fix any types

const LAPTOP_INTERACT_VIEW = [0.15, 0, -6.8];

export default function Laptop() {
  const [isLaptopContentChange, setIsLaptopContentChange] =
    useState<boolean>(false);

  const {
    cameraValues,
    activeMarker,
    setCameraValues,
    setActiveLaptopContent,
    zoomOutCameraFromPos,
  } = useSceneStore((state) => state);

  const group = useRef<THREE.Group>(null);

  const { nodes, materials } = useGLTF("./3D/mac-draco.glb");
  const macNodes = nodes as Record<string, any>;

  const onLaptopClick = (): void => {
    setIsLaptopContentChange(!isLaptopContentChange);

    setCameraValues({
      cachedPos: cameraValues.pos,
      cachedTarget: cameraValues.target,
      pos: [0, 0, 4],
      target: LAPTOP_INTERACT_VIEW,
      autoRotate: false,
      orbitEnabled: false,
      activeMarker: LocationMarkers.Laptop,
    });
  };

  return (
    <>
      <Marker
        position={[-0.3, 2, -1.7]}
        title="Leave Laptop"
        textColor="text-white"
        circleBoxColor="bg-white"
        circleBoxText="text-black text-xl"
        visible={activeMarker === LocationMarkers.Laptop}
        onClickAction={() => {
          zoomOutCameraFromPos();
          setIsLaptopContentChange(false);
          setActiveLaptopContent(0);
        }}
      >
        <BackArrowIcon size={20} />
      </Marker>
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
              geometry={macNodes["Cube008"].geometry}
            />
            <mesh
              material={materials["matte.001"]}
              geometry={macNodes["Cube008_1"].geometry}
            />
            <mesh geometry={macNodes["Cube008_2"].geometry}>
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
                  <div
                    onClick={onLaptopClick}
                    className={`${
                      isLaptopContentChange
                        ? "pointer-events-none"
                        : "pointer-events-auto"
                    } w-[334px] h-[216px] absolute`}
                  />
                  <LaptopContent />
                </div>
              </Html>
            </mesh>
          </group>
        </group>
        <mesh
          material={materials.keys}
          geometry={macNodes.keyboard.geometry}
          position={[1.79, 0, 3.45]}
        />
        <group position={[0, -0.1, 3.39]}>
          <mesh
            material={materials.aluminium}
            geometry={macNodes["Cube002"].geometry}
          />
          <mesh
            material={materials.trackpad}
            geometry={macNodes["Cube002_1"].geometry}
          />
        </group>
        <mesh
          material={materials.touchbar}
          geometry={macNodes.touchbar.geometry}
          position={[0, -0.03, 1.2]}
        />
      </group>
    </>
  );
}
