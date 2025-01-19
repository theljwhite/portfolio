"use client";

import { useState, Suspense } from "react";
import {
  Environment,
  MeshReflectorMaterial,
  Stars,
  PerformanceMonitor,
  Gltf,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useCameraStore, LocationMarkers } from "@/app/store/camera";
import { useScreenSize } from "./ScreenSize";
import { useErrorBoundary } from "use-error-boundary";
import SceneLoadingCircle from "./SceneLoadingCircle";
import SceneError from "./SceneError";
import Fallback from "./Fallback";
import { CanvasWrapper } from "./CanvasWrapper";
import CameraControls from "./CameraControls";
import DeskItems from "./DeskItems";
import Laptop from "./Laptop";
import KrkDynamic from "./KrkDynamic";
import BitcoinDisplay from "./BitcoinDisplay";
import ProjectsFrame from "./ProjectsFrame";
import Projects from "./Projects";
import LocationMarker from "./LocationMarker";
import Socials from "./Socials";

//TODO - fix 'any' types

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
];

ALL_MODELS.forEach((model) => useGLTF.preload(model));

const Desk = () => (
  <Gltf
    src="./3D/desk1.glb"
    onClick={(e: ThreeEvent<MouseEvent>) => e.stopPropagation()}
    onPointerOver={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()}
    onPointerOut={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()}
    rotation={[0, 10, 0]}
    scale={1}
  />
);

export default function Scene() {
  const [physicsPaused, setPhysicsPaused] = useState<boolean>(true);
  const [dpr, setDpr] = useState<number>(1.5);

  const { activeMarker, isMarkerHidden } = useCameraStore((state) => state);

  const { isMobile } = useScreenSize();

  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  const isLessBlur =
    activeMarker.current === LocationMarkers.Projects && isMobile;

  return (
    <div className="w-dvh h-dvh bg-black flex">
      <Suspense fallback={<SceneLoadingCircle />}>
        {didCatch ? (
          <SceneError message={error.message} />
        ) : (
          <ErrorBoundary>
            <CanvasWrapper>
              <Canvas dpr={dpr} fallback={<Fallback />}>
                {/* <Perf /> */}
                <PerformanceMonitor
                  onIncline={() => setDpr(2)}
                  onDecline={() => setDpr(1)}
                />
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

                    <Socials
                      setPhysicsPaused={setPhysicsPaused}
                      isMobile={isMobile}
                    />

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
