import { db } from "@/server/db";
import { AvatarAccount } from "@/components/modules/Workspace/layouts/AvatarAccount";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/ui/separator";
import { Paragraph, Title } from "@/components/ui/typography";
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
    <div>
      <Container direction="column" withSeparator>
        <Title as="h1">
          Membres de l'espace de travail ({workspaceMembers.length})
        </Title>
        <Paragraph>
          Les membres d'espaces de travail peuvent consulter et rejoindre tous
          les tableaux visibles par les membres d'un espace de travail et
          peuvent créer de nouveaux tableaux au sein de l'espace de travail.
        </Paragraph>
      </Container>
      <Container
        direction="row"
        position="center"
        justify="between"
        withSeparator
      >
        <div className="space-y-4">
          <Title as="h1">Inviter les membres à vous rejoindre</Title>
          <Paragraph>
            Toutes les personnes qui possèdent un lien d'invitation peuvent
            rejoindre cet espace de travail gratuit. Vous pouvez également
            désactiver et créer un nouveau lien pour cet espace de travail à
            tout moment.
          </Paragraph>
        </div>
        <Button>
          <Link1Icon /> Inviter avec un lien
        </Button>
      </Container>

      <Container withSeparator>
        <Input placeholder="Filter par nom" className="mb-4 max-w-64" />
      </Container>
      <div>
        {users.map((user) => (
          <Container
            key={user.id}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <AvatarAccount imageUrl={user.image!} />
              <div>
                <Title as="h3" className="font-bold">
                  {user.name}
                </Title>
                <Paragraph>{user.email}</Paragraph>
              </div>
            </div>
            <div className=" flex items-center gap-4">
              <Paragraph>Sur 0 tableau</Paragraph>
              <Button>{rewriteStatus(findUserStatus(user.id))}</Button>

              <Button disabled={findUserStatus(user.id) === "OWNER"}>
                <Cross1Icon width={12} /> Quitter
              </Button>
            </div>
          </Container>
        ))}
      </div>
    </div>
  );
}
