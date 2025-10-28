"use client";
import React, { useEffect, useRef, useTransition } from "react";
import useListStore from "./useListStore";
import { Loader2 } from "lucide-react";

const StoreListComponent = () => {
  const timeRef = useRef(0);
  const storeList = useListStore((state) => state.storeList);
  const setStoreList = useListStore((state) => state.setStoreList);

  const [isPending, startTransition] = useTransition();

  function updateListHandler() {
    timeRef.current = performance.now();
    startTransition(() => {
      setStoreList();
    });
  }

  useEffect(() => {
    if (!isPending) {
      const end = performance.now();
      console.log("Zustand Delta:", end - timeRef.current);
    }
  }, [isPending]);

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
