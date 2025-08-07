import React, { useEffect, useState } from "react";

const ChildB = () => {
  const [first, setfirst] = useState(0);
  console.count("ChildB RENDER");
  useEffect(() => {
    console.count("Child B Effect");
    // setfirst(1);
  }, []);

  return <div>Child B</div>;
};

export default ChildB;
