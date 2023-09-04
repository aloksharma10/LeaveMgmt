"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsCart2, BsBoxSeam } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { PiUser } from "react-icons/pi";
import { FiChevronDown, FiLogOut, FiSearch } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { MdOutlineNotifications } from "react-icons/md";
import Logo from "../Logo/Logo";

function Navbar() {
  const data = false;
  const [nav, setNav] = useState("hidden");
  const [fashion, setFashion] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const pathname = usePathname();

  const toggleNav = () => {
    if (nav == "hidden") {
      setNav("block");
    } else {
      setNav("hidden");
    }
  };

  useEffect(() => {
    setNav("hidden");
  }, [pathname]);

  return (
    <nav className="w-full z-20 py-2 shadow-lg sticky top-0 backdrop-blur-md bg-white/40 ">
      <div className="w-full px-3 flex flex-wrap items-center lg:justify-center mt-0 py-2 xl:py-0  container">
        <div className="px-0 pt-2 lg:pl-4 flex items-center lg:mx-4 cursor-pointer bg-clip-text text-md md:pt-0 font-bold mx-3  ">
          <Link href="/" className="flex items-center">
           <Logo size={33}/>
            Leave Management
          </Link>
        </div>
        <div className="xl:flex justify-center hidden">
          <div className="xl:w-[34vw]"></div>
        </div>
        {/* mobile  nav icon */}
        <div className="flex lg:hidden justify-end absolute right-4 md:right-13 items-center">
          <div className="mx-3">
            <FiSearch
              className="text-2xl cursor-pointer"
              onClick={() => {
                setSearchBox(!searchBox);
              }}
            />
          </div>
          <div className="mx-2 relative cursor-pointer">
            <BsCart2 className="text-2xl" />
            <span className="absolute -top-2 -right-2 h-5 w-5 text-sm rounded-full bg-slate-600 text-white flex justify-center items-center items cursor-pointer">
              <span>1</span>
            </span>
          </div>

          <button
            onClick={() => toggleNav()}
            className=" font-medium rounded-lg text-2xl  px-3 py-2 text-center inline-flex items-center mx-1 "
          >
            {nav == "hidden" ? <AiOutlineMenu /> : <RxCrossCircled />}
          </button>
        </div>
        {/* desktop nav */}
        <div className="w-full flex-grow-5 lg:flex lg:flex-1 lg:content-center lg:justify-end lg:w-auto h-0 lg:h-auto mt-2 lg:mt-0 z-20 overflow-hidden lg:overflow-visible ">
          <ul className="flex items-center lg:flex-row ">
            <li className="text-md mx-2 my-2 font-semibold hover:text-black transition hover:scale-105 duration-150 ease-out hover:ease-in">
              <Link href="/">Home</Link>
            </li>
            <li className="text-md mx-2 my-2 font-semibold hover:text-black transition hover:scale-105 duration-150 ease-out hover:ease-in">
              <Link href="/gadgets">Gadgets</Link>
            </li>
          </ul>
          <div className="text-center my-2 pr-4 pl-2">
            {!data?.user ? (
              <div>
                <Link href={"/login"}>
                  <button className="text-white bg-black hover:bg-slate-700 hover:shadow-lg duration-300 focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1">
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <ul>
                <li className="text-lg font-semibold hover:text-black rounded-md transition hover:scale-105 duration-150 ease-out hover:ease-in">
                  <div
                    onMouseLeave={() => setUserDropdown(false)}
                    className="relative"
                  >
                    <button
                      onMouseOver={() => setUserDropdown(true)}
                      className="flex items-center  rounded-md"
                    >
                      <div className="flex space-x-2 items-center">
                        <PiUser className="text-2xl" />
                        <span className="text-xl ">userName</span>
                        <FiChevronDown
                          className={` ${
                            userDropdown ? "rotate-180" : ""
                          } transition duration-150 ease-out hover:ease-in`}
                        />
                      </div>
                    </button>
                    <ul
                      className={`absolute mt-0 right-0 w-40 py-2 rounded-lg shadow-xl  bg-white ${
                        userDropdown ? "block" : "hidden"
                      }`}
                    >
                      <Link href={"/my-profile"}>
                        <li className="flex w-full cursor-pointer  items-center px-3 py-2 text-sm hover:bg-gray-100">
                          <PiUser className="text-lg mx-1" />{" "}
                          <span className="mx-2 "> My profile</span>
                        </li>
                      </Link>
                      <Link href={"/my-orders"}>
                        <li className="flex w-full cursor-pointer items-center px-3 py-2 text-sm hover:bg-gray-100">
                          <BsBoxSeam className="text-lg mx-1" />{" "}
                          <span className="mx-2 "> Orders</span>
                        </li>
                      </Link>
                      <li className="flex w-full cursor-pointer items-center px-3 py-2 text-sm hover:bg-gray-100">
                        <MdOutlineNotifications className="text-lg mx-1" />{" "}
                        <span className="mx-2 "> Notification</span>
                      </li>
                      <li
                        onClick={() => signOut()}
                        className="flex w-full cursor-pointer items-center px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        <FiLogOut className="text-lg mx-1" />{" "}
                        <span className="mx-2 "> Logout</span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* mobile nav */}
      <div
        className={`backdrop-blur-md bg-slate-200/70 text-center py-3 shadow-lg absolute w-full ${nav} lg:hidden`}
      >
        <ul>
          <div className="text-center my-2 pl-2"></div>
          <li className="text-md mx-2 my-2 font-semibold hover:text-black transition hover:scale-105 duration-150 ease-out hover:ease-in">
            <Link href="/">Home</Link>
          </li>
          <li className="text-md mx-2 my-2 font-semibold hover:text-black transition hover:scale-105 duration-150 ease-out hover:ease-in">
            <Link href="/beauty">Beauty</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
