const Message = () => {
  return (
    <div className={`chat chat-end`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://placeimg.com/192/192/people"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white  pb-2`}>hellow world</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {" "}
        {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};
export default Message;
