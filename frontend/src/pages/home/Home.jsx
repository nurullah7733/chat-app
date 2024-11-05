import MessageContainer from "../../components/messages/MessagesContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex  px-4  bg-purple-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100 min-w-96 py-7">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
