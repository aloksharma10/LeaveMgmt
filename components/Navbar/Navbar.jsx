"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PiBell, PiUser } from "react-icons/pi";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { BiMessageAlt } from "react-icons/bi";
import { AiOutlineLogin } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import { useUserProvider } from "@/provider/User/UserProvider";

function Navbar() {
  const pathname = usePathname();
  const { user, handleSignOut } = useUserProvider();
  const [userDropdown, setUserDropdown] = useState(false);
  const [notifyDropdown, setNotifyDropdown] = useState(false);

  useEffect(() => {
    setUserDropdown(false);
    setNotifyDropdown(false);
  }, [pathname]);

  return (
    <nav className="w-full rounded-xl z-20 py-4 shadow-lg sticky top-0 backdrop-blur-md bg-white/40">
      <div className="flex items-center justify-between px-4 md:container">
        <div className="flex items-center cursor-pointer text-md font-bold">
          <Logo size={30} />
          Leave Management
        </div>
        <ul className="flex space-x-2 items-center">
          {user.name ? (
            <>
              <li className="text-lg relative font-semibold hover:text-black rounded-md">
                <div
                  className="mx-2 relative cursor-pointer"
                  onClick={() => setNotifyDropdown(!notifyDropdown)}
                >
                  <PiBell className="text-2xl" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 text-sm rounded-full bg-slate-600 text-white flex justify-center items-center items cursor-pointer">
                    <span>1</span>
                  </span>
                </div>
                <ul
                  className={`absolute mt-0 right-0 w-60 py-2 rounded-lg shadow-xl  bg-white ${
                    notifyDropdown ? "block" : "hidden"
                  }`}
                >
                  <li className="flex w-full cursor-pointer  items-center px-3 py-2 text-sm hover:bg-gray-100">
                    <BiMessageAlt className="text-lg mx-1" />
                    <span className="mx-2 ">Notification Message</span>
                  </li>
                </ul>
              </li>
              <li className="text-lg font-semibold hover:text-black rounded-md">
                <div
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="relative"
                >
                  <div className="flex items-center">
                    <PiUser className="text-2xl" />
                    <span className="text-md ">{user.name}</span>
                    <FiChevronDown
                      className={` ${
                        userDropdown ? "rotate-180" : ""
                      } transition duration-150 ease-out hover:ease-in`}
                    />
                  </div>
                  <ul
                    className={`absolute mt-0 right-0 w-40 py-2 rounded-lg shadow-xl  bg-white ${
                      userDropdown ? "block" : "hidden"
                    }`}
                  >
                    <Link href={"/my-profile"}>
                      <li className="flex w-full cursor-pointer  items-center px-3 py-2 text-sm hover:bg-gray-100">
                        <PiUser className="text-lg mx-1" />
                        <span className="mx-2 ">My profile</span>
                      </li>
                    </Link>
                    <li
                      onClick={handleSignOut}
                      className="flex w-full cursor-pointer items-center px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <FiLogOut className="text-lg mx-1" />
                      <span className="mx-2 ">Logout</span>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <li className="bg-black/80 text-white p-1 px-2  rounded-md">
              <Link
                href="/"
                className="flex items-center text-sm font-semibold hover:bg-black/30  rounded-md"
              >
                <span className="mx-1">Login</span>
                <AiOutlineLogin size={25} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
