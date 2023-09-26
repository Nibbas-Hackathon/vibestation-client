import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { XCircle } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { useAudioPlayerStore } from "../store";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

type SidebarProps = {
  sidebarOpen: boolean;
  handleClose: () => void;
};

const Sidebar = ({ sidebarOpen, handleClose }: SidebarProps) => {
  return (
    <div
      className={`z-10 text-white ${
        sidebarOpen ? "flex absolute -z-10 w-full" : "hidden"
      }  p-5  md:flex border-r border-slate-500/50  flex-col justify-between bg-zinc-800 min-h-screen`}
    >
      <div className="gap-5 flex flex-col items-start">
        <div className="flex w-full justify-between items-center md:hidden">
          <img src={logo} alt="vibestation.ai" className="h-8 rounded-sm" />
          <button onClick={handleClose}>
            <XCircle size="32px" />
          </button>
        </div>
        <div className=" gap-2 hidden md:flex">
          <img src={logo} alt="vibestation.ai" className="h-8 rounded-sm" />
          <h1 className="text-2xl">Vibestation.ai</h1>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/">Home</Link>
          <Link to="/radio">Radio</Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-normal text-sm">
          entry for: <br />
          <a
            href="https://peerlist.io/hackathon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg"
          >
            {" "}
            Peerlist X Replit GenAI Hackathon
          </a>
        </p>
        <div className="font-normal text-sm">
          designed and developed by: <br />
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="text-lg cursor-pointer"> Team Echelon</p>
            </HoverCardTrigger>
            <HoverCardContent className="w-[250px] overflow-hidden border-slate-500/50 mx-0 backdrop-blur-sm bg-indigo-500/50 back">
              <div className="flex justify-between">
                <a
                  href="https://peerlist.io/greddy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Avatar>
                    <AvatarImage src="https://dqy38fnwh4fqs.cloudfront.net/UHKKLG66KBGDE98FJGGQBE98MEK9/hkklg66kbgde98fjggqbe98mek9-profile?v=1695154973612" />
                    <AvatarFallback>GR</AvatarFallback>
                  </Avatar>
                </a>
                <a
                  href="https://peerlist.io/shashankmay6"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Avatar>
                    <AvatarImage src="https://lh3.googleusercontent.com/a/AAcHTtfFMyV0Wze1v5qF1a3eZcLyuqNIQBsoMyG80CBc7VJXMg=s96-c" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                </a>
                <a
                  href="https://peerlist.io/shank"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar>
                    <AvatarImage src="https://lh3.googleusercontent.com/a-/AOh14GiTCtn6QjpOaSz90mCoCjzWKgJgaDpIiLJ8Mo2q=s96-c" />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                </a>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="font-normal text-sm">
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="text-lg cursor-pointer"> Models and APIs Used</p>
            </HoverCardTrigger>
            <HoverCardContent className="border-slate-500/50 w-60 mx-2 backdrop-blur-sm bg-indigo-500/50 back">
              <div className="flex flex-col gap-2 text-white justify-between">
                <a
                  href="https://peerlist.io/shank"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tensorflow Image Model
                </a>
                <a
                  href="https://peerlist.io/shank"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GPT-3.5 Chat Completions
                </a>
                <a href="https://replicate.com/stability-ai/sdxl">
                  stability-ai / sdxl
                </a>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
