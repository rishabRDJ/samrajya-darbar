import type { CSSProperties } from "react";

export type Size = "sm" | "md" | "lg";

export const wrapper: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  width: "100%",
  position: "relative",
};

export const labelStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "#374151",
  cursor: "pointer",
};

export const requiredMark: CSSProperties = {
  color: "#dc2626",
  marginLeft: 2,
};

export const sizes: Record<Size, CSSProperties> = {
  sm: { height: 32, padding: "0 10px", fontSize: 13 },
  md: { height: 40, padding: "0 12px", fontSize: 14 },
  lg: { height: 48, padding: "0 14px", fontSize: 16 },
};

export const trigger: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  width: "100%",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#d1d5db",
  borderRadius: 6,
  backgroundColor: "#ffffff",
  color: "#111827",
  cursor: "pointer",
  fontFamily: "inherit",
  textAlign: "left",
  transition: "border-color 150ms, box-shadow 150ms",
};

export const triggerOpen: CSSProperties = {
  borderColor: "#2563eb",
  boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.15)",
};

export const triggerError: CSSProperties = {
  borderColor: "#dc2626",
};

export const triggerDisabled: CSSProperties = {
  backgroundColor: "#f3f4f6",
  cursor: "not-allowed",
  opacity: 0.6,
};

export const placeholderStyle: CSSProperties = {
  color: "#9ca3af",
};

export const chevron: CSSProperties = {
  flexShrink: 0,
  color: "#6b7280",
  transition: "transform 150ms",
};

export const chevronOpen: CSSProperties = {
  transform: "rotate(180deg)",
};

export const popover: CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  marginTop: 4,
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  zIndex: 50,
  maxHeight: 280,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export const search: CSSProperties = {
  width: "100%",
  height: 36,
  padding: "0 10px",
  border: "none",
  borderBottom: "1px solid #e5e7eb",
  outline: "none",
  fontSize: 13,
  fontFamily: "inherit",
  backgroundColor: "#ffffff",
};

export const listbox: CSSProperties = {
  overflowY: "auto",
  padding: 4,
  margin: 0,
  listStyle: "none",
};

export const option = (active: boolean, selected: boolean, disabled: boolean): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 10px",
  borderRadius: 4,
  cursor: disabled ? "not-allowed" : "pointer",
  backgroundColor: active ? "#eff6ff" : "transparent",
  color: disabled ? "#9ca3af" : "#111827",
  fontWeight: selected ? 600 : 400,
  opacity: disabled ? 0.6 : 1,
});

export const optionText: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
};

export const optionLabel: CSSProperties = {
  fontSize: 14,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const optionDesc: CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const checkIcon: CSSProperties = {
  color: "#2563eb",
  flexShrink: 0,
};

export const empty: CSSProperties = {
  padding: 12,
  fontSize: 13,
  color: "#9ca3af",
  textAlign: "center",
};

export const helper: CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
  minHeight: 16,
};

export const errorText: CSSProperties = {
  fontSize: 12,
  color: "#dc2626",
  minHeight: 16,
};
