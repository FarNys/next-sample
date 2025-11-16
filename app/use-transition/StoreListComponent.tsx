"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import useListStore from "./useListStore";
import { Loader2 } from "lucide-react";

const StoreListComponent = () => {
  const timeRef = useRef(0);
  const [forceUpdate, setForceUpdate] = useState(false);
  const storeList = useListStore((state) => state.storeList);
  const setStoreList = useListStore((state) => state.setStoreList);

  const [isPending, startTransition] = useTransition();

  function updateListHandler() {
    timeRef.current = performance.now();
    setForceUpdate((prev) => !prev);
    setTimeout(() => {
      // startTransition(() => {
      setStoreList();
      // });
    }, 0);
  }

  useEffect(() => {
    const end = performance.now();
    console.log("Zustand Delta With useEffect:", end - timeRef.current);
  }, [forceUpdate]);

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
        {storeList.map((item, index) => (
          <div key={`store-list-${index}`}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default StoreListComponent;
