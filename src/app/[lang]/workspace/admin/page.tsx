import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { UpdateRoleForm } from "@/components/modules/Admin/UpdateRole/UpdateRoleForm";
import { DeleteAccountForm } from "@/components/modules/Admin/DeleteAccount/DeleteAccountForm";

export default async function AdminPage() {
  const session = await getServerAuthSession();

  if (session?.user.role !== "admin") {
    return <div>Access denied</div>;
  }

  const users = await db.user.findMany();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-4">
          <p>{user.email}</p>
          <p>{user.name}</p>
          <p>{user.role}</p>
          <UpdateRoleForm user={user} />
          <DeleteAccountForm user={user} />
        </div>
      ))}
    </div>
  );
}
