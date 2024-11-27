import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="flex justify-center items-center h-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
