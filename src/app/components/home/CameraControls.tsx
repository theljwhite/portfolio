import { useRef, useMemo } from "react";
import { useSceneStore } from "@/app/store/scene";
import useClientMediaQuery from "@/app/utils/useClientMediaQuery";
import { useSpring, animated, config } from "@react-spring/three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { type OrbitControls as TOrbitControls } from "three/examples/jsm/Addons.js";

//TODO this is experimental and prob not best practice, as I want to have OrbitControls
//and perspective camera, and they dont work well together. but I need both.
//so in the future I will prob refactor this and come up with a better and more efficient solution
//see: https://github.com/pmndrs/react-three-fiber/discussions/613
//but this surprisingly works for now to allow smooth zooming in to objects also ability to orbit.

const AnimatedOrbitControls = animated(OrbitControls);
const AnimatedPerspectiveCamera = animated(PerspectiveCamera);

export default function CameraControls() {
  const { cameraValues, isImmediate } = useSceneStore((state) => state);

  const memoizedCamValues = useMemo(
    () => cameraValues,
    [cameraValues.pos, cameraValues.target]
  );

  const orbitRef = useRef<TOrbitControls>(null);

  const isMobile = useClientMediaQuery("(max-width: 600px)");

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
    },
    [memoizedCamValues]
  );

  console.log("initial spring target -->", spring.pos);

  return (
    <>
      <AnimatedOrbitControls
        ref={orbitRef as any} //TODO fix any type
        enabled={true}
        makeDefault
        autoRotate={false}
        maxPolarAngle={Math.PI / 2.3}
        minPolarAngle={Math.PI / 2.8}
        maxAzimuthAngle={isMobile ? 1 : Infinity}
        minAzimuthAngle={isMobile ? 5.6 : Infinity}
        enableZoom={!!isMobile}
        minDistance={2}
        maxDistance={7}
        enablePan={true}
        target={spring.target as any} //TODO fix any type
      />
      <AnimatedPerspectiveCamera
        makeDefault
        fov={isMobile ? 94 : 65}
        position={spring.pos as any} //TODO fix any type
      />
    </>
  );
}
