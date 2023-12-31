"use client";
import { useTransition, FormEventHandler } from "react";
import { User } from "@prisma/client";
import { SubmitButtonClient } from "@/components/ui/SubmitButtonClient";
import { deleteAccountAction } from "./deleteAccount.action";

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
