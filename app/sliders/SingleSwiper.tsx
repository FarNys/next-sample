"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { Controller, Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { cn } from "@/lib/utils";

const SingleSwiper = ({
  products,
  swiperRef,
  index,
}: {
  products: string[];
  swiperRef: SwiperType[];
  index: number;
}) => {
  //   const swiperRef = useRef<SwiperType | null>(null);

  function numberToFixedColor(num: number) {
    const colors = [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#7FFF00",
      "#00FF00",
      "#00FF7F",
      "#00FFFF",
      "#007FFF",
      "#0000FF",
      "#7F00FF",
    ];
    return colors[num] || "#00000000";
  }

  //   useEffect(() => {
  //     if (swiperRef.current) {
  //       swiperRef.current.slideToLoop(spinIndex);
  //     }
  //   }, [spinIndex]);

  return (
    <Swiper
      onBeforeInit={(swiper) => {
        swiperRef[index] = swiper;
      }}
      // speed={2000}
      spaceBetween={20}
      slidesPerView={3}
      loop={true}
      onSwiper={(swiper) => console.log(swiper)}
      navigation={true}
      className="border h-[340px]"
      // modules={[Controller, Navigation]}
      direction="vertical"
    >
      {products.map((item, index) => (
        <SwiperSlide key={`item--sec-${item}-${index}`} className="">
          <div
            className={cn(
              "flex justify-center items-center w-full h-[100px] border px-12"
            )}
            style={{
              backgroundColor: numberToFixedColor(
                index % (products.length / 4)
              ),
            }}
          >
            {item}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SingleSwiper;
