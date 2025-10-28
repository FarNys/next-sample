"use client";
import React, { useMemo } from "react";
import VirtualizedSelect from "./_components/VirtualizeSelect";
import { LabelValueProps } from "@/lib/type";

const CHARACTER_LIST = "qwertyuiopasdfghjklzxcvbnm".split("");

const VirtualizePage = () => {
  function selectOptionHandler(payload: LabelValueProps | null) {
    console.log("payload", payload);
  }

  const optionsMemo = useMemo(() => {
    const list: LabelValueProps[] = [];
    for (let i = 0; i < 2000; i++) {
      let value = "";
      for (let j = 0; j < 5; j++) {
        const randomIndex = Math.floor(Math.random() * CHARACTER_LIST.length);
        value = value + CHARACTER_LIST[randomIndex];
      }
      list.push({
        label: value,
        value: value,
      });
    }
    return list;
  }, []);

  return (
    <div className="p-4">
      <h1>Virtualize</h1>
      <div className="w-[250px]">
        <VirtualizedSelect
          options={optionsMemo}
          onSelectOption={selectOptionHandler}
        />
      </div>
    </div>
  );
};

export default VirtualizePage;
