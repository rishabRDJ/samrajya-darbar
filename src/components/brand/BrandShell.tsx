import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "./LogoutButton";

type Props = {
  children: ReactNode;
  brandHref?: string;
  showLogout?: boolean;
};

export function BrandShell({ children, brandHref = "/", showLogout = false }: Props) {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0E4A3C 0%, #175C4A 38%, #6D8242 72%, #D4A93A 100%)",
      }}
    >
      <header className="relative z-10 flex items-center justify-between">
        <Link
          href={brandHref}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur-md"
        >
          <Image
            src="/assets/samrajya-logo-no-text.png"
            alt="Samrajya"
            width={28}
            height={28}
            className="size-7"
            priority
          />
          <span className="text-sm font-medium tracking-tight text-white">Samrajya</span>
        </Link>
        {showLogout && <LogoutButton />}
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center">{children}</main>

      <div className="relative z-10" aria-hidden />
    </div>
  );
}
