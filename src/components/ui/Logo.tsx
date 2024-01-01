import Image from "next/image";
import type { Theme } from "@/types/theme.type";
import Link from "next/link";

type Props = {
  theme: Theme;
};

export const Logo = ({ theme }: Props) => {
  return (
    <Link href="/dashboard">
      <Image
        src={
          theme === "dark"
            ? "/icons/kanban-dark-icon.svg"
            : "/icons/kanban-icon.svg"
        }
        width={152}
        height={25}
        alt="logo"
      />
    </Link>
  );
};
