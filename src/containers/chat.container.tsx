import { useAudioPlayerStore, useChatStore } from "../store";
import Message from "../components/message";
import { Input } from "../components/input";
import { useEffect, useState } from "react";
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
import axios from "axios";
import { dataURLtoBlob } from "../lib/utils";

const Chat = () => {
  const { messages, setMessages, selfieForm } = useChatStore();
  const { setCurrentSong } = useAudioPlayerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageState, setMessageState] = useState({
    text: "",
    isDisabled: true,
  });
  const [imageData, setImageData] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCapture = (imageSrc: string) => {
    setImageData(imageSrc);
  };

  const handleMessageInput = async () => {
    if (messageState.text.trim() !== "") {
      setMessageState({
        text: "",
        isDisabled: true,
      });
      setIsGenerating(true);
      setMessages(messageState.text, "user");
      try {
        const response = await axios.get(
          "http://ec2-43-204-212-96.ap-south-1.compute.amazonaws.com:53421/api/data/song",
          {
            params: {
              prompt: messageState.text,
            },
          }
        );
        const song = response.data;
        setCurrentSong(song);
        setMessages("Vibe Composed", "assistant");
        setMessages("", "assistant", song);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessages("Sorry vibe check failed 😔", "assistant");
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleImageInput = async () => {
    if (imageData) {
      setIsModalOpen(false)
      setIsGenerating(true);
      const blob = dataURLtoBlob(imageData);

      try {
        // Create a FormData object and append the image Blob
        const formData = new FormData();
        formData.append("uploaded-image", blob, "captured-image.png");

        // Send the FormData to the server using Axios
        const response = await axios.post(
          "http://ec2-43-204-212-96.ap-south-1.compute.amazonaws.com:53421/api/data/detect_emotion",
          {
            // Include the FormData as the request data
            data: {
              mood: selfieForm.mood,
              tempo: selfieForm.tempo,
              genre: selfieForm.genre,
              ...formData,
            },
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type for file upload
            },
          }
        );

        const song = response.data;
        setCurrentSong(song);
        setMessages("Vibe Composed", "assistant");
        setMessages("", "assistant", song);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessages("Sorry vibe check failed 😔", "assistant");
      } finally {
        setIsGenerating(false);
      }
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
          <Message message={message} key={message.id} />
        ))}
        {isGenerating && (
          <div className="flex gap-5 items-center">
            <Message
              message={{
                text: "Composing your song...typically it takes 2 minutes",
                role: "assistant"
              }}
            />{" "}
            <span className="loader"></span>
          </div>
        )}
      </div>
      <div className="p-5 gap-4  items-center  justify-center  relative flex w-full">
        <div className="w-[350px] md:w-1/4 bg-zinc-700 p-2 rounded-md fixed bottom-4 flex backdrop-blur-lg">
          <Input
            className="bg-transparent text-white"
            value={messageState.text}
            disabled={isGenerating}
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
            <Dialog open={isModalOpen}>
              <DialogTrigger>
                <button
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                    setImageData(null);
                  }}
                  disabled={
                    messageState.text.length > 0 ? true : false || isGenerating
                  }
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
                      <img
                        src={imageData}
                        className="rounded-md border-[5px] border-indigo-400"
                        alt="Selfie"
                      />
                      <SelfieForm />
                      <Button
                        onClick={handleImageInput}
                        className="bg-indigo-600 font-normal"
                      >
                        Generate
                      </Button>
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
