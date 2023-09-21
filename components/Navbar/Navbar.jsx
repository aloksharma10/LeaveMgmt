"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineLogin } from "react-icons/ai";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
import { UserNav } from "./UserNav";
import { Notification } from "./Notification";
import { useUserProvider } from "@/provider/User/UserProvider";
import MobileSidebar from "../Dashborad/MobileSidebar";

function Navbar() {
  const { user, handleSignOut } = useUserProvider();

  return (
    <nav className="w-full rounded-xl z-20 py-4 shadow-lg sticky top-0 backdrop-blur-md bg-white/40">
      
      <div className="flex items-center justify-between px-4 md:container">
      <MobileSidebar/>

        <div className="flex items-center cursor-pointer text-md font-bold md:pl-0 pl-10">
          <Logo size={30} />
          <span className="hidden md:block">Leave Management</span>
        </div>
        <ul className="flex space-x-5 items-center cursor-pointer">
          {user.name ? (
            <>
              <li className="text-lg relative font-semibold hover:text-black rounded-md">
                <Notification />
              </li>
              <li className="text-lg font-semibold hover:text-black rounded-md">
                <UserNav user={user} handleSignOut={handleSignOut} />
              </li>
            </>
          ) : (
            <li>
              <Link href="/">
                <Button>
                  <span className="mx-1">Login</span>
                  <AiOutlineLogin size={25} />
                </Button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
