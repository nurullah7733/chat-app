import moment from "moment";
import { useAuthContext } from "../../context/authContext";
import { useEffect, useRef } from "react";

const Message = ({ message, receiverInfo }) => {
  const messageRef = useRef(null);
  const { authUser } = useAuthContext();

  const fromMe = authUser?._id === message?.senderId;
  const shakeClass = message.shouldShake ? "shake" : "";

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={`chat mb-1 ${fromMe ? "chat-end" : "chat-start "}`}>
      <div className={`chat-image avatar `}>
        <div className="w-10 rounded-full">
          <img
            alt={authUser?.fullName}
            src={
              fromMe ? authUser?.profilePicture : receiverInfo?.profilePicture
            }
          />
        </div>
      </div>

      <div
        ref={messageRef}
        className={`chat-bubble text-white  pb-2 ${
          fromMe ? "bg-sky-500" : ""
        }  ${shakeClass}`}
      >
        {message?.message}
      </div>

      <div className="chat-footer opacity-70 text-xs flex  gap-3 items-center">
        <p>{moment(message?.createdAt).fromNow()}</p>
        {fromMe && (
          <p className="mr-5 text-green-600 font-extrabold">
            {message?.seen ? "Seen" : "Delivered"}
          </p>
        )}
      </div>
    </div>
  );
};
export default Message;
