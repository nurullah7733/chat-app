import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessagesHooks = () => {
  const [loading, setLoading] = useState(false);
  const { messages, initializeReceiverInfoAndMessages, selectedConversation } =
    useConversation();

  useEffect(() => {
    (async () => {
      if (!selectedConversation) return;
      try {
        const res = await fetch(
          `/api/messages/get-all-message/${selectedConversation?._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();
        if (data?.status === "success" && data?.data) {
          initializeReceiverInfoAndMessages(data.data);
        } else {
          initializeReceiverInfoAndMessages([]);
        }

        if (data?.status === "fail") {
          throw new Error(data?.data || "Error");
        }
      } catch (error) {
        throw new Error(error || "Error");
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedConversation, initializeReceiverInfoAndMessages]);

  return { loading, messages };
};

export default useGetMessagesHooks;
