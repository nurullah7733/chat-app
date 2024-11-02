import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessageHooks = () => {
  const [loading, setLoading] = useState(false);
  const { setNewMessage } = useConversation();
  const sendMessageRequest = async (message, id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send-message/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      const data = await res.json();
      if (data?.status === "success") {
        setNewMessage(data?.data);
        toast.success("Message sent successfully");
      }

      if (data?.status === "fail") {
        toast.error("Error sending message, please try again");
      }
      if (data?.error) {
        throw new Error(data?.error);
      }
    } catch (error) {
      toast.error(error?.message || "Error");
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessageRequest };
};

export default useSendMessageHooks;
