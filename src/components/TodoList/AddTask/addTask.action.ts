"use server";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export const addTaskAction = async (formData: FormData) => {
  const session = await getServerAuthSession();

  const name = formData.get("name") as string;

  if (!name) return { error: "Name is required" };
  if (!session) return { error: "You must be logged in" };

  await db.task.create({
    data: {
      name: name,
      createdBy: { connect: { id: session.user.id } },
    },
  });

  revalidatePath("/");

  return { message: "Task created" };
};
