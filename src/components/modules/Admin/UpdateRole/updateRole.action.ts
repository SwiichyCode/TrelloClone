"use server";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

type Props = {
  role: "user" | "admin";
  userId: string;
};

export const updateRoleAction = async ({ userId, role }: Props) => {
  await db.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/dashboard/admin");
};
