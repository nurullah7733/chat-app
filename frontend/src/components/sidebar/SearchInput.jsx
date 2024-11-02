import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import useGetConversationsHooks from "../../hooks/useGetConversationsHooks";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
const SearchInput = () => {
  const { setSelectedConversation } = useConversation();
  const { getConversations } = useGetConversationsHooks();

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 2) {
      return toast.error("Search term must be at least 2 characters long");
    }

    const conversation = getConversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-between gap-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="input w-full h-10 input-bordered text-sm min-w-64"
        />
        <button className=" btn   min-h-0  h-10  rounded-full btn-circle bg-sky-500 border-none text-white ">
          <IoIosSearch size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
