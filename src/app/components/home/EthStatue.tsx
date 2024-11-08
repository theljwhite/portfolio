import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function EthStatue() {
  const { scene, nodes, materials } = useGLTF("./3D/eth_donate.glb");

  return (
    <primitive
      rotation={[0, 0, 0]}
      position={[1.7, 1.19, -0.4]}
      scale={0.4}
      object={scene}
    />
  );
}
