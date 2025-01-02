import { useMemo } from "react";
import { useSceneStore } from "@/app/store/scene";
import { useScreenSize } from "./ScreenSize";
import { useSpring, animated, config } from "@react-spring/three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

//TODO this is experimental and maybe not best practice, as I want to have OrbitControls
//and perspective camera, and they dont work well together. but I need both.
//so in the future I will prob refactor this and come up with a better and more efficient solution
//see: https://github.com/pmndrs/react-three-fiber/discussions/613
//but this surprisingly works for now to allow smooth zooming in to objects also ability to orbit.

//TODO fix types, and duplicate orbit enabled state may not necessarily be needed to control enabling/disabled orbit
//right now it allows orbit to be disabled when an obj is animated towards (zoomed in on) which is intended
//it doesnt work with camera values orbitEnabled so for now I'm leaving it like it is, this is just a first pass to get things working

const AnimatedOrbitControls = animated(OrbitControls);
const AnimatedPerspectiveCamera = animated(PerspectiveCamera);

export default function CameraControls() {
  const {
    cameraValues,
    isImmediate,
    isOrbitEnabled,
    setIsOrbitEnabled,
    setActiveMarker,
  } = useSceneStore((state) => state);

  const memoizedCamValues = useMemo(
    () => cameraValues,
    [
      cameraValues.pos,
      cameraValues.target,
      cameraValues.orbitEnabled,
      cameraValues.activeMarker,
    ]
  );

  const { isMobile } = useScreenSize();

  const [spring] = useSpring(
    {
      pos: memoizedCamValues.pos,
      target: memoizedCamValues.target,
      from: {
        pos: memoizedCamValues.cachedPos,
        target: memoizedCamValues.cachedTarget,
      },
      config: config.molasses,
      reset: true,
      immediate: isImmediate,
      onStart: () => {
        if (memoizedCamValues.orbitEnabled) setIsOrbitEnabled(true);
        setActiveMarker(memoizedCamValues.activeMarker ?? null);
      },
      onRest: () => !memoizedCamValues.orbitEnabled && setIsOrbitEnabled(false),
    },
    [memoizedCamValues]
  );

  return (
    <>
      <AnimatedOrbitControls
        enabled={isOrbitEnabled}
        makeDefault
        autoRotate={false}
        maxPolarAngle={Math.PI / 2.3}
        minPolarAngle={Math.PI / 2.8}
        maxAzimuthAngle={isMobile && !isOrbitEnabled ? 1 : Infinity}
        minAzimuthAngle={isMobile && !isOrbitEnabled ? 5.6 : Infinity}
        minDistance={2}
        maxDistance={7}
        enablePan={true}
        target={spring.target as unknown as THREE.Vector3}
      />
      <AnimatedPerspectiveCamera
        makeDefault
        fov={isMobile ? 94 : 65}
        position={spring.pos as unknown as THREE.Vector3}
      />
    </>
  );
}
