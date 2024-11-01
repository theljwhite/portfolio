import React, { useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import type { Euler, Vector3 } from "@react-three/fiber";

interface PictureFrameProps {
  rotation: Euler;
  position: Vector3;
  frameImgPath: string;
}

export default function PictureFrame(props: any) {
  const { nodes, materials } = useGLTF("./3D/picture_frame.glb");

  const group = useRef();

  return (
    <group
      ref={group}
      rotation={[-0, -1.1, 7.8]}
      position={[-1.46, 2.1, -3.6]}
      {...props}
      scale={0.14}
      dispose={null}
    >
      <mesh
        material={materials.lambert2SG}
        geometry={(nodes["Object_2"] as any).geometry}
      />
      <mesh
        material={materials.lambert3SG}
        geometry={(nodes["Object_3"] as any).geometry}
      />

      <mesh geometry={(nodes["Object_3"] as any).geometry}>
        {/* <Html className="w-[100px] h-[100px]" transform occlude>
          <div onPointerDown={(e) => e.stopPropagation()}>
            <img
              className="w-[334px] h-[216px] object-cover"
              src={"./TS_logo.png"}
            />
          </div>
        </Html> */}
      </mesh>
    </group>
  );
}
