import useCountStore, { ThreadKeyProps } from "@/zustand/useCounterStore";
import React from "react";
import ThreadColumn from "./ThreadColumn";

const ThreadsContainer = () => {
  const threads = useCountStore((state) => state.threads);

  return (
    <div className="flex gap-4 ">
      {Object.keys(threads).map((item) => (
        <ThreadColumn key={`thread-${item}`} id={+item as ThreadKeyProps} />
      ))}
    </div>
  );
};

export default ThreadsContainer;
