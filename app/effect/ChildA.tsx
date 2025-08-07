import React, { useEffect, useState } from "react";
import NestedA from "./NestedA";
import NestedB from "./NestedB";

const ChildA = () => {
  const [first, setfirst] = useState(0);
  console.count("ChildA RENDER");
  useEffect(() => {
    console.count("Child A Effect");
    setfirst(1);
  }, []);

  return (
    <div>
      ChildA
      <NestedA />
      <NestedB />
    </div>
  );
};

export default ChildA;
