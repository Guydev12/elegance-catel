"use client";

import React, { FC, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut, User as UserIcon } from "lucide-react";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { AlertModal } from "../ui/alert-modal";
import { EditProfileForm } from "./edit-profil";

type ProfileDropdownProps = {
  user: User;
};

export const ProfileDropdown: FC<ProfileDropdownProps> = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const onSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <AlertModal
        title="Edit Profile"
        description="Edit your profile upload an image or update the username."
        open={showModal}
        onOpenChange={setShowModal}
      >
        <EditProfileForm user={user} />
      </AlertModal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer   flex items-center justify-center border bg-pink-800 rounded-full">
            <AvatarImage src={user?.avatar as string} />
            <AvatarFallback className="  text-white">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="text-gray-700">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex items-center gap-4 p-2">
              <Avatar className=" border bg-pink-800 text-white flex items-center justify-center border-black rounded-full">
                <AvatarImage src={user?.avatar as string} />
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-sm font-medium">{user.username}</h3>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-sm mb-2 mt-4 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            {" "}
            <UserIcon /> Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-sm">
            <Button
              onClick={onSignOut}
              variant="outline"
              className="border-0 ml-0 p-0"
            >
              <div className="flex items-center gap-2">
                <LogOut /> <p>Sign out</p>
              </div>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
