"use server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { getRandomGradient } from "@/lib/utils";
import { formatString } from "@/lib/utils";
import { formSchema } from "./_schema";
import config from "@/constants/url.constant";

type Inputs = z.infer<typeof formSchema>;

export const addWorkspace = async (data: Inputs) => {
  try {
    const session = await getServerAuthSession();
    const { name, type, description } = formSchema.parse(data);

    if (!session) return { error: "You must be logged in" };

    const workspaceCount = await db.workspace.count({
      where: { createdById: session?.user.id, name },
    });

    // if (workspace) {
    //   throw new Error("Workspace name already exist");
    // }

    const slug =
      formatString(name) + (workspaceCount > 0 ? `-${workspaceCount}` : "");

    const workspace = await db.workspace.create({
      data: {
        name,
        type,
        description,
        logo: getRandomGradient(),
        slug,
        createdBy: { connect: { id: session.user.id } },
      },
    });

    await db.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: session.user.id,
        role: "OWNER",
      },
    });

    revalidatePath(config.url.WORKSPACE_URL());

    return {
      status: "success",
      message: `Espace de travail ajouté avec succès !`,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};
