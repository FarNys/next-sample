import React, { useEffect, useState } from "react";

const NestedA = () => {
  const [first, setfirst] = useState(0);
  console.count("Nested AA Render");

  useEffect(() => {
    console.count("Nested AA Effect");
    // setfirst(1);
  }, []);
  return <div>NestedA</div>;
};

export default React.memo(NestedA);
