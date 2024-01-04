"use client";
import Link from "next/link";
import { useOptimistic } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
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
import { WorkspaceLogo } from "@/components/modules/Workspace/WorkspaceLogo";
import { WorkspaceName } from "@/components/modules/Workspace/WorkspaceName";
import type { Workspace } from "@prisma/client";
import config from "@/constants/url.constant";

interface Props {
  workspace: Workspace[];
}

export const WorkspaceAside = ({ workspace }: Props) => {
  const [optimisticWorkspace, addOptimisticWorkspace] = useOptimistic(
    workspace,
    (state, newWorkspace: Workspace) => [...state, newWorkspace],
  );

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
                href={config.url.WORKSPACE_URL(slug as string)}
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
                href={config.url.WORKSPACE_BOARD_HOME_URL(slug as string)}
                className="flex w-full items-center gap-2"
              >
                <MdOutlineSpaceDashboard /> Tableaux
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={config.url.WORKSPACE_MEMBERS_URL(slug as string)}
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
                href={config.url.WORKSPACE_PARAMS_URL(slug as string)}
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
