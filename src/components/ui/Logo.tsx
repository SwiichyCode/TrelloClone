import Link from "next/link";
import Image from "next/image";
import type { Theme } from "@/types/theme.type";
import config from "@/constants/url.constant";

type Props = {
  theme?: Theme;
};

export const Logo = ({ theme }: Props) => {
  return (
    <Link href={config.url.WORKSPACE_URL()}>
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
