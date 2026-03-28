import { AuthProvider } from '@/lib/auth';

export default function FormateurLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
