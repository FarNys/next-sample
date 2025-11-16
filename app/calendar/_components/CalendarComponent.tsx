import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useMemo, useRef, useState } from "react";

//INITIAL SETUP WORKS, WHEN WE USE NEXT,PREV IT WILL HIGHTLIGHT LAST DAY OF MONTH(PROBABLY BECAUSE OF firstDayOfMonthDate, IT CAN'T RECOGNIZE CURRENY DAY)

const CalendarComponent = () => {
  const monthRef = useRef(0);
  const [now, setNow] = useState(new Date());

  const year = now.getFullYear();
  const month = now.getMonth();
  const currentDay = now.getDate();
  monthRef.current = month + 1;
  const firstDayOfMonthDate = new Date(year, month + 1, 0);
  const firstDayOfMonth = firstDayOfMonthDate.getDay();
  const daysInMonth = firstDayOfMonthDate.getDate();

  const DAYS_NAME_LIST = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

  const DAYS_IN_MONTH = useMemo(() => {
    const list = [];
    const startIndex =
      firstDayOfMonth > 0 ? 0 - firstDayOfMonth : firstDayOfMonth;
    for (let i = startIndex; i < daysInMonth + 1; i++) {
      const dayIndex = i % 7;
      list.push({
        dayName: DAYS_NAME_LIST[dayIndex],
        dayNumber: i,
      });
    }
    return list;
  }, [now]);

  function nextMonthHandler() {
    monthRef.current = monthRef.current + 1;
    setNow(new Date(year, monthRef.current, 0));
  }

  function prevMonthHandler() {
    monthRef.current = monthRef.current - 1;
    setNow(new Date(year, monthRef.current, 0));
  }

  return (
    <div className="border border-red-500">
      <div className="border rounded-lg shadow-sm p-2 w-fit flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <Button variant={"outline"} size={"sm"} onClick={prevMonthHandler}>
            Prev
          </Button>
          <div className="flex gap-2">
            <span>{month + 1}</span>
            <span>{year}</span>
          </div>
          <Button variant={"outline"} size={"sm"} onClick={nextMonthHandler}>
            Next
          </Button>
        </div>
        <div className="grid grid-cols-7 border gap-1">
          {DAYS_NAME_LIST.map((day) => (
            <div
              className="col-span-1 text-sm w-[40px] text-center"
              key={`day-${day}`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 border gap-1">
          {DAYS_IN_MONTH.map((day, index) => (
            <div
              key={`day-week-${day.dayName}-${index}`}
              className="col-span-1 text-sm w-[40px] text-center"
            >
              {day.dayName && (
                <div
                  className={cn(
                    +currentDay === +day.dayNumber
                      ? "bg-green-500"
                      : "bg-gray-50",
                    "w-full"
                  )}
                >
                  {day.dayNumber}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
