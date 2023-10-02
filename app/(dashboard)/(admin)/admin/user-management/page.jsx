import React, { Suspense } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignupForm from "@/components/Auth/Signup/SignupForm";
import UserTable from "@/components/Dashborad/components/UserTable";
import {
  AllUsers,
  UserApprovalColumns,
} from "@/components/Dashborad/components/tableColumn";
import { getUserForApproval } from "@/actions/adminLeaveActions";

export const dynamic = "force-dynamic";

const UserManagement = async () => {
  const { approvalUser, allUsers } = await getUserForApproval();

  return (
    <section className="relative container mx-auto space-y-3 px-3">
      <div className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2 max-w-2xl">
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          <CardContent className="">
            <Suspense fallback={<span>Laoding...</span>}>
              <SignupForm />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-2 max-w-2xl">
          <CardHeader>
            <CardTitle>User Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<span>Laoding...</span>}>
              <UserTable
                data={JSON.parse(approvalUser)}
                columns={UserApprovalColumns}
                limitNo={5}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<span>Laoding...</span>}>
            <UserTable
              data={JSON.parse(allUsers)}
              columns={AllUsers}
              limitNo={5}
            />
          </Suspense>
        </CardContent>
      </Card>
    </section>
  );
};

export default UserManagement;
