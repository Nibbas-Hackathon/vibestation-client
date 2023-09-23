import {
  Download,
  Pause,
  Play,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import { useAudioPlayerStore } from "../store";
import { MusicRecord } from "../store/playerStore";
import { truncateText } from "../lib/utils";
type WaveformProps = {
  song: MusicRecord;
};
const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: "#853BE3",
  progressColor: "#190632",
  cursorColor: "#853BE3",
  barWidth: 5,
  barRadius: 5,
  responsive: true,
  height: 80,
  normalize: true,
  partialRender: true,
});

export default function Waveform({ song }: WaveformProps) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const { isAutoPlay } = useAudioPlayerStore();

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(song.songUrl);

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
        console.log(isAutoPlay);
        if (isAutoPlay) {
          wavesurfer.current.play();
          setPlay(true);
        } else {
          wavesurfer.current.stop();
          setPlay(false);
        }
      }
    });

    wavesurfer.current.on("finish", function () {
      if (wavesurfer.current) {
        wavesurfer.current.stop();
        setPlay(false);
      }
    });

    return () => wavesurfer.current!.destroy();
  }, [song.songUrl]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current!.playPause();
  };

  const onVolumeChange = (e: any) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current!.setVolume(newVolume || 1);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 h= justify-center items-center">
      <div className="justify-center flex flex-col items-center gap-3">
        <h1 className="text-sm md:text-xl">
          {song.title.length > 0 ? truncateText(song.title, 50) : ""}
        </h1>
        <small className="text-xs md:text-md">Vibestation</small>
      </div>
      <div id="waveform" className="hidden w-full md:block" ref={waveformRef} />
      <div className="controls flex justify-between w-full">
        <div className="flex gap-2">
          <button>
            <Volume2 />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            className="w-[75px]"
            value={volume}
            onChange={onVolumeChange}
          />
        </div>

        <button
          onClick={handlePlayPause}
          className="rounded-full hover:bg-indigo-500/50 p-3"
        >
          {!playing ? <Play /> : <Pause />}
        </button>
        <button>
          <Download />
        </button>
      </div>
    </div>
  );
}
