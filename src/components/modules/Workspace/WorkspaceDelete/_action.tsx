"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const deleteWorkspace = async (slug: string | null) => {
  try {
    const session = await getServerAuthSession();
    if (!session) return { error: "You must be logged in" };

    await db.workspace.deleteMany({
      where: { slug },
    });
  } catch (error: any) {
    // throw error;
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
