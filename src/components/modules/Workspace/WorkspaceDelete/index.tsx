import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { DeleteWorkspaceForm } from "./_form";
import type { Workspace } from "@prisma/client";

type Props = {
  workspace: Workspace;
};

export const WorkspaceDelete = ({ workspace }: Props) => {
  const { name, slug, id } = workspace;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="text-red-300">
          Supprimer cet espace de travail ?
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-3" side="top" align="center">
        <DropdownMenuLabel className="mb-2 text-center">
          Supprimer l'espace de travail ?
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <p className=" mb-2 font-bold">
            Saisissez le nom de l'espace de travail « {name} » à supprimer
          </p>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DeleteWorkspaceForm name={name} slug={slug} id={id} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
