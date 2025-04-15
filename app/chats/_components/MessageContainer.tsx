import useCountStore, { ThreadKeyProps } from "@/zustand/useCounterStore";
import React from "react";

interface MessageContainerProps {
  id: ThreadKeyProps;
  type: "messages" | "oldMessages";
}

const MessageContainer: React.FC<MessageContainerProps> = ({ id, type }) => {
  const messages = useCountStore((state) => state.threads[id][type]);
  console.log("Render", id, type);
  return messages.map((m, index) => <p key={`message-${index}`}>{m}</p>);
};

export default MessageContainer;
