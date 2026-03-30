import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Green IT Formation | RGESN & Écoconception Numérique pour ESN',
  description:
    'Formez vos équipes aux pratiques Green IT et à l\'écoconception numérique. Formation 1 jour, 78 critères RGESN, 3 profils : Dev, QA, Chef de projet.',
  keywords: ['Green IT', 'RGESN', 'écoconception numérique', 'formation ESN', 'numérique responsable'],
  metadataBase: new URL('https://greenitlabs.tn'),
  openGraph: {
    title: 'Green IT Formation RGESN',
    description: 'La formation Green IT pensée pour les ESN françaises.',
    url: 'https://greenitlabs.tn',
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Green IT Labs',
    images: [
      {
        url: 'https://greenitlabs.tn/og-image.png',
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
    images: ['https://greenitlabs.tn/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Meta tags additionnels pour Messenger et partage Facebook */}
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* fb:app_id optionnel - Créez une app Facebook sur developers.facebook.com si nécessaire */}
        <meta property="fb:app_id" content="4315636788682852" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
