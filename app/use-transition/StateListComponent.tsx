"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { generateNumbersList } from "./generate-list";
import { Loader2 } from "lucide-react";

const StateListComponent = ({ children }) => {
  const [number, setNumber] = useState(1);

  function updateListHandler() {
    setNumber((prev) => prev + 1);
  }

  return (
    <div className="flex flex-col w-[200px] relative gap-6">
      <div>Number : {number}</div>
      <button
        className="border rounded-md p-3 cursor-pointer hover:bg-blue-100 flex gap-2 w-[120px]  items-center"
        onClick={updateListHandler}
      >
        Update
      </button>
      {children}
    </div>
  );
};

const x = generateNumbersList();

export default StateListComponent;

export const RenderItemsList = () => {
  const [stateList, setStateList] = useState<number[]>(x);

  // startTransition(() => {
  //   setStateList(stateList.map((item) => item * 2));
  //   //   setCloneList(stateList.map((item) => item * 2));
  // });

  return (
    <>
      <div className="flex flex-col gap-2 ">
        {stateList.map((item, index) => (
          <RenderItem key={`list-${index}`}>{index}</RenderItem>
        ))}
      </div>
    </>
  );
};
RenderItemsList.displayName = "RenderItemsList";

export const RenderItem = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    console.count("RENDER ITEM");
    return <span>{children}</span>;
  }
);
RenderItem.displayName = "RenderItem";
