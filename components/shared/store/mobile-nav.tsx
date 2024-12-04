import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React from "react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/constant";
import Link from "next/link";
import { Session } from "next-auth";

export function MobileNav({
  pathname,
  session,
}: {
  pathname: string;
  session: Session | null;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden flex">
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent outline-0 border-0"
        >
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center h-full justify-between py-8">
          <nav>
            <ul className="flex flex-col items-center justify-center gap-4">
              {NAV_ITEMS.map((item) => (
                <SheetClose asChild key={item.id}>
                  <li
                    className={`${pathname === item.path ? "text-pink-500 font-bold" : ""} relative group text-black hover:text-pink-500 transition duration-300`}
                  >
                    <Link href={item.path}>
                      {item.label}
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] bg-pink-500 transition-all duration-300 ${pathname === item.path ? "w-full" : "w-0 group-hover:w-full"}`}
                      ></span>
                    </Link>
                  </li>
                </SheetClose>
              ))}
            </ul>
          </nav>
          {session?.user.isAdmin && (
            <Button className="block md:hidden bg-brand-primary text-white font-bold mb-8 w-full">
              <Link href="/admin/">Dashboard</Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
