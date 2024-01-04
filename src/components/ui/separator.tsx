import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const variants = cva("pb-4 mb-8", {
  variants: {
    direction: {
      row: "flex flex-row gap-4",
      column: "flex flex-col gap-4",
    },
    position: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
    withSeparator: {
      true: "border-b border-[#333C43]",
      false: "",
    },
  },
  defaultVariants: {
    withSeparator: false,
    direction: "row",
    position: "start",
    justify: "start",
  },
});

interface ContainerWithSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {
  isLastChild?: boolean;
}

export const Container = ({
  children,
  className,
  direction,
  position,
  justify,
  withSeparator,
}: ContainerWithSeparatorProps) => {
  return (
    <div
      className={cn(
        variants({ direction, position, justify, withSeparator, className }),
      )}
    >
      {children}
    </div>
  );
};
