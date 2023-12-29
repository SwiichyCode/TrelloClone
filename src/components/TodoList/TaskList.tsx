import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { TaskActionWrapper } from "./TaskAction";

export const TaskList = async () => {
  const session = await getServerAuthSession();

  const tasks = await db.task.findMany({
    where: {
      createdById: session?.user.id,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <TaskActionWrapper tasks={tasks} />
    </div>
  );
};
