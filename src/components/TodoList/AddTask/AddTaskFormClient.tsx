"use client";
import { useTransition, useRef, FormEventHandler } from "react";
import { addTaskAction } from "./addTask.action";
import { SubmitButtonClient } from "../../ui/SubmitButtonClient";
import { Input } from "../../ui/input";

// Compare this snippet from src/components/Task/AddTaskFormServer.tsx:
// This component use addTask.action.ts

// Benefits of this approach:
// - Extract logic into a separate file
// - Potential to reuse the logic in other components
// - Possible to use react hooks

// Drawbacks of this approach:
// - Can't use server-side code

export const AddTaskFormClient = () => {
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    // Start a transition to the pending state
    startTransition(async () => {
      // TODO: Get the form data

      const formData = new FormData(event.currentTarget);

      // Simulate a slow network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Send the form data to the server action
      const result = await addTaskAction(formData);

      // TODO: Handle errors
      if (result.error) {
        console.error(result.error);
        return;
      }

      // Reset the form
      ref.current?.reset();
    });
  };

  return (
    <form className="mb-8 flex gap-4" onSubmit={onSubmit} ref={ref}>
      <Input type="text" name="name" />
      <SubmitButtonClient type="submit" pending={isPending}>
        Create Task
      </SubmitButtonClient>
    </form>
  );
};
