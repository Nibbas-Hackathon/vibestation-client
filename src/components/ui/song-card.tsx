import React from "react";
import { MusicRecord, useAudioPlayerStore } from "../../store/playerStore";
import { downloadFile, truncateText } from "../../lib/utils";
import { Download } from "lucide-react";

type Props = {
  song: MusicRecord;
};

const SongCard = ({ song }: Props) => {
  const { setCurrentRadioSong } = useAudioPlayerStore();
  return (
    <div
      onClick={() => setCurrentRadioSong(song)}
      className="rounded cursor-pointer w-auto md:w-[350px] flex-col h-auto overflow-hidden flex md:flex-row shadow-lg m-4 text-white backdrop-blur-xl bg-white/2 border border-slate-500/50"
    >
      <img
        src={song.coverUrl}
        alt={song.title}
        className="object-cover rounded-t-lg h-[150px] md:rounded-none md:rounded-l-lg"
      />
      <div className="px-6 py-4 flex flex-col justify-center">
        <div className="font-bold text-base mb-2">
          {song.title.length > 50
            ? `${truncateText(song.title, 50)}`
            : song.title}
        </div>
        <p className="text-gray-400 text-sm">Echelon</p>
      </div>
      <div className="absolute bottom-0 right-0">
        <button
          className="rounded-full text-slate-400 p-4 text-sm"
          onClick={() => downloadFile(song.songUrl, song.title)}
        >
          <Download size='20px' />
        </button>
      </div>
    </div>
  );
};

export default SongCard;
