import { create } from "zustand";

interface AudioPlayerState {
 url: string,
 setUrl: (value: string) => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  url: "",
  setUrl: (value) => {
    set({url: value})
  }
}));
