import useCountStore, { ThreadKeyProps } from "@/zustand/useCounterStore";
import React from "react";
import MessageContainer from "./MessageContainer";

interface ThreadColumnProps {
  id: ThreadKeyProps;
}

const ThreadColumn: React.FC<ThreadColumnProps> = ({ id }) => {
  const name = useCountStore((state) => state.threads[id].name);
  const setUpdateThread = useCountStore((state) => state.setUpdateThread);

  function addMessageHandler(threadId: ThreadKeyProps) {
    setUpdateThread(threadId, Math.random().toString());
  }

  //   console.log("Thread Render =====", id);

  return (
    <div className="flex flex-col gap-2 border p-4">
      <h3 className="font-semibold">{name}</h3>
      <MessageContainer id={id} type="messages" />
      <MessageContainer id={id} type="oldMessages" />

      <button onClick={() => addMessageHandler(id)}>Add Message</button>
    </div>
  );
};

export default React.memo(ThreadColumn);
