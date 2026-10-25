'use client';
import { useLang } from '@/lib/i18n';
import Footer from '@/components/Footer';

const REVIEWS = [
  ['the carbonara made me call my mum.', '· anna, kraków'],
  ["i came for the pizza, stayed for tomek's 'mamma mia'.", '· piotr, google'],
  ['six tables. book. seriously.', '· the list, 2026'],
  ['tiramisù is a religion here.', "· giulia's fan club"],
  ['best 42 zł i spent this year.', '· michał, instagram'],
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
          </div>
          <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
            {(['storia.1974', 'storia.1998', 'storia.2019', 'storia.2026'] as const).map((k) => <p key={k} className="mono">{t(k)}</p>)}
          </div>
        </div>
        <div className="pols">
          <img src="/img/polaroid-01-napoli.webp" alt="napoli, 1974 · nonna rosa" />
          <img src="/img/polaroid-02-marco.webp" alt="marco, 1998" />
          <img src="/img/polaroid-03-sign.webp" alt="ul. józefa, 2026" loading="lazy" />
          <img src="/img/polaroid-04-staff.webp" alt="lunedì sera, staff dinner" loading="lazy" />
          <img src="/img/polaroid-05-book.webp" alt="il libro, 1974, nonna's recipe book" loading="lazy" />
        </div>
      </section>
      <section className="reviews on-dark" aria-labelledby="rv">
        <p className="mono" id="rv">{t('reviews.label')}</p>
        <p className="mono" style={{ opacity: 0.6, marginTop: 6 }}>{t('reviews.note')}</p>
        <p className="serif reviews__verdict">{t('reviews.verdict')} 10/10 <span style={{ fontFamily: 'var(--f-mono)', fontStyle: 'normal', fontSize: '0.6em' }}>(¬_¬)</span></p>
        <div className="reviews__grid">
          {REVIEWS.map(([q, a]) => (
            <figure key={a} className="rcard">
              <span className="mono">GNAM · SCONTRINO</span>
              <blockquote><p className="body">{q}</p></blockquote>
              <figcaption className="mono">{a}</figcaption>
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
