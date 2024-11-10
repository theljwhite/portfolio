import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function EthStatue() {
  const { scene } = useGLTF("./3D/eth_donate.glb");

  return (
    <primitive
      rotation={[0, -0.3, 0]}
      position={[1.8, 1.19, 0]}
      scale={0.4}
      object={scene}
    />
  );
}
