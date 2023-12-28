import { getServerAuthSession } from "@/server/auth";
import { AddTaskFormClient } from "@/components/Task/AddTaskFormClient";
import { AddTaskFormServer } from "@/components/Task/AddTaskFormServer";
import { TaskList } from "@/components/Task/TaskList";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) return null;

  return (
    <>
      <AddTaskFormClient />
      {/* <AddTaskFormServer /> */}
      <TaskList />
    </>
  );
}
