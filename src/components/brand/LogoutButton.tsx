"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { authApi } from "@/api";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
    } finally {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      aria-label="Log out"
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <LuLogOut size={16} />
      <span>{loading ? "Logging out…" : "Logout"}</span>
    </button>
  );
}
