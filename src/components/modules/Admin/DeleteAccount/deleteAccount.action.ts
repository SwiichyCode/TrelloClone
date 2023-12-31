"use server";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

type Props = {
  userId: string;
};

export const deleteAccountAction = async ({ userId }: Props) => {
  await db.user.delete({
    where: { id: userId },
  });

  revalidatePath("/dashboard/admin");
};
