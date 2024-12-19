import { createContext, useContext, useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useTypingStatus from "../zustand/useTypingStatus";
import useConversation from "../zustand/useConversation";

const ListenTypingStatusContext = createContext();

export const useListenTypingStatusContext = () => {
  return useContext(ListenTypingStatusContext);
};

const useListenTypingStatus = () => {
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
  const { isTyping, setIsTyping } = useTypingStatus();

  useEffect(() => {
    socket?.on("typing", (senderId) => {
      if (senderId === selectedConversation?._id) {
        setIsTyping(true);
      }
    });

    socket.on("stopTyping", (senderId) => {
      if (senderId === selectedConversation?._id) {
        setIsTyping(false);
      }
    });

    return () => socket?.off("typing");
  }, [socket, isTyping, setIsTyping, selectedConversation?._id]);
};

export default useListenTypingStatus;
