import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessageHooks from "../../hooks/useSendMessageHooks";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/socketContext";
import useListenTypingStatus from "../../hooks/useListenTypingStatus";
import useTypingStatus from "../../zustand/useTypingStatus";

const MessageInput = () => {
  useListenTypingStatus();
  const { selectedConversation } = useConversation();
  const { setIsTyping } = useTypingStatus();

  const { sendMessageRequest, loading } = useSendMessageHooks();
  const { socket } = useSocketContext();
  const [inputData, setInputData] = useState({
    message: "",
  });

  const handleTyping = () => {
    if (socket && selectedConversation?._id) {
      socket.emit("typing", selectedConversation?._id);
    }
  };

  const handleStopTyping = () => {
    if (socket && selectedConversation?._id) {
      socket.emit("stopTyping", selectedConversation?._id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
      e.target.blur(); // Remove focus from the input field
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.message) return;
    await sendMessageRequest(inputData, selectedConversation?._id);
    setInputData({ message: "" });
    setIsTyping(false);
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message...."
          value={inputData.message}
          onFocus={handleTyping}
          onBlur={handleStopTyping}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setInputData({ ...inputData, message: e.target.value });
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
