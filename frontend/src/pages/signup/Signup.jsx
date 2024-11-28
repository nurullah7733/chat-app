import { Link } from "react-router-dom";
import Gender from "./Gender";
import { useState } from "react";
import useSignupHooks from "../../hooks/useSignupHooks";
const Signup = () => {
  const { signupRequest, loading } = useSignupHooks();
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleGender = (gender) => {
    setInputData({ ...inputData, gender });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupRequest(inputData);
  };

  return (
    <div className="flex flex-col justify-center items-center  bg-purple-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100 lg:min-w-96 min-w-full py-7">
      <h1 className="text-3xl font-bold pb-3">
        Signup
        <span className="text-blue-500 "> ChatApp</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label label-text  ">Full Name</label>
          <input
            className="input w-full h-10 input-bordered text-sm min-w-64"
            type="text"
            placeholder="Full Name"
            value={inputData.fullName}
            onChange={(e) =>
              setInputData({ ...inputData, fullName: e.target.value })
            }
          />
        </div>
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
        <div>
          <label className="label label-text">Confirm Password</label>
          <input
            className="input w-full h-10 input-bordered text-sm min-w-64"
            type="password"
            placeholder="Confirm Password"
            value={inputData.confirmPassword}
            onChange={(e) =>
              setInputData({ ...inputData, confirmPassword: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <Gender handleGender={handleGender} gender={inputData.gender} />
        </div>
        <Link to="/login" className="link text-[12px] hover:text-blue-500 mb-2">
          Already registered? Login here
        </Link>
        <div>
          <button
            disabled={loading}
            className="btn btn-block mt-1 border-slate-700  border  h-8  !min-h-0  "
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Signup"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
