"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  pending?: boolean;
}

export const SubmitButtonServer = ({ children, ...props }: Props) => {
  const { pending } = useFormStatus();

  return <Button {...props}>{pending ? "Loading..." : children}</Button>;
};
