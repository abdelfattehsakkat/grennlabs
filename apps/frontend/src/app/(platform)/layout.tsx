import { AuthProvider } from '@/lib/auth';

export default function PlatformRootLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
