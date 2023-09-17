import Sidebar from "@/components/Dashborad/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession();
  return (
    <div className="md:flex">
      <Sidebar userSession={session.user.name} />
      <div className="w-full min-h-screen lg:px-10 pt-5 lg:pt-3">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
