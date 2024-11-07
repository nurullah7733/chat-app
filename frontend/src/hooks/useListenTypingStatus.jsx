import { createContext, useContext, useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useTypingStatus from "../zustand/useTypingStatus";

const ListenTypingStatusContext = createContext();

export const useListenTypingStatusContext = () => {
  return useContext(ListenTypingStatusContext);
};

const useListenTypingStatus = () => {
  const { socket } = useSocketContext();
  const { isTyping, setIsTyping } = useTypingStatus();

  useEffect(() => {
    socket?.on("typing", (receiverId) => {
      console.log("typing", receiverId);
      setIsTyping(true);
    });

    socket.on("stopTyping", (receiverId) => {
      console.log("stopTyping", receiverId);
      setIsTyping(false);
    });

    return () => socket?.off("typing");
  }, [socket, isTyping, setIsTyping]);
};

export default useListenTypingStatus;
