import { notFound } from "next/navigation";
import { PreviewClient } from "./PreviewClient";

export default function PreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto max-w-5xl p-8 space-y-12">
      <header>
        <h1 className="text-2xl font-bold">Component Preview</h1>
        <p className="text-sm text-gray-500">Dev-only showcase for shared components.</p>
      </header>

      <PreviewClient />
    </main>
  );
}
