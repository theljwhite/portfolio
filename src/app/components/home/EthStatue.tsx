import { useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useSceneStore } from "@/app/store/scene";

export default function EthStatue() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { isDonateOpen, setIsDonateOpen, setIsAudioPlaying } = useSceneStore(
    (state) => state
  );
  const { scene } = useGLTF("./3D/eth_donate.glb");

  useCursor(isHover);

  const onEthStatueClick = (): void => {
    setIsDonateOpen(!isDonateOpen);
    setIsAudioPlaying(false);
  };

  return (
    <primitive
      onClick={onEthStatueClick}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      rotation={[0, 0, 0]}
      position={[1.7, 1.19, -0.4]}
      scale={0.4}
      object={scene}
    />
  );
}
