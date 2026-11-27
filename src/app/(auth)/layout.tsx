import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden p-6 sm:p-8"
      style={{
        background: "linear-gradient(180deg, #0E4A3C 0%, #175C4A 38%, #6D8242 72%, #D4A93A 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="relative size-[1200px] max-w-none">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-24 rounded-full border border-white/10" />
          <div className="absolute inset-48 rounded-full border border-white/10" />
          <div className="absolute inset-72 rounded-full border border-white/10" />
          <div className="absolute inset-96 rounded-full border border-white/10" />
        </div>
      </div>

      <header className="relative z-10">
        <Link
          href="/"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/20"
        >
          <Image
            src="/assets/Samrajya-logo-no-text.png"
            alt="Samrajya"
            width={28}
            height={28}
            className="size-7"
            priority
          />
          <span className="text-sm font-medium tracking-tight text-white">Samrajya</span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center">{children}</main>

      <div className="relative z-10" aria-hidden />
    </div>
  );
}
