"use client";
import React, { useEffect, useState } from "react";
import ChildA from "./ChildA";
import ChildB from "./ChildB";

const EffectPage = () => {
  console.count("Parent Render");
  const [first, setfirst] = useState(0);

  useEffect(() => {
    console.count("Parent Effect");
    // setfirst(1);
  }, []);

  return (
    <>
      <ChildA />
      <ChildB />
    </>
  );
};

export default EffectPage;
