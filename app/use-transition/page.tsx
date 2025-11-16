"use client";
import { Profiler, useState } from "react";
import StateListComponent, { RenderItemsList } from "./StateListComponent";
import StoreListComponent from "./StoreListComponent";

const TransitionPage = () => {
  const [isShow, setIsShow] = useState(false);

  function onRenderZustand(a, b, c) {
    console.log("Zustand Profiler:", c);
  }

  function onRenderState(a, b, c) {
    console.log("State Profiler:", c);
  }

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
        <div className="border p-4">
          {isShow && (
            <Profiler id="react-state" onRender={onRenderState}>
              <StateListComponent>
                <RenderItemsList />
              </StateListComponent>
            </Profiler>
          )}
        </div>
        <div className="border p-4">
          <Profiler id="zustand" onRender={onRenderZustand}>
            <StoreListComponent />
          </Profiler>
        </div>
      </div>
    </div>
  );
};

export default TransitionPage;
