import React, { useEffect, useState } from "react";

const NestedB = () => {
  const [first, setfirst] = useState(0);
  console.count("Nested AB Render");

  useEffect(() => {
    console.count("Nested AB Effect");
    // setfirst(1);
  }, []);
  return <div>NestedB</div>;
};

export default React.memo(NestedB);
