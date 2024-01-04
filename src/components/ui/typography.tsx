import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

interface TitleProps extends Props {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Paragraph = ({ children, className }: Props) => {
  return <div className={cn("text-sm font-normal", className)}>{children}</div>;
};

export const Title = ({ children, className, as }: TitleProps) => {
  switch (as) {
    case "h1":
      return <h1 className={cn("text-lg font-bold", className)}>{children}</h1>;

    case "h3":
      return (
        <h3 className={cn("text-base font-bold", className)}>{children}</h3>
      );

    default:
      return <h1 className={cn("text-lg font-bold", className)}>{children}</h1>;
  }
};
