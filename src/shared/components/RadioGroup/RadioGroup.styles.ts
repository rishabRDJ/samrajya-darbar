import type { CSSProperties } from 'react';

export type Size = 'sm' | 'md' | 'lg';

export const ringSize: Record<Size, number> = { sm: 14, md: 16, lg: 20 };
export const fontForSize: Record<Size, number> = { sm: 13, md: 14, lg: 16 };

export const fieldset: CSSProperties = {
  border: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

export const legend: CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: '#374151',
  marginBottom: 2,
  padding: 0,
};

export const list = (direction: 'vertical' | 'horizontal'): CSSProperties => ({
  display: 'flex',
  flexDirection: direction === 'vertical' ? 'column' : 'row',
  gap: direction === 'vertical' ? 8 : 16,
  flexWrap: 'wrap',
});

export const item: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'flex-start',
  gap: 8,
  cursor: 'pointer',
};

export const itemDisabled: CSSProperties = {
  cursor: 'not-allowed',
  opacity: 0.6,
};

export const ring = (
  size: Size,
  selected: boolean,
  error: boolean,
  focused: boolean
): CSSProperties => {
  const s = ringSize[size];
  return {
    position: 'relative',
    width: s,
    height: s,
    borderRadius: 9999,
    border: `1px solid ${error ? '#dc2626' : selected ? '#2563eb' : '#d1d5db'}`,
    backgroundColor: '#ffffff',
    transition: 'border-color 150ms, box-shadow 150ms',
    flexShrink: 0,
    marginTop: 1,
    boxShadow: focused ? '0 0 0 3px rgba(37, 99, 235, 0.25)' : undefined,
  };
};

export const dot = (size: Size): CSSProperties => {
  const s = ringSize[size];
  const d = Math.max(6, Math.floor(s / 2));
  return {
    position: 'absolute',
    top: (s - d) / 2 - 1,
    left: (s - d) / 2 - 1,
    width: d,
    height: d,
    borderRadius: 9999,
    backgroundColor: '#2563eb',
  };
};

export const textCol: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export const label = (size: Size): CSSProperties => ({
  fontSize: fontForSize[size],
  fontWeight: 500,
  color: '#111827',
  lineHeight: 1.3,
});

export const description: CSSProperties = {
  fontSize: 12,
  color: '#6b7280',
  marginTop: 2,
};

export const errorText: CSSProperties = {
  fontSize: 12,
  color: '#dc2626',
  marginTop: 4,
};

export const srOnly: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
};
