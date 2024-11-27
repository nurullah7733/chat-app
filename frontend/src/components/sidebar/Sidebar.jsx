import Conversations from "./Conversations";
import LogoutButton from "./LogoutBtn";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="lg:border-r border-slate-500 p-4 flex lg:h-[500px] h-[90vh] flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
