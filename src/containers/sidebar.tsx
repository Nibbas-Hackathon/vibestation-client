import React from "react";
import Player from "../components/player";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="z-10 text-white md:flex hidden p-5 flex-0.5  flex-col justify-between bg-zinc-800 min-h-screen">
      <div className="flex flex-col justify-between gap-5">
        <h1 className="text-2xl">Vibestation.ai</h1>
        <Player src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" />
      </div>
    </div>
  );
};

export default Sidebar;
