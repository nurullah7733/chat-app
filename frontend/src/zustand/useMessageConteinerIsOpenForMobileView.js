import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useIsMessageContainerOpen = create(
  devtools(
    (set) => ({
      isMessageContainerOpen: false,
      setIsMessageContainerOpen: (value) =>
        set(
          {
            isMessageContainerOpen: value,
          },
          false,
          "isMessageContainerOpen"
        ),
    }),
    {
      name: "isMessageContainerOpen Store",
      enabled: true,
    }
  )
);

export default useIsMessageContainerOpen;
