import { Pause, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import { useAudioPlayerStore } from "../store";
type WaveformProps = {
  url: string;
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

export default function Waveform({ url }: WaveformProps) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const { isAutoPlay } = useAudioPlayerStore();

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
        console.log(isAutoPlay)
        if (isAutoPlay) {
          wavesurfer.current.play();
          setPlay(true);
        }else{
          wavesurfer.current.stop();
          setPlay(false)
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
  }, [url]);

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
      <div id="waveform" className="w-full" ref={waveformRef} />
      <div className="controls">
        <button onClick={handlePlayPause}>
          {!playing ? <Play /> : <Pause />}
        </button>
      </div>
    </div>
  );
}
