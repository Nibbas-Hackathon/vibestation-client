import { useAudioPlayerStore, useChatStore } from "../store";
import Message from "../components/ui/message";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { axiosInstance } from "../lib/axios-instance";
import Upload from "../components/upload";

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
            />
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
