"use client";
import useCountStore from "@/zustand/useCounterStore";
import React from "react";
import ThreadsContainer from "./ThreadsContainer";

const ClientPage = () => {
  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.increment);
  const decrement = useCountStore((state) => state.decrement);

  function increaseHandler() {
    increment(1);
  }
  function decreaseHandler() {
    decrement(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button onClick={increaseHandler}>Increase</button>
        <div>{count}</div>
        <button onClick={decreaseHandler}>Decrease</button>
      </div>
      <div className="flex border p-6 ">
        <ThreadsContainer />
      </div>
    </div>
  );
};

export default ClientPage;
