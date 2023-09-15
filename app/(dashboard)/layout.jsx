import Sidebar from "@/components/Dashborad/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="md:grid grid-cols-10">
      <Sidebar />
      {children}
    </div>
  );
}
