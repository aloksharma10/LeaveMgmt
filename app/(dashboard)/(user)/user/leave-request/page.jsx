import { Suspense } from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getLeaveData, leavePolicyCycle } from "@/actions/leaveActions";

import ApplyLeaveForm from "@/components/Dashborad/components/ApplyLeaveForm";
import UserTable from "@/components/Dashborad/components/UserTable";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { columns } from "@/components/Dashborad/components/tableColumn";

const LeaveRequest = async () => {
  const getSession = await getServerSession(authOptions);

  const tableDataPromise = getLeaveData(getSession.user.id,15);
  const leavePolicyPromise = leavePolicyCycle();

  const [tableData, { vacationMonths, earnedCycle, casualCycle }] =
    await Promise.all([tableDataPromise, leavePolicyPromise]);
  return (
    <div className="container xl:flex justify-center space-y-5 xl:space-y-0 xl:space-x-5">
      <div className="flex w-full flex-col space-y-6 lg:max-w-lg ">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-left">
              Request New Leave!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ApplyLeaveForm />
          </CardContent>
          <CardFooter className="justify-evenly hidden lg:flex">
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="secondary" className="font-semibold">
                  Leave deduction policy
                </Button>
              </HoverCardTrigger>
              <HoverCardContent align="top">
                <div className="text-sm">
                  <span className="font-medium">Leave deduction policy</span>
                  <ul className="list-disc pl-5 text-xs">
                    <li>Casual leave deducted first</li>
                    <li>then Earned leave.</li>
                    <li>
                      Vacation leave used only if allowed, prioritized over
                      Casual leave.
                    </li>
                  </ul>
                </div>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="outline">Casual</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm font-medium">
                  Leave resets at every {casualCycle}
                  <span className="text-gray-500 text-xs">/months</span>
                </p>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="outline">Earned</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm font-medium">
                  Leave resets at every {earnedCycle}
                  <span className="text-gray-500 text-xs align-baseline">
                    /months
                  </span>
                </p>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="outline">Vacation</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm font-medium">
                  Leave allowed for{" "}
                  {vacationMonths.map((month) => (
                    <span className="" key={month}>
                      {month},{" "}
                    </span>
                  ))}
                </p>
              </HoverCardContent>
            </HoverCard>
          </CardFooter>
        </Card>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Suspense fallback={<>Loading...</>}>
            <UserTable data={tableData.data} columns={columns} />
          </Suspense>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default LeaveRequest;
