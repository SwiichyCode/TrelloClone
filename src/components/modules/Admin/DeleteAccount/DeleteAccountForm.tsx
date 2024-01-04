"use client";
import { useTransition, type FormEventHandler } from "react";
import { SubmitButtonClient } from "@/components/ui/SubmitButtonClient";
import { deleteAccountAction } from "./deleteAccount.action";
import type { User } from "@prisma/client";

type Props = {
  user: User;
};

export const DeleteAccountForm = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    startTransition(async () => {
      await deleteAccountAction({
        userId: user.id,
      });
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <SubmitButtonClient type="submit" pending={isPending}>
        Delete
      </SubmitButtonClient>
    </form>
  );
};
