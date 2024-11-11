import Scene from "./components/home/Scene";
import Overlay from "./components/home/Overlay";
import DonateEthModal from "./components/home/DonateEthModal";

export default function Home() {
  return (
    <>
      <Scene />
      <Overlay />
      <DonateEthModal />
    </>
  );
}
