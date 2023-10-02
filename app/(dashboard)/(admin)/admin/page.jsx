import React, { Suspense } from "react";
import Link from "next/link";

import LineChartComponent from "@/components/Dashborad/components/LineChartComponent";
import RecentUpdatesTable from "@/components/Dashborad/components/RecentUpdatesTable";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getAdminUserLeaveData,
  getRecentUpdates,
  getUsersByLeaveCriteria,
} from "@/actions/adminLeaveActions";

export default async function Dashboard() {
  const [getUserLeaveCriteria, userOverviewData, userRecentLeaveData] =
    await Promise.all([
      getUsersByLeaveCriteria(),
      getAdminUserLeaveData(),
      getRecentUpdates(),
    ]);

  const {
    usersOnLeaveLastMonth,
    usersMoreThan3DaysLeave,
    usersMoreThan5DaysLeave,
    usersCurrentlyOnLeave,
  } = getUserLeaveCriteria;
 
  return (
    <div className="relative container mx-auto space-y-3 px-3">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<span>Laoding...</span>}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Employee on leave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="justify-center items-baseline">
                <span className="text-3xl font-bold">
                  {usersCurrentlyOnLeave.length}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Employee exceeding 3 days
              </CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div className="justify-center items-baseline">
                <span className="text-3xl font-bold">
                  {usersMoreThan3DaysLeave.length}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Employee exceeding 5 days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="justify-center items-baseline">
                <span className="text-3xl font-bold">
                  {usersMoreThan5DaysLeave.length}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="justify-center items-baseline">
                <span className="text-3xl font-bold">
                  {usersOnLeaveLastMonth.length}
                </span>
              </div>
            </CardContent>
          </Card>
        </Suspense>
      </div>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-10">
        <Card className="col-span-5 max-w-3xl">
          <CardHeader>
            <CardTitle>Employee Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<span>Laoding...</span>}>
              <LineChartComponent userOverview={userOverviewData.data?userOverviewData.data:[]} />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-5 max-w-2xl">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Recent Updates
              <Link href="/admin/reports">
                <Button variant="secondary">View more</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<span>Laoding...</span>}>
              <RecentUpdatesTable tableData={userRecentLeaveData.data?userRecentLeaveData.data:[]} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
