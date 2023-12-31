import React, { PropsWithChildren } from "react";
import { LogoutButton } from "@/components/modules/Auth/LogoutButton";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <LogoutButton />
      {children}
    </div>
  );
}
