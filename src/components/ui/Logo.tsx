import Link from "next/link";
import Image from "next/image";
import config from "@/constants/url.constant";
import type { Theme } from "@/types";

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
