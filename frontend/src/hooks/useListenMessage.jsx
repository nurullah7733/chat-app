import { createContext, useContext, useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustand/useConversation";
import sounds from "/assets/notification.mp3";

const ListenMessageContext = createContext();
export const useListenMessageContext = () => {
  return useContext(ListenMessageContext);
};

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setNewMessage, messages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(sounds);
      sound.play();
      setNewMessage(newMessage);
    });

    return () => socket?.off("newMessage");
  }, [socket, setNewMessage, messages]);
};

export default useListenMessages;
