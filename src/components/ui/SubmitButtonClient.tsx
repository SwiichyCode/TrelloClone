import { Button } from "./button";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./button";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  pending?: boolean;
}

export const SubmitButtonClient = ({ children, pending, ...props }: Props) => {
  return <Button {...props}>{pending ? "Loading..." : children}</Button>;
};
