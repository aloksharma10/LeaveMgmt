import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getLeaveData } from "@/actions/leaveActions";

import ApplyLeaveForm from "@/components/Dashborad/components/ApplyLeaveForm";
import UserTable from "@/components/Dashborad/components/UserTable";
import { Suspense } from "react";

const LeaveRequest = async () => {
  const getSession = await getServerSession(authOptions);

  const tableData = await getLeaveData(getSession.user.id);
  console.log(tableData);
  const data = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
  ];

  return (
    <div className="lg:p-8 lg:flex justify-evenly">
      <div className="flex w-full flex-col justify-center space-y-6 lg:max-w-lg ">
        <ApplyLeaveForm />
      </div>
      <div className="w-2/5">
        <Suspense
          fallback={
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          }
        >
          <UserTable data={tableData.data} />
        </Suspense>
      </div>
    </div>
  );
};

export default LeaveRequest;
