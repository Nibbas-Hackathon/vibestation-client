import React, { useEffect, useRef, useState } from "react";
import { MusicRecord, useAudioPlayerStore } from "../store/playerStore";
import Waveform from "./ui/waveform";
import WaveSurfer from "wavesurfer.js";
import { Download, Pause, Play, Volume2 } from "lucide-react";
import { downloadFile } from "../lib/utils";
import { fetchSong } from "../lib/fetchers";
import { useQuery } from "react-query";

type Props = {
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
  height: 25,
  normalize: true,
  partialRender: true,
});

const RadioPlayer = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const { currentRadioSong, setCurrentRadioSong, isAutoPlay, setIsAutoPlay } =
    useAudioPlayerStore();

  useQuery("radio_song", fetchSong, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setCurrentRadioSong(data);
    },
  });

  useEffect(() => {
    if (currentRadioSong) {
      setPlay(false);

      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer!.current = WaveSurfer.create(options);

      wavesurfer.current.load(currentRadioSong.songUrl);

      wavesurfer.current.on("ready", function () {
        if (wavesurfer.current) {
          wavesurfer.current.setVolume(volume);
          setVolume(volume);
          if (isAutoPlay) {
            wavesurfer.current.play();
            setPlay(true);
          }
        }
      });

      wavesurfer.current.on("finish", function () {
        if (wavesurfer.current) {
          setTimeout(async () => {
            const song = await fetchSong();
            setCurrentRadioSong(song);
            setIsAutoPlay(true);
          }, 1000);
          wavesurfer.current.stop();
          setPlay(false);
        }
      });

      return () => wavesurfer.current!.destroy();
    }
  }, [currentRadioSong]);

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
    <div className="fixed bottom-0 border-t flex w-full justify-center items-center border-slate-600 bg-black p-3">
      <img
        src={
          currentRadioSong?.coverUrl
            ? currentRadioSong.coverUrl
            : "https://pbxt.replicate.delivery/5SlkISV9wqIJCNFr9taaRB3sWqULUrRx9aosfL9ofrmuo4lRA/out-0.png"
        }
        className="object-cover rounded-md p-1 h-[75px]"
        alt="ai_album_cover"
      />
      <div className="flex items-center w-full md:w-1/2 p-2 gap-2">
        <button
          onClick={handlePlayPause}
          className="rounded-full hover:bg-indigo-500/50 p-4 text-white"
        >
          {!playing ? <Play /> : <Pause />}
        </button>
        <div className=" gap-2 hidden md:flex">
          <button className="text-white">
            <Volume2 />
          </button>
          <input
            type="range"
            id="volume"
            name="volume"
            min="0.01"
            className="w-1/2"
            max="1"
            step=".025"
            onChange={onVolumeChange}
            defaultValue={volume}
          />{" "}
        </div>

        <div className="w-2/3">
          <Waveform waveformRef={waveformRef} />
        </div>
        <button
          className="rounded-full hover:bg-indigo-500/50 p-3 text-white"
          onClick={() =>
            downloadFile(currentRadioSong!.songUrl, currentRadioSong!.title)
          }
        >
          <Download />
        </button>
      </div>
    </div>
  );
};

export default RadioPlayer;
