import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

export const GET = async (req: Request, res: Response) => {
  const session = await getServerAuthSession();

  const response = await db.task.findMany({
    where: {
      createdById: session?.user.id,
    },
  });

  return Response.json(response);
};
