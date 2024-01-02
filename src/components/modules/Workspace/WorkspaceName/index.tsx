interface Props {
  workspaceName: string;
}

export const WorkspaceName = ({ workspaceName }: Props) => {
  return <p className=" font-semibold">{workspaceName}</p>;
};
