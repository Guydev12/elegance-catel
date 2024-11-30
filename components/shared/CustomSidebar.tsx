"use client";

import * as React from "react";
import { ChevronRight, ShoppingBag } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { navItems } from "@/lib/constant";
import AppLogo from "@/components/shared/AppLogo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "@prisma/client";
import {ProfileDropdown }from "./profile-dropdown";

type PropOptions = {
  children: React.ReactNode;
  user: User;
};
const pathMapping: Record<string, string> = {
  //Record is used to create a new type that map key
  "/admin/products/categories": "Category",
  "/admin/products/categories/new": "Category",
  "/admin/products/new": "Products",
  "/admin/products": "Products",
  "/admin/products/edit": "Products",
};
export const CustomSidebar: React.FC<PropOptions> = ({ children, user }) => {
  const username = user?.username;
 

  const pathname = usePathname();
  const lastUrl = pathname.split("/").pop();
  const currentPathName = lastUrl
    ? lastUrl.charAt(0).toUpperCase() + lastUrl.slice(1)
    : "";
  const renderName = () => {
    return (
      <p className="font-bold">{pathMapping[pathname] || currentPathName}</p>
    );
  };
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <div className="flex flex-col gap-0.5 leading-none">
                  <AppLogo />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <form>
            <SidebarGroup className="py-0">
              <SidebarGroupContent className="relative">
                <Label htmlFor="search" className="sr-only">
                  Search
                </Label>
                <SidebarInput
                  id="search"
                  placeholder="Search..."
                  className="pl-8"
                />
                <ShoppingBag className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
              </SidebarGroupContent>
            </SidebarGroup>
          </form>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.items ? (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full justify-between">
                            <span className="flex items-center">
                              <item.icon className="mr-2 size-4" />
                              {item.title}
                            </span>
                            <ChevronRight className="size-4" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenu className="mt-2 ml-6 border-l pl-2">
                            {item.items.map((subItem) => (
                              <SidebarMenuItem key={subItem.title}>
                                <SidebarMenuButton
                                  asChild
                                  className={`${
                                    pathname === item.url
                                      ? "bg-pink-300 text-brand-primary font-bold"
                                      : ""
                                  }`}
                                >
                                  <Link
                                    href={subItem.url}
                                    className="flex items-center"
                                  >
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        className={`${
                          pathname === item.url
                            ? "bg-pink-300 text-brand-primary font-bold"
                            : ""
                        }`}
                      >
                        <Link href={item.url} className="flex items-center">
                          <item.icon className="mr-2 size-4" />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold">
                    {renderName()}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4 ">
            <h5>{username}</h5>
             <ProfileDropdown user={user}/>
         </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
