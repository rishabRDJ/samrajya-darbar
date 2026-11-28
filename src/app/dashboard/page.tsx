import { BrandShell } from '@/components/brand/BrandShell';

export default function DashboardPage() {
  return (
    <BrandShell brandHref="/dashboard" showLogout>
      <div className="w-full max-w-[520px] rounded-3xl border border-white/70 bg-white/85 p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Welcome to Samrajya
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Your dashboard will appear here soon.
        </p>
      </div>
    </BrandShell>
  );
}
