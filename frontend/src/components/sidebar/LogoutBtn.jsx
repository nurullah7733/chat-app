import { BiLogOut } from "react-icons/bi";
import useLogOutHooks from "../../hooks/useLogOutHooks";

const LogoutButton = () => {
  const { loading, logOutRequest } = useLogOutHooks();
  return (
    <div className="mt-auto" onClick={logOutRequest}>
      {loading ? (
        <span className="loading loading-spinner  text-white"></span>
      ) : (
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
      )}
    </div>
  );
};
export default LogoutButton;
