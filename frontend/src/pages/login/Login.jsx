import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center  bg-purple-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100 min-w-96 py-7">
      <h1 className="text-3xl font-bold pb-3">
        Login
        <span className="text-blue-500 "> ChatApp</span>
      </h1>
      <form>
        <div>
          <label className="label label-text  ">Email</label>
          <input
            className="input w-full h-10 input-bordered text-sm min-w-64"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label className="label label-text">Password</label>
          <input
            className="input w-full h-10 input-bordered text-sm min-w-64"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <Link
          to="/signup"
          className="link text-[12px] hover:text-blue-500 mb-2"
        >
          Not registered yet? Sign Up here
        </Link>
        <div>
          <button className="btn btn-block mt-1 border-slate-700  border  h-8  !min-h-0  ">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
