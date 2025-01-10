"use client";

import { Suspense, useState, useRef } from "react";
import { SOCIALS } from "../../constants/socials";
import {
  Center,
  Environment,
  MeshReflectorMaterial,
  Stars,
  PerformanceMonitor,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { CanvasWrapper } from "@isaac_ua/drei-html-fix";
import { Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { useGLTF, useCursor } from "@react-three/drei";
import { useCameraStore } from "@/app/store/camera";
import { useScreenSize } from "./ScreenSize";
import { navOutWithGhostAnchor } from "@/app/utils/anchor";
import SceneLoadingCircle from "./SceneLoadingCircle";
import CameraControls from "./CameraControls";
import Laptop from "./Laptop";
import KrkDynamic from "./KrkDynamic";
import BitcoinDisplay from "./BitcoinDisplay";
import ProjectsFrame from "./ProjectsFrame";
import Projects from "./Projects";
import LocationMarker from "./LocationMarker";
import Socials from "./Socials";

//TODO - fix 'any' types

interface SocialModelProps {
  url: string;
  handleClick: () => void;
  isMobile: boolean;
}

const ALL_MODELS = [
  "./3D/desk1.glb",
  "./3D/bitcoin_atm.glb",
  "./3D/redbulls.glb",
  "./3D/redbull_single.glb",
  "./3D/soundcloud.glb",
  "./3D/linkedin.glb",
  "./3D/github.glb",
  "./3D/x.glb",
  "./3D/krk_single.glb",
  "./3D/mac-draco.glb",
];

ALL_MODELS.forEach((model) => useGLTF.preload(model));

const Desk = () => {
  const { scene } = useGLTF("./3D/desk1.glb");
  return (
    <primitive
      onClick={(e: ThreeEvent<MouseEvent>) => e.stopPropagation()}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()}
      rotation={[0, 10, 0]}
      scale={1}
      object={scene}
    />
  );
};

const Redbulls = () => {
  const { scene } = useGLTF("./3D/redbulls.glb");
  return <primitive position={[-3.4, -1.86, 2.0]} scale={3.8} object={scene} />;
};

const RedbullSingle = ({ handleClick }: { handleClick: () => void }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { scene } = useGLTF("./3D/redbull_single.glb");

  useCursor(isHover);
  return (
    <primitive
      onClick={handleClick}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      position={[1.0, 1.16, -1]}
      scale={0.1}
      object={scene}
    />
  );
};

export default function Scene() {
  const [physicsPaused, setPhysicsPaused] = useState<boolean>(true);
  const [dpr, setDpr] = useState<number>(1.5);

  const { activeMarker, isMarkerHidden } = useCameraStore((state) => state);

  const rigidBodyRefs = useRef<Record<string, RapierRigidBody | null>>({
    github: null,
    x: null,
    soundcloud: null,
    linkedin: null,
  });

  const { isMobile } = useScreenSize();

  const handleSocialClick = (social: string): void => {
    setPhysicsPaused(false);

    Object.keys(rigidBodyRefs.current).forEach((key) => {
      const rigidBody = rigidBodyRefs.current[key];

      if (rigidBody) {
        if (key === social) rigidBody.wakeUp();
        else rigidBody.sleep();
      }
    });

    setTimeout(() => {
      navOutWithGhostAnchor(SOCIALS[social]);
    }, 3000);
  };

  return (
    <div className="w-dvh h-dvh bg-black">
      <Suspense fallback={<SceneLoadingCircle />}>
        <CanvasWrapper>
          <Canvas dpr={dpr}>
            <PerformanceMonitor
              onIncline={() => setDpr(2)}
              onDecline={() => setDpr(1)}
            />
            {/* <Perf /> */}
            <Physics paused={physicsPaused} key={0} timeStep={1 / 60}>
              <fog attach="fog" args={["rgb(16,16,16)", 0, 10]} />
              <Environment preset="city" />
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
              />

              <group position={[0, -0.5, 0]}>
                <Desk />
                <LocationMarker
                  visible={!!activeMarker.current && !isMarkerHidden.current}
                />
                <Laptop />
                <BitcoinDisplay />
                <Redbulls />
                <RedbullSingle
                  handleClick={() =>
                    navOutWithGhostAnchor(
                      "https://www.walmart.com/ip/Red-Bull-Winter-Edition-Iced-Vanilla-Berry-Energy-Drink-12-fl-oz-4-pack-cans/5340366890"
                    )
                  }
                />
                <KrkDynamic />
                <ProjectsFrame />
                <Projects />

                <Socials
                  setPhysicsPaused={setPhysicsPaused}
                  isMobile={isMobile}
                />

                <RigidBody type="fixed" colliders="cuboid" name="floor">
                  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <MeshReflectorMaterial
                      blur={isMobile ? [40, 10] : [400, 100]}
                      resolution={isMobile ? 512 : 1024}
                      mixBlur={1}
                      opacity={2}
                      depthScale={1.1}
                      minDepthThreshold={0.4}
                      maxDepthThreshold={1.25}
                      roughness={1}
                      mirror={1}
                    />
                  </mesh>
                </RigidBody>
              </group>
              <CameraControls />
            </Physics>
          </Canvas>
        </CanvasWrapper>
      </Suspense>
    </div>
  );
}
