import { createRef, type MutableRefObject } from "react";
import { create } from "zustand";
import { SpringRef, type Lookup } from "@react-spring/three";

//using these refs to control UI is temporary
//see: https://github.com/pmndrs/zustand/discussions/1140
//idea is to reduce re-renders of scene, although this can probably be achieved by restructuring component tree
//I realize this is unconventional and prob a bit hacky, but this works for now
//obvious drawback is each setter creating a new ref, breaking some rules
//benefits are preventing re-renders before I refactor some, halting FPS drops when animating

export type CameraValues = {
  pos: number[];
  target: number[];
  orbitEnabled: boolean;
  activeMarker?: number;
};

export enum LocationMarkers {
  Laptop = 1,
  Krk = 2,
  Projects = 3,
  BitcoinDisplay = 4,
  Socials = 5,
}

export type LocationMarker = {
  title: string;
  position: number[];
  camPos: number[];
  camTarget: number[];
  clickHandler?: (...args: any[]) => any;
};

let isOrbit = createRef<boolean>() as MutableRefObject<boolean>;
let isAnimating = createRef<boolean>() as MutableRefObject<boolean>;
let isMarkerHidden = createRef<boolean>() as MutableRefObject<boolean>;
let isOverlayHidden = createRef<boolean>() as MutableRefObject<boolean>;
let activeMarker = createRef<number | null>() as MutableRefObject<
  number | null
>;
let locationMarker =
  createRef<LocationMarker>() as MutableRefObject<LocationMarker>;

let springRef = SpringRef();

isOrbit.current = true;
isAnimating.current = false;
isMarkerHidden.current = false;
isOverlayHidden.current = false;
activeMarker.current = null;
locationMarker.current = {
  title: "",
  position: [10_000, 10_000, 10_000],
  camPos: [],
  camTarget: [],
};

interface CameraState {
  springRef: SpringRef<Lookup<any>>;
  isOrbit: MutableRefObject<boolean>;
  isAnimating: MutableRefObject<boolean>;
  activeMarker: MutableRefObject<number | null>;
  locationMarker: MutableRefObject<LocationMarker>;
  isMarkerHidden: MutableRefObject<boolean>;
  isOverlayHidden: MutableRefObject<boolean>;
  setIsOrbit: (isOrbitEnabled: boolean) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setActiveMarker: (activeMarker: number | null) => void;
  setLocationMarker: (locationMarker: LocationMarker) => void;
  setIsMarkerHidden: (isMarkerHidden: boolean) => void;
  setIsOverlayHidden: (isOverlayHidden: boolean) => void;
}

const cameraStoreInitial = {
  springRef,
  isOrbit,
  isAnimating,
  activeMarker,
  locationMarker,
  isMarkerHidden,
  isOverlayHidden,
};

export const useCameraStore = create<CameraState>((set) => {
  const makeNewRefAndSet = <T>(newValue: T): MutableRefObject<T> => {
    const newRef = createRef() as MutableRefObject<T>;
    newRef.current = newValue;
    return newRef;
  };

  return {
    ...cameraStoreInitial,
    setIsOrbit: (isOrbit: boolean) => {
      set({ isOrbit: makeNewRefAndSet(isOrbit) });
    },
    setIsAnimating: (isAnimating: boolean) => {
      set({ isAnimating: makeNewRefAndSet(isAnimating) });
    },
    setActiveMarker: (activeMarker: number | null) => {
      set({ activeMarker: makeNewRefAndSet(activeMarker) });
    },
    setLocationMarker: (locationMarker: LocationMarker) => {
      set({ locationMarker: makeNewRefAndSet(locationMarker) });
    },
    setIsMarkerHidden: (isMarkerHidden: boolean) => {
      set({ isMarkerHidden: makeNewRefAndSet(isMarkerHidden) });
    },
    setIsOverlayHidden: (isOverlayHidden: boolean) => {
      set({ isOverlayHidden: makeNewRefAndSet(isOverlayHidden) });
    },
  };
});
