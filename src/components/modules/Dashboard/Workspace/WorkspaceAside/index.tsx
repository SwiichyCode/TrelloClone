"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Workspace } from "@prisma/client";
import { WorkspaceLogo } from "../WorkspaceLogo";
import Link from "next/link";
import { WorkspaceName } from "../WorkspaceName";
import { FaChevronDown } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";

interface Props {
  workspace: Workspace[];
}

export const WorkspaceAside = ({ workspace }: Props) => {
  return (
    <nav className="flex max-w-64 flex-col gap-2 py-8">
      {/* <DropdownMenuSeparator /> */}
      <DropdownMenuLabel className="text-sm font-semibold">
        Espace de travail
      </DropdownMenuLabel>
      {workspace.map(({ id, name, logo, slug }) => (
        <DropdownMenu key={id}>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="w-full">
              <Link
                href="/dashboard"
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <WorkspaceLogo name={name} logo={logo} asNavigation />
                  <WorkspaceName workspaceName={name} />
                </div>
                <FaChevronDown />
              </Link>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="start">
            <DropdownMenuItem>
              <Link
                href={`dashboard/${slug}`}
                className="flex w-full items-center gap-2"
              >
                <MdOutlineSpaceDashboard /> Tableaux
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/dashboard"
                className="flex w-full items-center gap-2"
              >
                <FaUserFriends /> Membres
              </Link>
              <DropdownMenuShortcut>
                <IoMdAdd />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                // href="/dashboard"
                href={`/dashboard/${slug}/settings`}
                className="flex w-full items-center gap-2"
              >
                <FaGear /> Paramètres
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </nav>
  );
};
