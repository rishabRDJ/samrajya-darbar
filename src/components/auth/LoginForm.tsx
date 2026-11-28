"use client";

import { LuLock, LuLogIn, LuMail } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authApi } from "@/api";
import { ApiError } from "@/lib/http/types";
import { Button } from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input";

type FieldErrors = {
  identifier?: string;
  password?: string;
};

function mapApiError(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 401) return "Invalid email/username or password";
    if (err.status === 429) return "Too many login attempts. Please wait a minute and try again.";
  }
  return "Something went wrong. Please try again.";
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showRegisteredBanner = searchParams.get("registered") === "1";
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!identifier.trim()) next.identifier = "Email or username is required";
    if (!password) next.password = "Password is required";
    else if (password.length < 8) next.password = "Password must be at least 8 characters";
    return next;
  };

  const canSubmit = identifier.trim().length > 0 && password.length >= 8;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBanner(null);
    setLoading(true);
    try {
      await authApi.login({ identifier: identifier.trim(), password });
      router.push("/dashboard");
    } catch (err) {
      setBanner(mapApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-[420px] rounded-3xl border border-white/70 bg-white/85 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8"
    >
      <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border border-zinc-100 bg-white shadow-md">
        <LuLogIn className="size-5 text-[#0E4A3C]" />
      </div>

      <h1 className="mb-6 text-center text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
        Sign in with email or username
      </h1>

      {showRegisteredBanner && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-bull-green-200 bg-bull-green-100 px-3 py-2 text-sm text-bull-green-800"
        >
          Account created — please sign in
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Input
          name="identifier"
          type="text"
          value={identifier}
          onChange={(v) => {
            setIdentifier(v);
            if (errors.identifier) setErrors((e) => ({ ...e, identifier: undefined }));
          }}
          onBlur={() => {
            if (!identifier.trim())
              setErrors((e) => ({ ...e, identifier: "Email or username is required" }));
          }}
          placeholder="Email or username"
          autoComplete="username"
          prefix={<LuMail size={16} />}
          error={errors.identifier}
          disabled={loading}
          showError={Boolean(errors.identifier)}
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
          }}
          onBlur={() => {
            if (!password) setErrors((e) => ({ ...e, password: "Password is required" }));
          }}
          placeholder="Password"
          autoComplete="current-password"
          prefix={<LuLock size={16} />}
          error={errors.password}
          disabled={loading}
          showError={Boolean(errors.password)}
        />
      </div>

      {banner && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {banner}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Button
          text={loading ? "Signing in…" : "Login"}
          type="submit"
          fullWidth
          loading={loading}
          disabled={loading || !canSubmit}
          className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-zinc-950 font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <Button
          text="Register"
          href="/register"
          fullWidth
          className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200/90 bg-white font-medium text-zinc-900 shadow-xs transition-colors hover:bg-zinc-50"
        />
      </div>
    </form>
  );
}
