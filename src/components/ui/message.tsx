import React from "react";
import { useAudioPlayerStore } from "../../store";
import { truncateText } from "../../lib/utils";

type MessageProps = {
  message: Record<any, any>;
};

const Message = ({ message }: MessageProps) => {
  return (
    <React.Fragment>
      {message.type === "music" ? (
        <MusicMessage message={message} />
      ) : (
        <TextMessage message={message} />
      )}
    </React.Fragment>
  );
};

const TextMessage = ({ message }: MessageProps) => {
  return (
    <div
      className={` bg-indigo-300/50 items-center  rounded-tl-lg rounded-tr-lg flex p-4 ${
        message.role === "assistant"
          ? "justify-start rounded-br-lg"
          : "justify-end rounded-bl-lg"
      }`}
    >
      <p>{message.text}</p>
    </div>
  );
};

const MusicMessage = ({ message }: MessageProps) => {
  const { setCurrentSong } = useAudioPlayerStore();

  console.log(message)
  return (
    <div
      className="hover:border-slate-100/50 hover:border hover:shadow-md bg-indigo-300/50 items-center cursor-pointer gap-5 rounded-md flex p-4 transition-all duration-300 ease-in-out"
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
      <div className="flex flex-col gap-2 items-start text-white">
      <h1 className="text-xl">{message.song.title.length > 0 ? truncateText(message.song.title, 50) : ""}</h1>
        <small>{message.song.creator}</small>
      </div>
    </div>
  );
};
export default Message;
