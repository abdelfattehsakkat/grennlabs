import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Green IT Formation | RGESN & Écoconception Numérique pour ESN',
  description:
    'Formez vos équipes aux pratiques Green IT et à l\'écoconception numérique. Formation 1 jour, 78 critères RGESN, 3 profils : Dev, QA, Chef de projet.',
  keywords: ['Green IT', 'RGESN', 'écoconception numérique', 'formation ESN', 'numérique responsable'],
  openGraph: {
    title: 'Green IT Formation RGESN',
    description: 'La formation Green IT pensée pour les ESN françaises.',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
