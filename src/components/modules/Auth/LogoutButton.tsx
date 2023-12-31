"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface Props {
  asDropdown?: boolean;
}

export const LogoutButton = ({ asDropdown }: Props) => {
  return asDropdown ? (
    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
  ) : (
    <Button onClick={() => signOut()}>Logout</Button>
  );
};
