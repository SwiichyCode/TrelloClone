import { getServerAuthSession } from "@/server/auth";
import { Logo } from "@/components/ui/Logo";
import { DropdownAccount } from "@/components/modules/Dashboard/DropdownAccount";
import { DropdownWorkspace } from "@/components/modules/Dashboard/DropdownWorkspace";

export const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="flex w-full justify-between px-8 py-4">
      <div className="flex items-center space-x-6">
        <Logo theme="dark" />
        <DropdownWorkspace />
      </div>
      {session && <DropdownAccount session={session} />}
    </nav>
  );
};
