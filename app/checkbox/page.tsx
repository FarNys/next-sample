"use client";
import React, { useRef } from "react";
import { flushSync } from "react-dom";

const list = "qwertyuiop".split("");

const CheckboxesPage = () => {
  const refs = useRef<Record<number, HTMLInputElement | null>>({});

  function handleClcik(el) {
    console.log("EL", el);
  }

  function selectAllHandler() {
    const items = Object.keys(refs.current);
    items.forEach((item, index) => {
      const ref = refs.current[index];
      if (ref) {
        ref.checked = true;
      }
    });
  }

  console.log("refs", refs.current);

  return (
    <div className="flex flex-col gap-2 p-4">
      <div>
        <button className="p-2 border" onClick={selectAllHandler}>
          Select all
        </button>
      </div>
      {list.map((el, index) => (
        <label
          key={`label-${index}`}
          htmlFor={index.toString()}
          className="border w-[100px] flex gap-2"
        >
          <input
            type="checkbox"
            id={index.toString()}
            defaultChecked={false}
            onChange={(e) => handleClcik(el)}
            ref={(item) => (refs.current[index] = item)}
          />
          {el}
        </label>
      ))}
    </div>
  );
};

export default CheckboxesPage;
