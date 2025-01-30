import { create } from "zustand";

type AudioDetails = {
  artist: string;
  title: string;
  artwork: string;
  duration: number;
  outlink?: string;
};

type TrashcanGameStatus = "idle" | "started" | "dragging" | "thrown";

interface HomeSceneState {
  isProjectsOpen: boolean;
  isAudioPlaying: boolean;
  audioDetails: AudioDetails;
  isDonateOpen: boolean;
  isBitcoinDisplayOpen: boolean;
  donateAmount: string;
  activeLaptopContent: number | null;
  trashcanGameStatus: TrashcanGameStatus;
  trashcanAttempts: number;
  trashcanMakes: number;
  setIsProjectsOpen: (isProjectsOpen: boolean) => void;
  setIsAudioPlaying: (isAudioPlaying: boolean) => void;
  setAudioDetails: (audioDetails: AudioDetails) => void;
  setIsDonateOpen: (isDonateOpen: boolean) => void;
  setIsBitcoinDisplayOpen: (isBitcoinDisplayOpen: boolean) => void;
  setDonateAmount: (donateAmount: string) => void;
  setActiveLaptopContent: (activeLaptopContent: number | null) => void;
  setTrashcanGameStatus: (trashcanGameStatus: TrashcanGameStatus) => void;
  setTrashcanAttempts: (trashcanAttempts: number) => void;
  setTrashcanMakes: (trashcanMakes: number) => void;
  resetLaptopContent: () => void;
  reset: () => void;
}

export const useSceneStore = create<HomeSceneState>((set) => {
  const initialState = {
    stage: 0,
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
    trashcanGameStatus: "idle" as TrashcanGameStatus,
    trashcanAttempts: 0,
    trashcanMakes: 0,
  };

  return {
    ...initialState,
    setIsProjectsOpen: (isProjectsOpen: boolean) => set({ isProjectsOpen }),
    setIsAudioPlaying: (isAudioPlaying: boolean) => set({ isAudioPlaying }),
    setAudioDetails: (audioDetails: AudioDetails) => set({ audioDetails }),
    setIsDonateOpen: (isDonateOpen: boolean) => set({ isDonateOpen }),
    setIsBitcoinDisplayOpen: (isBitcoinDisplayOpen: boolean) =>
      set({ isBitcoinDisplayOpen }),
    setDonateAmount: (donateAmount: string) => set({ donateAmount }),
    setActiveLaptopContent: (activeLaptopContent: number | null) =>
      set({ activeLaptopContent }),
    setTrashcanGameStatus: (trashcanGameStatus: TrashcanGameStatus) =>
      set({ trashcanGameStatus }),
    setTrashcanAttempts: (trashcanAttempts: number) =>
      set({ trashcanAttempts }),
    setTrashcanMakes: (trashcanMakes: number) => set({ trashcanMakes }),
    resetLaptopContent: () => set({ activeLaptopContent: 0 }),
    reset: () => set({ ...initialState }),
  };
});
