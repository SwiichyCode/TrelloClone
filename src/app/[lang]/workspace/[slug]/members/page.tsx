import { db } from "@/server/db";

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

  console.log(users);

  return <p>WorkspaceMembersPage</p>;
}
