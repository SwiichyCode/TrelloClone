import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  className?: string;
  imageUrl?: string;
}

export const AvatarAccount = ({ className, imageUrl }: Props) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
