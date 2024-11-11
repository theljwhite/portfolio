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
  isAudioPlaying: boolean;
  audioDetails: AudioDetails;
  isDonateOpen: boolean;
  donateAmount: string;
  setIsAudioPlaying: (isAudioPlaying: boolean) => void;
  setAudioDetails: (audioDetails: AudioDetails) => void;
  setIsDonateOpen: (isDonateOpen: boolean) => void;
  setDonateAmount: (donateAmount: string) => void;
  reset: () => void;
}

export const useSceneStore = create<HomeSceneState>((set) => {
  const initialState = {
    isAudioPlaying: false,
    audioDetails: {
      artist: "G JONES (Short clip)",
      title: "CHEE - Get Hot (G JONES Remix)",
      artwork:
        "https://i1.sndcdn.com/artworks-000238578225-mypvyu-t500x500.jpg",
      duration: 0,
      outlink: "",
    },
    isDonateOpen: false,
    donateAmount: "",
  };

  return {
    ...initialState,
    setIsAudioPlaying: (isAudioPlaying: boolean) => set({ isAudioPlaying }),
    setAudioDetails: (audioDetails: AudioDetails) => set({ audioDetails }),
    setIsDonateOpen: (isDonateOpen: boolean) => set({ isDonateOpen }),
    setDonateAmount: (donateAmount: string) => set({ donateAmount }),
    reset: () => set({ ...initialState }),
  };
});
