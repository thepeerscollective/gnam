'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { useSound } from '@/lib/sound';

const STEPS = [
  { it: 'legna accesa', k: 'loading.s1', at: 60 },
  { it: 'impasto steso', k: 'loading.s2', at: 160 },
  { it: 'tomek ha scelto il vino', k: 'loading.s3', at: 260 },
  { it: 'nonna sta guardando (¬_¬)', k: 'loading.s4', at: 360 },
  { it: '450°. pronto.', k: 'loading.s5', at: 450 },
] as const;

export default function Loading() {
  const { t } = useLang();
  const { on, toggle, blip } = useSound();
  const [show, setShow] = useState<boolean | null>(null);
  const [temp, setTemp] = useState(20);
  const [done, setDone] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('gnam-loaded') === '1'; } catch {}
    if (seen || window.location.pathname !== '/') { setShow(false); return; }
    setShow(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setTemp(450); setTimeout(finish, 1000); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 3000);
      setTemp(Math.round(20 + 430 * (1 - Math.pow(1 - p, 2))));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else { setDone(true); setTimeout(finish, 1100); }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (done) blip('scrape'); }, [done, blip]);

  function finish() {
    try { sessionStorage.setItem('gnam-loaded', '1'); } catch {}
    setShow(false);
  }

  if (!show) return null;
  const now = STEPS.findLastIndex((s) => temp >= s.at);
  return (
    <div className="loading" role="dialog" aria-label="GNAM">
      <p className="sr" aria-live="polite">{t('loading.live')}</p>
      <div className="loading__title">
        <h1>IL FORNO SI SCALDA</h1>
        <p className="caption">{t('loading.sub')}</p>
        <p className="mono" style={{ opacity: 0.6, marginTop: 6 }}>{t('loading.hint')}</p>
      </div>
      <Oven temp={temp} done={done} />
      <div className="loading__temp" aria-hidden>
        <b>{temp}°</b>
        <span className="mono">{t('loading.target')}</span>
      </div>
      <ul className="loading__status" aria-hidden>
        {STEPS.map((s, i) => (
          <li key={s.k} className={i === now ? 'is-now' : ''} style={{ opacity: i === now ? 1 : i < now ? 0.4 : 0.25 }}>
            <span className="mono">{i < now ? '✓ ' : i === now ? '→ ' : '  '}{s.it}</span>
            <span>{t(s.k)}</span>
          </li>
        ))}
      </ul>
      <button className="loading__skip" onClick={finish}>{t('loading.skip')}</button>
      <button className="loading__sound" onClick={() => { toggle(); if (!on) setTimeout(() => blip('creak'), 50); }} aria-pressed={on} aria-label={t('sound.aria')}>
        {on ? t('sound.on') : t('sound.off')}
      </button>
    </div>
  );
}

function Oven({ temp, done }: { temp: number; done: boolean }) {
  const needle = -120 + (temp / 450) * 240;
  const slide = done ? 0 : 1; // pizza slides into the mouth at 450°
  return (
    <svg className="loading__oven" viewBox="300 -40 840 840" aria-hidden>
      {/* smoke */}
      <circle className="smoke" cx="722" cy="110" r="22" fill="var(--carta)" />
      <circle className="smoke smoke--2" cx="760" cy="80" r="17" fill="var(--carta)" />
      <circle className="smoke smoke--3" cx="712" cy="60" r="12" fill="var(--carta)" />
      {/* chimney */}
      <rect x="670" y="142" width="100" height="18" rx="3" fill="var(--inchiostro)" />
      <rect x="680" y="150" width="80" height="110" rx="4" fill="var(--inchiostro)" />
      {/* dome */}
      <path d="M400 490 A320 260 0 0 1 1040 490 Z" fill="var(--tuorlo)" />
      {[[477, 390], [587, 362], [807, 362], [917, 390]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="var(--forno)" opacity=".6" />
      ))}
      {/* face */}
      {done ? (
        <>
          <path d="M642 342 q15 -16 30 0" stroke="var(--inchiostro)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M768 342 q15 -16 30 0" stroke="var(--inchiostro)" strokeWidth="6" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse className="eye" cx="657" cy="340" rx="15" ry="20" fill="var(--inchiostro)" />
          <ellipse className="eye" cx="783" cy="340" rx="15" ry="20" fill="var(--inchiostro)" />
        </>
      )}
      <ellipse cx="623" cy="383" rx="23" ry="11" fill="var(--pomodoro)" opacity=".55" />
      <ellipse cx="817" cy="383" rx="23" ry="11" fill="var(--pomodoro)" opacity=".55" />
      {/* mouth */}
      <path d="M600 490 L600 470 A120 85 0 0 1 840 470 L840 490 Z" fill="var(--inchiostro)" />
      <ellipse className="flame" cx="690" cy="455" rx="50" ry="60" fill="var(--forno)" />
      <ellipse className="flame flame--2" cx="690" cy="462" rx="30" ry="42" fill="var(--tuorlo)" />
      <rect x="630" y="476" width="110" height="14" rx="7" fill="var(--vino)" transform="rotate(6 685 483)" />
      <rect x="650" y="470" width="100" height="14" rx="7" fill="var(--vino)" transform="rotate(-8 700 477)" />
      {/* ledge + base */}
      <rect x="350" y="490" width="740" height="22" rx="4" fill="var(--inchiostro)" />
      <rect x="380" y="512" width="680" height="260" fill="var(--vino)" />
      {Array.from({ length: 4 }).flatMap((_, r) =>
        Array.from({ length: 7 }).map((_, c) => {
          const x = 380 + (r % 2 ? -55 : 0) + c * 110;
          if (x < 380 || x + 100 > 1060) return null;
          return <rect key={`${r}-${c}`} x={x + 5} y={520 + r * 62} width="100" height="54" rx="3" fill="none" stroke="var(--carta)" strokeWidth="1.5" opacity=".35" />;
        }),
      )}
      {/* thermometer */}
      <circle cx="720" cy="615" r="55" fill="var(--carta)" stroke="var(--inchiostro)" strokeWidth="3" />
      <line x1="720" y1="615" x2="720" y2="572" stroke="var(--pomodoro)" strokeWidth="5" strokeLinecap="round" transform={`rotate(${needle} 720 615)`} />
      <text x="708" y="650" fontFamily="var(--f-mono)" fontSize="11" fill="var(--inchiostro)">°C</text>
      {/* peel + raw pizza */}
      <g style={{ transform: `translateX(${slide * 260}px)`, transition: 'transform .9s ease-in' }}>
        <rect x="830" y="482" width="420" height="16" rx="8" fill="var(--carta)" />
        <image href="/img/loading-raw-pizza.webp" x="680" y="400" width="180" height="180" />
      </g>
    </svg>
  );
}
