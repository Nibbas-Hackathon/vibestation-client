import React from "react";

const Sidebar = () => {
  return (
    <div className="z-10 text-white hidden p-5  md:flex  flex-col justify-between bg-zinc-800 min-h-screen">
      <h1 className="text-2xl">Vibestation.ai</h1>
      <div className="flex flex-col gap-2">
        <p className="font-normal">entry for: <br /> Peerlist X Replit GenAI Hackathon</p>
      </div>
    </div>
  );
};

export default Sidebar;
