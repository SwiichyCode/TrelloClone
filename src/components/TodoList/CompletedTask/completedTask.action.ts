"use server";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export const completedTaskAction = async ({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}) => {
  if (!id) return { error: "Id is required" };
  if (completed === undefined) return { error: "Completed is required" };

  await db.task.update({
    where: { id: id },
    data: { completed: completed },
  });

  revalidatePath("/");

  return {
    message: completed
      ? "Task marked as incomplete"
      : "Task marked as complete",
  };
};
