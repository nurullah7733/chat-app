import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useTypingStatus = create(
  devtools(
    (set) => ({
      isTyping: false,
      setIsTyping: (value) =>
        set(
          {
            isTyping: value,
          },
          false,
          "setIsTyping"
        ),
    }),
    {
      name: "TypingStatus Store",
      enabled: true,
    }
  )
);

export default useTypingStatus;
