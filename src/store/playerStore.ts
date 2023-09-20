import { create } from "zustand";

export type MusicRecord = {
  songUrl: string;
  coverUrl: string;
}

interface AudioPlayerState {
  currentSong: MusicRecord;
  setCurrentSong: (value: MusicRecord) => void;
}

const initialSong: MusicRecord = {
  songUrl: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
  coverUrl:
    "https://pbxt.replicate.delivery/5SlkISV9wqIJCNFr9taaRB3sWqULUrRx9aosfL9ofrmuo4lRA/out-0.png",
};

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  currentSong: initialSong,
  setCurrentSong: (value: MusicRecord) => {
    set({ currentSong: value });
  },
}));

