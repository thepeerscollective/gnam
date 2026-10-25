'use client';
import { useLang } from '@/lib/i18n';
export default function Skip() {
  const { t } = useLang();
  return <a className="skip" href="#main">{t('skip')}</a>;
}
