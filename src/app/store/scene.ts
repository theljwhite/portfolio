import { create } from "zustand";

//zustand so that I can easily expand this later on in the future

type AudioDetails = {
  artist: string;
  title: string;
  artwork: string;
  duration: number;
  outlink?: string;
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
  isOrbitEnabled: boolean;
  setIsOverlayHidden: (isOverlayHidden: boolean) => void;
  setIsProjectsOpen: (isProjectsOpen: boolean) => void;
  setIsAudioPlaying: (isAudioPlaying: boolean) => void;
  setAudioDetails: (audioDetails: AudioDetails) => void;
  setIsDonateOpen: (isDonateOpen: boolean) => void;
  setIsBitcoinDisplayOpen: (isBitcoinDisplayOpen: boolean) => void;
  setDonateAmount: (donateAmount: string) => void;
  setActiveLaptopContent: (activeLaptopContent: number | null) => void;
  setIsOrbitEnabled: (isOrbitEnabled: boolean) => void;
  resetLaptopContent: () => void;
  reset: () => void;
}

export const useSceneStore = create<HomeSceneState>((set) => {
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
    isOrbitEnabled: true,
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
    setIsOrbitEnabled: (isOrbitEnabled: boolean) => set({ isOrbitEnabled }),
    resetLaptopContent: () => set({ activeLaptopContent: 0 }),
    reset: () => set({ ...initialState }),
  };
});
