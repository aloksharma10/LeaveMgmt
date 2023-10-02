import { getUserForLeaveApproval } from "@/actions/adminLeaveActions";
import LeavePolicyForm from "@/components/Dashborad/components/LeavePolicyForm";
import UserTable from "@/components/Dashborad/components/UserTable";
import { UserleaveApprovalColumns } from "@/components/Dashborad/components/tableColumn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Suspense } from "react";

export const dynamic = "force-dynamic";

const LeavesPage = async () => {
  const approvalUser = await getUserForLeaveApproval();

  return (
    <section className="relative container mx-auto space-y-3 px-3">
      <div className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-6">
        <Card className="col-span-2 max-w-2xl">
          <CardHeader>
            <CardTitle>Leave Policy</CardTitle>
          </CardHeader>
          <CardContent className="">
            <Suspense fallback={<span>Laoding...</span>}>
              <LeavePolicyForm />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-4 max-w-5xl">
          <CardHeader>
            <CardTitle>Leave Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<span>Laoding...</span>}>
              <UserTable
                data={approvalUser.data ? JSON.parse(approvalUser.data) : []}
                columns={UserleaveApprovalColumns}
                limitNo={10}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LeavesPage;
