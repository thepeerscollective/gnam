'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { useSound } from '@/lib/sound';
import { bestsellers } from '@/lib/menu';
import { Allergens, Spicy, Tags } from '@/components/DishBits';
import Footer from '@/components/Footer';
import Qr from '@/components/Qr';

const FRAMES = Array.from({ length: 8 }, (_, i) => `/img/tiramisu-frame-0${i + 1}.webp`);

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(m.matches);
    const on = () => setR(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return r;
}

function StopMotion({ alt }: { alt: string }) {
  const reduce = useReducedMotion();
  const [f, setF] = useState(0);
  useEffect(() => {
    FRAMES.forEach((s) => { const i = new Image(); i.src = s; });
    if (reduce) { setF(0); return; }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i = (i + 1) % FRAMES.length;
      setF(i);
      timer = setTimeout(step, i === FRAMES.length - 1 ? 750 : i === 0 ? 450 : 200);
    };
    timer = setTimeout(step, 450);
    return () => clearTimeout(timer);
  }, [reduce]);
  return <img src={FRAMES[f]} alt={alt} width={340} height={340} />;
}

export default function Home() {
  const { t, lang } = useLang();
  const { blip } = useSound();
  const best = bestsellers();

  // receipt prints on scroll
  const receiptRef = useRef<HTMLDivElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const lastLine = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const r = receiptRef.current;
      if (r) {
        const b = r.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.max(0, Math.min(1, (vh - b.top) / (b.height * 0.9)));
        r.style.setProperty('--print', `${(1 - p) * 100}%`);
        const line = Math.floor(p * 14);
        if (line !== lastLine.current) { lastLine.current = line; blip('tick'); }
      }
      const g = giantRef.current;
      if (g) {
        const b = g.parentElement!.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, b.top / window.innerHeight));
        g.style.setProperty('--shift', `${p * (window.innerWidth < 768 ? 60 : 200)}px`);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [blip]);

  const receiptLines = [
    'GNAM · TRATTORIA',
    'ul. józefa 12 · kraków',
    'N° 000001 · tavolo 1 · 20:14',
    '--------------------------------',
    '1×  nonna rosa .......... 1974',
    '1×  forno a legna ....... 450°',
    '1×  ricettario ....... 1 libro',
    '6×  tavoli .................. 6',
    '48h lievitazione ........ 48h',
    '∞×  farina .................. ∞',
    "1×  tomek ....... 'mamma mia'",
    '--------------------------------',
  ];

  const plates = [
    { c: 'pizza', n: '001', count: 9, img: '/img/pizza-01-margherita.webp', sub: t('table.pizza') },
    { c: 'pasta', n: '002', count: 9, img: '/img/pasta-01-carbonara.webp', sub: t('table.pasta') },
    { c: 'dolci', n: '003', count: 6, img: '/img/dolci-01-tiramisu.webp', sub: t('table.dolci') },
    { c: 'vino', n: '004', count: 12, img: '/img/vino-06-chianti.webp', sub: t('table.vino') },
  ];

  const team = [
    { k: 'anna', name: 'ANNA · PASTA' },
    { k: 'marco', name: 'MARCO · FORNO' },
    { k: 'giulia', name: 'GIULIA · DOLCI' },
    { k: 'tomek', name: 'TOMEK · VINO' },
  ] as const;

  const row = (words: string[]) => [...words, ...words, ...words, ...words].map((w, i) => <span key={i}>{w} /</span>);

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-label="GNAM">
        <div className="hero__plate"><StopMotion alt={t('hero.plate.alt')} /></div>
        <p className="serif hero__cap">{t('hero.plate')}</p>
        <h1 className="black hero__gnam">GNAM</h1>
        <p className="mono hero__sub">{t('hero.sub')}</p>
        <p className="mono hero__scroll" aria-hidden>{t('hero.scroll')}</p>
      </section>

      {/* RECEIPT */}
      <section className="receipt-sec on-dark" aria-labelledby="chi">
        <div className="receipt-sec__words">
          <p className="mono" id="chi" style={{ marginBottom: 40 }}>{t('receipt.label')}</p>
          {(['receipt.l1', 'receipt.l2', 'receipt.l3', 'receipt.l4'] as const).map((k) => (
            <span key={k} className="black statement">{t(k)}</span>
          ))}
          <p className="body receipt-sec__sub">{t('receipt.sub')}</p>
        </div>
        <div style={{ position: 'relative' }}>
          <div className="receipt" ref={receiptRef}>
            {receiptLines.map((l, i) => <p key={i}>{l}</p>)}
            <div className="receipt__total">TOTALE</div>
            <div className="receipt__gnam">GNAM.</div>
            <p className="mono receipt__thanks">grazie · ciao · torna presto</p>
            <p className="mono" aria-hidden>||| |||| | |||| || ||| |</p>
          </div>
          <figure className="polaroid polaroid--1"><img src="/img/polaroid-home-nonna-marco.webp" alt={t('receipt.polaroid1')} /></figure>
          <figure className="polaroid polaroid--2"><img src="/img/polaroid-hands-pasta.webp" alt={t('receipt.polaroid2')} /></figure>
        </div>
      </section>

      {/* TABLE */}
      <section className="table" aria-labelledby="cosa">
        <p className="mono table__label" id="cosa">{t('table.label')}</p>
        <div className="plates">
          {plates.map((p) => (
            <Link key={p.c} href={`/menu#${p.c}`} className="plate">
              <div className="plate__img"><img src={p.img} alt="" loading="lazy" /></div>
              <span className="black plate__label">{p.c.toUpperCase()}</span>
              <span className="mono plate__sub">[{p.n}] {p.count} · {p.sub}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="best" aria-labelledby="best">
        <p className="mono">{t('best.label')}</p>
        <h2 className="black index best__title" id="best">{t('best.title')}</h2>
        <div className="best__grid">
          {best.map((d) => (
            <Link key={d.id} href={`/menu#${d.course}`} className={`bcard ${d.nonnaPick ? 'is-pick' : ''}`}>
              <div className="bcard__top">
                <span className="monobig">0{d.bestseller}</span>
                <div className="bcard__img"><img src={d.img} alt="" loading="lazy" /></div>
              </div>
              <div className="bcard__body">
                <h3 className="black dish bcard__name">{d.name}</h3><Spicy d={d} />
                <p className="mono bcard__price">{d.price} · <Allergens d={d} /><Tags d={d} /></p>
                <p className="caption bcard__line">{d.bestLine?.[lang]}</p>
                {d.nonnaPick && <p className="questo">{t('questo')}</p>}
              </div>
            </Link>
          ))}
        </div>
        <div className="best__foot">
          <p className="caption">{t('best.more')}</p>
          <Link className="link" href="/menu">{t('best.link')}</Link>
        </div>
      </section>

      {/* GIANT WORD */}
      <section className="giant" aria-label={t('giant.caption')}>
        <div className="black giant__word" ref={giantRef} aria-hidden>GNAM</div>
        <div className="giant__windows">
          <img src="/img/window-01-oven.webp" alt={t('giant.alt1')} loading="lazy" />
          <img src="/img/window-02-street.webp" alt={t('giant.alt2')} loading="lazy" />
          <img src="/img/window-03-pass.webp" alt={t('giant.alt3')} loading="lazy" />
        </div>
        <p className="caption giant__cap">{t('giant.caption')}</p>
      </section>

      {/* LA STORIA */}
      <section className="storia on-dark" aria-labelledby="storia">
        <div className="storia__head">
          <h2 className="caption" id="storia">[ la storia ]</h2>
          <Link className="button" href="/la-storia">{t('storia.link')}</Link>
        </div>
        <div className="storia__lines">
          {(['storia.1974', 'storia.1998', 'storia.2019', 'storia.2027'] as const).map((k) => <p key={k} className="mono">{t(k)}</p>)}
        </div>
        <div className="team">
          {team.map((m) => (
            <figure key={m.k}>
              <img src={`/img/team-${m.k}.webp`} alt="" loading="lazy" />
              <figcaption>
                <p className="button team__name">[ {m.name} ]</p>
                <p className="caption team__desc">{t(`team.${m.k}`)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* DOVE */}
      <section className="dove on-dark" id="dove" aria-labelledby="dove-h">
        <button className={`postcard ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped((v) => !v)} aria-label={t('dove.flip')} aria-pressed={flipped}>
          <div className="postcard__inner">
            <div className="postcard__face"><img src="/img/postcard-window.webp" alt="" loading="lazy" /></div>
            <div className="postcard__face postcard__back">
              <p>{t('dove.back')}</p>
              <div className="postcard__stamp">GNAM</div>
            </div>
          </div>
        </button>
        <div>
          <h2 className="dove__addr" id="dove-h">
            <span className="black index">UL. JÓZEFA 12</span>
            <span className="black index">KRAKÓW</span>
          </h2>
          <p className="caption dove__tram">{t('dove.tram')}</p>
          <div className="dove__row">
            <div className="door">
              <p className="serif">aperto</p>
              <span className="mono">{t('dove.hours')}</span>
            </div>
            <Qr label={t('dove.qr')} />
          </div>
          <div className="dove__btns">
            <Link className="button" href="/prenota">{t('dove.book')}</Link>
            <Link className="button" href="/menu">{t('dove.menu')}</Link>
            <a className="button" href="https://maps.google.com/?q=ul.+J%C3%B3zefa+12+Krak%C3%B3w" target="_blank" rel="noopener">{t('dove.map')}</a>
          </div>
        </div>
      </section>

      {/* ROWS + COUPON */}
      <section className="rows" aria-label="PRENOTA · ORDINA · REGALA">
        <Link href="/prenota" aria-label={`PRENOTA · ${t('rows.book')}`}><div className="row" aria-hidden>{row(['PRENOTA', t('rows.book')])}</div></Link>
        <Link href="/prenota#ordina" aria-label={`ORDINA · ${t('rows.order')}`}><div className="row row--rev" aria-hidden style={{ ['--dur' as string]: '34s' }}>{row(['ORDINA', t('rows.order')])}</div></Link>
        <div className="coupon-wrap">
          <button className={`coupon ${coupon ? 'is-flipped' : ''}`} onClick={() => setCoupon((v) => !v)} aria-pressed={coupon}>
            {coupon ? (
              <>
                <span className="coupon__code">GNAM10</span>
                <span className="mono" style={{ display: 'block' }}>{t('coupon.back')}</span>
              </>
            ) : (
              <>
                <span className="black dish" style={{ display: 'block' }}>CLICK ME</span>
                <span className="mono" style={{ display: 'block', marginTop: 10 }}>−10% sulla prima carbonara · {t('coupon.front')}</span>
              </>
            )}
          </button>
        </div>
        <Link href="/prenota#regalo" aria-label={`REGALA · ${t('rows.gift')}`}><div className="row" aria-hidden style={{ ['--dur' as string]: '46s' }}>{row(['REGALA', t('rows.gift')])}</div></Link>
      </section>

      <Footer />
    </>
  );
}
