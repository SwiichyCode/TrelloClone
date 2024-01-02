import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { WorkspaceAside } from "@/components/modules/Workspace/layouts/Aside";
import { Locale, getDictionary } from "../dictionaries/dictionaries";

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function DashboardPage({ params: { lang } }: Props) {
  const session = await getServerAuthSession();
  const workspace = await db.workspace.findMany({
    where: {
      createdById: session?.user.id,
    },
  });

  const intl = await getDictionary(lang);

  return (
    <main className="m-auto max-w-6xl">
      {intl.test}
      <WorkspaceAside workspace={workspace} />
    </main>
  );
}
