"use client";

import Link from "next/link";
import useNavStore from "@/context/Nav";
import { MoonIcon, SunDimIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { setCookie } from "cookies-next";

export default function Navbar({ theme }: { theme: string }) {
  const { navOpen, setNavOpen } = useNavStore();
  const [localTheme, setTheme] = useState<string>(theme);

  const toggleTheme = () => {
    if (localTheme !== "dark") {
      setTheme("dark");
      document.body.classList.add("dark");
      setCookie('theme', "dark");
    } else {
      setTheme("light");
      document.body.classList.remove("dark");
      setCookie('theme', "light");
    }
  };

  return (
    <div className="flex gap-8 items-center">
      <button className="cursor-pointer" onClick={toggleTheme}>
        {localTheme !== "dark" ? (
          <MoonIcon size={20} weight="light" />
        ) : (
          <SunDimIcon size={23} weight="light" />
        )}
      </button>
      <Link href="#">Search</Link>

      {/* mobile */}
      <nav
        className={`lg:hidden flex absolute top-0 left-0 min-h-svh min-w-svw -translate-x-full transition duration-300 ease-in-out ${
          navOpen ? "translate-x-0" : ""
        } `}
      >
        <div className="flex flex-col justify-center items-center min-h-svh w-1/2 bg-(--bg) pb-64">
          <button
            onClick={() => setNavOpen(false)}
            className="w-full min-h-20 flex justify-center items-center"
          >
            <p className="h-16 w-16 rounded-full bg-(--) flex justify-center items-center cursor-pointer hover:text-(--bg) hover:bg-(--primary) duration-200 ">
              <XIcon size={36} weight="light" />
            </p>
          </button>
          <Link
            href="#"
            className="border-y border-y-(--border) w-full min-h-20 flex justify-center items-center"
          >
            Shop
          </Link>
          <Link
            href="#"
            className="border-b border-b-(--border) w-full min-h-20 flex justify-center items-center"
          >
            Cart
          </Link>
          <Link
            href="#"
            className="border-b border-b-(--border) w-full min-h-20 flex justify-center items-center"
          >
            My Orders
          </Link>
        </div>
        <div
          className={`min-h-svh grow bg-gray-400/30 transition duration-600 ease-in-out ${
            navOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setNavOpen(false)}
        ></div>
      </nav>

      {/* desktop */}
      <nav className="hidden lg:flex items-center gap-8 justify-center">
        <Link href="#">Shop</Link>
        <Link href="#">Cart</Link>
        <Link href="#">My Orders</Link>
      </nav>

      {/* Authentication  */}
      <div className="flex gap-6">
        <Link href="#">Sign in</Link>
        <Link href="#">Sign up</Link>
      </div>
    </div>
  );
}
