import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "./ui/button";

export const AuthButton = async () => {
  const session = await getServerAuthSession();

  return (
    <Button>
      <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
        {session ? "Logout" : "Login"}
      </Link>
    </Button>
  );
};
