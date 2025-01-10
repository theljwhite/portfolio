import {
  useCameraStore,
  type CameraValues,
  type LocationMarker,
} from "../store/camera";
import { config } from "@react-spring/three";

export default function useAnimateCamera() {
  const {
    springRef,
    setIsOrbit,
    setIsAnimating,
    setActiveMarker,
    setLocationMarker,
    setIsOverlayHidden,
  } = useCameraStore((state) => state);

  const camGoTo = (
    cam: CameraValues,
    locationMarker?: LocationMarker
  ): void => {
    if (locationMarker) setLocationMarker(locationMarker);

    springRef.start({
      config: config.molasses,
      pos: cam.pos,
      target: cam.target,
      from: {
        pos: [0, 0, 4],
        target: [0, 0, 0],
      },
      onStart: () => {
        if (cam.orbitEnabled) setIsOrbit(true);
        setActiveMarker(cam.activeMarker ?? null);
        setIsAnimating(true);
      },
      onRest: () => {
        if (!cam.orbitEnabled) setIsOrbit(false);
        setIsAnimating(false);
      },
    });
  };

  const camReset = (pos: number[], target: number[]): void => {
    springRef.start({
      config: config.molasses,
      pos: [0, 0, 4],
      target: [0, 0, 0],
      from: {
        pos,
        target,
      },
      onStart: () => {
        setIsOrbit(true);
        setActiveMarker(null);
        setIsAnimating(true);
      },
      onRest: () => {
        setIsAnimating(false);
        setIsOverlayHidden(false);
      },
    });
  };

  return { camGoTo, camReset };
}
