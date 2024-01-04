"use server";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { revalidatePath } from "next/cache";
import config from "@/constants/url.constant";

export const deleteWorkspace = async (slug: string | null, id: number) => {
  try {
    const session = await getServerAuthSession();
    if (!session) return { error: "You must be logged in" };

    const workspace = await db.workspace.findUnique({ where: { id } });
    if (!workspace) return { error: "Workspace not found" };

    await db.workspaceMember.deleteMany({
      where: { workspaceId: workspace.id },
    });

    await db.workspace.deleteMany({
      where: { slug },
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath(config.url.WORKSPACE_URL());
};
