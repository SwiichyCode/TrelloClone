import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { Logo } from "@/components/ui/Logo";
import { DropdownAccount } from "@/components/modules/Workspace/layouts/DropdownAccount";
import { WorkspaceCreate } from "@/components/modules/Workspace/WorkspaceCreate";

export const Navbar = async () => {
  const session = await getServerAuthSession();
  const workspace = await db.workspace.findMany({
    where: {
      createdById: session?.user.id,
    },
  });

  return (
    <nav className="flex w-full justify-between border-b border-b-slate-400 px-8 py-3">
      <div className="flex items-center space-x-6">
        <Logo theme="dark" />
        <WorkspaceCreate workspace={workspace} />
      </div>
      {session && <DropdownAccount session={session} />}
    </nav>
  );
};
