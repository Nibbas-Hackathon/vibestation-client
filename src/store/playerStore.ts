import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type MusicRecord = {
  songUrl: string;
  coverUrl: string;
  title: string;
  creator: string;
};

interface AudioPlayerState {
  isAutoPlay: boolean;
  setIsAutoPlay: (value: boolean) => void;
  currentSong: MusicRecord;
  setCurrentSong: (value: MusicRecord) => void;
  currentRadioSong: MusicRecord | null;
  setCurrentRadioSong: (value: MusicRecord) => void;
}

const initialSong: MusicRecord = {
  songUrl: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
  coverUrl:
    "https://pbxt.replicate.delivery/L2ZlRmCk006TFpZnordsfJPJJ98yS42CrShfDtGnxLfPtXPjA/out-0.png",
  title: "Eclipse",
  creator: "Echelon",
};

export const useAudioPlayerStore = create<AudioPlayerState>()((set) => ({
  isAutoPlay: false,
  setIsAutoPlay: (value: boolean) => {
    set({ isAutoPlay: value });
  },
  currentSong: initialSong,
  setCurrentSong: (value: MusicRecord) => {
    set({ currentSong: value });
  },
  currentRadioSong: null,
  setCurrentRadioSong: (value: MusicRecord) => {
    set({ currentRadioSong: value });
  },
}));
