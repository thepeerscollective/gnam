'use client';
import { useLang } from '@/lib/i18n';
import Footer from '@/components/Footer';

const REVIEWS = [
  { q: 'the carbonara made me call my mum.', a: 'anna, kraków', t: '2', d: '14.03.2026', items: [['1× carbonara', '42,00'], ['1× rosso casa', '22,00'], ['1× tiramisù', '22,00']], tot: '86,00' },
  { q: "i came for the pizza, stayed for tomek's 'mamma mia'.", a: 'piotr, google', t: '5', d: '02.04.2026', items: [['2× margherita', '64,00'], ['1× diavola', '38,00'], ['3× birra', '45,00']], tot: '147,00' },
  { q: 'six tables. book. seriously.', a: 'the list, 2026', t: '1', d: '19.04.2026', items: [["1× ragù di nonna", '44,00'], ['1× chianti (b)', '140,00']], tot: '184,00' },
  { q: 'tiramisù is a religion here.', a: "giulia's fan club", t: '3', d: '27.04.2026', items: [['4× tiramisù', '88,00'], ['2× affogato', '32,00']], tot: '120,00' },
  { q: 'best 42 zł i spent this year.', a: 'michał, instagram', t: '6', d: '08.05.2026', items: [['1× carbonara', '42,00']], tot: '42,00' },
];

export default function Storia() {
  const { t } = useLang();
  const team = [
    { k: 'anna', name: 'ANNA · PASTA' },
    { k: 'marco', name: 'MARCO · FORNO' },
    { k: 'giulia', name: 'GIULIA · DOLCI' },
    { k: 'tomek', name: 'TOMEK · VINO' },
  ] as const;
  return (
    <>
      <section className="lstoria" aria-labelledby="ls">
        <div className="lstoria__top">
          <div>
            <h1 className="black statement" id="ls">LA STORIA</h1>
            <p className="caption" style={{ marginTop: 10 }}>{t('storiaPage.sub')}</p>
            <div className="pols">
            <img src="/img/polaroid-01-napoli.webp" alt="napoli, 1974 · nonna rosa" />
            <img src="/img/polaroid-02-marco.webp" alt="marco, 1998" />
            <img src="/img/polaroid-03-sign.webp" alt="ul. józefa, 2026" loading="lazy" />
            <img src="/img/polaroid-04-staff.webp" alt="lunedì sera, staff dinner" loading="lazy" />
            <img src="/img/polaroid-05-book.webp" alt="il libro, 1974, nonna's recipe book" loading="lazy" />
          </div>
          </div>
          <div className="lstoria__time">
            {(['storia.1974', 'storia.1998', 'storia.2019', 'storia.2026'] as const).map((k) => <p key={k} className="mono">{t(k)}</p>)}
          </div>
        </div>
        
      </section>
      <section className="reviews on-dark" aria-labelledby="rv">
        <div className="reviews__head">
          <div>
            <p className="mono" id="rv">{t('reviews.label')}</p>
            <p className="serif reviews__verdict">{t('reviews.verdict')} 10/10 <span className="reviews__kao">(¬_¬)</span></p>
            <p className="mono" style={{ opacity: 0.6, marginTop: 10 }}>{t('reviews.note')}</p>
          </div>
          <div className="stamp" aria-hidden>APPROVATO<br />DA NONNA</div>
        </div>
        <div className="reviews__grid">
          {REVIEWS.map((r) => (
            <figure key={r.a} className="rcard">
              <div className="mono rcard__head">
                <p>GNAM · SCONTRINO</p>
                <p>ul. józefa 12 · kraków</p>
                <p>tavolo {r.t} · {r.d}</p>
                <p aria-hidden>------------------------</p>
                {r.items.map(([i, p]) => (
                  <p key={i} className="rcard__item"><span>{i}</span><span>{p}</span></p>
                ))}
                <p aria-hidden>------------------------</p>
                <p className="rcard__item"><b>TOTALE</b><b>{r.tot} zł</b></p>
              </div>
              <blockquote className="serif rcard__q">“{r.q}”</blockquote>
              <figcaption className="mono rcard__a">· {r.a}</figcaption>
              <p className="mono rcard__bar" aria-hidden>||| || |||| | ||| ||</p>
            </figure>
          ))}
        </div>
      </section>
      <section className="lteam" aria-labelledby="tm">
        <p className="mono" id="tm">{t('team.label')}</p>
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
      <Footer />
    </>
  );
}
