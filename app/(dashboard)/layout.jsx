import Sidebar from "@/components/Dashborad/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

export default async function DashboardLayout({ children }) {
  return (
    <div className="md:flex">
      <Sidebar/>
      <div className="w-full min-h-screen lg:px-10 pt-5 lg:pt-3">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
