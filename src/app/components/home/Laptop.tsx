import { useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useSceneStore } from "@/app/store/scene";
import { useCameraStore, LocationMarkers } from "@/app/store/camera";
import useAnimateCamera from "@/app/utils/useAnimateCamera";
import { useScreenSize } from "./ScreenSize";
import LaptopContent from "./LaptopContent";

const LAPTOP_INTERACT_POS = [0, 0, 4];
const LAPTOP_INTERACT_TARGET = [0.15, 0, -6.8];
const LAPTOP_LOCATION_MARKER_POS = [-0.3, 2, -1.7];

const LAPTOP_INTERACT_POS_MOBILE = [0.1, 1.5, -0.5]; //was [0, 1.5, 0];
const LAPTOP_INTERACT_TARGET_MOBILE = [0.15, 0, -6.8];
const LAPTOP_LOCATION_MARKER_POS_MOBILE = [-0.3, 2.1, -1.7];

export default function Laptop() {
  const [isLaptopContentChange, setIsLaptopContentChange] =
    useState<boolean>(false);

  const { setActiveLaptopContent } = useSceneStore((state) => state);
  const { activeMarker } = useCameraStore((state) => state);
  const { camGoTo } = useAnimateCamera();

  const { isMobile } = useScreenSize();

  const { nodes, materials } = useGLTF("./3D/mac-draco.glb");
  const macNodes = nodes as Record<string, any>;

  const laptopCamPos = isMobile
    ? LAPTOP_INTERACT_POS_MOBILE
    : LAPTOP_INTERACT_POS;

  const laptopCamTarget = isMobile
    ? LAPTOP_INTERACT_TARGET_MOBILE
    : LAPTOP_INTERACT_TARGET;

  const laptopMarkerPos = isMobile
    ? LAPTOP_LOCATION_MARKER_POS_MOBILE
    : LAPTOP_LOCATION_MARKER_POS;

  const onLaptopClick = (): void => {
    if (activeMarker.current) return;

    setIsLaptopContentChange(!isLaptopContentChange);

    camGoTo(
      {
        pos: laptopCamPos,
        target: laptopCamTarget,
        orbitEnabled: false,
        activeMarker: LocationMarkers.Laptop,
      },
      {
        title: "Leave Laptop",
        position: laptopMarkerPos,
        camPos: [0, 0, 0],
        camTarget: laptopCamTarget,
        clickHandler: () => {
          setIsLaptopContentChange(false);
          setActiveLaptopContent(0);
        },
      }
    );
  };

  return (
    <>
      <group
        onClick={onLaptopClick}
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
                <div>
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
