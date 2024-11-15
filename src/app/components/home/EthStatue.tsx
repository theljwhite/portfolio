import { useGLTF } from "@react-three/drei";
import { useSceneStore } from "@/app/store/scene";
import type { ThreeEvent } from "@react-three/fiber";

export default function EthStatue() {
  const { isDonateOpen, setIsDonateOpen, setIsAudioPlaying } = useSceneStore(
    (state) => state
  );
  const { scene } = useGLTF("./3D/eth_donate.glb");
  const onEthStatueClick = (): void => {
    setIsDonateOpen(!isDonateOpen);
    setIsAudioPlaying(false);
  };

  return (
    <primitive
      onClick={onEthStatueClick}
      onPointerOver={(e: ThreeEvent<any>) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
      rotation={[0, 0, 0]}
      position={[1.7, 1.19, -0.4]}
      scale={0.4}
      object={scene}
    />
  );
}
