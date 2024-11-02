import { useSocketContext } from "../../context/socketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ lastIndex, conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const online = onlineUsers?.find((user) => user === conversation?._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          selectedConversation?._id === conversation?._id ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${online ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation?.profilePicture} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation?.fullName}</p>
          </div>
        </div>
      </div>

      {lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
