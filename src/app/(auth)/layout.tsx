import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { BrandShell } from "@/components/brand/BrandShell";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <BrandShell>
      <header className="relative z-10 flex items-center p-6 sm:p-8">
        <BrandMark />
      </header>
      <main className="relative z-10 flex flex-1 items-center justify-center p-6 pb-10 sm:p-8">
        {children}
      </main>
    </BrandShell>
  );
}
