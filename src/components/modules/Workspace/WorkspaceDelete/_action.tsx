"use server";
import { getServerAuthSession } from "@/server/auth";
import { revalidatePath } from "next/cache";
import {
  deleteWorkspaceMember,
  deleteWorkspace,
  getWorkspace,
} from "prisma/querys/workspace.query";
import config from "@/constants/url.constant";

export const deleteWorkspaceAction = async (slug: string, id: number) => {
  try {
    const session = await getServerAuthSession();
    if (!session) return { error: "You must be logged in" };

    const workspace = await getWorkspace(id);
    if (!workspace) return { error: "Workspace not found" };

    await deleteWorkspaceMember(id);
    await deleteWorkspace(slug);
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath(config.url.WORKSPACE_URL());
};
