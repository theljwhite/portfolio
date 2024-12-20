import { create } from "zustand";

export enum LocationMarkers {
  Laptop = 0,
  Krk = 1,
  Projects = 2,
}

type AudioDetails = {
  artist: string;
  title: string;
  artwork: string;
  duration: number;
  outlink?: string;
};

type CameraValues = {
  cachedPos: number[];
  cachedTarget: number[];
  pos: number[];
  target: number[];
  autoRotate: boolean;
  orbitEnabled: boolean;
  activeMarker?: number;
};

export interface HomeSceneState {
  isOverlayHidden: boolean;
  isProjectsOpen: boolean;
  isAudioPlaying: boolean;
  audioDetails: AudioDetails;
  isDonateOpen: boolean;
  isBitcoinDisplayOpen: boolean;
  donateAmount: string;
  activeLaptopContent: number | null;
  cameraValues: CameraValues;
  isOrbitEnabled: boolean;
  isAnimating: boolean;
  isImmediate: boolean;
  activeMarker: number | null;
  setIsOverlayHidden: (isOverlayHidden: boolean) => void;
  setIsProjectsOpen: (isProjectsOpen: boolean) => void;
  setIsAudioPlaying: (isAudioPlaying: boolean) => void;
  setAudioDetails: (audioDetails: AudioDetails) => void;
  setIsDonateOpen: (isDonateOpen: boolean) => void;
  setIsBitcoinDisplayOpen: (isBitcoinDisplayOpen: boolean) => void;
  setDonateAmount: (donateAmount: string) => void;
  setActiveLaptopContent: (activeLaptopContent: number | null) => void;
  setCameraValues: (cameraValues: CameraValues) => void;
  setIsOrbitEnabled: (isOrbitEnabled: boolean) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setIsImmediate: (isImmediate: boolean) => void;
  setActiveMarker: (activeMarker: number | null) => void;
  zoomOutCameraFromPos: () => void;
  resetLaptopContent: () => void;
  reset: () => void;
}

export const useSceneStore = create<HomeSceneState>((set, get) => {
  const initialState = {
    stage: 0,
    isOverlayHidden: false,
    isProjectsOpen: false,
    isAudioPlaying: false,
    audioDetails: {
      artist: "G JONES (Short clip)",
      title: "CHEE - Get Hot (G JONES Remix)",
      artwork:
        "https://i1.sndcdn.com/artworks-000238578225-mypvyu-t500x500.jpg",
      duration: 0,
      outlink: "",
    },
    isBitcoinDisplayOpen: false,
    isDonateOpen: false,
    donateAmount: "",
    activeLaptopContent: 0,
    cameraValues: {
      cachedPos: [0, 0, 0],
      cachedTarget: [0, 0, 0],
      pos: [0, 0, 4],
      target: [0, 0, 0],
      autoRotate: true,
      orbitEnabled: true,
    },
    isOrbitEnabled: true,
    isAnimating: false,
    isImmediate: true,
    activeMarker: null,
  };

  return {
    ...initialState,
    setIsOverlayHidden: (isOverlayHidden: boolean) => set({ isOverlayHidden }),
    setIsProjectsOpen: (isProjectsOpen: boolean) => set({ isProjectsOpen }),
    setIsAudioPlaying: (isAudioPlaying: boolean) => set({ isAudioPlaying }),
    setAudioDetails: (audioDetails: AudioDetails) => set({ audioDetails }),
    setIsDonateOpen: (isDonateOpen: boolean) => set({ isDonateOpen }),
    setIsBitcoinDisplayOpen: (isBitcoinDisplayOpen: boolean) =>
      set({ isBitcoinDisplayOpen }),
    setDonateAmount: (donateAmount: string) => set({ donateAmount }),
    setActiveLaptopContent: (activeLaptopContent: number | null) =>
      set({ activeLaptopContent }),
    setCameraValues: (cameraValues: CameraValues) =>
      set({ cameraValues, isImmediate: false }),
    setIsOrbitEnabled: (isOrbitEnabled: boolean) => set({ isOrbitEnabled }),
    setIsAnimating: (isAnimating: boolean) => set({ isAnimating }),
    setIsImmediate: (isImmediate: boolean) => set({ isImmediate }),
    setActiveMarker: (activeMarker: number | null) => set({ activeMarker }),
    zoomOutCameraFromPos: () =>
      set({
        cameraValues: {
          cachedPos: [0, 0, 0],
          cachedTarget: get().cameraValues.target,
          pos: [0, 0, 4],
          target: [0, 0, 0],
          autoRotate: true,
          orbitEnabled: true,
          activeMarker: undefined,
        },
        activeMarker: null,
      }),
    resetLaptopContent: () => set({ activeLaptopContent: 0 }),
    reset: () => set({ ...initialState }),
  };
});
