import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Green IT Formation | RGESN & Écoconception Numérique pour ESN',
  description:
    'Formez vos équipes aux pratiques Green IT et à l\'écoconception numérique. Formation 1 jour, 78 critères RGESN, 3 profils : Dev, QA, Chef de projet.',
  keywords: ['Green IT', 'RGESN', 'écoconception numérique', 'formation ESN', 'numérique responsable'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3005'),
  openGraph: {
    title: 'Green IT Formation RGESN',
    description: 'La formation Green IT pensée pour les ESN françaises.',
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Green IT Labs',
    images: [
      {
        url: '/og-image.jpg', // Image dans /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'Green IT Formation - RGESN & Écoconception',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Green IT Formation RGESN',
    description: 'La formation Green IT pensée pour les ESN françaises.',
    images: ['/og-image.jpg'],
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
