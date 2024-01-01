import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export default async function ArrayPage({
  params,
}: {
  params: { board: string };
}) {
  const session = await getServerAuthSession();
  const board = await db.workspace.findFirst({
    where: { createdById: session?.user.id, slug: params.board },
  });

  console.log(board);

  return <div>My array: {params.board}</div>;
}
