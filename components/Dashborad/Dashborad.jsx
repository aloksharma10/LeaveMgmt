import React, { Suspense } from "react";
import LeaveOverView from "@/components/Dashborad/components/LeaveOverView";
import CalendarComponent from "@/components/Dashborad/components/CalendarComponent";
import DataTable from "@/components/Dashborad/components/DataTable";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import {
  getLeaveData,
  getUserAvailableLeave,
  getUserTakenLeaveData,
  leavePolicyCycle,
} from "@/actions/leaveActions";
import { Activity, TimerReset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const getSession = await getServerSession(authOptions);

  const {
    data: { earnedLeave, casualLeave, vacationLeave },
  } = await getUserAvailableLeave(getSession.user.id);

  const {
    vacationCount,
    earnedCount,
    casualCount,
    vacationMonths,
    earnedCycle,
    casualCycle,
  } = await leavePolicyCycle();

  const tableData = await getUserTakenLeaveData(getSession.user.id);

  const leaveData = await getLeaveData(getSession.user.id, 5);
  return (
    <div className="relative container mx-auto space-y-3 px-3">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<span>Laoding...</span>}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Leaves
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Activity className="w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="w-44">
                    <p>Total leave: Earned + Causal + Vacation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>
            <CardContent>
              <div className="justify-center items-baseline">
                <span className="text-3xl font-bold">
                  {earnedLeave + vacationLeave + casualLeave}
                </span>
                <span className="text-gray-500 text-sm">
                  /{earnedCount + vacationCount + casualCount}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Earned Leaves
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <TimerReset className="w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="items-baseline w-44">
                    <p className="text-sm font-medium">
                      Leave resets at every {earnedCycle}
                      <span className="text-gray-500 text-xs">/months</span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>
            <CardContent className="flex">
              <div className="justify-center items-baseline">
                <span className="text-3xl font-bold">{earnedLeave}</span>
                <span className="text-gray-500 text-sm">/{earnedCount}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Casual Leaves
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <TimerReset className="w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="items-baseline w-44">
                    <p className="text-sm font-medium">
                      Leave resets at every {casualCycle}
                      <span className="text-gray-500 text-xs">/months</span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>
            <CardContent>
              <div className="justify-center items-baseline">
                <span className="text-3xl font-bold">{casualLeave}</span>
                <span className="text-gray-500 text-sm">/{casualCount}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vacation Leaves
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <TimerReset className="w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="items-baseline w-44">
                    <p className="text-sm">
                      Leave allowed for{" "}
                      {vacationMonths.map((month) => (
                        <span className="font-medium" key={month}>
                          {month},{" "}
                        </span>
                      ))}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>
            <CardContent>
              <div className="justify-center items-baseline">
                <span className="text-3xl font-bold">{vacationLeave}</span>
                <span className="text-gray-500 text-sm">/{vacationCount}</span>
              </div>
            </CardContent>
          </Card>
        </Suspense>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Leave Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<span>Laoding...</span>}>
              <LeaveOverView leaveData={tableData} />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Recent Updates
              <Link href="/user/reports">
                <Button variant="secondary">View more</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<span>Laoding...</span>}>
              <DataTable tableData={leaveData.data} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
