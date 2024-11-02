// eslint-disable-next-line react/prop-types
const Gender = ({ handleGender, gender }) => {
  return (
    <div className="flex gap-5">
      <div className="flex justify-center items-center">
        <label className="text-sm mr-2">Male</label>
        <input
          type="radio"
          name="radio-1"
          className="radio text-sm w-4 h-4"
          value={"male"}
          checked={gender === "male"}
          onChange={(e) => handleGender(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center">
        <label className="text-sm mr-2">Female</label>
        <input
          type="radio"
          name="radio-1"
          className="radio text-sm w-4 h-4"
          value="female"
          checked={gender === "female"}
          onChange={(e) => handleGender(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Gender;
