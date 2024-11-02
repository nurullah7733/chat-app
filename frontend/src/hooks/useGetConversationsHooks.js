import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversationsHooks = () => {
  const [loading, setLoading] = useState(false);
  const [getConversations, setGetConversations] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/users/get-all-users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data?.status === "success") {
          setGetConversations(data?.data);
        }

        if (data?.status === "fail") {
          throw new Error(data?.data || "Error");
        }
      } catch (error) {
        toast.error(error?.message || "Error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, getConversations };
};

export default useGetConversationsHooks;
