import { Link } from "react-router-dom";
import useLoginHooks from "../../hooks/useLoginHooks";
import { useState } from "react";

const Login = () => {
  const { loginRequest, loading } = useLoginHooks();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest(inputData);
  };

  return (
    <div className="flex flex-col justify-center items-center  bg-purple-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100 min-w-96 py-7">
      <h1 className="text-3xl font-bold pb-3">
        Login
        <span className="text-blue-500 "> ChatApp</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label label-text  ">Email</label>
          <input
            className="input w-full h-10 input-bordered text-sm min-w-64"
            type="email"
            placeholder="Email"
            value={inputData.email}
            onChange={(e) =>
              setInputData({ ...inputData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label className="label label-text">Password</label>
          <input
            className="input w-full h-10 input-bordered text-sm min-w-64"
            type="password"
            placeholder="Password"
            value={inputData.password}
            onChange={(e) =>
              setInputData({ ...inputData, password: e.target.value })
            }
          />
        </div>
        <Link
          to="/sign-up"
          className="link text-[12px] hover:text-blue-500 mb-2"
        >
          Not registered yet? Sign Up here
        </Link>
        <div>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-block mt-1 border-slate-700  border  h-8  !min-h-0  "
          >
            {loading ? (
              <span className="loading loading-spinner  text-white"></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
