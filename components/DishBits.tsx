'use client';
import { useLang } from '@/lib/i18n';
import { ALLERGENS, Dish } from '@/lib/menu';

export function Allergens({ d }: { d: Dish }) {
  const { t, lang } = useLang();
  if (d.allergens === null) return <span className="mono">[ — ]</span>;
  if (d.allergens === 'ask') return <span className="mono">[ 1 · 7 · {t('ask')} ]</span>;
  const words = d.allergens.map((n) => ALLERGENS[n][lang]).join(', ');
  return (
    <span className="mono">
      <span aria-hidden>[ {d.allergens.join(' · ')} ]</span>
      <span className="sr">{t('contains')}: {words}</span>
    </span>
  );
}

export function Tags({ d }: { d: Dish }) {
  const { t } = useLang();
  return (
    <>
      {d.veg && <> · {t('veg')}</>}
      {d.vegan && <> · {t('vegan')}</>}
      {d.oggi && <> · {t('oggi')}</>}
    </>
  );
}

export function Spicy({ d }: { d: Dish }) {
  const { t } = useLang();
  if (!d.spicy) return null;
  return (
    <span className="kao">
      <span aria-hidden>(&gt;_&lt;)ゞ</span>
      <span className="sr">{t('spicy')}</span>
    </span>
  );
}
