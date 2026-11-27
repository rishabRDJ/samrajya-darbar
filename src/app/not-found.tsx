import Link from 'next/link';
import { BrandShell } from '@/components/brand/BrandShell';

export default function NotFound() {
  return (
    <BrandShell>
      <div className="w-full max-w-[520px] rounded-3xl border border-white/70 bg-white/85 p-10 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
        <p className="text-sm font-medium tracking-[0.2em] text-zinc-500">
          ERROR
        </p>
        <h1 className="mt-2 text-6xl font-semibold tracking-tight text-zinc-900">
          404
        </h1>
        <p className="mt-3 text-base text-zinc-600">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800"
        >
          Back to dashboard
        </Link>
      </div>
    </BrandShell>
  );
}
