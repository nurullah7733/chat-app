const Gander = () => {
  return (
    <div className="flex gap-5">
      <div className="flex justify-center items-center">
        <label className="text-sm mr-2">Male</label>
        <input
          type="radio"
          name="radio-1"
          className="radio text-sm w-4 h-4"
          defaultChecked
        />
      </div>
      <div className="flex justify-center items-center">
        <label className="text-sm mr-2">Female</label>
        <input type="radio" name="radio-1" className="radio text-sm w-4 h-4" />
      </div>
    </div>
  );
};

export default Gander;
