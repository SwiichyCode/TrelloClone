import { getServerAuthSession } from "@/server/auth";
import { AddTaskFormClient } from "@/components/TodoList/AddTask/AddTaskFormClient";
import { AddTaskFormServer } from "@/components/TodoList/AddTask/AddTaskFormServer";
import { TaskList } from "@/components/TodoList/TaskList";

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
