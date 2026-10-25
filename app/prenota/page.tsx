'use client';
import { useMemo, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import Footer from '@/components/Footer';

type State = 'form' | 'sending' | 'success' | 'full';

function nextDays(lang: 'pl' | 'en') {
  const out: { v: string; label: string; monday: boolean }[] = [];
  const d = new Date();
  for (let i = 0; i < 21; i++) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    out.push({
      v: x.toISOString().slice(0, 10),
      label: x.toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
      monday: x.getDay() === 1,
    });
  }
  return out;
}
const TIMES = ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export default function Prenota() {
  const { t, lang } = useLang();
  const days = useMemo(() => nextDays(lang), [lang]);
  const [state, setState] = useState<State>('form');
  const [pulled, setPulled] = useState(false);
  const [num] = useState(() => 40 + Math.floor(Math.random() * 20));
  const [f, setF] = useState({ day: '', time: '20:00', people: '2', name: '', phone: '', email: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const summary = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const day = f.day || days.find((d) => !d.monday)!.v;
  const dayLabel = days.find((d) => d.v === day)?.label ?? day;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = t('err.name');
    if (f.phone.replace(/\D/g, '').length < 9) er.phone = t('err.phone');
    if (days.find((d) => d.v === day)?.monday) er.day = t('err.day');
    if (Number(f.people) > 8) er.people = t('err.people');
    setErrors(er);
    if (Object.keys(er).length) { setTimeout(() => summary.current?.focus(), 0); return; }
    setState('sending');
    // demo: friday/saturday 20:00 is "full" so the full state can be seen
    const dow = new Date(day).getDay();
    setTimeout(() => setState((dow === 5 || dow === 6) && f.time === '20:00' ? 'full' : 'success'), 1400);
  }

  const field = (k: keyof typeof f, label: string, input: React.ReactNode) => (
    <div className={`field ${errors[k] ? 'has-error' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      {input}
      {errors[k] && <p className="field__err" id={`e-${k}`}>✕ {errors[k]}</p>}
    </div>
  );
  const aria = (k: string) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `e-${k}` : undefined });
  const n = Object.keys(errors).length;

  return (
    <>
      <section className="prenota" aria-labelledby="pt">
        <div className="prenota__grid">
          <div>
            <h1 className="black statement" id="pt">PRENDI UN NUMERO.</h1>
            <p className="body" style={{ marginTop: 16 }}>{t('prenota.sub')}</p>
            <button className={`dispenser ${pulled ? 'is-pulled' : ''}`} onClick={() => { setPulled(true); formRef.current?.querySelector<HTMLElement>('select,input')?.focus(); }} aria-label={t('prenota.dispenser.aria')}>
              <img src="/img/dispenser.webp" alt="" />
              <span className="dispenser__ticket"><span className="mono">N°</span><br /><span className="monobig">{num}</span></span>
            </button>
            <p className="mono" style={{ marginTop: 30, maxWidth: 360 }}>{t('prenota.dispenser')}</p>
          </div>

          <div aria-live="polite">
            {(state === 'form' || state === 'sending') && (
              <form className="form" ref={formRef} onSubmit={submit} noValidate>
                <p className="mono" style={{ marginBottom: 16, opacity: 0.6 }}>{t('prenota.demo')}</p>
                {n > 0 && (
                  <div className="err-summary" ref={summary} tabIndex={-1} role="alert">
                    <h2>{t('err.summary', { n: n === 1 ? t('err.one') : t('err.many', { n }) })}</h2>
                    {Object.entries(errors).map(([k, v]) => <a key={k} href={`#f-${k}`}>· {v}</a>)}
                  </div>
                )}
                <div className="row2">
                  {field('day', t('form.day'), (
                    <select id="f-day" value={day} onChange={(e) => setF({ ...f, day: e.target.value })} {...aria('day')}>
                      {days.map((d) => <option key={d.v} value={d.v}>{d.label}{d.monday ? ' · chiuso' : ''}</option>)}
                    </select>
                  ))}
                  {field('time', t('form.time'), (
                    <select id="f-time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })}>
                      {TIMES.map((x) => <option key={x}>{x}</option>)}
                    </select>
                  ))}
                  {field('people', t('form.people'), (
                    <select id="f-people" value={f.people} onChange={(e) => setF({ ...f, people: e.target.value })} {...aria('people')}>
                      {Array.from({ length: 10 }, (_, i) => <option key={i}>{i + 1}</option>)}
                    </select>
                  ))}
                </div>
                {field('name', t('form.name'), <input id="f-name" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} {...aria('name')} />)}
                {field('phone', t('form.phone'), <input id="f-phone" type="tel" autoComplete="tel" inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} {...aria('phone')} />)}
                {field('email', t('form.email'), <input id="f-email" type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />)}
                {field('notes', t('form.notes'), <textarea id="f-notes" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />)}
                <button className="submit" disabled={state === 'sending'}>{state === 'sending' ? t('state.sending') : t('form.submit')}</button>
                <p className="caption" style={{ marginTop: 12 }}>{t('form.hint')}</p>
                <p className="caption" style={{ marginTop: 6, opacity: 0.7 }}>{t('form.consent')} <a href="/privacy" style={{ textDecoration: 'underline' }}>privacy</a></p>
              </form>
            )}

            {state === 'success' && (
              <div>
                <div className="success" tabIndex={-1} ref={(el) => el?.focus()}>
                  <p className="mono">N°</p>
                  <p className="success__num">{num}</p>
                  <h2 className="black dish" style={{ marginTop: 20 }}>{t('state.success.title', { n: f.people })}</h2>
                  <p className="body" style={{ marginTop: 16 }}>{t('state.success.body', { day: dayLabel, time: f.time })}</p>
                </div>
                <p className="sms">{t('state.sms', { name: f.name.split(' ')[0], n: f.people, day: dayLabel, time: f.time, num })}</p>
                <div className="success__btns">
                  <button>{t('state.success.cal')}</button>
                  <button onClick={() => setState('form')}>{t('state.success.again')}</button>
                </div>
              </div>
            )}

            {state === 'full' && (
              <div className="form" tabIndex={-1} ref={(el) => el?.focus()}>
                <h2 className="black statement" style={{ fontSize: 'clamp(44px,6vw,84px)' }}>{t('state.full.title')}</h2>
                <p className="body" style={{ marginTop: 12 }}>{t('state.full.body')}</p>
                <div className="alt-times">
                  {['18:30', '21:30'].map((x) => (
                    <button key={x} onClick={() => { setF({ ...f, time: x }); setState('success'); }}>{dayLabel} · {x}</button>
                  ))}
                </div>
                <button className="submit" onClick={() => setState('success')}>{t('state.full.wait')}</button>
              </div>
            )}
          </div>
        </div>

        <div className="orders" id="ordina">
          <p className="mono">{t('order.label')}</p>
          <div className="orders__grid">
            <div className="oticket">
              <span className="mono">N° 1</span><h2 className="black dish">RITIRO</h2>
              <p className="caption">{t('order.1.sub')}</p>
              <div className="oticket__links"><a href="tel:+48120000000">[ +48 12 000 00 00 ]</a></div>
            </div>
            <div className="oticket">
              <span className="mono">N° 2</span><h2 className="black dish">CONSEGNA</h2>
              <p className="caption">{t('order.2.sub')}</p>
              <div className="oticket__links">
                <a href="https://www.pyszne.pl" target="_blank" rel="noopener">[ pyszne.pl ↗ ]</a>
                <a href="https://glovoapp.com" target="_blank" rel="noopener">[ glovo ↗ ]</a>
                <a href="https://wolt.com" target="_blank" rel="noopener">[ wolt ↗ ]</a>
              </div>
            </div>
            <div className="oticket" id="regalo">
              <span className="mono">N° 3</span><h2 className="black dish">REGALO</h2>
              <p className="caption">{t('order.3.sub')}</p>
              <div className="oticket__links"><a href="mailto:ciao@gnam.pl?subject=karta%20podarunkowa">{t('order.3.cta')}</a></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
