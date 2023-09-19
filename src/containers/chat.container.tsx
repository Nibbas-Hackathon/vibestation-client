import { useChatStore } from "../store";
import Message from "../components/message";
import { Input } from "../components/input";
import { useState } from "react";
import { Camera, SendHorizontal } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/dialog";
import { DialogHeader } from "../components/dialog";
import CameraComponent from "../components/camera";
import { Button } from "../components/button";
import SelfieForm from "../components/selfie-form";

const Chat = () => {
  const { messages, setMessages } = useChatStore();
  const [messageState, setMessageState] = useState({
    text: "",
    isDisabled: true,
  });

  const [imageData, setImageData] = useState<string | null>(null);

  const handleCapture = (imageSrc: string) => {
    setImageData(imageSrc);
  };

  const handleUpload = () => {
    if (imageData) {
      console.log(imageData)
    }
  };

  const handleMessageInput = () => {
    if (messageState.text.trim() !== "") {
      setMessages(messageState.text, "user");
      setMessageState({
        text: "",
        isDisabled: true,
      });
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessageState({
      text,
      isDisabled: text.trim() === "",
    });
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !messageState.isDisabled) {
      e.preventDefault();
      handleMessageInput();
    }
  };

  return (
    <div className="flex flex-col basis-full p-2 md:basis-1/3 ">
      <div className="max-h-screen flex-1 gap-2 relative flex-col overflow-auto rounded-md flex p-5 text-white backdrop-blur-2xl bg-white/10 border border-slate-500/50">
        {messages.map((message) => (
          <Message
            message={message.text}
            role={message.role}
            key={message.id}
          />
        ))}
      </div>
      <div className="p-5 gap-4  items-center  justify-center  relative flex w-full">
        <div className="w-[350px] md:w-1/4 bg-zinc-700 p-2 rounded-md fixed bottom-4 flex backdrop-blur-lg">
          <Input
            className="bg-transparent text-white"
            value={messageState.text}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <div className="flex gap-2">
            <button
              disabled={messageState.isDisabled}
              onClick={handleMessageInput}
              className={`p-2 rounded-md ${
                messageState.isDisabled
                  ? "bg-transparent  text-gray-500 cursor-not-allowed"
                  : "bg-indigo-500 text-white"
              }`}
            >
              <SendHorizontal />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  onClick={() => setImageData(null)}
                  disabled={messageState.text.length > 0 ? true : false}
                  className={`p-2 rounded-md ${
                    messageState.text.length > 0
                      ? "bg-transparent  text-gray-500 cursor-not-allowed"
                      : "bg-indigo-500 text-white"
                  }`}
                >
                  <Camera />
                </button>
              </DialogTrigger>
              <DialogContent className="h-auto bg-[#270057] text-white font-space">
                <DialogHeader>
                  <DialogTitle>Emote Mode</DialogTitle>
                  <DialogDescription className="text-md text-slate-300">
                    Take a selfie to create a song your emotions
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 justify-center items-center">
                  {imageData ? (
                    <div className="flex flex-col gap-5">
                      <img src={imageData} className='rounded-md border-[5px] border-indigo-400'  alt="Selfie" />
                      <SelfieForm/>
                      <Button onClick={handleUpload} className="bg-indigo-600 font-normal">Generate</Button>
                    </div>
                  ) : (
                    <CameraComponent onCapture={handleCapture} />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
