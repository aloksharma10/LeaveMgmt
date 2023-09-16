import Sidebar from "@/components/Dashborad/Sidebar";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession();
  return (
    <div className="md:flex">
      <Sidebar userSession={session.user.name} />
      {children}
    </div>
  );
}
