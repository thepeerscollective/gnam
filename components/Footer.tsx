'use client';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLang();
  const ext = (href: string, label: string) => (
    <a className="link" href={href} target="_blank" rel="noopener">
      {label} <span className="sr">{t('footer.newtab')}</span>
    </a>
  );
  return (
    <footer className="footer">
      <div className="black footer__big" aria-hidden>CARBONARA</div>
      <a className="black footer__mail" href="mailto:ciao@gnam.pl">ciao@gnam.pl</a>
      <div className="footer__links">
        {ext('https://instagram.com', 'INSTAGRAM')}
        {ext('https://tiktok.com', 'TIKTOK')}
        <Link className="link" href="/prenota">PRENOTA</Link>
        <a className="link" href="tel:+48120000000">CHIAMA</a>
        {ext('https://www.pyszne.pl', 'PYSZNE ↗')}
        {ext('https://glovoapp.com', 'GLOVO ↗')}
        {ext('https://wolt.com', 'WOLT ↗')}
      </div>
      <div className="footer__meta">
        <span className="caption">{t('footer.simmer')}</span>
        <Link className="caption" href="/prenota">{t('footer.free')}</Link>
        <span className="mono">{t('footer.receipt')}</span>
      </div>
      <div className="footer__legal">
        <span className="caption">GNAM sp. z o.o. · ul. Józefa 12, 31-000 Kraków · NIP 000-000-00-00</span>
        <Link className="caption" href="/privacy">{t('footer.privacy')}</Link>
        <Link className="caption" href="/menu#allergeni">{t('footer.allergens')}</Link>
        <span className="caption">{t('footer.cookies')}</span>
        <a className="caption" href="https://thepeerscollective.com" target="_blank" rel="noopener">{t('footer.credit')}</a>
      </div>
    </footer>
  );
}
