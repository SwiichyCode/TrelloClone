import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { WorkspaceDelete } from "@/components/modules/Workspace/WorkspaceDelete";

type Props = {
  params: {
    slug: string;
  };
};

export default async function WorkspaceSettingsPage({ params }: Props) {
  const session = await getServerAuthSession();
  const workspace = await db.workspace.findFirst({
    where: { createdById: session?.user.id, slug: params.slug },
  });

  if (!workspace)
    return (
      <p>Vous n'avez pas la permission d'accéder à cet espace de travail.</p>
    );

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <WorkspaceDelete workspace={workspace} />
    </div>
  );
}
