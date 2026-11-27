import type { CSSProperties } from 'react';

export type Variant = 'underline' | 'pills' | 'segmented';
export type Size = 'sm' | 'md';

export const wrapper: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

export const wrapperVariants: Record<Variant, CSSProperties> = {
  underline: {
    borderBottom: '1px solid #e5e7eb',
    gap: 8,
  },
  pills: {
    gap: 4,
  },
  segmented: {
    display: 'inline-flex',
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    padding: 4,
    gap: 4,
  },
};

export const sizes: Record<Size, CSSProperties> = {
  sm: { height: 32, padding: '0 12px', fontSize: 13 },
  md: { height: 40, padding: '0 16px', fontSize: 14 },
};

export const tabBase: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontWeight: 500,
  borderRadius: 6,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'color 150ms, background-color 150ms, border-color 150ms',
  fontFamily: 'inherit',
  color: '#4b5563',
};

export const tabUnderlineBase: CSSProperties = {
  borderRadius: 0,
  borderBottomWidth: 2,
  borderBottomStyle: 'solid',
  borderBottomColor: 'transparent',
  marginBottom: -1,
};

export const tabUnderlineActive: CSSProperties = {
  borderBottomColor: '#2563eb',
  color: '#2563eb',
};

export const tabPillsActive: CSSProperties = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
};

export const tabSegmentedActive: CSSProperties = {
  backgroundColor: '#ffffff',
  color: '#111827',
  boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
};

export const tabDisabled: CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
};

export const badgeBase: CSSProperties = {
  marginLeft: 4,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 9999,
  padding: '2px 8px',
  fontSize: 11,
  backgroundColor: '#e5e7eb',
  color: '#374151',
};

export const badgeOnActivePill: CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.25)',
  color: 'inherit',
};
