import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useLogOutHooks = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logOutRequest = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      localStorage.removeItem("authUser");
      setAuthUser(null);

      if (data?.status === "fail") {
        throw new Error(data?.data || "Error");
      }
    } catch (error) {
      toast.error(error?.message || "Error");
    } finally {
      setLoading(false);
    }
  };
  return { loading, logOutRequest };
};

export default useLogOutHooks;
