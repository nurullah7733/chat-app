import useGetConversationsHooks from "../../hooks/useGetConversationsHooks";
import Conversation from "./Conversation";

const Conversations = () => {
  const { getConversations, loading } = useGetConversationsHooks();

  return (
    <div className="py-2 flex flex-col !overflow-auto">
      {loading ? (
        <span className="loading loading-spinner  text-white"></span>
      ) : (
        getConversations?.map((conversation, index) => (
          <Conversation
            key={index}
            conversation={conversation}
            lastIndex={index !== getConversations.length - 1}
          />
        ))
      )}
    </div>
  );
};
export default Conversations;
