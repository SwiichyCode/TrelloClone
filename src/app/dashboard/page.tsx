import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <p>DashboardPage</p>
      <Link href="/dashboard/admin">Admin</Link>
    </div>
  );
}
