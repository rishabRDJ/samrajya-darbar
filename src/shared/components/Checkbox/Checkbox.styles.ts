import type { CSSProperties } from "react";

export type Size = "sm" | "md" | "lg";

export const boxSize: Record<Size, number> = { sm: 14, md: 16, lg: 20 };
export const fontForSize: Record<Size, number> = { sm: 13, md: 14, lg: 16 };

export const row: CSSProperties = {
  display: "inline-flex",
  alignItems: "flex-start",
  gap: 10,
  cursor: "pointer",
};

export const rowDisabled: CSSProperties = {
  cursor: "not-allowed",
  opacity: 0.6,
};

export const box = (
  size: Size,
  checked: boolean,
  indeterminate: boolean,
  error: boolean,
  focused: boolean
): CSSProperties => {
  const s = boxSize[size];
  const active = checked || indeterminate;
  return {
    position: "relative",
    width: s,
    height: s,
    borderRadius: 4,
    border: `1px solid ${error ? "#dc2626" : active ? "#2563eb" : "#d1d5db"}`,
    backgroundColor: active ? "#2563eb" : "#ffffff",
    transition: "background-color 150ms, border-color 150ms, box-shadow 150ms",
    flexShrink: 0,
    marginTop: 1,
    boxShadow: focused ? "0 0 0 3px rgba(37, 99, 235, 0.25)" : undefined,
  };
};

export const checkmark: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffffff",
  pointerEvents: "none",
};

export const textCol: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

export const label = (size: Size): CSSProperties => ({
  fontSize: fontForSize[size],
  fontWeight: 500,
  color: "#111827",
  lineHeight: 1.3,
});

export const description: CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
  marginTop: 2,
};

export const errorText: CSSProperties = {
  fontSize: 12,
  color: "#dc2626",
  marginTop: 4,
  marginLeft: 24,
};

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
