import { useAudioPlayerStore, useChatStore } from "../store";
import Message from "../components/ui/message";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { axiosInstance } from "../lib/axios-instance";
import Upload from "../components/upload";
import { Button } from "../components/ui/button";
import win from "../assets/win.png";
import project from "../assets/project-tag.png";

const Chat = () => {
  const { messages, setMessages } = useChatStore();
  const { setCurrentSong } = useAudioPlayerStore();
  const [messageState, setMessageState] = useState({
    text: "",
    isDisabled: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);

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
        const response = await axiosInstance.get("/api/data/song", {
          params: {
            prompt,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
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
  return (
    <div className="flex h-screen flex-col basis-full p-2 md:basis-1/3 ">
      <div className="max-h-screen md:h-screen flex-1 gap-2 relative flex-col overflow-auto rounded-md flex p-5 text-white backdrop-blur-2xl bg-white/10 border border-slate-500/50">
        {" "}
        <div
          className={`flex-col gap-5 font-light bg-indigo-300/50 items-start text-lg  rounded-tl-lg rounded-tr-lg flex p-4 ${"justify-start rounded-br-lg"}`}
        >
          <p>
            Thank you everyone for using our product during the course of
            {' '} <b>Peerlist X Replit GenAI hackathon!.</b> 
          </p>

          <p>
            We got really creative vibes generated by you!
            <br />
            Check them all out at:
            {""}{" "}
            <a href="/radio" className="font-bold">
              Radio
            </a>
          </p>
          <p>
            We're thrilled to announce that all your hard work and creativity
            have paid off, as we've proudly secured among the top positions 🏆
          </p>
          <div className="flex flex-col md:flex-row gap-2 items-start overflow-hidden">
            <a
              href="https://peerlist.io/hackathon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={win} alt="win" className="h-[150px] rounded-sm" />
            </a>
            <a
              href="https://peerlist.io/shank/project/vibestationai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={project} alt="win" className="h-[150px] rounded-sm" />
            </a>
          </div>

          <p>
            However, we regret to inform you that we've temporarily disabled the
            product due to the high cost of generating these vibes 😬. <br /> We
            understand your disappointment, but rest assured, we're committed to
            coming back with even better features in the future!
          </p>
          <p>Cheers🍻 and Adios👋</p>
        </div>
        {/* {isGenerating && (
          <div className="flex gap-5 items-center">
            <Message
              message={{
                text: "Composing your vibe...typically it takes 5 minutes",
                role: "assistant",
              }}
            />
            <span className="loader"></span>
          </div>
        )} */}
      </div>
      <div className="p-5 gap-4  items-center  justify-center  relative flex w-full">
        <div className="w-[350px] md:w-1/4 bg-zinc-700 p-2 rounded-md fixed bottom-4 flex backdrop-blur-lg">
          <Input
            className="bg-transparent text-white"
            value={messageState.text}
            disabled={true}
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
            <Upload
              setIsGenerating={setIsGenerating}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
