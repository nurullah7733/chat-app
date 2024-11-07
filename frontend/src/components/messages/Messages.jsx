import useGetMessagesHooks from "../../hooks/useGetMessagesHooks";
import MessageSkeleton from "../skeletons/messageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessage";
import TypingStatus from "./typingStatus";
import { useEffect, useRef } from "react";
import useTypingStatus from "../../zustand/useTypingStatus";

const Messages = () => {
  const { messages, loading = true } = useGetMessagesHooks();
  const { isTyping } = useTypingStatus();
  const messageRef = useRef(null);
  useListenMessages();

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isTyping]);

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
