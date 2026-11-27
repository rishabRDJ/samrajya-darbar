import type { ReactNode } from 'react';
import { BrandShell } from '@/components/brand/BrandShell';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <BrandShell>{children}</BrandShell>;
}
