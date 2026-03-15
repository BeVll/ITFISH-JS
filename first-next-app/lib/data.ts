/**
 * Типи для списку ігор (коротка інформація) та повної сторінки гри.
 */
export type GameType = "Відеогра" | "Настільна" | "Казуальна";

export interface RecommendedSpecs {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
  directX?: string;
}

export interface Game {
  slug: string;
  title: string;
  image: string;
  yearOfRelease: number;
  description: string;
  gameType: GameType;
  genre: string;
  weight: number; // 1–5, складність / глибина гри
  recommendedSpecs: RecommendedSpecs;
  // Додаткові поля
  playersCount: string; // "1", "1-4", "2-8" тощо
  averagePlaytimeMinutes: number;
  rating: number; // 1–10
  languages: string[];
  developer: string;
}

/** Поля для картки в списку ігор */
export type GameListItem = Pick<
  Game,
  | "slug"
  | "title"
  | "image"
  | "yearOfRelease"
  | "gameType"
  | "genre"
  | "weight"
  | "rating"
> & {
  descriptionShort: string;
};

export const games: Game[] = [
  {
    slug: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/1091500/library_600x900_2x.jpg",
    yearOfRelease: 2020,
    description:
      "Cyberpunk 2077 — пригодницька RPG від CD Projekt Red у відкритому світі Нічного Міста. Грайте за V, найманця, який намагається знайти унікальний імплант, що дає безсмертя. Вибір класу, гілки діалогів, кібернетика та неонова антиутопія.",
    gameType: "Відеогра",
    genre: "RPG, Action, Open World",
    weight: 4,
    recommendedSpecs: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-4790 / AMD Ryzen 3 3200G",
      memory: "12 GB RAM",
      graphics: "NVIDIA GeForce GTX 1060 6GB / AMD Radeon R9 Fury",
      storage: "70 GB",
      directX: "Version 12",
    },
    playersCount: "1",
    averagePlaytimeMinutes: 2400,
    rating: 8.5,
    languages: ["UA", "EN", "PL", "DE", "FR"],
    developer: "CD Projekt Red",
  },
  {
    slug: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/1086940/library_600x900_2x.jpg",
    yearOfRelease: 2023,
    description:
      "Baldur's Gate 3 — рольова гра від Larian Studios за правилами D&D 5e. Повноцінна кооперативна кампанія, глибокі діалоги, тактичні бої в реальному часі з паузою та величезний світ з безліччю наслідків виборів.",
    gameType: "Відеогра",
    genre: "RPG, Turn-based, Strategy",
    weight: 5,
    recommendedSpecs: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-8700K / AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "NVIDIA GeForce GTX 2060 Super / AMD Radeon RX 5700 XT",
      storage: "150 GB SSD",
      directX: "Version 11",
    },
    playersCount: "1-4",
    averagePlaytimeMinutes: 6000,
    rating: 9.5,
    languages: ["UA", "EN", "DE", "FR", "ES"],
    developer: "Larian Studios",
  },
  {
    slug: "hollow-knight",
    title: "Hollow Knight",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/367520/library_600x900_2x.jpg",
    yearOfRelease: 2017,
    description:
      "Hollow Knight — 2D метроїдванія в темному світі комах. Досліджуйте підземне королівство Холонест, відкривайте здібності, бийтеся з босами та розгадуйте таємниці занепалого королівства.",
    gameType: "Відеогра",
    genre: "Metroidvania, Platformer, Indie",
    weight: 3,
    recommendedSpecs: {
      os: "Windows 10",
      processor: "Intel Core 2 Duo E5200",
      memory: "4 GB RAM",
      graphics: "GeForce 9800GTX+ (1GB)",
      storage: "9 GB",
    },
    playersCount: "1",
    averagePlaytimeMinutes: 600,
    rating: 9.2,
    languages: ["EN", "UA", "RU", "DE", "FR"],
    developer: "Team Cherry",
  },
  {
    slug: "stardew-valley",
    title: "Stardew Valley",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/413150/library_600x900_2x.jpg",
    yearOfRelease: 2016,
    description:
      "Stardew Valley — симулятор фермерського життя та соціальна гра. Успадкуйте ферму, вирощуйте культури, розводьте тварин, дружіть з мешканцями, досліджуйте печери та влаштовуйте життя в долині.",
    gameType: "Відеогра",
    genre: "Simulation, RPG, Indie",
    weight: 2,
    recommendedSpecs: {
      os: "Windows 10",
      processor: "2 GHz",
      memory: "2 GB RAM",
      graphics: "256 MB video memory",
      storage: "500 MB",
    },
    playersCount: "1-4",
    averagePlaytimeMinutes: 1200,
    rating: 9.0,
    languages: ["UA", "EN", "DE", "ES", "PT"],
    developer: "ConcernedApe",
  },
  {
    slug: "elden-ring",
    title: "Elden Ring",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/1245620/library_600x900_2x.jpg",
    yearOfRelease: 2022,
    description:
      "Elden Ring — action RPG від FromSoftware та Джорджа Р. Р. Мартіна. Відкритий світ Середземелла, складні боси, конейна бойова система та глибока лорева історія. Один з найбільших хітів soulslike жанру.",
    gameType: "Відеогра",
    genre: "Action RPG, Soulslike, Open World",
    weight: 5,
    recommendedSpecs: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-8700K / AMD Ryzen 5 3600X",
      memory: "16 GB RAM",
      graphics: "NVIDIA GeForce GTX 1070 8GB / AMD Radeon RX Vega 56",
      storage: "60 GB",
      directX: "Version 12",
    },
    playersCount: "1-4",
    averagePlaytimeMinutes: 3600,
    rating: 9.4,
    languages: ["EN", "UA", "JP", "DE", "FR"],
    developer: "FromSoftware",
  },
  {
    slug: "the-witcher-3",
    title: "The Witcher 3: Wild Hunt",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/292030/library_600x900_2x.jpg",
    yearOfRelease: 2015,
    description:
      "The Witcher 3 — епічна RPG про відьмака Геральта. Полюйте на чудовиськ, вирішуйте долі королівств і людей, шукайте Цірі та насолоджуйтесь одним з найбагатших відкритих світів у іграх.",
    gameType: "Відеогра",
    genre: "RPG, Action, Open World",
    weight: 4,
    recommendedSpecs: {
      os: "Windows 7/8/10 64-bit",
      processor: "Intel Core i7-3770 / AMD FX-8350",
      memory: "8 GB RAM",
      graphics: "NVIDIA GeForce GTX 770 / AMD Radeon R9 290",
      storage: "50 GB",
    },
    playersCount: "1",
    averagePlaytimeMinutes: 4200,
    rating: 9.3,
    languages: ["UA", "EN", "PL", "DE", "FR", "RU"],
    developer: "CD Projekt Red",
  },
  {
    slug: "disco-elysium",
    title: "Disco Elysium",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/632470/library_600x900_2x.jpg",
    yearOfRelease: 2019,
    description:
      "Disco Elysium — детективна RPG без класичних боїв. Грайте детективом, який втратив пам'ять після запойного. Розвивайте навички, ведіть діалоги, розслідуйте вбивство та будуйте власну особистість у Ревіахолі.",
    gameType: "Відеогра",
    genre: "RPG, Detective, Narrative",
    weight: 5,
    recommendedSpecs: {
      os: "Windows 10",
      processor: "Intel Core i5-7500 / AMD Ryzen 3 1200",
      memory: "4 GB RAM",
      graphics: "NVIDIA GeForce GTX 560 / AMD Radeon HD 7750",
      storage: "20 GB",
    },
    playersCount: "1",
    averagePlaytimeMinutes: 2400,
    rating: 9.1,
    languages: ["EN", "UA", "RU", "FR", "DE"],
    developer: "ZA/UM",
  },
  {
    slug: "hades",
    title: "Hades",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/1145360/library_600x900_2x.jpg",
    yearOfRelease: 2020,
    description:
      "Hades — roguelike action від Supergiant. Грайте Загреєм, сином Аїда, і намагайтеся втекти з підземного світу. Динамічні бої, різні зброї, благословення богів та сюжет, що розкривається з кожним пробігом.",
    gameType: "Відеогра",
    genre: "Roguelike, Action, Indie",
    weight: 3,
    recommendedSpecs: {
      os: "Windows 10 64-bit",
      processor: "Dual Core 2.4 GHz",
      memory: "4 GB RAM",
      graphics: "NVIDIA GeForce GTX 450 / AMD Radeon HD 5750",
      storage: "15 GB",
    },
    playersCount: "1",
    averagePlaytimeMinutes: 600,
    rating: 9.0,
    languages: ["EN", "UA", "DE", "ES", "FR"],
    developer: "Supergiant Games",
  },
  {
    slug: "red-dead-redemption-2",
    title: "Red Dead Redemption 2",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/1174180/library_600x900_2x.jpg",
    yearOfRelease: 2019,
    description:
      "Red Dead Redemption 2 — вестерн від Rockstar. Грайте Артуром Морганом у банді Ван дер Лінде наприкінці епохи дикого заходу. Відкритий світ, полювання, стрілянини, моральні вибори та кінематографічна історія.",
    gameType: "Відеогра",
    genre: "Action, Open World, Adventure",
    weight: 4,
    recommendedSpecs: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-4770K / AMD Ryzen 5 1500X",
      memory: "12 GB RAM",
      graphics: "NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 480",
      storage: "150 GB",
      directX: "Version 12",
    },
    playersCount: "1",
    averagePlaytimeMinutes: 4800,
    rating: 9.5,
    languages: ["EN", "UA", "RU", "PL", "DE"],
    developer: "Rockstar Games",
  },
  {
    slug: "slay-the-spire",
    title: "Slay the Spire",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/646570/library_600x900_2x.jpg",
    yearOfRelease: 2019,
    description:
      "Slay the Spire — roguelike колода-білдер. Піднімайтеся на вершину вежі, збирайте колоду карт, зустрічайте ворогів та події. Чотири персонажі, сотні карт і артефактів, безкінечна реіграбельність.",
    gameType: "Відеогра",
    genre: "Roguelike, Deck-building, Strategy",
    weight: 4,
    recommendedSpecs: {
      os: "Windows 10",
      processor: "2.0 GHz",
      memory: "2 GB RAM",
      graphics: "Integrated",
      storage: "1 GB",
    },
    playersCount: "1",
    averagePlaytimeMinutes: 900,
    rating: 8.8,
    languages: ["EN", "UA", "JP", "KO", "ZH"],
    developer: "Mega Crit Games",
  },
  {
    slug: "portal-2",
    title: "Portal 2",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/620/library_600x900_2x.jpg",
    yearOfRelease: 2011,
    description:
      "Portal 2 — головоломка від Valve з портальним пістолетом. Створюйте портали, проходьте лабораторії Aperture Science, дізнайтеся історію GLaDOS та співпрацюйте з Вітлі в кооперативному режимі.",
    gameType: "Відеогра",
    genre: "Puzzle, First-person, Adventure",
    weight: 3,
    recommendedSpecs: {
      os: "Windows 7 32/64-bit",
      processor: "3.0 GHz P4, Dual Core 2.0 / AMD64X2",
      memory: "2 GB RAM",
      graphics: "Video card with 128 MB",
      storage: "8 GB",
    },
    playersCount: "1-2",
    averagePlaytimeMinutes: 600,
    rating: 9.2,
    languages: ["EN", "UA", "RU", "DE", "FR"],
    developer: "Valve",
  },
  {
    slug: "civilization-6",
    title: "Sid Meier's Civilization VI",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/289070/library_600x900_2x.jpg",
    yearOfRelease: 2016,
    description:
      "Civilization VI — покрокова стратегія про розвиток цивілізації від кам'яного віку до космосу. Будьте лідером, будуйте міста, ведіть дипломатію та війни, досліджуйте технології та культуру.",
    gameType: "Відеогра",
    genre: "Strategy, Turn-based, 4X",
    weight: 5,
    recommendedSpecs: {
      os: "Windows 7 64-bit",
      processor: "Intel Core i5 2.5 GHz / AMD FX 8350",
      memory: "8 GB RAM",
      graphics: "NVIDIA GTX 770 / AMD Radeon R9 280",
      storage: "12 GB",
      directX: "Version 11",
    },
    playersCount: "1-4",
    averagePlaytimeMinutes: 1800,
    rating: 8.7,
    languages: ["EN", "UA", "DE", "FR", "ES", "RU"],
    developer: "Firaxis Games",
  },
  {
    slug: "minecraft",
    title: "Minecraft",
    image:
      "https://upload.wikimedia.org/wikipedia/ru/f/f4/Minecraft_Cover_Art.png",
    yearOfRelease: 2011,
    description:
      "Minecraft — пісочниця з процедурно генерованим світом з блоків. Будьте що завгодно: будівельник, дослідник, виживач або черв'як у режимі творчості. Мультиплеєр, моди та нескінченні можливості.",
    gameType: "Відеогра",
    genre: "Sandbox, Survival, Creative",
    weight: 2,
    recommendedSpecs: {
      os: "Windows 10/11",
      processor: "Intel Core i5-4690 / AMD A10-7800",
      memory: "8 GB RAM",
      graphics: "NVIDIA GeForce 700 Series / AMD Radeon Rx 200",
      storage: "4 GB",
    },
    playersCount: "1-8",
    averagePlaytimeMinutes: 9999,
    rating: 9.0,
    languages: ["UA", "EN", "DE", "FR", "ES", "PL", "RU"],
    developer: "Mojang Studios",
  },
  {
    slug: "undertale",
    title: "Undertale",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/391540/library_600x900_2x.jpg",
    yearOfRelease: 2015,
    description:
      "Undertale — RPG, де можна не вбивати ворогів. Діалоги, головоломки, різні закінчення залежно від ваших дій. Унікальний гумор, музика та історія про монстрів під землею.",
    gameType: "Відеогра",
    genre: "RPG, Indie, Narrative",
    weight: 2,
    recommendedSpecs: {
      os: "Windows XP/Vista/7/8/10",
      processor: "2 GHz",
      memory: "2 GB RAM",
      graphics: "128 MB",
      storage: "200 MB",
    },
    playersCount: "1",
    averagePlaytimeMinutes: 360,
    rating: 8.9,
    languages: ["EN", "UA", "RU", "JP", "KO"],
    developer: "Toby Fox",
  },
  {
    slug: "factorio",
    title: "Factorio",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/427520/library_600x900_2x.jpg",
    yearOfRelease: 2020,
    description:
      "Factorio — симулятор автоматизації. Побудуйте завод від ручного збирання до мегабази з поїздами та логістичними роботами. Захищайтеся від туземців, оптимізуйте виробництво та ніколи не виходьте — гра затягує.",
    gameType: "Відеогра",
    genre: "Strategy, Simulation, Sandbox",
    weight: 5,
    recommendedSpecs: {
      os: "Windows 10 64-bit",
      processor: "Dual core 3 GHz+",
      memory: "4 GB RAM",
      graphics: "DirectX 10.1 / OpenGL 3.3",
      storage: "3 GB",
    },
    playersCount: "1-8",
    averagePlaytimeMinutes: 2000,
    rating: 9.3,
    languages: ["EN", "UA", "DE", "FR", "RU"],
    developer: "Wube Software",
  },
  {
    slug: "among-us",
    title: "Among Us",
    image:
      "https://steamcdn-a.akamaihd.net/steam/apps/945360/library_600x900_2x.jpg",
    yearOfRelease: 2018,
    description:
      "Among Us — соціальна дедукція для друзів. Гравці виконують завдання на кораблі, а один або кілька імпосторів намагаються саботувати та вбивати. Обговорення, голосування та підозри — хто зрадник?",
    gameType: "Казуальна",
    genre: "Party, Social Deduction, Multiplayer",
    weight: 1,
    recommendedSpecs: {
      os: "Windows 10",
      processor: "1 GHz",
      memory: "1 GB RAM",
      graphics: "Integrated",
      storage: "250 MB",
    },
    playersCount: "4-15",
    averagePlaytimeMinutes: 15,
    rating: 8.0,
    languages: ["EN", "UA", "RU", "ES", "PT"],
    developer: "Innersloth",
  },
];

/** Повертає всі ігри у вигляді списку (коротка інформація для карток). */
export function getGameList(): GameListItem[] {
  return games.map((g) => ({
    slug: g.slug,
    title: g.title,
    image: g.image,
    yearOfRelease: g.yearOfRelease,
    gameType: g.gameType,
    genre: g.genre,
    weight: g.weight,
    rating: g.rating,
    descriptionShort:
      g.description.slice(0, 120) + (g.description.length > 120 ? "…" : ""),
  }));
}

/** Повертає одну гру за slug для сторінки гри, або null. */
export function getGameBySlug(slug: string): Game | null {
  return games.find((g) => g.slug === slug) ?? null;
}

/** Повертає всі slugs для статичної генерації маршрутів. */
export function getAllGameSlugs(): string[] {
  return games.map((g) => g.slug);
}
