'use client';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';

export default function NotFound() {
  const { t } = useLang();
  return (
    <section className="e404" aria-labelledby="nf">
      <div>
        <h1 className="black statement" id="nf">QUESTA PAGINA È STATA MANGIATA.</h1>
        <p className="body" style={{ marginTop: 24 }}>{t('404.sub')}</p>
        <p className="mono" style={{ marginTop: 16, opacity: 0.8 }}>{t('404.nonna')}</p>
        <Link href="/" className="link" style={{ display: 'inline-block', marginTop: 40 }}>{t('404.link')}</Link>
      </div>
      <img src="/img/empty-plate-404.webp" alt="" width={420} height={420} />
    </section>
  );
}
