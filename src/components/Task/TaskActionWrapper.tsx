"use client";
import { useTransition, useState } from "react";
import { RemoveTaskForm } from "./RemoveTaskForm";
import { CompletedTaskForm } from "./CompletedTaskForm";
import { UpdateButton } from "./UpdateButton";
import { Input } from "../ui/input";
import { updateTaskAction } from "./updateTask.action";
import type { Task } from "@/types/task.type";

type Props = {
  tasks: Task[];
};

export const TaskActionWrapper = ({ tasks }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [editingTasks, setEditingTasks] = useState<Record<string, boolean>>({});
  const [value, setValue] = useState<Record<string, string>>({});

  const toggleEditing = (id: string) => {
    setEditingTasks((prev) => {
      // If the task is already being edited, toggle its state
      if (prev[id]) {
        return { ...prev, [id]: !prev[id] };
      }

      // Otherwise, clear all other tasks and set this task as being edited
      return { [id]: true };
    });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    startTransition(async () => {
      const id = Number(
        Object.keys(editingTasks).find((key) => editingTasks[key] === true),
      );

      const result = await updateTaskAction({
        id,
        name: value.name,
      });

      if (result) {
        // We use a second startTransition to ensure that the state update from toggleEditing
        // is synchronized with the state update from updateTaskAction, preventing a brief flash
        // of the old task value during the update.
        startTransition(() => {
          toggleEditing(String(id));
        });
      }
    });
  };

  return tasks.map(({ id, name, completed }: any) => (
    <div key={id} className="flex items-center justify-between">
      {editingTasks[id] ? (
        <Input
          defaultValue={name}
          name="name"
          className="mr-4"
          onChange={handleChange}
        />
      ) : (
        <p className=" text-lg font-semibold">{name}</p>
      )}
      <div className="flex gap-4">
        <UpdateButton
          isEditing={editingTasks[id]}
          setIsEditing={() => toggleEditing(id)}
          onConfirm={handleConfirm}
        />
        <CompletedTaskForm id={id} isCompleted={completed} />
        <RemoveTaskForm id={id} />
      </div>
    </div>
  ));
};
