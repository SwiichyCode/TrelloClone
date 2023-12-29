import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { SubmitButtonServer } from "../../ui/SubmitButtonServer";
import { Input } from "../../ui/input";
import { revalidatePath } from "next/cache";

// Compare this snippet from src/components/Task/AddTaskFormClient.tsx:

// Benefits of this approach:
// - Can use server-side code
// - Not bad if you don't need to reuse the logic
// - No need to use react hooks (useTransition)

// Drawbacks of this approach:
// - Can't use react hooks
// - Can't manage reset form state

export const AddTaskFormServer = async () => {
  const addTaskAction = async (formData: FormData) => {
    "use server";
    const session = await getServerAuthSession();
    const name = formData.get("name") as string;

    if (!name) return { error: "Name is required" };
    if (!session) return { error: "You must be logged in" };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await db.task.create({
      data: {
        name: name,
        createdBy: { connect: { id: session?.user.id } },
      },
    });

    if (!response) return { error: "Error creating task" };

    revalidatePath("/");

    return { message: "Task created" };
  };

  return (
    <form action={addTaskAction} className="flex gap-4">
      <Input type="text" name="name" />
      <SubmitButtonServer type="submit">Create Task</SubmitButtonServer>
    </form>
  );
};
