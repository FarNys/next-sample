"use client";
import React from "react";
import "swiper/css";
// import "swiper/css/navigation";

import dynamic from "next/dynamic";
const SliderContainer = dynamic(() => import("./SliderContainer"), {
  ssr: false,
});

const SlidersPage = () => {
  return (
    <div className="px-8 flex flex-col gap-4">
      <h1>Sliders</h1>
      <SliderContainer />
    </div>
  );
};

export default SlidersPage;
