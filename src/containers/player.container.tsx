import React from "react";
import Waveform from "../components/waveformPlayer";
import { useAudioPlayerStore } from "../store";

const PlayerContainer = () => {
  const { currentSong } = useAudioPlayerStore();

  return (
    <div className="flex flex-row  md:flex-col h-auto p-2   md:flex-1 md:h-screen relative">
      <div className="w-full flex-1 gap-2 flex-row md:flex-col rounded-md flex p-5 text-white backdrop-blur-2xl bg-white/10 border border-slate-500/50">
        <div className="flex flex-row md:flex-col gap-5 justify-between md:justify-center w-full h-full">
          <div className="bg-transparent rounded-md flex gap-5  flex-col justify-center items-center">
            <img
              src={
                currentSong.coverUrl
                  ? currentSong.coverUrl
                  : "https://pbxt.replicate.delivery/5SlkISV9wqIJCNFr9taaRB3sWqULUrRx9aosfL9ofrmuo4lRA/out-0.png"
              }
              className="object-cover absolute -z-10  blur-[100px] h-[100px] w-[100px] rounded-md md:h-[500px] md:w-[500px]"
              alt="ai_album_cover"
            />

            <img
              src={
                currentSong.coverUrl
                  ? currentSong.coverUrl
                  : "https://pbxt.replicate.delivery/5SlkISV9wqIJCNFr9taaRB3sWqULUrRx9aosfL9ofrmuo4lRA/out-0.png"
              }
              className="object-cover rounded-md h-[120px] shadow-lg w-[120px] md:h-[300px] md:w-[300px]"
              alt="ai_album_cover"
            />
            <div className="justify-center flex flex-col items-center gap-3">
              <h1 className="text-xl">Eclipse</h1>
              <small>Vibestation</small>
            </div>
          </div>
          {currentSong && <Waveform url={currentSong.songUrl} />}
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
