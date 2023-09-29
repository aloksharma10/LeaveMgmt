"use client";
import { Suspense, useEffect, useState, useCallback } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { leaveReportColumns } from "@/components/Dashborad/components/tableColumn";
import UserTable from "@/components/Dashborad/components/UserTable";

import { useUserProvider } from "@/provider/User/UserProvider";
import DatePickerWithRange from "@/components/Dashborad/components/DatePickerWithRange";

const UserReport = () => {
  const { handleUserMonthlyReport } = useUserProvider();
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
    <main className="container min-h-screen">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Your Leave Report
            <div className="flex space-x-3">
              <DatePickerWithRange date={date} setDate={setDate} />
              <Button className="">Download</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Suspense fallback={<>Loading...</>}>
            <UserTable
              data={tableData.data ? tableData.data : []}
              columns={leaveReportColumns}
            />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
};

export default UserReport;
