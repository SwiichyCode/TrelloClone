"use server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "@/server/auth";
import { getRandomGradient } from "@/lib/utils";
import { formatString } from "@/lib/utils";
import { formSchema } from "./_schema";
import {
  createWorkspace,
  createWorkspaceMember,
  getWorkspaceCount,
} from "prisma/querys/workspace.query";
import config from "@/constants/url.constant";

type Inputs = z.infer<typeof formSchema>;

export const addWorkspace = async (data: Inputs) => {
  try {
    const session = await getServerAuthSession();
    const { name, type, description } = formSchema.parse(data);

    if (!session) return { error: "You must be logged in" };

    const workspaceCount = await getWorkspaceCount({
      createdById: session.user.id,
      name,
    });

    const slug =
      formatString(name) + (workspaceCount > 0 ? `-${workspaceCount}` : "");

    const workspace = await createWorkspace({
      name,
      type,
      description,
      logo: getRandomGradient(),
      slug,
      createdBy: { connect: { id: session.user.id } },
    });

    await createWorkspaceMember({
      workspaceId: workspace.id,
      userId: session.user.id,
      role: "OWNER",
    });

    revalidatePath(config.url.WORKSPACE_URL());

    return {
      status: "success",
      message: `Espace de travail ajouté avec succès !`,
    };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
};
