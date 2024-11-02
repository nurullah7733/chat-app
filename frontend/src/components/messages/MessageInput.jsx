import { BsSend } from "react-icons/bs";
import useSendMessageHooks from "../../hooks/useSendMessageHooks";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
  const { selectedConversation } = useConversation();
  const { sendMessageRequest, loading } = useSendMessageHooks();
  const [inputData, setInputData] = useState({
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.message) return;
    sendMessageRequest(inputData, selectedConversation?._id);
    setInputData({ message: "" });
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={inputData.message}
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
