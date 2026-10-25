export type Course = 'pizza' | 'pasta' | 'dolci' | 'vino';

export type Dish = {
  id: string;
  course: Course;
  name: string;
  price: string; // zł, wine = "glass / bottle"
  pl: string;
  en: string;
  allergens: number[] | 'ask' | null;
  img: string;
  veg?: boolean;
  vegan?: boolean;
  spicy?: boolean;
  nonnaPick?: boolean;
  finito?: boolean; // staff flip this when sold out
  oggi?: boolean;
  bestseller?: number; // 1–6, shown on home in this order
  bestLine?: { pl: string; en: string };
};

export const COURSES: { id: Course; n: string; colour: string; ink: string }[] = [
  { id: 'pizza', n: '001', colour: 'var(--pomodoro)', ink: 'var(--inchiostro)' },
  { id: 'pasta', n: '002', colour: 'var(--tuorlo)', ink: 'var(--inchiostro)' },
  { id: 'dolci', n: '003', colour: 'var(--pistacchio)', ink: 'var(--inchiostro)' },
  { id: 'vino', n: '004', colour: 'var(--vino)', ink: 'var(--carta)' },
];

export const ALLERGENS: Record<number, { pl: string; en: string }> = {
  1: { pl: 'gluten', en: 'gluten' },
  2: { pl: 'skorupiaki', en: 'crustaceans' },
  3: { pl: 'jaja', en: 'eggs' },
  4: { pl: 'ryby', en: 'fish' },
  5: { pl: 'orzeszki ziemne', en: 'peanuts' },
  6: { pl: 'soja', en: 'soy' },
  7: { pl: 'mleko', en: 'milk' },
  8: { pl: 'orzechy', en: 'nuts' },
  9: { pl: 'seler', en: 'celery' },
  10: { pl: 'gorczyca', en: 'mustard' },
  11: { pl: 'sezam', en: 'sesame' },
  12: { pl: 'siarczyny', en: 'sulphites' },
  13: { pl: 'łubin', en: 'lupin' },
  14: { pl: 'mięczaki', en: 'molluscs' },
};

const i = (f: string) => `/img/${f}.webp`;

export const MENU: Dish[] = [
  // PIZZA
  { id: 'margherita', course: 'pizza', name: 'MARGHERITA', price: '32 zł', pl: 'pomidor · fior di latte · bazylia', en: 'tomato · fior di latte · basil', allergens: [1, 7], veg: true, img: i('pizza-01-margherita'), bestseller: 2, bestLine: { pl: 'test. zdajemy go.', en: 'the test. we pass it.' } },
  { id: 'diavola', course: 'pizza', name: 'DIAVOLA', price: '38 zł', pl: 'pikantne salame · oliwa z chili', en: 'spicy salame · chilli oil', allergens: [1, 7], spicy: true, img: i('pizza-02-diavola'), bestseller: 4, bestLine: { pl: 'oddaje gryzienie', en: 'it bites back' } },
  { id: 'nduja', course: 'pizza', name: "'NDUJA E MIELE", price: '40 zł', pl: "'nduja · miód · fior di latte", en: "'nduja · honey · fior di latte", allergens: [1, 7], spicy: true, img: i('pizza-03-nduja-miele') },
  { id: 'quattro', course: 'pizza', name: 'QUATTRO FORMAGGI', price: '39 zł', pl: 'cztery sery · bez pomidora', en: 'four cheeses · no tomato', allergens: [1, 7], veg: true, img: i('pizza-04-quattro-formaggi') },
  { id: 'funghi', course: 'pizza', name: 'FUNGHI E SALSICCIA', price: '41 zł', pl: 'grzyby · kiełbasa z koprem włoskim', en: 'mushrooms · fennel sausage', allergens: [1, 7, 9], img: i('pizza-05-funghi-salsiccia') },
  { id: 'marinara', course: 'pizza', name: 'MARINARA', price: '28 zł', pl: 'pomidor · czosnek · oregano', en: 'tomato · garlic · oregano', allergens: [1], vegan: true, img: i('pizza-06-marinara') },
  { id: 'burrata', course: 'pizza', name: 'BURRATA E PISTACCHIO', price: '46 zł', pl: 'burrata · mortadela · pistacje', en: 'burrata · mortadella · pistachio', allergens: [1, 7, 8], nonnaPick: true, img: i('pizza-07-burrata-pistacchio'), bestseller: 6, bestLine: { pl: 'ta na instagrama', en: 'the instagram one' } },
  { id: 'capricciosa', course: 'pizza', name: 'CAPRICCIOSA', price: '40 zł', pl: 'szynka · karczochy · oliwki', en: 'ham · artichoke · olives', allergens: [1, 7], finito: true, img: i('pizza-08-capricciosa') },
  { id: 'giorno', course: 'pizza', name: 'PIZZA DEL GIORNO', price: '42 zł', pl: 'zapytaj marco · codziennie inna', en: 'ask marco · changes every day', allergens: 'ask', oggi: true, img: i('pizza-09-del-giorno') },
  // PASTA
  { id: 'carbonara', course: 'pasta', name: 'CARBONARA', price: '42 zł', pl: 'guanciale · pecorino · żółtko', en: 'guanciale · pecorino · egg yolk', allergens: [1, 3, 7], img: i('pasta-01-carbonara'), bestseller: 1, bestLine: { pl: 'ta, po której ktoś zadzwonił do mamy', en: 'the one that made someone call their mum' } },
  { id: 'cacio', course: 'pasta', name: 'CACIO E PEPE', price: '36 zł', pl: 'pecorino · czarny pieprz · i tyle', en: "pecorino · black pepper · that's it", allergens: [1, 7], veg: true, img: i('pasta-02-cacio-pepe') },
  { id: 'amatriciana', course: 'pasta', name: 'AMATRICIANA', price: '40 zł', pl: 'guanciale · pomidor · pecorino', en: 'guanciale · tomato · pecorino', allergens: [1, 7], img: i('pasta-03-amatriciana') },
  { id: 'ragu', course: 'pasta', name: 'RAGÙ DI NONNA', price: '44 zł', pl: '6 godzin · niedzielny przepis · tagliatelle', en: '6 hours · sunday recipe · tagliatelle', allergens: [1, 3, 7, 9, 12], nonnaPick: true, img: i('pasta-04-ragu-nonna'), bestseller: 3, bestLine: { pl: '6 godzin. tylko w niedziele. żart, codziennie.', en: '6 hours. sundays only. joking, every day.' } },
  { id: 'pesto', course: 'pasta', name: 'PESTO GENOVESE', price: '38 zł', pl: 'bazylia · orzeszki pinii', en: 'basil · pine nuts', allergens: [1, 7, 8], veg: true, img: i('pasta-05-pesto') },
  { id: 'vongole', course: 'pasta', name: 'VONGOLE', price: '52 zł', pl: 'małże · czosnek · białe wino', en: 'clams · garlic · white wine', allergens: [1, 12, 14], img: i('pasta-06-vongole') },
  { id: 'gnocchi', course: 'pasta', name: 'GNOCCHI SORRENTINA', price: '39 zł', pl: 'pomidor · mozzarella', en: 'tomato · mozzarella', allergens: [1, 3, 7], veg: true, img: i('pasta-07-gnocchi-sorrentina') },
  { id: 'tartufo', course: 'pasta', name: 'TARTUFO', price: '58 zł', pl: 'świeża trufla · masło · tagliatelle', en: 'fresh truffle · butter · tagliatelle', allergens: [1, 3, 7], img: i('pasta-08-tartufo') },
  { id: 'lasagna', course: 'pasta', name: 'LASAGNA', price: '42 zł', pl: 'z chrupiącym rogiem', en: 'with the crispy corner', allergens: [1, 3, 7, 9], finito: true, img: i('pasta-09-lasagna') },
  // DOLCI
  { id: 'tiramisu', course: 'dolci', name: 'TIRAMISÙ', price: '22 zł', pl: 'przepis nonny · kakao · savoiardi', en: "nonna's recipe · cocoa · savoiardi", allergens: [1, 3, 7], nonnaPick: true, img: i('dolci-01-tiramisu'), bestseller: 5, bestLine: { pl: 'nie podlega negocjacjom (giulia)', en: 'non-negotiable (giulia)' } },
  { id: 'cannolo', course: 'dolci', name: 'CANNOLO SICILIANO', price: '18 zł', pl: 'ricotta · końcówki z pistacji', en: 'ricotta · pistachio ends', allergens: [1, 7, 8], img: i('dolci-02-cannolo') },
  { id: 'pannacotta', course: 'dolci', name: 'PANNA COTTA', price: '19 zł', pl: 'wanilia · czerwone owoce', en: 'vanilla · red berries', allergens: [7], img: i('dolci-03-panna-cotta') },
  { id: 'affogato', course: 'dolci', name: 'AFFOGATO', price: '16 zł', pl: 'lody waniliowe · gorące espresso', en: 'vanilla gelato · hot espresso', allergens: [3, 7], img: i('dolci-04-affogato') },
  { id: 'baba', course: 'dolci', name: 'BABÀ AL RUM', price: '21 zł', pl: 'syrop rumowy · bita śmietana', en: 'rum syrup · whipped cream', allergens: [1, 3, 7], img: i('dolci-05-baba') },
  { id: 'gelato', course: 'dolci', name: 'GELATO DI NONNA', price: '15 zł', pl: 'fior di latte · oliwa · sól', en: 'fior di latte · olive oil · salt', allergens: [7], img: i('dolci-06-gelato') },
  // VINO
  { id: 'rosso', course: 'vino', name: 'ROSSO DELLA CASA', price: '22 / 90 zł', pl: 'czerwone domowe · lekkie, lekko schłodzone', en: 'house red · easy, cold-ish', allergens: [12], img: i('vino-01-rosso-casa') },
  { id: 'bianco', course: 'vino', name: 'BIANCO DELLA CASA', price: '22 / 90 zł', pl: 'białe domowe · rześkie', en: 'house white · crisp', allergens: [12], img: i('vino-02-bianco-casa') },
  { id: 'lambrusco', course: 'vino', name: 'LAMBRUSCO', price: '26 / 110 zł', pl: 'frizzante · podawane zimne', en: 'frizzante · served cold', allergens: [12], img: i('vino-03-lambrusco') },
  { id: 'primitivo', course: 'vino', name: 'PRIMITIVO', price: '28 / 120 zł', pl: 'puglia · duże i dżemowe', en: 'puglia · big and jammy', allergens: [12], nonnaPick: true, img: i('vino-04-primitivo') },
  { id: 'nero', course: 'vino', name: "NERO D'AVOLA", price: '30 / 130 zł', pl: 'sycylia · ciemne owoce', en: 'sicilia · dark fruit', allergens: [12], img: i('vino-05-nero-davola') },
  { id: 'chianti', course: 'vino', name: 'CHIANTI', price: '32 / 140 zł', pl: 'toskania · wiśnie', en: 'toscana · cherries', allergens: [12], img: i('vino-06-chianti') },
  { id: 'vermentino', course: 'vino', name: 'VERMENTINO', price: '28 / 120 zł', pl: 'sardynia · słone, świeże', en: 'sardegna · salty, fresh', allergens: [12], img: i('vino-07-vermentino') },
  { id: 'pecorino-vino', course: 'vino', name: 'PECORINO', price: '30 / 130 zł', pl: 'abruzja · wino, nie ser', en: 'abruzzo · the wine, not the cheese', allergens: [12], img: i('vino-08-pecorino') },
  { id: 'prosecco', course: 'vino', name: 'PROSECCO', price: '28 / 120 zł', pl: 'veneto · bąbelki', en: 'veneto · bubbles', allergens: [12], img: i('vino-09-prosecco') },
  { id: 'rosato', course: 'vino', name: 'ROSATO', price: '26 / 110 zł', pl: 'różowe · tylko latem', en: 'pink · summer only', allergens: [12], oggi: true, img: i('vino-10-rosato') },
  { id: 'amaro', course: 'vino', name: 'AMARO', price: '18 zł', pl: 'po kolacji · gorzkie', en: 'after dinner · bitter', allergens: [12], img: i('vino-11-amaro') },
  { id: 'limoncello', course: 'vino', name: 'LIMONCELLO', price: '16 zł', pl: 'domowe · lodowato zimne', en: 'homemade · ice cold', allergens: null, img: i('vino-12-limoncello') },
];

export const byCourse = (c: Course) => MENU.filter((d) => d.course === c);
export const bestsellers = () =>
  MENU.filter((d) => d.bestseller).sort((a, b) => (a.bestseller ?? 0) - (b.bestseller ?? 0));
