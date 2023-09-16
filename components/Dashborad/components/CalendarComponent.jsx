"use client"
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
const CalendarComponent = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      showOutsideDays={true}
    />
  );

};

export default CalendarComponent;
