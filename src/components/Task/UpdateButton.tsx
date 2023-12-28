import { Button } from "../ui/button";

type Props = {
  isEditing: boolean | undefined;
  setIsEditing: (isEditing: boolean) => void;
  onConfirm: () => void;
};

export const UpdateButton = ({ isEditing, setIsEditing, onConfirm }: Props) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    isEditing ? onConfirm() : setIsEditing(true);
  };

  return (
    <>
      {isEditing && <Button onClick={() => setIsEditing(false)}>Cancel</Button>}

      <Button onClick={handleClick} variant={isEditing ? "success" : "default"}>
        {isEditing ? "Confirm" : "Edit"}
      </Button>
    </>
  );
};
