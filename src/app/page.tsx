"use client";

import { ScreenSizeProvider } from "./components/home/ScreenSize";
import Scene from "./components/home/Scene";
import Overlay from "./components/home/Overlay";
import DonateEthModal from "./components/home/DonateEthModal";

export default function Home() {
  return (
    <>
      <ScreenSizeProvider>
        <Scene />
      </ScreenSizeProvider>
      <Overlay />
      <DonateEthModal />
    </>
  );
}
