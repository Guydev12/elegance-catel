"use client";
import React, { FC } from "react";
import AppLogo from "../AppLogo";
import { NAV_ITEMS } from "@/lib/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

type HeaderProps = {
  session: Session | null;
};

const Header: FC<HeaderProps> = ({ session }) => {
  const pathname = usePathname();
  return (
    <header className="w-full h-[56px] p-4 flex flex-row items-center justify-between bg-gradient-to-tl from-pink-100 to-pink-400">
      <AppLogo />
      {/* <MobileNav /> */}
      <nav className="hidden md:flex">
        <ul className="flex flex-row items-center gap-4">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.id}
              className={`${pathname === item.path ? "text-pink-500 font-bold" : ""} relative group text-white hover:text-pink-500 transition duration-300`}
            >
              <Link href={item.path}>
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-pink-500 transition-all duration-300 ${pathname === item.path ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {session?.user.isAdmin && (
        <Button>
          <Link href="/admin/">Dashboard</Link>
        </Button>
      )}
    </header>
  );
};

export default Header;
