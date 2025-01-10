import { useCameraStore } from "@/app/store/camera";
import { useScreenSize } from "./ScreenSize";
import { useSpring, animated, config, useSpringRef } from "@react-spring/three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const AnimatedOrbitControls = animated(OrbitControls);
const AnimatedPerspectiveCamera = animated(PerspectiveCamera);

export default function CameraControls() {
  const { springRef, isOrbit, isAnimating } = useCameraStore((state) => state);

  const { isMobile } = useScreenSize();

  const [spring] = useSpring(
    {
      ref: springRef,
      pos: [0, 0, 4],
      target: [0, 0, 0],
      reset: true,
      immediate: true,
    },
    []
  );

  // console.log("CONTROLS: target:", spring.target, "pos:", spring.pos);

  return (
    <>
      <AnimatedOrbitControls
        enabled={isOrbit.current}
        makeDefault
        autoRotate={false}
        maxPolarAngle={Math.PI / 2.3}
        minPolarAngle={Math.PI / 2.8}
        maxAzimuthAngle={isMobile && !isAnimating.current ? 1 : Infinity}
        minAzimuthAngle={isMobile && !isAnimating.current ? 5.6 : Infinity}
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
