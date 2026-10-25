'use client';
import { useLang } from '@/lib/i18n';
import Footer from '@/components/Footer';

const P = {
  pl: [
    ['[ 01 ] chi siamo', 'GNAM sp. z o.o., ul. Józefa 12, 31-000 Kraków, NIP 000-000-00-00. kontakt: ciao@gnam.pl. jesteśmy administratorem danych.'],
    ['[ 02 ] co zbieramy', 'rezerwacja: imię, telefon, email, data, liczba osób, uwagi. karty podarunkowe: email, płatność przez stripe (nie widzimy numerów kart). nic więcej.'],
    ['[ 03 ] po co', 'żeby trzymać stolik, wysłać sms i kartę. podstawa: art. 6 ust. 1 lit. b RODO.'],
    ['[ 04 ] jak długo', 'rezerwacje: 12 miesięcy po wizycie. karty: 5 lat (przepisy podatkowe).'],
    ['[ 05 ] kto jeszcze', 'supabase (baza, UE), resend (maile), stripe (płatności), dostawca sms. pyszne / glovo / wolt to osobne strony z własnymi zasadami.'],
    ['[ 06 ] ciasteczka', 'żadnych. analityka to umami: bez cookies, bez danych osobowych. dlatego nie ma bannera.'],
    ['[ 07 ] twoje prawa', 'dostęp, poprawa, usunięcie, sprzeciw, skarga do UODO. napisz na ciao@gnam.pl, odpowiemy w 30 dni.'],
  ],
  en: [
    ['[ 01 ] chi siamo', "GNAM sp. z o.o., ul. Józefa 12, 31-000 Kraków, NIP 000-000-00-00. contact: ciao@gnam.pl. we're the data controller."],
    ['[ 02 ] what we collect', 'booking: name, phone, email, date, party size, notes. gift cards: email, payment by stripe (we never see card numbers). nothing else.'],
    ['[ 03 ] why', 'to hold your table, send the sms and the gift card. basis: art. 6(1)(b) GDPR.'],
    ['[ 04 ] how long', 'bookings: 12 months after the visit. gift cards: 5 years (tax law).'],
    ['[ 05 ] who else', 'supabase (database, EU), resend (email), stripe (payments), an sms provider. pyszne / glovo / wolt are separate sites with their own policies.'],
    ['[ 06 ] cookies', "none. analytics is umami: no cookies, no personal data. that's why there's no banner."],
    ['[ 07 ] your rights', 'access, fix, delete, object, complain to UODO. email ciao@gnam.pl, we answer within 30 days.'],
  ],
};

export default function Privacy() {
  const { lang } = useLang();
  return (
    <>
      <section className="privacy" aria-labelledby="pv">
        <h1 className="black statement" id="pv">PRIVACY</h1>
        <p className="mono" style={{ marginTop: 16, opacity: 0.7 }}>
          {lang === 'pl' ? '[ GNAM to projekt koncepcyjny. ten tekst to przykład. ]' : '[ GNAM is a concept project. this text is a sample. ]'}
        </p>
        <dl>
          {P[lang].map(([a, b]) => (
            <div key={a} style={{ display: 'contents' }}>
              <dt>{a}</dt>
              <dd className="body">{b}</dd>
            </div>
          ))}
        </dl>
      </section>
      <Footer />
    </>
  );
}
