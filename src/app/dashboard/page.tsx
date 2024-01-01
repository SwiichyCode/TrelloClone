import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { WorkspaceAside } from "@/components/modules/Dashboard/Workspace/WorkspaceAside";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  const workspace = await db.workspace.findMany({
    where: {
      createdById: session?.user.id,
    },
  });

  return (
    <main className="m-auto max-w-6xl">
      <WorkspaceAside workspace={workspace} />
    </main>
  );
}
