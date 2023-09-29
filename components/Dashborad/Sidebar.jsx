"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  ChevronRight,
  GanttChartSquare,
  Home,
  MessageCircle,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const admin = [
    {
      name: "Home",
      icon: Home,
      href: "/admin",
    },
    {
      name: "User Leave Request",
      icon: GanttChartSquare,
      href: "/admin/leave-request",
    },
    {
      name: "Leave Report",
      icon: BarChart3,
      href: "/admin/reports",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/admin/profile",
    },
  ];

  const user = [
    {
      name: "Home",
      icon: Home,
      href: "/user",
    },
    {
      name: "Leave Request",
      icon: MessageCircle,
      href: "/user/leave-request",
    },
    {
      name: "Report",
      icon: BarChart3,
      href: "/user/reports",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/user/profile",
    },
  ];
  const routes = pathname.startsWith("/admin") ? admin : user;

  return (
    <>
      <div
        className={cn(
          "md:flex flex-col min-h-full bg-gradient-to-br from-gray-900 to-gray-800 shadow-md duration-200 transition-all ease-in-out",
          open ? "w-0" : "lg:w-full xl:w-[19vw] pt-7 px-3"
        )}
      >
        <div className={`space-y-3 fixed`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            {/* <button onClick={() => setOpen(!open)} className="hidden lg:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button> */}
          </div>
          <div className="flex-1 justify-between">
            <ul className="pt-2 pb-4 space-y-1 text-sm w-64 xl:w-80">
              {routes.map((link, index) => (
                <li className="rounded-sm" key={index}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="flex justify-between p-2 rounded-md"
                    >
                      <span className="text-gray-100 text-right flex items-center">
                        <link.icon className="w-6 h-6 mr-3 text-gray-100" />
                        {link.name}
                      </span>
                      
                      <ChevronRight className={cn("", link.href === pathname ? "text-white": "invisible")} />
                    </Link>
                  ) : (
                    <div
                      onClick={link.onclick}
                      className="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
                    >
                      <link.icon className="w-6 h-6 text-gray-100" />
                      <span className="text-gray-100">{link.name}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
