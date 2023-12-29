"use client";
import { useTransition, FormEventHandler } from "react";
import { SubmitButtonClient } from "../../ui/SubmitButtonClient";
import { completedTaskAction } from "./completedTask.action";

type Props = {
  isCompleted: boolean;
  id: number;
};

export const CompletedTaskForm = ({ isCompleted, id }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await completedTaskAction({
        id: id,
        completed: !isCompleted,
      });

      if (result.error) {
        console.error(result.error);
        return;
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <SubmitButtonClient
        type="submit"
        // pending={isPending}
        variant={isCompleted ? "success" : "destructive"}
      >
        {isCompleted ? "Completed" : "Incompleted"}
      </SubmitButtonClient>
    </form>
  );
};
