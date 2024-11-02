import io from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io(import.meta.env.VITE_DOMAIN_NAME, {
        query: {
          userId: authUser._id,
        },
      });
      socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });
      setSocket(socket);
      // Clean up function to close the socket connection when authUser changes or component unmounts
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
