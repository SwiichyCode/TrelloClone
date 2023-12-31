"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { signIn } from "next-auth/react";
import { type VariantProps, cva } from "class-variance-authority";
import type { AuthProvider } from "@/types/authProvider.type";

import { cn } from "@/lib/utils";
import Image from "next/image";

const buttonVariants = cva(
  "flex items-center justify-center w-full h-12 rounded-lg gap-4",
  {
    variants: {
      variant: {
        default: "bg-gray-200 text-gray-900",
        google: "bg-red-500 text-white",
        github: "bg-gray-900 text-white",
        discord: "bg-slate-950 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const handleIconURL = (provider: string) => {
  switch (provider) {
    case "google":
      return "/icons/google-icon.svg";
    case "github":
      return "/icons/github-icon.svg";
    case "discord":
      return "/icons/discord-icon.svg";
    default:
      return "";
  }
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    AuthProvider {
  asChild?: boolean;
}

const SignInButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, provider, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const handleSignIn = async () => {
      await signIn(provider, { callbackUrl: "/" });
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant }))}
        onClick={handleSignIn}
        ref={ref}
        {...props}
      >
        <Image src={handleIconURL(provider)} width={24} height={24} alt="" />
        Continue with {variant}
      </Comp>
    );
  },
);

SignInButton.displayName = "SignInButton";

export { SignInButton, buttonVariants };
