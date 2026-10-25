'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { ALLERGENS, byCourse, COURSES, Course } from '@/lib/menu';
import { Allergens, Spicy, Tags } from '@/components/DishBits';
import type { Key } from '@/lib/dict';

export default function Menu() {
  const { t, lang, setLang } = useLang();
  const [course, setCourse] = useState<Course>('pizza');

  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace('#', '');
      if (COURSES.some((c) => c.id === h)) setCourse(h as Course);
      if (h === 'allergeni') document.getElementById('allergeni')?.scrollIntoView();
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  const pick = (c: Course) => {
    setCourse(c);
    history.replaceState(null, '', `#${c}`);
    window.scrollTo({ top: 0 });
  };

  const cur = COURSES.find((c) => c.id === course)!;
  const dishes = byCourse(course);

  return (
    <div className="menu" data-course={course} style={{ ['--c' as string]: cur.colour, ['--ink' as string]: cur.ink }}>
      <Link href="/" className="button" style={{ position: 'fixed', top: 18, left: 20, zIndex: 60, fontSize: 16, color: 'var(--ink)' }}>GNAM</Link>
      <div className="nav__lang" role="group" aria-label={t('lang.aria')} style={{ position: 'fixed', zIndex: 60, top: 18 }}>
        <button aria-pressed={lang === 'pl'} onClick={() => setLang('pl')}>PL</button>
        <span aria-hidden style={{ opacity: 0.5 }}>/</span>
        <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      </div>

      <div className="menu__list" role="tablist" aria-label="il menu">
        {COURSES.map((c) => (
          <button key={c.id} role="tab" aria-selected={c.id === course} aria-controls="dishes" className="menu__course" onClick={() => pick(c.id)}
            onKeyDown={(e) => {
              const i = COURSES.findIndex((x) => x.id === course);
              if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); pick(COURSES[(i + 1) % 4].id); }
              if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); pick(COURSES[(i + 3) % 4].id); }
            }}>
            <span className="mono">[{c.n}]</span>
            <span className="black">{c.id.toUpperCase()}</span>
            {c.id === course && <span className="black arrow" aria-hidden style={{ fontSize: 'clamp(36px,7.2vw,104px)' }}>←</span>}
          </button>
        ))}
      </div>

      <div>
        <div className="menu__head">
          <p className="mono">{t('menu.open', { c: course })}</p>
          <p className="mono menu__intro">{t(`menu.${course}.intro` as Key)}</p>
        </div>
        <ul className="dishes" id="dishes" role="tabpanel" style={{ listStyle: 'none', marginTop: 40 }}>
          {dishes.map((d) => (
            <li key={d.id} className={`mdish ${course === 'vino' ? 'mdish--vino' : ''} ${d.finito ? 'is-finito' : ''} ${d.nonnaPick ? 'is-pick' : ''}`}>
              <div className="mdish__img"><img src={d.img} alt="" loading="lazy" /></div>
              <div className="mdish__card">
                <h2 className="mdish__name">{d.name}</h2><Spicy d={d} />
                <p className="mono mdish__price">........ {d.price}</p>
                <p className="caption mdish__desc">{d[lang]}<Tags d={d} /></p>
                <div className="mdish__foot"><Allergens d={d} /><span className="mono grazie">grazie</span></div>
              </div>
              {d.finito && <p className="mono mdish__finito">{t('finito')} · {t('finito.back')}</p>}
              {d.nonnaPick && <p className="questo">{t('questo')}</p>}
            </li>
          ))}
        </ul>
        <div className="allergen-key" id="allergeni">
          <p className="mono">{t('allergens.title')}</p>
          <p className="mono" style={{ marginTop: 8 }}>
            {Object.entries(ALLERGENS).map(([n, a]) => `${n} ${a[lang]}`).join(' · ')} · {t('allergens.ask')}
          </p>
        </div>
      </div>
    </div>
  );
}
