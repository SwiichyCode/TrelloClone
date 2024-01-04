"use client";
import { useTransition, type FormEventHandler } from "react";
import { SubmitButtonClient } from "@/components/ui/SubmitButtonClient";
import { updateRoleAction } from "./updateRole.action";
import type { User } from "@prisma/client";

type Props = {
  user: User;
};

export const UpdateRoleForm = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const currentRole = user.role;
    const newRole = currentRole === "user" ? "admin" : "user";

    startTransition(async () => {
      await updateRoleAction({
        userId: user.id,
        role: newRole,
      });
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <SubmitButtonClient type="submit" pending={isPending}>
        Update Role
      </SubmitButtonClient>
    </form>
  );
};
