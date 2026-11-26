import type { CSSProperties } from 'react';

export type Variant = 'vertical' | 'horizontal' | 'square';

export const base: CSSProperties = {
  display: 'block',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  backgroundColor: '#ffffff',
  color: '#111827',
  textDecoration: 'none',
  overflow: 'hidden',
};

export const interactive: CSSProperties = {
  cursor: 'pointer',
  transition: 'border-color 150ms, box-shadow 150ms',
};

export const interactiveHover: CSSProperties = {
  borderColor: '#d1d5db',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
};

export const variants: Record<Variant, CSSProperties> = {
  vertical: { display: 'flex', flexDirection: 'column' },
  horizontal: { display: 'flex', flexDirection: 'row', gap: 16 },
  square: { display: 'flex', flexDirection: 'column', aspectRatio: '1 / 1' },
};

export const mediaBox: Record<Variant, CSSProperties> = {
  vertical: { width: '100%', overflow: 'hidden' },
  horizontal: { width: 128, flexShrink: 0, overflow: 'hidden' },
  square: { width: '100%', overflow: 'hidden' },
};

export const body: CSSProperties = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  padding: 16,
};

export const header: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 12,
  marginBottom: 8,
};

export const headerLeft: CSSProperties = {
  minWidth: 0,
  flex: 1,
};

export const title: CSSProperties = {
  fontWeight: 600,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const subtitle: CSSProperties = {
  fontSize: 13,
  color: '#6b7280',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const headerRight: CSSProperties = {
  flexShrink: 0,
};

export const content: CSSProperties = {
  flex: 1,
};

export const footer: CSSProperties = {
  marginTop: 12,
  paddingTop: 12,
  borderTop: '1px solid #f3f4f6',
};
