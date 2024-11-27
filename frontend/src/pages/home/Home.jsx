import useWindowSize from "../../../lib/windowResize/useWindowResize";
import MessageContainer from "../../components/messages/MessagesContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useIsMessageContainerOpen from "../../zustand/useMessageConteinerIsOpenForMobileView";

const Home = () => {
  const windowSize = useWindowSize();
  const { isMessageContainerOpen } = useIsMessageContainerOpen();
  return (
    <div className=" lg:flex px-4 bg-purple-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100 lg:min-w-96 min-w-full py-7">
      <div
        className={`${
          isMessageContainerOpen && windowSize.width < 1024 ? "hidden" : "block"
        }`}
      >
        <Sidebar />
      </div>
      <div
        className={`${
          !isMessageContainerOpen && windowSize.width < 1024
            ? "hidden"
            : "block"
        }`}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
