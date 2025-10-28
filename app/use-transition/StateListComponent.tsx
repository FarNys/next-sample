"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { generateNumbersList } from "./generate-list";
import { Loader2 } from "lucide-react";

const StateListComponent = () => {
  const timeRef = useRef(0);
  const [stateList, setStateList] = useState<number[]>(() =>
    generateNumbersList()
  );
  const [cloneList, setCloneList] = useState<number[]>(generateNumbersList());

  const [isPending, startTransition] = useTransition();
  function updateListHandler() {
    timeRef.current = performance.now();
    startTransition(() => {
      setStateList(stateList.map((item) => item * 2));
      //   setCloneList(stateList.map((item) => item * 2));
    });
  }

  useEffect(() => {
    const firstRenderTime = performance.now();
    console.log("First Render Time", firstRenderTime - timeRef.current);
    // if (!isPending) {
    //   const end = performance.now();
    //   console.log("State Delta:", end - timeRef.current);
    // }
  });

  return (
    <div className="flex flex-col w-[200px] relative">
      <button
        className="border rounded-md p-3 cursor-pointer hover:bg-blue-100 flex gap-2 w-[120px] absolute items-center"
        onClick={updateListHandler}
        disabled={isPending}
      >
        {isPending && <Loader2 className="animate-spin border size-5" />}
        Update
      </button>
      <div className="flex flex-col gap-2 pt-[50px]">
        {stateList.map((item, index) => (
          <RenderItem key={`list-${index}`}>{item}</RenderItem>
        ))}
      </div>
    </div>
  );
};

export default StateListComponent;

const RenderItem = React.memo(({ children }) => {
  return <span>{children}</span>;
});
RenderItem.displayName = "RenderItem";
