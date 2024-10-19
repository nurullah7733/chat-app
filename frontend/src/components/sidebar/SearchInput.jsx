import { IoIosSearch } from "react-icons/io";
const SearchInput = () => {
  return (
    <div className="flex justify-between gap-5">
      <input
        type="text"
        placeholder="Search"
        className="input w-full h-10 input-bordered text-sm min-w-64"
      />
      <button className=" btn   min-h-0  h-10  rounded-full btn-circle bg-sky-500 border-none text-white ">
        <IoIosSearch size={20} />
      </button>
    </div>
  );
};

export default SearchInput;
