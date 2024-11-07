import { useState, useEffect } from "react";
import useTypingStatus from "../../zustand/useTypingStatus";

export default function TypingStatus({ receiverInfo }) {
  const { isTyping } = useTypingStatus();
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);

      return () => clearInterval(interval);
    } else {
      setDots("");
    }
  }, [isTyping]);

  if (!isTyping) return null;

  return (
    <div className=" first-letter: chat chat-start items-center space-x-2 text-gray-500   text-sm animate-fade-in">
      <div className="relative">
        <div className="w-10  !rounded-full bg-gray-200   items-center justify-center">
          <img
            alt={receiverInfo?.fullName}
            className="rounded-full"
            src={`${receiverInfo?.profilePicture}`}
          />
        </div>
      </div>
      <p className=" chat-bubble   leading-6">
        {receiverInfo?.fullName} is typing
        <span className="inline-block w-6" aria-hidden="true">
          {dots}
        </span>
      </p>
    </div>
  );
}
