import { Logo } from "@/components/ui/Logo";
import { SignInButton } from "@/components/modules/Auth/SignInButton";

export const SignInCard = () => {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-8">
      <Logo />
      <div className="flex w-full flex-col gap-4">
        <SignInButton provider="discord" variant="discord" />
        <SignInButton provider="github" variant="github" />
        <SignInButton provider="google" variant="google" />
      </div>
    </div>
  );
};
