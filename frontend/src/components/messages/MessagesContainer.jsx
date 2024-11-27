import { TiMessages } from "react-icons/ti";
import { IoArrowBack } from "react-icons/io5";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/authContext";
import useIsMessageContainerOpen from "../../zustand/useMessageConteinerIsOpenForMobileView";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();
  const { setIsMessageContainerOpen } = useIsMessageContainerOpen();

  return (
    <div className="md:min-w-[450px] !w-full lg:h-[500px] h-[90vh] flex flex-col">
      {selectedConversation ? (
        <>
          {/* Header */}
          <div className="flex items-center gap-2 bg-slate-500 px-4 py-2 mb-2">
            <p
              onClick={() => setIsMessageContainerOpen(false)}
              className="lg:hidden flex text-lg border rounded-full w-6 h-6 cursor-pointer items-center justify-center"
            >
              <IoArrowBack />
            </p>
            <span className="label-text">To:</span>{" "}
            <span className="font-bold text-white">
              {selectedConversation?.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser?.fullName} 👋 ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
