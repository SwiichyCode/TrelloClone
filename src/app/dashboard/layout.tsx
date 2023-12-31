import React, { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/modules/Dashboard/Navbar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen bg-[#1D2125] text-[#99A3AE]">
      <Navbar />
      <div className="px-8">{children}</div>
      <Toaster />
    </div>
  );
}
