import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  messages: [],
  initializeReceiverInfoAndMessages: (initialMessages) => {
    set({ messages: initialMessages });
  },
  setNewMessage: (newMessage) => {
    set((state) => {
      if (state.messages.length > 0) {
        const updatedConversation = {
          ...state.messages[0],
          message: [...state.messages[0].message, newMessage],
        };
        return { messages: [updatedConversation] };
      }
      return state;
    });
  },
}));

export default useConversation;
