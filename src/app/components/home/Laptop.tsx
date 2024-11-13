import React, { useRef } from "react";
import useClientMediaQuery from "@/app/utils/useClientMediaQuery";
import { Html, useGLTF } from "@react-three/drei";

//TODO - fix any types

export default function Laptop(props: any) {
  const { nodes, materials } = useGLTF("./3D/mac-draco.glb");

  const group = useRef();
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <group
      ref={group}
      rotation={[0, -0.2, 0]}
      position={[0.1, 1.2, -1.7]}
      {...props}
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
              className="w-[334px] h-[216px]"
              rotation-x={-Math.PI / 2}
              position={[0, 0.05, -0.09]}
              transform
              occlude="blending"
            >
              <div onPointerDown={(e) => e.stopPropagation()}>
                <img
                  className="w-[334px] h-[216px] object-cover"
                  src="./meFromGH.jpg"
                />
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
