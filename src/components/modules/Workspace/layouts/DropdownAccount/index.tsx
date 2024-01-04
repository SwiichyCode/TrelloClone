import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { AvatarAccount } from "@/components/modules/Workspace/layouts/AvatarAccount";
import { LogoutButton } from "@/components/modules/Auth/LogoutButton";
import type { Session } from "next-auth";

interface Props {
  session: Session;
}

export const DropdownAccount = ({ session }: Props) => {
  const { email, image } = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AvatarAccount imageUrl={image!} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuLabel>{email}</DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/dashboard/profile">Profile</Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="https://github.com/SwiichyCode/T3-TODOAPP">Github</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LogoutButton asDropdown />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
