"use client";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useUserProvider } from "@/provider/User/UserProvider";

import SubmitButton from "@/components/Auth/SubmitButton";
import DatePickerWithRange from "./DatePickerWithRange";
import { getLeavePolicy } from "@/actions/adminLeaveActions";

const LeavePolicyForm = () => {
  const { handleUpdatLeavePolicy } = useUserProvider();

  const currentYear = new Date().getFullYear();
  const defaultToDate = new Date(currentYear, 6, 1);
  const defaultFromDate = new Date(currentYear, 4, 1);

  const [date, setDate] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [leavePolicyData, setLeavePolicyData] = useState({
    vacation_allowedLeaveCount: 0,
    vacation_per_month: 0,
    casual_allowedLeaveCount: 0,
    casual_per_month: 0,
    casual_leaveCycleMonths: 0,
    earned_allowedLeaveCount: 0,
    earned_per_month: 0,
    earned_leaveCycleMonths: 0,
    salaryDeductionRate: 0,
  });

  useEffect(() => {
    async function leavePolicy() {
      const resData = await getLeavePolicy();
      const { casual, vacation, earned, salaryDeductionRate } = JSON.parse(
        resData.data
      );
      setLeavePolicyData({
        vacation_allowedLeaveCount: vacation.allowedLeaveCount,
        vacation_per_month: vacation.perMonth,
        casual_allowedLeaveCount: casual.allowedLeaveCount,
        casual_per_month: casual.perMonth,
        casual_leaveCycleMonths: casual.leaveCycleMonths,
        earned_allowedLeaveCount: earned.allowedLeaveCount,
        earned_per_month: earned.perMonth,
        earned_leaveCycleMonths: earned.leaveCycleMonths,
        salaryDeductionRate,
      });

      const startDate = new Date(currentYear, vacation.allowedMonths[0] - 1, 1);
      const endDate = new Date(
        currentYear,
        vacation.allowedMonths[vacation.allowedMonths.length - 1] - 1,
        1
      );
      setDate({ from: startDate, to: endDate });
    }
    leavePolicy();
  }, [currentYear]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLeavePolicyData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <form
      action={() => {
        handleUpdatLeavePolicy(leavePolicyData, date);
      }}
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="vacation_allowedLeaveCount">
            Total leave (Vacation)
          </Label>
          <Input
            onChange={handleOnChange}
            value={leavePolicyData.vacation_allowedLeaveCount}
            id="vacation_allowedLeaveCount"
            name="vacation_allowedLeaveCount"
            type="number"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="vacation_allowed_months">
            Month allowed (Vacation)
          </Label>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Per Month Leave (Vacation)</Label>
          <Input
            onChange={handleOnChange}
            value={leavePolicyData.vacation_per_month}
            id="vacation_per_month"
            name="vacation_per_month"
            type="number"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="casual_allowedLeaveCount">Total leave (Casual)</Label>
          <Input
            onChange={handleOnChange}
            value={leavePolicyData.casual_allowedLeaveCount}
            id="casual_allowedLeaveCount"
            name="casual_allowedLeaveCount"
            type="number"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="casual_per_month">Per Month (Casual)</Label>
          <Input
            onChange={handleOnChange}
            value={leavePolicyData.casual_per_month}
            id="casual_per_month"
            name="casual_per_month"
            type="number"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="casual_leaveCycleMonths">Leave cycle (Casual)</Label>
          <Input
            onChange={handleOnChange}
            value={leavePolicyData.casual_leaveCycleMonths}
            id="casual_leaveCycleMonths"
            name="casual_leaveCycleMonths"
            type="number"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="Earned_allowedLeaveCount">Total leave (Earned)</Label>
          <Input
            onChange={handleOnChange}
            value={leavePolicyData.earned_allowedLeaveCount}
            id="earned_allowedLeaveCount"
            name="earned_allowedLeaveCount"
            type="number"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="Earned_per_month">Per Month (Earned)</Label>
          <Input
            onChange={handleOnChange}
            value={leavePolicyData.earned_per_month}
            id="earned_per_month"
            name="earned_per_month"
            type="number"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="Earned_leaveCycleMonths">Leave cycle (Earned)</Label>
          <Input
            onChange={handleOnChange}
            value={leavePolicyData.earned_leaveCycleMonths}
            id="earned_leaveCycleMonths"
            name="earned_leaveCycleMonths"
            type="number"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="Earned_leaveCycleMonths">Salary Deduction Rate</Label>
          <Input
            onChange={handleOnChange}
            value={leavePolicyData.salaryDeductionRate}
            id="salaryDeductionRate"
            name="salaryDeductionRate"
            type="number"
          />
        </div>
        <div className="flex justify-items-end items-center w-1/3 space-x-2 mt-2">
          <Button variant="secondary" className="w-4/5" type="button">
            Reset
          </Button>
          <SubmitButton title={"Update"} />
        </div>
      </div>
    </form>
  );
};

export default LeavePolicyForm;
