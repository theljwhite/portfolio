"use client";

import { ScreenSizeProvider } from "./components/home/ScreenSize";
import Scene from "./components/home/Scene";
import Overlay from "./components/home/Overlay";
import DonateEthModal from "./components/home/DonateEthModal";
import TrashcanGameOverlay from "./components/home/TrashcanGameOverlay";

export default function Home() {
  return (
    <>
      <ScreenSizeProvider>
        <Scene />
      </ScreenSizeProvider>
      <Overlay />
      {/* <TrashcanGameOverlay /> */}
      <DonateEthModal />
    </>
  );
}
