"use client";
import React, { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { Controller, Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { cn } from "@/lib/utils";
import SingleSwiper from "./SingleSwiper";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 300));

const SliderContainer = () => {
  const swiperRef = useRef<SwiperType[]>([]);
  const [indexItems, setIndexItems] = useState({ 0: 0, 1: 0, 2: 0 });

  const PRODUCT_LISTS = useMemo(() => {
    const items = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    return [...items, ...items, ...items, ...items];
  }, []);

  function spinToSlide() {
    // for (let i = 0; i < 3; i++) {
    //   const randomInt = Math.floor(Math.random() * PRODUCT_LISTS.length);
    //   setIndexItems((prev) => {
    //     return { ...prev, [i]: randomInt };
    //   });
    // }
    swiperRef.current.forEach((item, index) => {
      const randomInt = Math.floor(Math.random() * PRODUCT_LISTS.length) + 10;
      const randomSpeed = Math.floor(Math.random() * 2000);
      setTimeout(() => {
        item.slideTo(randomInt, 2000 + randomSpeed);
      }, index * 200);
    });
  }

  function resetPotHandler() {
    swiperRef.current.forEach((item) => {
      item.slideTo(0, 0);
    });
  }

  return (
    <div className="mx-auto max-w-4xl flex gap-4 flex-col">
      {" "}
      <div className="flex gap-2">
        <button className="border p-4" onClick={() => spinToSlide(22)}>
          Start Pot
        </button>
        <button onClick={resetPotHandler}>Reset</button>
      </div>
      <div className="p-8 border-green-500 rounded-2xl flex gap-8 border-2 ">
        {[1, 2, 3].map((container, index) => (
          <SingleSwiper
            key={`single-swiper-container-${container}`}
            products={PRODUCT_LISTS}
            swiperRef={swiperRef.current}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderContainer;
