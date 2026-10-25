'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import type { Key } from '@/lib/dict';

const TICKETS = [
  { n: '01', href: '/menu', h: 250 },
  { n: '02', href: '/prenota', h: 310 },
  { n: '03', href: '/la-storia', h: 270 },
  { n: '04', href: '/#dove', h: 330 },
] as const;

const BG: Record<string, string> = { '/menu': 'transparent', '/prenota': 'var(--pomodoro)' };

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // hide while scrolling down, come back when scrolling up
      if (y > 160 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y < 160) setHidden(false);
      last = y;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  // other pages than home start "scrolled" so the tickets don't cover the title
  const compact = scrolled || path !== '/';
  if (path === '/menu') return null; // the menu has its own course tabs + header
  return (
    <nav className={`nav ${compact ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`} onFocus={() => setHidden(false)} aria-label="GNAM" style={{ ['--nav-bg' as string]: BG[path] ?? 'var(--carta)' }}>
      <div className="nav__rail" aria-hidden />
      <Link href="/" className="nav__logo">GNAM</Link>
      <div className="nav__lang" role="group" aria-label={t('lang.aria')}>
        <button aria-pressed={lang === 'pl'} onClick={() => setLang('pl')}>PL</button>
        <span aria-hidden style={{ opacity: 0.5 }}>/</span>
        <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      </div>
      <div className="tickets">
        {TICKETS.map((tk) => {
          const label = t(`ticket.${tk.n}.label` as Key);
          const current = path === tk.href;
          return (
            <Link key={tk.n} href={tk.href} className="ticket" aria-current={current ? 'page' : undefined} style={{ height: tk.h, ['--h' as string]: `${tk.h}px` }}>
              <span className="ticket__num"><span className="t-desk">COMANDA </span>N° {tk.n}</span>
              <span className="ticket__label">
                <span className="t-desk">{label}</span>
                <span className="t-mob" aria-hidden>{tk.n === '03' ? t('ticket.mobile.03') : label}</span>
              </span>
              <span className="ticket__sub">{t(`ticket.${tk.n}.sub` as Key)}</span>
              <span className="ticket__note" aria-hidden>{t(`ticket.${tk.n}.note` as Key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
