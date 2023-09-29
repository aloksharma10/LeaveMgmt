import Sidebar from "@/components/Dashborad/Sidebar";
import CalendarComponent from "@/components/Dashborad/components/CalendarComponent";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Dashboard | BCIIT Leave Management Portal",
  description: "We provide leave management portal for BCIIT",
};

export default async function DashboardLayout({ children }) {
  
  return (
    <div className="md:flex relative">
      <div className="hidden xl:block ">
        <Sidebar />
      </div>
      <div className="w-full min-h-screen lg:px-11 pt-28 px-3 ">
        <Navbar navbg={true} />
        {children}
      </div>
      <CalendarComponent />
    </div>
  );
}
