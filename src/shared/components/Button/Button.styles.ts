import type { CSSProperties } from "react";

export type Variant = "primary" | "secondary" | "ghost" | "danger";
export type Size = "sm" | "md" | "lg";

export const base: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontWeight: 500,
  borderRadius: 6,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",
  cursor: "pointer",
  transition: "background-color 150ms, color 150ms, border-color 150ms",
  textDecoration: "none",
  fontFamily: "inherit",
  lineHeight: 1,
};

export const variants: Record<Variant, CSSProperties> = {
  primary: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
  },
  secondary: {
    backgroundColor: "#e5e7eb",
    color: "#111827",
    borderColor: "#e5e7eb",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#111827",
  },
  danger: {
    backgroundColor: "#dc2626",
    color: "#ffffff",
  },
};

export const variantsHover: Record<Variant, CSSProperties> = {
  primary: { backgroundColor: "#1d4ed8" },
  secondary: { backgroundColor: "#d1d5db", borderColor: "#d1d5db" },
  ghost: { backgroundColor: "#f3f4f6" },
  danger: { backgroundColor: "#b91c1c" },
};

export const sizes: Record<Size, CSSProperties> = {
  sm: { height: 32, padding: "0 12px", fontSize: 13 },
  md: { height: 40, padding: "0 16px", fontSize: 14 },
  lg: { height: 48, padding: "0 24px", fontSize: 16 },
};

export const iconOnlySizes: Record<Size, CSSProperties> = {
  sm: { height: 32, width: 32, padding: 0 },
  md: { height: 40, width: 40, padding: 0 },
  lg: { height: 48, width: 48, padding: 0 },
};

export const disabledStyle: CSSProperties = {
  opacity: 0.5,
  cursor: "not-allowed",
};

export const fullWidthStyle: CSSProperties = { width: "100%" };

export const srOnly: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export const spinnerStyle: CSSProperties = {
  width: 16,
  height: 16,
  animation: "samrajya-spin 1s linear infinite",
};
