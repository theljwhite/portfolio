import { create } from "zustand";

//zustand so that I can easily expand this later on in the future

type AudioDetails = {
  artist: string;
  title: string;
  artwork: string;
  outlink?: string;
};

export interface HomeSceneState {
  isAudioPlaying: boolean;
  audioDetails: AudioDetails;
  audioDuration: number;
  audioCurrTime: number;
  setIsAudioPlaying: (isAudioPlaying: boolean) => void;
  setAudioDetails: (audioDetails: AudioDetails) => void;
  setAudioDuration: (audioDuration: number) => void;
  setAudioCurrTime: (audioCurrTime: number) => void;
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
      currTime: 0,
      outlink: "",
    },
    audioDuration: 72,
    audioCurrTime: 0,
  };

  return {
    ...initialState,
    setIsAudioPlaying: (isAudioPlaying: boolean) => set({ isAudioPlaying }),
    setAudioDetails: (audioDetails: AudioDetails) => set({ audioDetails }),
    setAudioDuration: (audioDuration: number) => set({ audioDuration }),
    setAudioCurrTime: (audioCurrTime: number) => set({ audioCurrTime }),
    reset: () => set({ ...initialState }),
  };
});
