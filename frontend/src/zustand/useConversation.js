import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useConversation = create(
  devtools(
    (set) => ({
      selectedConversation: null,
      setSelectedConversation: (conversation) =>
        set(
          { selectedConversation: conversation },
          false,
          "setSelectedConversation"
        ),

      messages: [],
      initializeReceiverInfoAndMessages: (initialMessages) => {
        set(
          { messages: initialMessages },
          false,
          "initializeReceiverInfoAndMessages"
        );
      },

      setNewMessage: (newMessage) => {
        set(
          (state) => {
            if (state.messages.length > 0) {
              const updatedConversation = {
                ...state.messages[0],
                message: [...state.messages[0].message, newMessage],
              };
              return { messages: [updatedConversation] };
            }
            return state;
          },
          false,
          "setNewMessage"
        );
      },

      updateMessageSeenStatus: ({ senderId, receiverId }) => {
        set(
          (state) => {
            if (state.messages.length > 0) {
              const updatedConversation = {
                ...state.messages[0],
                message: state.messages[0].message.map((msg) => {
                  if (
                    msg.senderId === senderId &&
                    msg.receiverId === receiverId &&
                    !msg.seen
                  ) {
                    return { ...msg, seen: true };
                  }
                  return msg;
                }),
              };
              return { messages: [updatedConversation] };
            }
            return state;
          },
          false,
          "updateMessageSeenStatus"
        );
      },
    }),
    {
      name: "Conversation Store",
      enabled: true,
    }
  )
);

export default useConversation;
