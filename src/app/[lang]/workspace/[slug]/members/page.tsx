import { db } from "@/server/db";
import { AvatarAccount } from "@/components/modules/Workspace/layouts/AvatarAccount";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link1Icon, Cross1Icon } from "@radix-ui/react-icons";
import type { WorkspaceRole } from "@/types";

type Props = {
  params: {
    slug: string;
  };
};

export default async function WorkspaceMembersPage({ params }: Props) {
  const workspaceMembers = await db.workspaceMember.findMany({
    where: { workspace: { slug: params.slug } },
  });

  const users = await db.user.findMany({
    where: { id: { in: workspaceMembers.map((member) => member.userId) } },
  });

  const findUserStatus = (userId: string) => {
    const member = workspaceMembers.find((member) => member.userId === userId);

    if (member?.role === "OWNER") return "OWNER";

    return "MEMBER";
  };

  const rewriteStatus = (status: WorkspaceRole) => {
    if (status === "OWNER") return "Administrateur";

    return status;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Membres de l'espace de travail */}
      <div className="flex flex-col gap-4 border-b border-[#333C43] pb-4">
        <h1 className="text-lg font-bold">
          Membres de l'espace de travail ({workspaceMembers.length})
        </h1>
        <p className="text-sm font-normal">
          Les membres d'espaces de travail peuvent consulter et rejoindre tous
          les tableaux visibles par les membres d'un espace de travail et
          peuvent créer de nouveaux tableaux au sein de l'espace de travail.
        </p>
      </div>
      {/* Inviter les membres à vous rejoindre */}
      <div className="flex items-center justify-between gap-4 border-b border-[#333C43] pb-4">
        <div className=" space-y-4">
          <h1 className="text-lg font-bold">
            Inviter les membres à vous rejoindre
          </h1>
          <p className="max-w-80 text-sm">
            Toutes les personnes qui possèdent un lien d'invitation peuvent
            rejoindre cet espace de travail gratuit. Vous pouvez également
            désactiver et créer un nouveau lien pour cet espace de travail à
            tout moment.
          </p>
        </div>
        <Button>
          <Link1Icon /> Inviter avec un lien
        </Button>
      </div>

      {/* Input serach */}
      <Input placeholder="Filter par nom" className="max-w-64" />

      {/* Liste des membres */}
      {users.map((user) => (
        <div key={user.id} className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <AvatarAccount imageUrl={user.image!} />
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <p className="text-sm">Sur 0 tableau</p>
            <Button>{rewriteStatus(findUserStatus(user.id))}</Button>

            <Button disabled={findUserStatus(user.id) === "OWNER"}>
              <Cross1Icon width={12} /> Quitter
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
