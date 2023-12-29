import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "./button";

export const AuthButton = async () => {
  const session = await getServerAuthSession();

  return (
    <Button>
      <Link href={session ? "/api/auth/signout" : "/auth/signin"}>
        {session ? "Logout" : "Login"}
      </Link>
    </Button>
  );
};
