"use client";

import { useState, Suspense } from "react";
import {
  Environment,
  MeshReflectorMaterial,
  Stars,
  PerformanceMonitor,
  Gltf,
} from "@react-three/drei";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useCameraStore, LocationMarkers } from "@/app/store/camera";
import { useScreenSize } from "./ScreenSize";
import { useErrorBoundary } from "use-error-boundary";
import { CanvasWrapper } from "./CanvasWrapper";
import SceneLoadingCircle from "./SceneLoadingCircle";
import SceneError from "./SceneError";
import Fallback from "./Fallback";
import CameraControls from "./CameraControls";
import DeskItems from "./DeskItems";
import Laptop from "./Laptop";
import KrkDynamic from "./KrkDynamic";
import BitcoinDisplay from "./BitcoinDisplay";
import ProjectsFrame from "./ProjectsFrame";
import Projects from "./Projects";
import LocationMarker from "./LocationMarker";
import Socials from "./Socials";
import Trashcan from "./Trashcan";

//TODO - canvas doesnt always resize from small to large properly because of the CanvasWrapper fix needed to fix Drei <Html> being misaligned on Safari (its a safari bug but CanvasWrapper fixes it, allows the Laptop component to look good on mobile)
//for now, its more important that the laptop is shown correctly on all devices. meanwhile, monitoring Drei/R3F updates, and exploring other temporary solutions (resize from large to small still works fine)

const ALL_MODELS = [
  "./3D/desk1.glb",
  "./3D/bitcoin_atm.glb",
  "./3D/redbull_can.glb",
  "./3D/soundcloud.glb",
  "./3D/linkedin.glb",
  "./3D/github.glb",
  "./3D/x.glb",
  "./3D/krk_single.glb",
  "./3D/mac-draco.glb",
  "./3D/trashcan.glb",
  "./3D/paper.glb",
];

ALL_MODELS.forEach((model) => useGLTF.preload(model));

const Desk = () => (
  <RigidBody type="fixed" colliders="trimesh">
    <Gltf
      src="./3D/desk1.glb"
      onClick={(e: ThreeEvent<MouseEvent>) => e.stopPropagation()}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()}
      rotation={[0, 10, 0]}
      scale={1}
    />
  </RigidBody>
);

export default function Scene() {
  const [dpr, setDpr] = useState<number>(1.5);

  const { activeMarker, isMarkerHidden } = useCameraStore((state) => state);

  const { isMobile } = useScreenSize();

  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  const isLessBlur =
    activeMarker.current === LocationMarkers.Projects && isMobile;

  return (
    <div className="w-dvh h-dvh bg-black flex overflow-hidden">
      <Suspense fallback={<SceneLoadingCircle />}>
        {didCatch ? (
          <SceneError message={error.message} />
        ) : (
          <ErrorBoundary>
            <CanvasWrapper>
              <Canvas dpr={dpr} fallback={<Fallback />}>
                <PerformanceMonitor
                  onIncline={() => setDpr(2)}
                  onDecline={() => setDpr(1)}
                />

                <Physics timeStep={1 / 60}>
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
                    <DeskItems />
                    <LocationMarker
                      visible={
                        !!activeMarker.current && !isMarkerHidden.current
                      }
                    />
                    <Laptop />
                    <BitcoinDisplay />
                    <KrkDynamic />
                    <ProjectsFrame />
                    <Projects />

                    <Socials isMobile={isMobile} />

                    <Trashcan />

                    <RigidBody type="fixed" colliders="cuboid" name="floor">
                      <mesh
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[0, 0, 0]}
                      >
                        <planeGeometry args={[10, 10]} />
                        <MeshReflectorMaterial
                          blur={isLessBlur ? [40, 10] : [400, 100]}
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
          </ErrorBoundary>
        )}
      </Suspense>
    </div>
  );
}
