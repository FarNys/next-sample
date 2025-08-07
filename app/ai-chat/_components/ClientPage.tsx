"use client";
import { useState } from "react";

const AiChat = () => {
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setResponseText("");
    setLoading(true);
    const res = await fetch("/api/stream");
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done, ...rest } = await reader!.read();
      if (done) break;
      setResponseText((prev) => prev + decoder.decode(value));
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      <button
        onClick={handleFetch}
        disabled={loading}
        className="border p-4 w-fit"
      >
        {loading ? "Loading..." : "Get Response"}
      </button>
      <div className="border p-4 rounded-lg">
        <pre>{responseText}</pre>
      </div>
    </div>
  );
};

export default AiChat;
