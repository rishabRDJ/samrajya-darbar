import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function BrandShell({ children }: Props) {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0E4A3C 0%, #175C4A 38%, #6D8242 72%, #D4A93A 100%)",
      }}
    >
      {children}
    </div>
  );
}
