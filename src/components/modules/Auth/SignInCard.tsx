import Image from "next/image";
import { SignInButton } from "@/components/modules/Auth/SignInButton";

export const SignInCard = () => {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-8">
      <Image src="/icons/kanban-icon.svg" width={152} height={25} alt="logo" />
      <div className="flex w-full flex-col gap-4">
        <SignInButton provider="discord" variant="discord" />
        <SignInButton provider="github" variant="github" />
        <SignInButton provider="google" variant="google" />
      </div>
    </div>
  );
};
