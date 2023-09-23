import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import SelfieForm from "./selfie-form";
import { useAudioPlayerStore, useChatStore } from "../store";
import { axiosInstance } from "../lib/axios-instance";
import { Camera } from "lucide-react";
import FileUpload from "./ui/file-upload";

type Props = {
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
};

const Upload = ({ isGenerating, setIsGenerating }: Props) => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setMessages, selfieForm } = useChatStore();
  const { setCurrentSong } = useAudioPlayerStore();

  const handleSelfieMode = async () => {
    if (!uploadedImage) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("uploaded-img", uploadedImage, "selfie");
    formData.append("mood", selfieForm.mood);
    formData.append("tempo", selfieForm.tempo);
    formData.append("genre", selfieForm.genre);
    setImageUrl(null);
    setUploadedImage(null);
    setIsModalOpen(false);
    setIsGenerating(true);
    try {
      const response = await axiosInstance.post(
        "api/data/detect_emotion",
        formData
      );
      const song = {
        ...response.data,
        creator: "Vibestation",
      };
      setCurrentSong(song);
      setMessages("Vibe Composed", "assistant", "music", song);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages("Sorry vibe check failed 😔", "assistant", "text");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => setIsModalOpen(!isModalOpen)}
    >
      <DialogTrigger
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
        disabled={isGenerating}
        className="p-2 rounded-md bg-indigo-500 text-white"
      >
        <Camera />
      </DialogTrigger>
      <DialogContent className="h-auto border-none bg-[#270057] text-white font-space">
        <DialogHeader>
          <DialogTitle>Emote Mode</DialogTitle>
          <DialogDescription className="text-md text-slate-300">
            Take a selfie to create a song your emotions
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-center items-center gap-4 py-4">
          {uploadedImage ? (
            <div className="flex flex-col justify-center items-center gap-5">
              <img
                src={imageUrl}
                className="rounded-md border-[5px] h-[200px] w-[200px] border-indigo-400"
                alt="Selfie"
              />
              <SelfieForm />
              <Button
                onClick={handleSelfieMode}
                className="bg-indigo-600 w-full font-normal"
              >
                Generate
              </Button>
            </div>
          ) : (
            <FileUpload
              setImageUrl={setImageUrl}
              setUploadedImage={setUploadedImage}
            />
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsModalOpen(false);
              setImageUrl(null);
              setUploadedImage(null);
            }}
            className="bg-indigo-600 font-normal"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Upload;
