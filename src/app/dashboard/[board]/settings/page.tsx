import { DeleteWorkspace } from "@/components/modules/Dashboard/WorkspaceSettings/DeleteWorkspace";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export default async function BoardSettingsPage({
  params,
}: {
  params: { board: string };
}) {
  const session = await getServerAuthSession();
  const workspace = await db.workspace.findFirst({
    where: { createdById: session?.user.id, slug: params.board },
  });

  if (!workspace)
    return (
      <p>Vous n'avez pas la permission d'accéder à cet espace de travail.</p>
    );

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <DeleteWorkspace workspace={workspace} />
    </div>
  );
}
