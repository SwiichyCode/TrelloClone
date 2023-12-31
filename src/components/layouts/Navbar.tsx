import { AuthButton } from "../modules/Auth/AuthButton";
import { getServerAuthSession } from "@/server/auth";

export const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className=" mb-4 flex items-center justify-end py-4">
      <p className="mr-auto italic">
        Welcome,{" "}
        <span className="font-bold">
          {session ? session?.user.email : "log in to continue"}
        </span>
      </p>
      <AuthButton />
    </nav>
  );
};
