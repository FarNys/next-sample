"use client";
import { useState } from "react";
import StateListComponent from "./StateListComponent";
import StoreListComponent from "./StoreListComponent";

const TransitionPage = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="px-10">
        <button
          className="border p-2 px-6 cursor-pointer"
          onClick={() => setIsShow((prev) => !prev)}
        >
          Show
        </button>
      </div>
      <div className="flex gap-4">
        <div className="border p-4">{isShow && <StateListComponent />}</div>
        <div className="border p-4">{/* <StoreListComponent /> */}</div>
      </div>
    </div>
  );
};

export default TransitionPage;
