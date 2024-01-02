import { cn, getFirstLetter } from "@/lib/utils";

interface Props {
  name: string;
  logo: string;
  asNavigation?: boolean;
}

export const WorkspaceLogo = ({ name, logo, asNavigation }: Props) => {
  const firstLetter = getFirstLetter(name);
  const isHTTPImg = logo.includes("http");
  const handleBg = cn(
    isHTTPImg
      ? `bg-center bg-contain bg-no-repeat`
      : `bg-gradient-to-b ${logo}`,
  );
  const handleWidth = cn(asNavigation ? `w-6 h-6` : `w-10 h-10`);
  const handleText = cn(asNavigation ? `text-sm` : `text-2xl`);

  return (
    <div
      className={`flex items-center justify-center rounded ${handleWidth} ${handleBg}`}
      style={{ backgroundImage: `url(${logo})` }}
    >
      <span className={`font-semibold text-white ${handleText}`}>
        {firstLetter}
      </span>
    </div>
  );
};
