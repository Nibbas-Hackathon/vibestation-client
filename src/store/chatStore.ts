import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { MusicRecord } from "./playerStore";

interface Message {
  id: string;
  role: string;
  text: string;
  song?: MusicRecord;
}

interface ChatStore {
  selfieForm: Record<any, any>;
  setSelfieForm: (field: string, value: string) => void;
  messages: Message[];
  setMessages: (message: string, role: string, song?: MusicRecord) => void;
}

const sampleConversation = [
  {
    id: uuidv4(),
    role: "assistant",
    text: "Hi!! Welcome to Vibestation! Provide a music prompt to get a vibe",
  },
];

export const useChatStore = create<ChatStore>((set) => ({
  messages: sampleConversation,
  selfieForm: {},
  setSelfieForm: (field, value) => {
    set((state) => ({ selfieForm: { ...state.selfieForm, [field]: value } }));
  },
  setMessages: (message, role, song) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: uuidv4(),
          role,
          text: message,
          song,
        },
      ],
    }));
  },
}));
