import React, { type PropsWithChildren } from "react";
import { Navbar } from "@/components/modules/Workspace/layouts/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen bg-[#1D2125] text-[#99A3AE]">
      <Navbar />
      <div className="px-8">{children}</div>
      <Toaster />
    </div>
  );
}
