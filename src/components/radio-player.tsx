import React, { useEffect, useRef, useState } from "react";
import { MusicRecord, useAudioPlayerStore } from "../store/playerStore";
import Waveform from "./ui/waveform";
import WaveSurfer from "wavesurfer.js";
import { Download, Pause, Play, Volume2 } from "lucide-react";
import { axiosInstance } from "../lib/axios-instance";
import { downloadFile } from "../lib/utils";

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
  const [volume, setVolume] = useState(0.5);
  const { currentRadioSong, setCurrentRadioSong, isAutoPlay } =
    useAudioPlayerStore();

  const fetchSong = async () => {
    try {
      const response = await axiosInstance.get("/api/data/random_song", {
        params: {
          prompt,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { random_song } = response.data;
      const song = {
        ...random_song[0],
        creator: "Echelon",
      };
      setCurrentRadioSong(song);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  useEffect(() => {
    if (currentRadioSong) {
      setPlay(false);

      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer!.current = WaveSurfer.create(options);

      wavesurfer.current.load(currentRadioSong.songUrl);

      wavesurfer.current.on("ready", function () {
        if (wavesurfer.current) {
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
          setTimeout(() => fetchSong(), 2000);
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
    <div className="fixed bottom-0 border-t flex w-full justify-center  text-whit items-center border-slate-600 bg-black p-2">
      <img
        src={
          currentRadioSong?.coverUrl
            ? currentRadioSong.coverUrl
            : "https://pbxt.replicate.delivery/5SlkISV9wqIJCNFr9taaRB3sWqULUrRx9aosfL9ofrmuo4lRA/out-0.png"
        }
        className="object-cover rounded-md h-[75px]"
        alt="ai_album_cover"
      />
      <div className="flex items-center w-full p-2 gap-2">
        <button
          onClick={handlePlayPause}
          className="rounded-full hover:bg-indigo-500/50 p-3 text-white"
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
