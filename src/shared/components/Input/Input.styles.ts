import type { CSSProperties } from 'react';

export type Size = 'sm' | 'md' | 'lg';

export const colors = {
  border: '#d1d5db',
  borderFocus: '#2563eb',
  borderError: '#dc2626',
  bg: '#ffffff',
  bgDisabled: '#f3f4f6',
  text: '#111827',
  placeholder: '#9ca3af',
  helper: '#6b7280',
  error: '#dc2626',
  label: '#374151',
};

export const wrapper: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  width: '100%',
};

export const labelStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: colors.label,
  cursor: 'pointer',
};

export const requiredMark: CSSProperties = {
  color: colors.error,
  marginLeft: 2,
};

export const field: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: colors.border,
  borderRadius: 6,
  backgroundColor: colors.bg,
  transition: 'border-color 150ms, box-shadow 150ms',
};

export const fieldFocus: CSSProperties = {
  borderColor: colors.borderFocus,
  boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.15)`,
};

export const fieldError: CSSProperties = {
  borderColor: colors.borderError,
};

export const fieldErrorFocus: CSSProperties = {
  boxShadow: `0 0 0 3px rgba(220, 38, 38, 0.15)`,
};

export const fieldDisabled: CSSProperties = {
  backgroundColor: colors.bgDisabled,
  cursor: 'not-allowed',
  opacity: 0.6,
};

export const sizes: Record<Size, CSSProperties> = {
  sm: { height: 32, padding: '0 10px', fontSize: 13 },
  md: { height: 40, padding: '0 12px', fontSize: 14 },
  lg: { height: 48, padding: '0 14px', fontSize: 16 },
};

export const input: CSSProperties = {
  flex: 1,
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  color: colors.text,
  fontFamily: 'inherit',
  width: '100%',
  padding: 0,
};

export const inputDisabled: CSSProperties = {
  cursor: 'not-allowed',
};

export const affix: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  color: colors.helper,
  flexShrink: 0,
};

export const helper: CSSProperties = {
  fontSize: 12,
  color: colors.helper,
  minHeight: 16,
};

export const errorText: CSSProperties = {
  fontSize: 12,
  color: colors.error,
  minHeight: 16,
};
