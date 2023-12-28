import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { TaskActionWrapper } from "./TaskActionWrapper";

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
      {/* {tasks.map(({ id, name, completed }: any) => (
        <div key={id} className="flex items-center justify-between">
          <p className="text-lg font-semibold">{name}</p>{" "}
          <div className="flex gap-4">
            <UpdateButton />
            <CompletedTaskForm id={id} isCompleted={completed} />
            <RemoveTaskForm id={id} />
          </div>
        </div>
      ))} */}
    </div>
  );
};
