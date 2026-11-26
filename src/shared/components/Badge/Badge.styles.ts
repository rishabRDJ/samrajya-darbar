import type { CSSProperties } from 'react';

export type Variant = 'neutral' | 'success' | 'danger' | 'warning' | 'info';
export type Size = 'sm' | 'md' | 'lg';

export const base: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  borderRadius: 9999,
  fontWeight: 500,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  border: '1px solid transparent',
};

export const sizes: Record<Size, CSSProperties> = {
  sm: { padding: '2px 8px', fontSize: 11 },
  md: { padding: '4px 10px', fontSize: 12 },
  lg: { padding: '6px 12px', fontSize: 14 },
};

export const variants: Record<Variant, CSSProperties> = {
  neutral: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    borderColor: '#e5e7eb',
  },
  success: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
    borderColor: '#bbf7d0',
  },
  danger: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    borderColor: '#fecaca',
  },
  warning: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    borderColor: '#fde68a',
  },
  info: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    borderColor: '#bfdbfe',
  },
};

export const dotColors: Record<Variant, string> = {
  neutral: '#6b7280',
  success: '#16a34a',
  danger: '#dc2626',
  warning: '#d97706',
  info: '#2563eb',
};

export const dotWrap: CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  width: 6,
  height: 6,
};

export const dotCore: CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: 9999,
};

export const dotPing: CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: 9999,
  opacity: 0.75,
  animation: 'samrajya-ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite',
};

export const iconSizes: Record<Size, CSSProperties> = {
  sm: { width: 12, height: 12, display: 'inline-flex' },
  md: { width: 14, height: 14, display: 'inline-flex' },
  lg: { width: 16, height: 16, display: 'inline-flex' },
};
