"use client";
import Link from "next/link";
import { useState } from "react";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  
  const admin = [
    {
      name: "Home",
      icon: RiMenuUnfoldFill,
      href: "/",
    },
    {
      name: "Mails",
      icon: RiMenuUnfoldFill,
      href: "/mails",
    },
    {
      name: "Products",
      icon: RiMenuUnfoldFill,
      href: "/products",
    },
    {
      name: "Settings",
      icon: RiMenuUnfoldFill,
      href: "/settings",
    },
  ];

  const user = [
    {
      name: "Home",
      icon: RiMenuUnfoldFill,
      href: "/",
    },
    {
      name: "Mails",
      icon: RiMenuUnfoldFill,
      href: "/mails",
    },
    {
      name: "Products",
      icon: RiMenuUnfoldFill,
      href: "/products",
    },
    {
      name: "Settings",
      icon: RiMenuUnfoldFill,
      href: "/settings",
    },
  ];
  const [open, setOpen] = useState(false);
  const routes = pathname.startsWith("/admin") ? admin : user;
  return (
    <>
      <div
        className={`${
          open ? "w-0" : "w-4/6 lg:w-1/4 pt-7 p-3"
        } md:flex flex-col min-h-full max-w-[20rem] bg-gradient-to-br from-gray-900 to-gray-800 shadow-md duration-200 transition-all ease-in-out absolute md:static top-0 left-0 z-30 `}
      >
        <div className={`space-y-3 ${open ? "hidden" : "block"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <button onClick={() => setOpen(!open)}>
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
              {/* </Suspense> */}
            </ul>
          </div>
        </div>
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed top-20 lg:top-6 left-3 lg:left-14 z-30 bg-gray-100 p-2 rounded-md shadow cursor-pointer"
        >
          <RiMenuUnfoldFill className="w-6 h-6 text-black" />
        </div>
      )}
    </>
  );
};

export default Sidebar;
