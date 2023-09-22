import { useAudioPlayerStore, useChatStore } from "../store";
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
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState<any>(null);
  // const handleCapture = (imageSrc: string) => {
  //   setImageData(imageSrc);
  // };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setUploadedImage(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageUrl(e.target!.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleMessageInput = async () => {
    if (messageState.text.trim() !== "") {
      let prompt = messageState.text;
      setIsGenerating(true);
      setMessages(messageState.text, "user", "text");
      setMessageState({
        text: "",
        isDisabled: true,
      });
      try {
        const response = await axios.get(
          "https://ec2-43-204-212-96.ap-south-1.compute.amazonaws.com:53421/api/data/song",
          {
            params: {
              prompt,
            },
          }
        );
        const song = {
          ...response.data,
          title: prompt,
          creator: "Echelon",
        };
        setCurrentSong(song);
        setMessages("Vibe Composed", "assistant", "music", song);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessages("Sorry vibe check failed 😔", "assistant", "text");
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

  const handleSelfieMode = async () => {
    if (!uploadedImage) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("uploaded-img", uploadedImage, `selfie.`);
    formData.append("mood", selfieForm.mood);
    formData.append("tempo", selfieForm.tempo);
    formData.append("genre", selfieForm.genre);

    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    setIsModalOpen(false);
    setIsGenerating(true);
    try {
      const response = await axios.post(
        "https://ec2-43-204-212-96.ap-south-1.compute.amazonaws.com:53421/api/data/detect_emotion",
        formData
      );
      const song = {
        ...response.data,
        creator: "Echelon",
      };
      setCurrentSong(song);
      setMessages("Vibe Composed", "assistant", "music", song);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages("Sorry vibe check failed 😔", "assistant", "text");
    }
  };

  return (
    <div className="flex h-screen flex-col basis-full p-2 md:basis-1/3 ">
      <div className="max-h-screen md:h-screen flex-1 gap-2 relative flex-col overflow-auto rounded-md flex p-5 text-white backdrop-blur-2xl bg-white/10 border border-slate-500/50">
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
        {isGenerating && (
          <div className="flex gap-5 items-center">
            <Message
              message={{
                text: "Composing your song...typically it takes 5 minutes",
                role: "assistant",
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
            <Dialog
              open={isModalOpen}
              onOpenChange={() => setIsModalOpen(!isModalOpen)}
            >
              <DialogTrigger
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                  setImageData(null);
                }}
                disabled={
                  messageState.text.length > 0 ? true : false || isGenerating
                }
                className="p-2 rounded-md bg-indigo-500   cursor-not-allowed text-white"
              >
                <Camera />
              </DialogTrigger>
              <DialogContent className="h-auto bg-[#270057] text-white font-space">
                <DialogHeader>
                  <DialogTitle>Emote Mode</DialogTitle>
                  <DialogDescription className="text-md text-slate-300">
                    Take a selfie to create a song your emotions
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 justify-center items-center">
                 
                  {uploadedImage ? (
                    <div className="flex flex-col gap-5">
                      <img
                        src={imageUrl}
                        className="rounded-md border-[5px] border-indigo-400"
                        alt="Selfie"
                      />
                      <SelfieForm />
                      <Button
                        onClick={handleSelfieMode}
                        className="bg-indigo-600 font-normal"
                      >
                        Generate
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {/* <CameraComponent onCapture={handleCapture} />
                      <hr /> */}
                      <input type="file" onChange={handleFileChange} />

                      {/* <Button
                        className="bg-indigo-900"
                        onChange={handleFileChange}
                      >
                        Upload a Selfie
                      </Button> */}
                    </div>
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
