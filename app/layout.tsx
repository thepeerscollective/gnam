import type { Metadata, Viewport } from 'next';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';
import { LangProvider } from '@/lib/i18n';
import { SoundProvider } from '@/lib/sound';
import Nav from '@/components/Nav';
import Loading from '@/components/Loading';
import Skip from '@/components/Skip';


export const metadata: Metadata = {
  title: 'GNAM · trattoria, kraków',
  description: 'pizza, pasta, dolci, vino. six tables on ul. józefa. a concept project by the peers collective.',
  openGraph: { title: 'GNAM · trattoria, kraków', description: 'pizza · pasta · dolci · vino', images: ['/og.png'] },
  icons: { icon: '/favicon.svg' },
};
export const viewport: Viewport = { themeColor: '#e5321b', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <LangProvider>
          <SoundProvider>
            <Skip />
            <Loading />
            <Nav />
            <main id="main">{children}</main>
          </SoundProvider>
        </LangProvider>
      </body>
    </html>
  );
}
