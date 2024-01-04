import { db } from "@/server/db";
import { WorkspaceMembersNavigation } from "@/components/modules/Workspace/WorkspaceMembers/WorkspaceMembersNavigation";

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export default async function WorkspaceMembersLayout({
  children,
  params,
}: Props) {
  const workspaceMembers = await db.workspaceMember.findMany({
    where: { workspace: { slug: params.slug } },
  });

  return (
    <div className="m-auto flex w-full max-w-6xl gap-12 py-8">
      <div className="flex w-full flex-col gap-4">
        <h2 className="mb-4 text-xl font-semibold">Membres</h2>
        <div className="flex w-full max-w-6xl gap-12">
          <WorkspaceMembersNavigation
            workspaceMembers={workspaceMembers}
            params={params.slug}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
