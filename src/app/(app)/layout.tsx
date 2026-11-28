import type { ReactNode } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { BrandShell } from "@/components/brand/BrandShell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <BrandShell>
      <AppHeader />
      <main className="relative z-10 flex flex-1 flex-col p-4 sm:p-6">
        {children}
      </main>
    </BrandShell>
  );
}
