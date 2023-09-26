import Sidebar from "@/components/Dashborad/Sidebar";
import CalendarComponent from "@/components/Dashborad/components/CalendarComponent";
import Navbar from "@/components/Navbar/Navbar";

export default async function DashboardLayout({ children }) {
  return (
    <div className="md:flex">
      <div className="hidden lg:block ">
        <Sidebar />
      </div>
      <div className="w-full min-h-screen lg:px-10 py-4 px-3 ">
        <Navbar navbg={true} />
        {children}
      </div>
      <CalendarComponent />
    </div>
  );
}
