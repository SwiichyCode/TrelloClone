"use client";
import { useState } from "react";
import { WorkspaceForm } from "./_form";
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
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";

export const DropdownWorkspace = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            Workspace <FaChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="start">
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer flex-col items-start">
              <h2 className="text-sm font-semibold">Create a workspace</h2>
              <p className=" text-xs">
                A workspace is a group of boards and people. Use it to organize
                your business, side hustles, family or friends.
              </p>
            </DropdownMenuItem>
          </DialogTrigger>
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
