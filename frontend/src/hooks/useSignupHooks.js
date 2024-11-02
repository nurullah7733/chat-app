import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useSignupHooks = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signupRequest = async ({
    fullName,
    email,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      email,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      if (data?.status === "success") {
        toast.success("Registered successfully!");
        localStorage.setItem("authUser", JSON.stringify(data?.data));
        setAuthUser(data?.data);
      }
      if (data?.status === "fail" && data?.data?.keyPattern?.email === 1) {
        toast.error(data?.data?.keyValue?.email + " already exists");
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
  return { loading, signupRequest };
};

export default useSignupHooks;

function handleInputErrors({
  fullName,
  email,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !email || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
}
