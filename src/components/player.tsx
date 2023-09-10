import React, { useRef } from "react";
import { Card, CardContent } from "./card";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

type Props = {
    src: string;
    title?: string | null;
    album_cover?: string | null;
    composer?: string | null;
  };
  

const Player = ({ src, title, album_cover, composer }: Props) => {
  return (
    <Card className="flex w-auto overflow-hidden p-2 gap-2 border border-slate-500 items-center backdrop-blur bg-white/20">
      <div className="bg-transparent rounded-md">
        <img
          src={
            album_cover
              ? album_cover
              : "https://plus.unsplash.com/premium_photo-1675855291447-3266ba923327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          }
          className="object-cover rounded-md h-[150px] w-[150px]"
          alt="ai_album_cover"
        />
      </div>

      <CardContent className="flex text-white p-2 flex-col gap-2 justify-between">
        <h1>{title ? title : "Echelon"}</h1>
        <small>{composer ? composer : "Adolf H"}</small>
        <AudioPlayer
          autoPlay
          preload="auto"
          layout="stacked-reverse"
          autoPlayAfterSrcChange={true}
          className="min-w-[250px] text-white p-0 bg-transparent border-0 shadow-none"
          showSkipControls={false}
          showJumpControls={false}
          volume={0.5}
          src={src}
        />
      </CardContent>
    </Card>
  );
};

export default Player;
