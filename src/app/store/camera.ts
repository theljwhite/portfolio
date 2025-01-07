import { create } from "zustand";
import { createRef, createContext, MutableRefObject } from "react";

type CameraValues = {
  cachedPos: number[];
  cachedTarget: number[];
  pos: number[];
  target: number[];
  orbitEnabled: boolean;
  activeMarker?: number;
};

let cameraValues =
  createRef<CameraValues>() as React.MutableRefObject<CameraValues>;

cameraValues.current = {
  cachedPos: [0, 0, 0],
  cachedTarget: [0, 0, 0],
  pos: [0, 0, 4],
  target: [0, 0, 0],
  orbitEnabled: true,
};

interface CameraState {
  cameraValues: React.MutableRefObject<CameraValues>;
  setCameraValues: (cameraValues: CameraValues) => void;
}

const cameraStoreInitial = {
  cameraValues,
};

export const useCameraStore = create<CameraState>((set) => ({
  ...cameraStoreInitial,
  setCameraValues: (cameraValues: CameraValues | null) => {
    if (!cameraValues) return;

    const newRef = createRef() as MutableRefObject<CameraValues>;
    newRef.current = cameraValues;
  },
}));
