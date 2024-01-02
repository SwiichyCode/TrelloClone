import Image from "next/image";
import Link from "next/link";
import type { Theme } from "@/types/theme.type";

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
