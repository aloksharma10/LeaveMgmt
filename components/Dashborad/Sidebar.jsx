"use client";
import Link from "next/link";
import { useState } from "react";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, GanttChartSquare, Home, MessageCircle, Settings } from "lucide-react";

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
      href: "/leave-request",
    },
    {
      name: "Report",
      icon: BarChart3,
      href: "/reports",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/profile",
    },
  ];
  const [open, setOpen] = useState(false);
  const routes = pathname.startsWith("/admin") ? admin : user;
  const href = routes.find((route) => route.href)?.href;
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);
  return (
    <>
      <div
        className={cn("md:flex flex-col min-h-full bg-gradient-to-br from-gray-900 to-gray-800 shadow-md duration-200 transition-all ease-in-out", 
          open ? "w-0" : "lg:w-[17vw] pt-7 px-3"
        )}
      >
        <div className={`space-y-3 ${open ? "hidden" : "block"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <button onClick={() => setOpen(!open)} className="hidden lg:block">
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
            </button>
          </div>
          <div className="flex-1 justify-between">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {routes.map((link, index) => (
                  <li className="rounded-sm" key={index}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="flex items-center p-2 space-x-3 rounded-md"
                      >
                        <link.icon className="w-6 h-6 text-gray-100" />
                        <span className="text-gray-100">{link.name}</span>
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
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed hidden lg:block lg:top-8 left-3 lg:left-14 z-30 bg-gray-100 p-2 rounded-md shadow cursor-pointer"
        >
          <RiMenuUnfoldFill className="w-6 h-6 text-black" />
        </div>
      )}
    </>
  );
};

export default Sidebar;
