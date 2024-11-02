import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useLoginHooks = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const loginRequest = async ({ email, password }) => {
    const success = handleInputErrors({
      email,
      password,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (data?.status === "success") {
        toast.success("Login Successful");
        localStorage.setItem("authUser", JSON.stringify(data?.data));
        setAuthUser(data?.data);
      }
      if (data?.status === "Invalid Credentials") {
        toast.error(data?.data);
      }

      if (data?.status === "fail") {
        toast.error(data?.data);
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
  return { loading, loginRequest };
};

export default useLoginHooks;

function handleInputErrors({ email, password }) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
