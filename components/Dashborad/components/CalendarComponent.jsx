"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarDays, X } from "lucide-react";
import { cn } from "@/lib/utils";
const CalendarComponent = () => {
  const [date, setDate] = React.useState(new Date());
  const [showCalendar, setShowCalendar] = React.useState(false);
  return (
    <article
      className="absolute bottom-12 right-10 lg:right-14"
      onMouseLeave={() => setShowCalendar(false)}
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className={cn(
          "w-72 rounded-md border z-10 mb-5 bg-white shadow-lg",
          showCalendar ? "block" : "hidden"
        )}
        showOutsideDays={false}
      />
      <div
        className="flex justify-end"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <Button
          className={cn(
            "text-lg py-7 px-4 rounded-full shadow-md transition-transform duration-200",
            showCalendar && "rotate-180"
          )}
        >
          {!showCalendar ? (
            <CalendarDays className="w-6 h-6" />
          ) : (
            <X className="w-6 h-6" />
          )}
        </Button>
      </div>
    </article>
  );
};

export default CalendarComponent;
