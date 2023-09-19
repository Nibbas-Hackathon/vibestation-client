import { useRef, useState, useEffect, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";

export const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState<null | WaveSurfer>();

  useEffect(() => {
    if (!containerRef.current) return;
    const track:any = document.querySelector("#track")

    const ws = WaveSurfer.create({
      ...options,
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      barMinHeight: 1,
      cursorWidth: 1,
      backend: "WebAudio",
      height: 80,
      progressColor: "#FE6E00",
      responsive: true,
      waveColor: "#C4C4C4",
      cursorColor: "transparent",
      container: containerRef.current,
    });

    setWavesurfer(ws);
    
    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};
