"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserProvider } from "@/provider/User/UserProvider";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/Auth/SubmitButton";

const ApplyLeaveForm = () => {
  const { handleApplyLeave } = useUserProvider();
  const formRef = React.useRef(null);
  const defaultFromDate = new Date();

  const [date, setDate] = React.useState({
    from: defaultFromDate,
    to: defaultFromDate,
  });

  return (
    <form
    ref={formRef}
      action={async (formData) => {
        await handleApplyLeave(formData, date);
        formRef.current.reset();
      }}
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Sick Leave"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" placeholder="" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="date">Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                className="p-8"
                initialFocus
                disabled={{ before: new Date() }}
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <SubmitButton title={"Submit"} />
      </div>
    </form>
  );
};

export default ApplyLeaveForm;
