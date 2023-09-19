import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  role: string;
  text: string;
}

interface ChatStore {
  messages: Message[];
  setMessages: (message: string, role: string) => void;
}

const sampleConversation = [
  {
    id: uuidv4(),
    role: "assistant",
    text: "Hi!! Welcome to Vibestation!",
  },
];

export const useChatStore = create<ChatStore>((set) => ({
  messages: sampleConversation,
  setMessages: (message, role) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: uuidv4(),
          role,
          text: message,
        },
      ],
    }));
  },
}));
