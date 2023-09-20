import React from "react";
import { useAudioPlayerStore } from "../store";

type Props = {
  message: Record<any, any>;
};

const Message = ({ message }: Props) => {
  const { setCurrentSong } = useAudioPlayerStore();

  return (
    <div
      className={`cursor-pointer hover:border-white hover:border-1 bg-indigo-300/50 items-center  rounded-tl-lg rounded-tr-lg flex p-4 ${
        message.role === "assistant"
          ? "justify-start rounded-br-lg"
          : "justify-end rounded-bl-lg"
      }`}
    >
      <p>{message.text}</p>
      {message.song && (
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => setCurrentSong(message.song)}
        >
            <img
              src={
                message.song.coverUrl
                  ? message.song.coverUrl
                  : "https://pbxt.replicate.delivery/5SlkISV9wqIJCNFr9taaRB3sWqULUrRx9aosfL9ofrmuo4lRA/out-0.png"
              }
              className="object-cover rounded-md h-[100px]"
              alt="ai_album_cover"
            />
        </div>
      )}
    </div>
  );
};

export default Message;
