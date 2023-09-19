import React from "react";

type Props = {
  message: string;
  role: string;
};

const Message = ({ message, role }: Props) => {
  return (
    <div
      className={` bg-indigo-300/50 items-center  rounded-tl-lg rounded-tr-lg flex p-4 ${
        role === "assistant" ? "justify-start rounded-br-lg" : "justify-end rounded-bl-lg"
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Message;
