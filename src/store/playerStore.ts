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
    "https://pbxt.replicate.delivery/5SlkISV9wqIJCNFr9taaRB3sWqULUrRx9aosfL9ofrmuo4lRA/out-0.png",
  title: "Eclipse",
  creator: "Echelon",
};

export const useAudioPlayerStore = create<AudioPlayerState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "player-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAutoPlay: state.isAutoPlay }),
    }
  )
);
