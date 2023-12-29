"use server";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export const removeTaskAction = async ({ id }: { id: number }) => {
  if (!id) return { error: "Id is required" };

  await db.task.delete({
    where: { id: id },
  });

  revalidatePath("/");

  return { message: "Task removed" };
};
