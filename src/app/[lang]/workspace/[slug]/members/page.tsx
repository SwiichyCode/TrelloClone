import { WorkspaceMembersNavigation } from "@/components/modules/Workspace/WorkspaceMembers/WorkspaceMembersNavigation";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

type Props = {
  params: {
    slug: string;
  };
};

export default async function WorkspaceMembersPage({ params }: Props) {
  const session = await getServerAuthSession();
  const workspaceMembers = await db.workspaceMember.findMany({
    where: { workspace: { slug: params.slug } },
  });

  return <p>WorkspaceMembersPage</p>;
}
