"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuLogOut, LuSearch } from "react-icons/lu";
import { authApi, fyersApi, usersApi } from "@/api";
import { BrandMark } from "@/components/brand/BrandMark";

const FYERS_POLL_MS = 5 * 60 * 1000;

export function AppHeader() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [connected, setConnected] = useState<boolean | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [search, setSearch] = useState("");
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    usersApi
      .getMe()
      .then((me) => {
        if (mountedRef.current) setRole(me.role);
      })
      .catch(() => {
        if (mountedRef.current) setRole(null);
      });
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (role !== "admin") return;
    let cancelled = false;
    const fetchStatus = () => {
      fyersApi
        .getStatus()
        .then((s) => {
          if (!cancelled) setConnected(s.connected);
        })
        .catch(() => {
          if (!cancelled) setConnected(null);
        });
    };
    fetchStatus();
    const id = window.setInterval(fetchStatus, FYERS_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [role]);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const { url } = await fyersApi.getLoginUrl();
      window.location.href = url;
    } catch {
      setConnecting(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authApi.logout();
    } finally {
      router.push("/");
      router.refresh();
    }
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <header className="relative z-10 flex items-center justify-between gap-4 p-4 sm:p-6">
      <div className="flex min-w-0 items-center">
        <BrandMark href="/dashboard" />
      </div>

      <div className="flex min-w-0 flex-1 justify-center">
        <form onSubmit={handleSearchSubmit} role="search" className="w-full max-w-xl">
          <label className="flex h-10 w-full items-center gap-2 rounded-full bg-white/15 px-4 ring-1 ring-white/20 backdrop-blur-md focus-within:bg-white/25 focus-within:ring-white/40">
            <LuSearch size={16} className="shrink-0 text-white/70" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search…"
              aria-label="Search"
              className="w-full flex-1 cursor-text border-0 bg-transparent p-0 text-sm text-white outline-none placeholder:text-white/60"
            />
          </label>
        </form>
      </div>

      <div className="flex items-center gap-2">
        {role === "admin" &&
          (connected ? (
            <span
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-md"
              title="Fyers is connected"
            >
              <span
                aria-hidden
                className="size-2 rounded-full bg-bull-green-400 shadow-[0_0_6px_rgba(46,204,113,0.8)]"
              />
              Connected
            </span>
          ) : (
            <button
              type="button"
              onClick={handleConnect}
              disabled={connecting}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-samrajya-gold-500 px-3 py-1.5 text-sm font-medium text-jade-green-900 ring-1 ring-samrajya-gold-300 transition-colors hover:bg-samrajya-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {connecting ? "Connecting…" : "Connect"}
            </button>
          ))}

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          aria-label="Log out"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LuLogOut size={16} />
          <span>{loggingOut ? "Logging out…" : "Logout"}</span>
        </button>
      </div>
    </header>
  );
}
