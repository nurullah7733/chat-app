import { createContext, useContext, useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustand/useConversation";
import sounds from "/assets/notification.mp3";
import { useAuthContext } from "../context/authContext";

const ListenMessageContext = createContext();
export const useListenMessageContext = () => {
  return useContext(ListenMessageContext);
};

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();

  const { setNewMessage, messages, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (
        newMessage.senderId === selectedConversation._id &&
        newMessage.receiverId === authUser._id
      ) {
        newMessage.shouldShake = true;
        const sound = new Audio(sounds);
        sound.play();
        setNewMessage(newMessage);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setNewMessage, messages, authUser._id, selectedConversation._id]);
};

export default useListenMessages;
