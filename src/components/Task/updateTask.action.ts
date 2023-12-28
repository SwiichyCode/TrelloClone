"use server";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export const updateTaskAction = async ({
  id,
  name,
}: {
  id: number;
  name: string | undefined;
}) => {
  await db.task.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/");

  return { message: "Task updated" };
};
