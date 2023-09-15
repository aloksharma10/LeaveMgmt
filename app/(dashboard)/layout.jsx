import Sidebar from "@/components/Dashborad/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="md:flex">
      <Sidebar />
      {children}
    </div>
  );
}
