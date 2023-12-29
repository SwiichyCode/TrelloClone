"use client";
import { useTransition, FormEventHandler } from "react";
import { SubmitButtonClient } from "../../ui/SubmitButtonClient";
import { removeTaskAction } from "./removeTask.action";

type Props = {
  id: number;
};

export const RemoveTaskForm = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await removeTaskAction({ id: id });

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
        pending={isPending}
        variant="destructive"
      >
        Delete
      </SubmitButtonClient>
    </form>
  );
};
