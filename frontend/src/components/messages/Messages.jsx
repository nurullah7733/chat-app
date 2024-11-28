import useGetMessagesHooks from "../../hooks/useGetMessagesHooks";
import MessageSkeleton from "../skeletons/messageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessage";
import TypingStatus from "./typingStatus";
import { useEffect, useRef } from "react";
import useTypingStatus from "../../zustand/useTypingStatus";
import { useSocketContext } from "../../context/socketContext";
import { useAuthContext } from "../../context/authContext";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { messages, loading = true } = useGetMessagesHooks();
  const { isTyping } = useTypingStatus();
  const messageRef = useRef(null);
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const { updateMessageSeenStatus } = useConversation();
  useListenMessages();

  // scroll to bottom
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isTyping]);

  // message seen
  useEffect(() => {
    messages?.[0]?.message?.forEach((message) => {
      if (message?.seen === false) {
        socket.emit("messagesSeen", {
          senderId: message.senderId,
          receiverId: authUser?._id,
        });
      }
    });
  }, [messages, socket, authUser]);

  // seen status message listen update
  useEffect(() => {
    const messageSeenHandler = ({ senderId, receiverId }) => {
      updateMessageSeenStatus({ senderId, receiverId });
    };

    socket.on("messagesSeen", messageSeenHandler);

    return () => {
      socket.off("messagesSeen", messageSeenHandler);
    };
  }, [socket, updateMessageSeenStatus]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && <MessageSkeleton />}
      {!loading && messages?.length === 0 && (
        <p className="text-center">Send message to start conversation</p>
      )}
      {!loading &&
        messages?.length > 0 &&
        messages?.[0]?.message?.map((message) => (
          <Message
            key={message?._id}
            message={message}
            receiverInfo={messages?.[0]?.receiverInfo?.[0]}
          />
        ))}
      {/* typing components*/}
      <div ref={messageRef}>
        <TypingStatus receiverInfo={messages?.[0]?.receiverInfo?.[0]} />
      </div>
    </div>
  );
};
export default Messages;
