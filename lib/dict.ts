export type Lang = 'pl' | 'en';
type Entry = { pl: string; en: string };
const same = (s: string): Entry => ({ pl: s, en: s });

export const D = {
  // nav tickets
  'ticket.01.label': same('MENU'),
  'ticket.01.sub': same('pizza · pasta · dolci · vino'),
  'ticket.01.note': same('36 piatti'),
  'ticket.02.label': same('PRENOTA'),
  'ticket.02.sub': { pl: '6 stolików · sms w 10 min', en: '6 tavoli · sms in 10 min' },
  'ticket.02.note': same('6 tavoli, presto!'),
  'ticket.03.label': same('LA STORIA'),
  'ticket.03.sub': same('napoli 1974 → kraków 2027'),
  'ticket.03.note': same('dal 1974'),
  'ticket.04.label': same('DOVE'),
  'ticket.04.sub': same('ul. józefa 12 · mar–dom 12–22'),
  'ticket.04.note': same('4 min a piedi'),
  'ticket.mobile.03': same('STORIA'),
  'lang.aria': { pl: 'zmień język na angielski', en: 'switch language to polish' },
  'sound.on': { pl: '[ dźwięk wł. ]', en: '[ sound on ]' },
  'sound.off': { pl: '[ dźwięk wył. ]', en: '[ sound off ]' },
  'sound.aria': { pl: 'włącz dźwięk pieca', en: 'turn on the oven sound' },
  skip: { pl: 'przejdź do treści', en: 'skip to content' },

  // loading
  'loading.sub': { pl: 'piec się nagrzewa', en: 'the oven is heating up' },
  'loading.hint': { pl: '[ chwileczkę ]', en: '[ wait for it ]' },
  'loading.target': same('/ 450° · pronto a 450'),
  'loading.s1': { pl: 'drewno się pali', en: 'wood lit' },
  'loading.s2': { pl: 'ciasto rozłożone', en: 'dough stretched' },
  'loading.s3': { pl: 'tomek wybrał wino', en: 'tomek picked the wine' },
  'loading.s4': { pl: 'nonna patrzy', en: 'nonna is watching' },
  'loading.s5': { pl: 'gotowe', en: 'ready' },
  'loading.skip': { pl: '[ pomiń ]', en: '[ skip ]' },
  'loading.live': { pl: 'ładowanie strony', en: 'loading the page' },

  // hero
  'hero.plate': same('manca un pezzo. scusa.'),
  'hero.plate.alt': { pl: 'tiramisù na talerzu, znika kęs po kęsie', en: 'a tiramisù on a plate disappearing bite by bite' },
  'hero.sub': same('[ trattoria · kraków · pizza, pasta, dolci, vino ]'),
  'hero.scroll': { pl: '[ przewiń ↓ ]', en: '[ scroll ↓ ]' },

  // receipt
  'receipt.label': { pl: '[ chi siamo · kim jesteśmy ]', en: '[ chi siamo · who we are ]' },
  'receipt.l1': same('CIAO.'),
  'receipt.l2': { pl: 'WAŁKUJEMY,', en: 'WE ROLL,' },
  'receipt.l3': { pl: 'PIECZEMY,', en: 'WE BAKE,' },
  'receipt.l4': { pl: 'NALEWAMY.', en: 'WE POUR.' },
  'receipt.sub': { pl: 'ciao. robimy makaron, pieczemy pizzę i nalewamy wino, dopóki nie powiesz gnam.', en: 'ciao. we roll pasta, bake pizza and pour wine until you say gnam.' },
  'receipt.polaroid1': { pl: 'nonna rosa karmi małego marco ragù, 1990', en: 'nonna rosa feeding little marco ragù, 1990' },
  'receipt.polaroid2': { pl: 'ręce wałkują makaron', en: 'hands rolling pasta' },

  // table
  'table.label': { pl: '[ cosa mangiamo · wybierz talerz ]', en: '[ cosa mangiamo · pick a plate ]' },
  'table.pizza': { pl: '(>_<)ゞ niektóre gryzą', en: '(>_<)ゞ some of them bite' },
  'table.pasta': { pl: '~(˘▽˘~) wałkowana ręcznie co rano o 8, zanim marco wypije kawę', en: "~(˘▽˘~) rolled by hand every morning at 8, before marco's first coffee" },
  'table.dolci': { pl: '(っ˘ڡ˘ς) giulia robi je co rano. tiramisù znika pierwsze', en: '(っ˘ڡ˘ς) giulia makes them every morning. the tiramisù goes first' },
  'table.vino': { pl: '(°▽°)/ włoskie, naturalne, w miarę tanie. cin cin!', en: '(°▽°)/ italian, natural, cheap-ish. cin cin!' },

  // bestsellers
  'best.label': { pl: '[ i più ordinati · najczęściej zamawiane ]', en: '[ i più ordinati · most ordered ]' },
  'best.title': same('I PIÙ ORDINATI.'),
  'best.more': { pl: '36 dań w menu. te 6 schodzi pierwsze.', en: '36 dishes in the menu. these 6 go first.' },
  'best.link': same('[ tutto il menu → ]'),
  questo: same('questo! (¬_¬)'),
  finito: same('[ FINITO ]'),
  'finito.back': { pl: 'wraca jutro', en: 'back tomorrow' },
  veg: { pl: '[ wege ]', en: '[ veg ]' },
  vegan: { pl: '[ wegańskie ]', en: '[ vegan ]' },
  oggi: same('[ oggi ]'),
  spicy: { pl: 'ostre', en: 'spicy' },
  contains: { pl: 'zawiera', en: 'contains' },
  'ask': { pl: 'zapytaj', en: 'ask' },

  // giant word
  'giant.caption': { pl: '[ piec · ulica · wydawka ]', en: '[ the oven · the street · the pass ]' },
  'giant.alt1': { pl: 'piec opalany drewnem, płomienie z bliska', en: 'the wood oven, flames up close' },
  'giant.alt2': { pl: 'ul. józefa nocą, nasze oświetlone okno', en: 'ul. józefa at night, our window lit' },
  'giant.alt3': { pl: 'wydawka w kuchni, wiszące bileciki', en: 'the kitchen pass with order tickets hanging' },

  // storia (home + page)
  'storia.link': same('[ la storia → ]'),
  'storia.1974': { pl: '1974 · nonna rosa otwiera salę na sześć stolików w neapolu', en: '1974 · nonna rosa opens a six-table room in naples' },
  'storia.1998': { pl: '1998 · jej wnuk marco przypala swoje pierwsze sto pizz', en: '1998 · her grandson marco burns his first hundred pizzas' },
  'storia.2019': { pl: '2019 · marco przeprowadza się do krakowa, z miłości', en: '2019 · marco moves to kraków, for love' },
  'storia.2027': { pl: '2027 · gnam otwiera się na ul. józefa. znowu sześć stolików.', en: '2027 · gnam opens on ul. józefa. six tables, again.' },
  'team.anna': { pl: 'anna, która niczego nie mierzy i nigdy się nie myli', en: 'anna, who measures nothing and is never wrong' },
  'team.marco': { pl: 'marco, który co rano celowo przypala pierwszą pizzę', en: 'marco, who burns the first pizza every morning on purpose' },
  'team.giulia': { pl: 'giulia, tiramisù nie podlega negocjacjom', en: 'giulia, tiramisù is non-negotiable' },
  'team.tomek': { pl: 'tomek, jedyny polak, który poprawnie mówi „mamma mia”', en: "tomek, the only pole who says 'mamma mia' correctly" },

  // dove
  'dove.tram': { pl: 'tramwaj 8 · 13 · 18 → plac wolnica, potem 4 minuti a piedi', en: 'tram 8 · 13 · 18 → plac wolnica, then 4 minuti a piedi' },
  'dove.hours': { pl: 'mar–dom 12–22\nlun chiuso, nonna ma wolne', en: "mar–dom 12–22\nlun chiuso, nonna's day off" },
  'dove.book': same('[ prenota un tavolo ]'),
  'dove.menu': same('[ menu ]'),
  'dove.map': { pl: '[ jak dojechać ]', en: '[ come arrivare ]' },
  'dove.flip': { pl: 'odwróć pocztówkę', en: 'flip the postcard' },
  'dove.back': { pl: 'pozdrowienia z ul. józefa 12. ci vediamo!', en: 'greetings from ul. józefa 12. ci vediamo!' },
  'dove.qr': { pl: 'kod QR do thepeerscollective.com', en: 'QR code to thepeerscollective.com' },

  // rows + coupon
  'rows.book': { pl: 'ZAREZERWUJ STOLIK', en: 'BOOK A TABLE' },
  'rows.order': { pl: 'ZAMÓW', en: 'ORDER' },
  'rows.gift': { pl: 'KARTA PODARUNKOWA', en: 'GIFT CARD' },
  'coupon.front': { pl: '−10% na pierwszą carbonarę', en: 'your first carbonara 10% off' },
  'coupon.back': { pl: 'pokaż przy kasie albo wpisz w aplikacji. kliknij, żeby odwrócić.', en: 'show it at the till or paste it in the app. click again to flip back.' },

  // footer
  'footer.simmer': { pl: 'strona, jak sos, jeszcze się gotuje.', en: 'the site, like the sauce, is still simmering.' },
  'footer.free': { pl: '[ stolik dla 2 · czwartek 20:00 · jeszcze wolny ]', en: '[ table for 2 · thursday 20:00 · still free ]' },
  'footer.receipt': { pl: 'GRAZIE · RAZEM: 1 PEŁNY BRZUCH · ARRIVEDERCI', en: 'GRAZIE · TOTALE: 1 BELLY FULL · ARRIVEDERCI' },
  'footer.privacy': { pl: '[ polityka prywatności ]', en: '[ privacy ]' },
  'footer.allergens': { pl: '[ alergeny ]', en: '[ allergens ]' },
  'footer.cookies': { pl: 'tu nie ma ciasteczek. tylko biscotti.', en: 'no cookies here. only biscotti.' },
  'footer.newtab': { pl: '(otwiera się w nowej karcie)', en: '(opens in a new tab)' },
  'footer.credit': { pl: 'projekt koncepcyjny · design i kod: the peers collective', en: 'concept project · design and code: the peers collective' },

  // menu page
  'menu.open': { pl: '[ il menu · otwarte: {c} ]', en: '[ il menu · {c} is open ]' },
  'menu.pizza.intro': { pl: '[ 9 pizz, ciasto 48h, piec opalany drewnem 450°. ceny za pizzę 32 cm. ]', en: '[ 9 pizzas, 48h dough, wood oven at 450°. prices per pizza, 32cm. ]' },
  'menu.pasta.intro': { pl: '[ 9 makaronów, wałkowanych codziennie o 8. ]', en: '[ 9 pastas, rolled every morning at 8. ]' },
  'menu.dolci.intro': { pl: '[ 6 deserów, wszystkie robi giulia. ] (っ˘ڡ˘ς)', en: '[ 6 dolci, all made in house by giulia. ] (っ˘ڡ˘ς)' },
  'menu.vino.intro': { pl: '[ 10 win + 2 na po kolacji. kieliszek / butelka. wszystkie włoskie, głównie naturalne. ]', en: '[ 10 wines + 2 after-dinner drinks. glass / bottle. all italian, mostly natural. ]' },
  'allergens.title': { pl: '[ allergeni · alergeny ]', en: '[ allergeni · allergens ]' },
  'allergens.ask': { pl: 'zapytaj nas, powiemy wszystko o daniu', en: "ask us, we'll tell you everything in the dish" },

  // prenota
  'prenota.sub': { pl: 'weź numerek. twój stolik czeka', en: 'take a number. your table is waiting' },
  'prenota.dispenser': { pl: '[ kliknij automat, żeby wziąć numerek ]', en: '[ click the dispenser to take a number ]' },
  'prenota.dispenser.aria': { pl: 'weź numerek i otwórz formularz', en: 'take a number and open the form' },
  'prenota.demo': { pl: '[ wersja demo: nic nie jest zapisywane ani wysyłane ]', en: "[ demo: nothing is saved or sent ]" },
  'form.day': { pl: 'giorno · dzień', en: 'giorno · day' },
  'form.time': { pl: 'ora · godzina', en: 'ora · time' },
  'form.people': { pl: 'persone · osoby', en: 'persone · people' },
  'form.name': { pl: 'nome · imię', en: 'nome · name' },
  'form.phone': { pl: 'telefono · telefon', en: 'telefono · phone' },
  'form.email': { pl: 'email (opcjonalnie)', en: 'email (optional)' },
  'form.notes': { pl: 'uwagi · alergie, wózek, urodziny', en: 'notes · allergies, pram, birthday' },
  'form.submit': same('PRENOTA'),
  'form.hint': { pl: 'potwierdzimy sms-em w 10 minut. ci vediamo!', en: 'we confirm by sms within 10 minutes. ci vediamo!' },
  'form.consent': { pl: 'rezerwując, zgadzasz się na sms w sprawie tej rezerwacji.', en: 'by booking you agree to an sms about this booking.' },
  'err.summary': { pl: 'popraw {n}, żeby zarezerwować:', en: 'fix {n} to book:' },
  'err.one': { pl: '1 rzecz', en: '1 thing' },
  'err.many': { pl: '{n} rzeczy', en: '{n} things' },
  'err.name': { pl: 'wpisz imię, żebyśmy wiedzieli, kogo wołać', en: 'add a name so we know who to call' },
  'err.phone': { pl: 'to nie wygląda na numer. np. 600 000 000', en: "that doesn't look like a number. e.g. 600 000 000" },
  'err.day': { pl: 'w poniedziałki zamknięte. wybierz inny dzień', en: "we're closed on mondays. pick another day" },
  'err.people': { pl: 'powyżej 8 osób zadzwoń: +48 12 000 00 00', en: 'more than 8 people? call us: +48 12 000 00 00' },
  'state.sending': { pl: 'wkładamy do pieca…', en: 'putting it in the oven…' },
  'state.success.title': { pl: 'STOLIK DLA {n}', en: 'TAVOLO PER {n}' },
  'state.success.body': { pl: '^‿^ {day}, {time}. sms w drodze. ci vediamo!', en: '^‿^ {day}, {time}. the sms is on its way. ci vediamo!' },
  'state.success.cal': { pl: '[ dodaj do kalendarza ]', en: '[ add to calendar ]' },
  'state.success.again': { pl: '[ zmień albo odwołaj ]', en: '[ change or cancel ]' },
  'state.sms': { pl: 'GNAM: ciao {name}! stolik dla {n}, {day} {time}. N° {num}. zmiana: gnam.pl/z/{num}', en: 'GNAM: ciao {name}! table for {n}, {day} {time}. N° {num}. change: gnam.pl/c/{num}' },
  'state.full.title': same('SIAMO PIENI.'),
  'state.full.body': { pl: 'o tej godzinie nie mamy miejsca. może któryś z tych?', en: 'no room at that time. one of these instead?' },
  'state.full.wait': { pl: '[ zapisz mnie na listę ] napiszemy, jeśli ktoś odwoła', en: "[ put me on the list ] we'll text if someone cancels" },
  'order.label': { pl: "[ albo zjedz w domu · nie dowozimy sami, robią to aplikacje ]", en: "[ or eat at home · we don't deliver ourselves, these apps do ]" },
  'order.1.sub': { pl: 'odbiór · zamów telefonicznie, gotowe w 20 min', en: 'pick up · order ahead by phone, ready in 20 min' },
  'order.2.sub': { pl: 'dostawa · wybierz aplikację, my gotujemy, oni wożą', en: 'delivery · pick your app, we cook, they ride' },
  'order.3.sub': { pl: 'karta podarunkowa · od 100 zł, wysyłana mailem', en: 'gift card · from 100 zł, sent by email' },
  'order.3.cta': { pl: '[ kup kartę ↗ ]', en: '[ buy a gift card ↗ ]' },

  // storia page
  'storiaPage.sub': { pl: 'cztery osoby, jeden piec, książka z przepisami z 1974', en: 'four people, one oven, a recipe book from 1974' },
  'reviews.label': { pl: '[ cosa dicono · co mówią ]', en: '[ cosa dicono · what people say ]' },
  'reviews.note': { pl: '[ przykładowe opinie · prawdziwa strona pokazuje tylko prawdziwe, z imieniem i źródłem ]', en: '[ sample reviews · a live site shows only real ones, with name and source ]' },
  'reviews.verdict': { pl: 'werdykt nonny:', en: "nonna's verdict:" },
  'team.label': { pl: '[ chi cucina · kto gotuje ]', en: '[ chi cucina · who cooks ]' },

  // 404
  '404.sub': { pl: 'ta strona została zjedzona.', en: 'this page was eaten.' },
  '404.nonna': { pl: '(¬_¬)  nonna chce wiedzieć, kto to zrobił.', en: '(¬_¬)  nonna wants to know who did it.' },
  '404.link': { pl: '[ ← idź po okruszkach do domu ]', en: '[ ← follow the crumbs home ]' },
} satisfies Record<string, Entry>;

export type Key = keyof typeof D;
