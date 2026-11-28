import type { CSSProperties } from "react";

export type Size = "sm" | "md" | "lg";

type Dims = { trackW: number; trackH: number; thumb: number; pad: number };

export const dims: Record<Size, Dims> = {
  sm: { trackW: 28, trackH: 16, thumb: 12, pad: 2 },
  md: { trackW: 36, trackH: 20, thumb: 16, pad: 2 },
  lg: { trackW: 44, trackH: 24, thumb: 20, pad: 2 },
};

export const row: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  cursor: "pointer",
};

export const rowDisabled: CSSProperties = {
  cursor: "not-allowed",
  opacity: 0.6,
};

export const track = (size: Size, checked: boolean, error: boolean): CSSProperties => {
  const d = dims[size];
  return {
    position: "relative",
    display: "inline-block",
    width: d.trackW,
    height: d.trackH,
    borderRadius: 9999,
    backgroundColor: checked ? "#2563eb" : "#d1d5db",
    transition: "background-color 150ms",
    flexShrink: 0,
    boxShadow: error ? "0 0 0 2px #dc2626" : undefined,
  };
};

export const thumb = (size: Size, checked: boolean): CSSProperties => {
  const d = dims[size];
  const offset = checked ? d.trackW - d.thumb - d.pad : d.pad;
  return {
    position: "absolute",
    top: d.pad,
    left: offset,
    width: d.thumb,
    height: d.thumb,
    borderRadius: 9999,
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    transition: "left 150ms",
  };
};

export const textCol: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

export const label: CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: "#111827",
};

export const description: CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
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
