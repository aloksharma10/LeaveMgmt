"use client";
import { Suspense, useEffect, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import DatePickerWithRange from "@/components/Dashborad/components/DatePickerWithRange";
import UserTable from "@/components/Dashborad/components/UserTable";
import { leaveReportColumns } from "@/components/Dashborad/components/tableColumn";

import { Loader2, Mail } from "lucide-react";

import { useUserProvider } from "@/provider/User/UserProvider";

export const dynamic = "force-dynamic";

const LeaveReports = () => {
  const { handleUserMonthlyReport, handleSendReport } = useUserProvider();
  const defaultToDate = new Date();
  const defaultFromDate = new Date(
    defaultToDate.getFullYear(),
    defaultToDate.getMonth(),
    1
  );

  const [tableData, setTableData] = useState([{}]);
  const [date, setDate] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  useEffect(() => {
    async function fetchData() {
      const data = await handleUserMonthlyReport(date);
      setTableData(data);
    }
    fetchData();
  }, [date, handleUserMonthlyReport]);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="md:flex justify-between space-y-3">
        Your Leave Report
          <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 mt-6 md:mt-0">
            <DatePickerWithRange date={date} setDate={setDate} />
            <form action={() => handleSendReport(tableData.data, date)}>
              <SendReportButton />
            </form>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Suspense fallback={<>Loading...</>}>
          <UserTable
            data={tableData.data ? tableData.data : []}
            columns={leaveReportColumns}
            limitNo={10}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default LeaveReports;

export function SendReportButton() {
  const { pending } = useFormStatus();
  const Icon = pending ? Loader2 : Mail;

  return (
    <Button
      className="text-white font-bold rounded disabled:opacity-75 disabled:cursor-not-allowed"
      type="submit"
      disabled={pending}
    >
      Get Report on Mail
      <Icon className={cn("w-5 mx-2", pending && "animate-spin")} />
    </Button>
  );
}
