"use client";

import type { AuthProvider } from "@/types/authProvider.type";
import { signIn } from "next-auth/react";

export const SignInButton = ({ provider }: AuthProvider) => {
  const handleSignIn = async () => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return <button onClick={handleSignIn}>Sign In With {provider}</button>;
};
