"use client";
import Link from "next/link";
import config from "@/constants/url.constant";
import type { WorkspaceMember } from "@prisma/client";
import { usePathname } from "next/navigation";
import { cn, getLastSegmentFromUrl } from "@/lib/utils";

type Props = {
  workspaceMembers: WorkspaceMember[];
  params: string;
};

export const WorkspaceMembersNavigation = ({
  workspaceMembers,
  params,
}: Props) => {
  const pathname = usePathname();

  const navItems = (membersLength: number) => [
    {
      name: `Membres de l'espace de travail (${membersLength})`,
      href: `${config.url.WORKSPACE_MEMBERS_URL(params)}`,
    },
    {
      name: "Invités",
      href: `${config.url.WORKSPACE_MEMBERS_GUEST_URL(params)}`,
    },
    {
      name: "En attente",
      href: `${config.url.WORKSPACE_MEMBERS_REQUEST_URL(params)}`,
    },
  ];

  const handleActiveClass = (isActive: boolean) =>
    isActive && "bg-[#1C2B41] text-[#5498F7]";

  return (
    <aside className="font-semibold">
      <h2 className="mb-4 text-xl">Membres</h2>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="px-3 py-2 text-xs">
            Membres de tableaux d'espace de travail
          </h1>
          <nav className="flex flex-col gap-2 text-sm">
            {navItems(workspaceMembers.length).map((item, index) => {
              const isActive = pathname.endsWith(
                getLastSegmentFromUrl(item.href),
              );

              return (
                <Link
                  href={item.href}
                  key={index}
                  className={cn(
                    "rounded-md px-3 py-2",
                    handleActiveClass(isActive),
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};
