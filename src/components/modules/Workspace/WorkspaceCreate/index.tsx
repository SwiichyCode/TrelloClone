"use client";
import Link from "next/link";
import { useState } from "react";
import { WorkspaceForm } from "./_form";
import { WorkspaceLogo } from "../WorkspaceLogo";
import { WorkspaceName } from "../WorkspaceName";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";
import type { Workspace } from "@prisma/client";
import config from "@/constants/url.constant";

interface Props {
  workspace: Workspace[];
}

export const WorkspaceCreate = ({ workspace }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            Espace de travail <FaChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="start">
          {/* {!workspace.length && ( */}
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer flex-col items-start">
              <h2 className="text-sm font-semibold">
                Créer un espace de travail
              </h2>
              <p className=" text-xs">
                Un espace de travail est un groupe de tableaux et de personnes.
                Utilisez-le pour organiser votre entreprise, vos activités ou
                votre famille.
              </p>
            </DropdownMenuItem>
          </DialogTrigger>
          {/* )} */}
          {workspace.length > 0 && (
            <DropdownMenuLabel className="text-sm font-semibold">
              Vos espaces de travail
            </DropdownMenuLabel>
          )}
          {workspace.map(({ id, name, logo, slug }) => (
            <DropdownMenuItem key={id}>
              <Link
                href={config.url.WORKSPACE_BOARD_HOME_URL(slug!)}
                className="flex w-full cursor-pointer  items-center gap-4"
              >
                <WorkspaceLogo name={name} logo={logo} />
                <WorkspaceName workspaceName={name} />
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créons un espace de travail</DialogTitle>
          <DialogDescription>
            Stimulez votre productivité en facilitant l'accès aux tableaux pour
            tous au même endroit.
          </DialogDescription>
        </DialogHeader>
        <WorkspaceForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
