/**
 * Single source of truth for demo content. Also consumed by
 * `scripts/generate-images.ts`, which renders the SVG product imagery from the
 * same colour fields so pictures and specs never drift apart.
 */

export type SeedCollection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  sortOrder: number;
  /** Backdrop tones for the generated collection hero artwork. */
  heroFrom: string;
  heroTo: string;
};

export type SeedProduct = {
  slug: string;
  name: string;
  collection: string;
  reference: string;
  sku: string;
  shortDesc: string;
  description: string;
  display: string;
  chip: string;
  storage: string;
  battery: string;
  sensors: string;
  connectivity: string;
  compatibility: string;
  caseSize: number;
  caseMaterial: string;
  glass: string;
  band: string;
  waterResistance: string;
  priceCents: number;
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  /** Render colours for the generated SVG imagery. */
  art: {
    metal: string;
    metalDark: string;
    dial: string;
    dialEdge: string;
    accent: string;
    strap: string;
    strapDark: string;
    bezel: "digital" | "round" | "rugged" | "minimal";
  };
};

export const collections: SeedCollection[] = [
  {
    slug: "pulse",
    name: "Pulse",
    tagline: "Built to move with you",
    description:
      "Pulse is the everyday fitness line — always-on health tracking, workout detection, and sleep scoring in a case light enough to forget you're wearing. It's the watch most Meridian owners start with.",
    sortOrder: 1,
    heroFrom: "#0a1f1a",
    heroTo: "#123d2f",
  },
  {
    slug: "summit",
    name: "Summit",
    tagline: "Engineered for the edge",
    description:
      "Summit is built for conditions that end other watches — titanium and forged carbon cases, dual-frequency GPS, and battery that measures itself in days, not hours. The Action Button is there because gloves exist.",
    sortOrder: 2,
    heroFrom: "#1c1206",
    heroTo: "#3d2810",
  },
  {
    slug: "studio",
    name: "Studio",
    tagline: "Everyday intelligence, refined",
    description:
      "Studio takes the round face people already associate with a watch and puts a computer behind it — polished steel, Milanese loops, genuine leather. Built for a desk as much as a run.",
    sortOrder: 3,
    heroFrom: "#17151a",
    heroTo: "#2f2b38",
  },
  {
    slug: "aero",
    name: "Aero",
    tagline: "The lightest thing you'll wear",
    description:
      "Aero strips everything down to what a watch actually needs: an always-on display, a heart rate sensor, and three weeks of battery. No case over 5.4mm thick, no reason to take it off to charge it.",
    sortOrder: 4,
    heroFrom: "#0a0e1c",
    heroTo: "#16203d",
  },
];

export const products: SeedProduct[] = [
  {
    slug: "pulse-41-aluminum",
    name: "Pulse 41 Aluminum",
    collection: "pulse",
    reference: "MER-PLS-41-GRA",
    sku: "MER-1001",
    shortDesc:
      "Everyday fitness tracking in a 41mm recycled aluminum case with an always-on display.",
    description:
      "Pulse 41 is the watch most people should start with. The always-on LTPO display stays lit without killing the battery, automatic workout detection picks up a run before you tap start, and overnight sleep scoring is waiting for you by the time you check the time. The case is machined from 100% recycled aluminum, and at 30 grams you'll forget it's on your wrist by the second day.",
    display: "1.7\" LTPO OLED, Always-On, 1000 nits",
    chip: "M1 Dual-Core",
    storage: "32GB",
    battery: "Up to 18 hours (36h in low-power mode)",
    sensors: "Heart rate, SpO2, Accelerometer, Gyroscope",
    connectivity: "Bluetooth 5.3, Wi-Fi",
    compatibility: "iOS 16+ and Android 10+",
    caseSize: 41,
    caseMaterial: "Recycled Aluminum",
    glass: "Ion-X Strengthened Glass",
    band: "Silicone Sport Band, Graphite",
    waterResistance: "50 metres (5 ATM)",
    priceCents: 24900,
    stock: 24,
    isFeatured: true,
    isNew: false,
    art: {
      metal: "#d9dbe0",
      metalDark: "#8b8e97",
      dial: "#050608",
      dialEdge: "#0d1420",
      accent: "#34d399",
      strap: "#2b2e33",
      strapDark: "#17181b",
      bezel: "digital",
    },
  },
  {
    slug: "pulse-45-sport",
    name: "Pulse 45 Sport",
    collection: "pulse",
    reference: "MER-PLS-45-COR",
    sku: "MER-1002",
    shortDesc:
      "The larger Pulse, tuned for longer workouts with a brighter always-on display.",
    description:
      "Same sensor suite as Pulse 41, in a 45mm case with a bigger battery and a brighter panel for outdoor visibility mid-run. Coral is the case colour that convinced us to keep making bright colourways — it reads clearly in direct sun where darker cases wash out.",
    display: "1.9\" LTPO OLED, Always-On, 1200 nits",
    chip: "M1 Dual-Core",
    storage: "32GB",
    battery: "Up to 24 hours (48h in low-power mode)",
    sensors: "Heart rate, SpO2, Accelerometer, Gyroscope",
    connectivity: "Bluetooth 5.3, Wi-Fi, GPS",
    compatibility: "iOS 16+ and Android 10+",
    caseSize: 45,
    caseMaterial: "Recycled Aluminum",
    glass: "Ion-X Strengthened Glass",
    band: "Silicone Sport Band, Coral",
    waterResistance: "50 metres (5 ATM)",
    priceCents: 27900,
    stock: 19,
    isFeatured: false,
    isNew: true,
    art: {
      metal: "#d9dbe0",
      metalDark: "#8b8e97",
      dial: "#050608",
      dialEdge: "#150a08",
      accent: "#ff6b5b",
      strap: "#ff6b5b",
      strapDark: "#c94d40",
      bezel: "digital",
    },
  },
  {
    slug: "pulse-se",
    name: "Pulse SE",
    collection: "pulse",
    reference: "MER-PLS-SE-BLK",
    sku: "MER-1003",
    shortDesc:
      "Essential health tracking at half the price — same case, fewer sensors, longer battery.",
    description:
      "Pulse SE drops SpO2 and skin-temperature sensing to hold a lower price without touching the case, display, or the fitness tracking most owners actually use daily. What's left in the battery budget goes straight into runtime: 30 hours on a charge most competitors need a bigger case to match.",
    display: "1.7\" OLED, Always-On, 800 nits",
    chip: "M1 Dual-Core",
    storage: "16GB",
    battery: "Up to 30 hours",
    sensors: "Heart rate, Accelerometer, Gyroscope",
    connectivity: "Bluetooth 5.3, Wi-Fi",
    compatibility: "iOS 16+ and Android 10+",
    caseSize: 40,
    caseMaterial: "Recycled Aluminum",
    glass: "Ion-X Strengthened Glass",
    band: "Silicone Sport Band, Black",
    waterResistance: "50 metres (5 ATM)",
    priceCents: 17900,
    stock: 31,
    isFeatured: false,
    isNew: false,
    art: {
      metal: "#c7c9cf",
      metalDark: "#75777d",
      dial: "#050608",
      dialEdge: "#08161a",
      accent: "#2dd4bf",
      strap: "#1c1c1e",
      strapDark: "#0e0e10",
      bezel: "digital",
    },
  },
  {
    slug: "summit-titanium-49",
    name: "Summit Titanium 49",
    collection: "summit",
    reference: "MER-SUM-49-TIB",
    sku: "MER-2001",
    shortDesc:
      "A 49mm titanium case rated for the outer edge — dual-frequency GPS and a dedicated Action Button.",
    description:
      "Summit Titanium is the reference the rest of the line is built down from. Dual-frequency GPS holds a signal in canyons and under tree cover where single-frequency chips lose lock, the sapphire crystal shrugs off the scratch a trailhead rock leaves on everything else, and the Action Button on the left edge is reachable with a glove on. Depth gauge and compass are hardware, not software estimates.",
    display: "2.1\" LTPO OLED, Always-On, 3000 nits",
    chip: "M2 Dual-Core",
    storage: "64GB",
    battery: "Up to 36 hours (72h in low-power mode)",
    sensors: "Heart rate, SpO2, ECG, Altimeter, Depth Gauge, Compass",
    connectivity: "Bluetooth 5.3, Wi-Fi, GPS + Cellular",
    compatibility: "iOS 17+ and Android 11+",
    caseSize: 49,
    caseMaterial: "Grade-5 Titanium",
    glass: "Sapphire Crystal",
    band: "Trail Loop, Orange",
    waterResistance: "100 metres (10 ATM)",
    priceCents: 79900,
    stock: 11,
    isFeatured: true,
    isNew: true,
    art: {
      metal: "#b5b4b1",
      metalDark: "#6e6d6a",
      dial: "#050505",
      dialEdge: "#1a0f06",
      accent: "#ff8a3d",
      strap: "#ff8a3d",
      strapDark: "#b25a24",
      bezel: "rugged",
    },
  },
  {
    slug: "summit-expedition",
    name: "Summit Expedition",
    collection: "summit",
    reference: "MER-SUM-EXP-BLK",
    sku: "MER-2002",
    shortDesc:
      "Built for multi-day expeditions — 14 days of battery in low-power mode.",
    description:
      "Expedition mode strips the display to essentials — time, heading, elapsed distance — and stretches the same cell that runs Summit Titanium for 36 hours out to 14 days. The kevlar-reinforced loop was tested against three weeks of continuous UV exposure and salt water before it shipped. This is the watch we send with people who won't see a charger for a while.",
    display: "2.1\" LTPO OLED, Always-On, 3000 nits",
    chip: "M2 Dual-Core",
    storage: "64GB",
    battery: "Up to 14 days (low-power expedition mode)",
    sensors: "Heart rate, SpO2, Altimeter, Depth Gauge, Compass",
    connectivity: "Bluetooth 5.3, Wi-Fi, GPS + Cellular",
    compatibility: "iOS 17+ and Android 11+",
    caseSize: 49,
    caseMaterial: "Grade-5 Titanium",
    glass: "Sapphire Crystal",
    band: "Kevlar-Reinforced Loop, Black",
    waterResistance: "100 metres (10 ATM)",
    priceCents: 89900,
    stock: 6,
    isFeatured: false,
    isNew: true,
    art: {
      metal: "#9b9a97",
      metalDark: "#5a5957",
      dial: "#050505",
      dialEdge: "#171205",
      accent: "#f2c14e",
      strap: "#1c1c1e",
      strapDark: "#0e0e10",
      bezel: "rugged",
    },
  },
  {
    slug: "summit-carbon",
    name: "Summit Carbon",
    collection: "summit",
    reference: "MER-SUM-CBN-45",
    sku: "MER-2003",
    shortDesc:
      "Forged carbon case, 32% lighter than titanium, for the same depth rating.",
    description:
      "Every forged carbon case carries a marbled pattern unique to the sheet it was pressed from, and comes in at 32% lighter than the titanium case without giving up the 100-metre rating or the Action Button. It's the Summit we recommend for anyone who finds 49mm of titanium a lot to carry through a full trail day.",
    display: "1.9\" LTPO OLED, Always-On, 2500 nits",
    chip: "M2 Dual-Core",
    storage: "64GB",
    battery: "Up to 30 hours (60h in low-power mode)",
    sensors: "Heart rate, SpO2, Altimeter, Compass",
    connectivity: "Bluetooth 5.3, Wi-Fi, GPS",
    compatibility: "iOS 17+ and Android 11+",
    caseSize: 45,
    caseMaterial: "Forged Carbon",
    glass: "Sapphire Crystal",
    band: "Rubber Trail Band, Graphite",
    waterResistance: "100 metres (10 ATM)",
    priceCents: 69900,
    stock: 8,
    isFeatured: false,
    isNew: false,
    art: {
      metal: "#4a4a4e",
      metalDark: "#26262a",
      dial: "#050505",
      dialEdge: "#141005",
      accent: "#e8c341",
      strap: "#1a1a1c",
      strapDark: "#0d0d0e",
      bezel: "rugged",
    },
  },
  {
    slug: "studio-round-42",
    name: "Studio Round 42",
    collection: "studio",
    reference: "MER-STU-42-STL",
    sku: "MER-3001",
    shortDesc:
      "A circular AMOLED face in polished steel, on a Milanese loop.",
    description:
      "Studio Round is the watch for people who never wanted their smartwatch to look like a smartwatch. The 42mm polished steel case and Milanese loop could pass for an analog piece at a glance, and the circular AMOLED panel underneath runs the full health and notification stack. Forty hours between charges means it comes off only for the shower.",
    display: "1.4\" Round AMOLED, Always-On, 1000 nits",
    chip: "M1 Dual-Core",
    storage: "32GB",
    battery: "Up to 40 hours",
    sensors: "Heart rate, SpO2, ECG",
    connectivity: "Bluetooth 5.3, Wi-Fi",
    compatibility: "iOS 16+ and Android 10+",
    caseSize: 42,
    caseMaterial: "Stainless Steel",
    glass: "Sapphire Crystal",
    band: "Milanese Loop, Silver",
    waterResistance: "50 metres (5 ATM)",
    priceCents: 39900,
    stock: 14,
    isFeatured: true,
    isNew: false,
    art: {
      metal: "#d8d5ce",
      metalDark: "#8e8b84",
      dial: "#050505",
      dialEdge: "#14120a",
      accent: "#c9a35a",
      strap: "#c7c9cf",
      strapDark: "#9a9ca3",
      bezel: "round",
    },
  },
  {
    slug: "studio-ceramic",
    name: "Studio Ceramic",
    collection: "studio",
    reference: "MER-STU-CER-WHT",
    sku: "MER-3002",
    shortDesc:
      "White ceramic case with a pastel Sport Loop — the lightest Studio piece.",
    description:
      "White high-tech ceramic resists scratching the way steel never quite can, and stays cool against the skin in a way metal doesn't. Paired here with a sand-pink Sport Loop, it's the Studio case we see people buy specifically because it doesn't look like every other smartwatch on the train.",
    display: "1.4\" Round AMOLED, Always-On, 1000 nits",
    chip: "M1 Dual-Core",
    storage: "32GB",
    battery: "Up to 36 hours",
    sensors: "Heart rate, SpO2, ECG",
    connectivity: "Bluetooth 5.3, Wi-Fi",
    compatibility: "iOS 16+ and Android 10+",
    caseSize: 41,
    caseMaterial: "White Ceramic",
    glass: "Sapphire Crystal",
    band: "Sport Loop, Sand Pink",
    waterResistance: "50 metres (5 ATM)",
    priceCents: 44900,
    stock: 9,
    isFeatured: false,
    isNew: true,
    art: {
      metal: "#ececec",
      metalDark: "#c7c7c7",
      dial: "#050505",
      dialEdge: "#160b0d",
      accent: "#e39aa0",
      strap: "#f0c9c3",
      strapDark: "#d19a92",
      bezel: "round",
    },
  },
  {
    slug: "studio-leather-edition",
    name: "Studio Leather Edition",
    collection: "studio",
    reference: "MER-STU-LTH-BLK",
    sku: "MER-3003",
    shortDesc:
      "Steel case and a genuine leather strap — the Studio built for the office.",
    description:
      "The same 42mm steel case as Studio Round, on a hand-stitched espresso leather strap instead of a metal loop. It's the version we point people to when they want the Studio face on a strap that answers to a blazer instead of a gym bag.",
    display: "1.4\" Round AMOLED, Always-On, 1000 nits",
    chip: "M1 Dual-Core",
    storage: "32GB",
    battery: "Up to 40 hours",
    sensors: "Heart rate, SpO2, ECG",
    connectivity: "Bluetooth 5.3, Wi-Fi",
    compatibility: "iOS 16+ and Android 10+",
    caseSize: 42,
    caseMaterial: "Stainless Steel",
    glass: "Sapphire Crystal",
    band: "Genuine Leather Strap, Espresso",
    waterResistance: "50 metres (5 ATM)",
    priceCents: 42900,
    stock: 7,
    isFeatured: false,
    isNew: false,
    art: {
      metal: "#d8d5ce",
      metalDark: "#8e8b84",
      dial: "#050505",
      dialEdge: "#140d08",
      accent: "#b3782e",
      strap: "#5a3a24",
      strapDark: "#3a2314",
      bezel: "round",
    },
  },
  {
    slug: "aero-slim-40",
    name: "Aero Slim 40",
    collection: "aero",
    reference: "MER-AER-40-STA",
    sku: "MER-4001",
    shortDesc: "5.4mm thin, with a display that never needs waking.",
    description:
      "Aero Slim exists because most smartwatches are thicker than they need to be. At 5.4mm it sits under a cuff the way an analog watch does, the always-on display means you never tap the case to check the time, and the low-power chip stretches a smaller cell to two full weeks. Fewer sensors, on purpose — this is the essentials watch.",
    display: "1.6\" LTPO OLED, Always-On, 800 nits",
    chip: "M1 Low-Power",
    storage: "16GB",
    battery: "Up to 14 days",
    sensors: "Heart rate, Accelerometer",
    connectivity: "Bluetooth 5.3",
    compatibility: "iOS 16+ and Android 10+",
    caseSize: 40,
    caseMaterial: "Aerospace Aluminum",
    glass: "Ion-X Strengthened Glass",
    band: "Woven Nylon Loop, Starlight",
    waterResistance: "30 metres (3 ATM)",
    priceCents: 19900,
    stock: 22,
    isFeatured: true,
    isNew: false,
    art: {
      metal: "#e4e2dc",
      metalDark: "#a7a49b",
      dial: "#050608",
      dialEdge: "#0a1020",
      accent: "#7d95ff",
      strap: "#e4e2dc",
      strapDark: "#b8b6b0",
      bezel: "minimal",
    },
  },
  {
    slug: "aero-air",
    name: "Aero Air",
    collection: "aero",
    reference: "MER-AER-AIR-SKY",
    sku: "MER-4002",
    shortDesc:
      "The lightest watch Meridian makes, in a fabric loop built to disappear on the wrist.",
    description:
      "Aero Air trims another four grams off Aero Slim by moving to a smaller 38mm shell, and comes exclusively on a woven nylon loop that dries in minutes if you forget to take it off in the rain. Sky is the colourway that sells out first every restock.",
    display: "1.4\" LTPO OLED, Always-On, 800 nits",
    chip: "M1 Low-Power",
    storage: "16GB",
    battery: "Up to 12 days",
    sensors: "Heart rate, Accelerometer",
    connectivity: "Bluetooth 5.3",
    compatibility: "iOS 16+ and Android 10+",
    caseSize: 38,
    caseMaterial: "Aerospace Aluminum",
    glass: "Ion-X Strengthened Glass",
    band: "Woven Nylon Loop, Sky",
    waterResistance: "30 metres (3 ATM)",
    priceCents: 17900,
    stock: 27,
    isFeatured: false,
    isNew: true,
    art: {
      metal: "#e4e2dc",
      metalDark: "#a7a49b",
      dial: "#050608",
      dialEdge: "#0a1424",
      accent: "#6fb8ff",
      strap: "#6fb8ff",
      strapDark: "#4a8bcc",
      bezel: "minimal",
    },
  },
  {
    slug: "aero-max-battery",
    name: "Aero Max Battery",
    collection: "aero",
    reference: "MER-AER-MAX-GPH",
    sku: "MER-4003",
    shortDesc:
      "A larger cell inside the same slim case — three weeks on a single charge.",
    description:
      "Max Battery keeps the Aero silhouette but trades half a millimetre of thickness for a cell big enough to run three full weeks between charges. If Aero Slim's 14 days still means you're thinking about a charger, this is the one that lets you stop.",
    display: "1.6\" LTPO OLED, Always-On, 800 nits",
    chip: "M1 Low-Power",
    storage: "16GB",
    battery: "Up to 21 days",
    sensors: "Heart rate, Accelerometer",
    connectivity: "Bluetooth 5.3",
    compatibility: "iOS 16+ and Android 10+",
    caseSize: 41,
    caseMaterial: "Aerospace Aluminum",
    glass: "Ion-X Strengthened Glass",
    band: "Silicone Sport Band, Graphite",
    waterResistance: "30 metres (3 ATM)",
    priceCents: 22900,
    stock: 16,
    isFeatured: false,
    isNew: true,
    art: {
      metal: "#c7c9cf",
      metalDark: "#75777d",
      dial: "#050608",
      dialEdge: "#0a1020",
      accent: "#7d95ff",
      strap: "#2b2e33",
      strapDark: "#17181b",
      bezel: "minimal",
    },
  },
];

export const journalPosts = [
  {
    slug: "how-to-read-your-activity-rings",
    title: "How to Read Your Activity Rings",
    excerpt:
      "Three rings, three numbers, one glance. Here's what Move, Exercise, and Stand actually measure — and why closing them matters more than hitting a step count.",
    category: "Features",
    author: "Priya Nair",
    readMinutes: 4,
    coverTone: "#0a1f1a",
    content: `Step counts reward walking. They don't reward the twenty minutes you spent lifting, the flight of stairs you climbed twice, or the fact that you stood up from your desk eleven times instead of zero. Rings measure movement in the terms that actually predict health outcomes: energy burned, sustained effort, and how sedentary your day really was.

## Move

The outer ring tracks active calories — energy burned above resting rate, from anything: walking, cleaning, carrying groceries up three flights. It's personalized to your age, weight, and history, which is why the same walk closes more of the ring on a bad week than a good one. That's intentional.

## Exercise

The middle ring counts minutes of activity brisk enough to register as a workout — anything at or above a fast walk. Thirty minutes is the daily target, based on the guideline most cardiologists actually recommend, not an arbitrary round number.

## Stand

The inner ring wants you up and moving for at least one minute in twelve separate hours. It is the ring most people close last and complain about most, and it is also the one with the clearest evidence behind it: prolonged sitting is an independent risk factor, regardless of how much you exercise around it.

## Why close them, not just glance at them

A ring that's 90% closed and one that's 20% closed look similar in a glance. Closing it fully is a small, repeatable goal — and repeatable goals are the ones that survive a bad week.`,
  },
  {
    slug: "inside-the-chip-how-meridian-reads-your-heart",
    title: "Inside the Chip: How Meridian Reads Your Heart",
    excerpt:
      "No wires, no gel, no clinic. A green light and a photodiode, four hundred times a second, is the entire trick behind heart rate on your wrist.",
    category: "Engineering",
    author: "Daniel Okoro",
    readMinutes: 6,
    coverTone: "#0f172a",
    content: `The sensor cluster on the back of every Meridian case does something that would have required a hospital in 1990: it reads your pulse through your skin, without touching a vein.

## The green light

LEDs pulse green light into the wrist hundreds of times a second. Blood absorbs green light more than surrounding tissue does, so as blood volume in the capillaries rises and falls with each heartbeat, the amount of light reflected back changes in a regular wave. A photodiode reads that wave. It's called photoplethysmography, and it's the same principle a hospital pulse oximeter uses — just aimed sideways instead of through a fingertip.

## Why it sometimes struggles

Motion is the enemy. A swinging arm changes the distance between skin and sensor faster than blood volume does, which is why heart rate during a sprint is a harder measurement than heart rate at rest. The accelerometer data is fused in specifically to subtract motion artifacts from the optical signal — without it, running data would be nearly unusable.

## SpO2 adds a second wavelength

Blood oxygen sensing uses the same principle with an added infrared LED. Oxygenated and deoxygenated blood absorb red and infrared light differently, and comparing the two ratios gives an estimate of blood oxygen saturation — the same two-wavelength method a hospital clip uses, calibrated against a smaller reference dataset.

## ECG is the odd one out

Unlike the optical sensors, ECG requires you to complete a circuit — touching the digital crown with your opposite hand closes the loop between two electrodes, and the watch reads actual electrical activity from your heart, not an optical proxy. It's the one measurement on your wrist that's the real thing, not an estimate.`,
  },
  {
    slug: "choosing-your-case-size-40mm-vs-45mm",
    title: "Choosing Your Case Size: 40mm vs. 45mm",
    excerpt:
      "The display gets bigger, the battery gets bigger, and the watch gets heavier. Here's how to actually decide, instead of guessing.",
    category: "Style",
    author: "Priya Nair",
    readMinutes: 4,
    coverTone: "#1c1206",
    content: `Every Meridian line ships in at least two case sizes, and the spec sheet alone won't tell you which one is right for your wrist.

## Wrist circumference, not preference

Measure where the watch will actually sit, just past the wrist bone. Under 150mm, a 40–41mm case will already look substantial; over 170mm, a 40mm case can look undersized. Between those numbers, it genuinely comes down to taste — try both if you can.

## What the larger case buys you

It isn't just visual. A 45mm Pulse carries a bigger cell than its 41mm sibling, which is where the extra six hours of battery life comes from, and the display panel is physically larger, which matters more than you'd think when reading a map mid-run.

## What the smaller case buys you

Weight, mostly. The difference between a 41mm and 45mm aluminum case is around six grams, which sounds small until you've worn one to sleep every night for a year. Smaller cases also sit better under a shirt cuff, which matters if you're wearing yours to work.

## The band matters more than people expect

A 45mm case on a bulky Trail Loop reads very differently from the same case on a slim leather strap. If you're unsure on size, it's often easier to be sure on band first — the case will follow from there.`,
  },
  {
    slug: "what-actually-happens-during-a-software-update",
    title: "What Actually Happens During a Software Update",
    excerpt:
      "It's not just a progress bar. Here's the full sequence a watch goes through between tapping \"install\" and the screen coming back on.",
    category: "Service",
    author: "Daniel Okoro",
    readMinutes: 5,
    coverTone: "#17151a",
    content: `A watch update looks like a progress bar and feels like waiting. Underneath, it's closer to a full replacement of the operating system while the hardware keeps running.

## Staging first

The new firmware image downloads to a secondary partition while the watch keeps working normally on the old one — nothing is overwritten yet, which is why a failed download never bricks a watch. Only once the download verifies against a cryptographic signature does the watch mark it ready to install.

## The actual install

On restart, the bootloader checks the new partition's signature again, then switches which partition is active. This is why the process is fast compared to the download: the "installation" is mostly already done, and the restart is really a handoff.

## Rollback protection

If the new firmware fails to boot cleanly within a short window, the bootloader automatically falls back to the previous verified partition. This is the same mechanism phones have used for years, and it's the reason a bad update essentially never turns into a dead watch — it just quietly reverts and tries again later.

## Why it asks to be on the charger

Interrupting a firmware write mid-flash is the one scenario the rollback can't always protect against, so updates are gated behind a battery and charging check. It's a five-minute inconvenience in exchange for removing an entire category of failure.`,
  },
  {
    slug: "the-origin-of-the-action-button",
    title: "The Origin of the Action Button",
    excerpt:
      "It started as a request from three trail guides who couldn't operate a touchscreen wearing gloves. It shipped on every Summit since.",
    category: "Story",
    author: "Marcus Webb",
    readMinutes: 5,
    coverTone: "#1a1108",
    content: `The Action Button wasn't in the original Summit design. It exists because of a field test that went badly.

## The problem

Early Summit prototypes relied entirely on the touchscreen, like every other watch in the line. Three mountain guides testing pre-release units in winter conditions reported the same failure independently: with gloves on, in cold enough weather, none of them could reliably start a workout, mark a waypoint, or trigger an SOS. The screen simply didn't register a glove-covered finger consistently, and removing a glove at altitude is not always a safe option.

## The fix

A single physical button, customizable per activity, that works identically whether you're wearing gloves, wet gloves, or nothing at all. On Summit Titanium it defaults to starting a workout; on Expedition, most owners set it to mark a waypoint or trigger emergency SOS. It's mechanical because mechanical things don't care about capacitance.

## Why it stayed exclusive to Summit

Pulse and Studio don't need it — most of their use cases happen with bare hands in controlled conditions. Adding a button to every case is a design compromise other lines shouldn't have to make for a problem specific to one kind of use. Summit needed it. The rest didn't.`,
  },
  {
    slug: "why-your-watch-should-know-youre-stressed",
    title: "Why Your Watch Should Know You're Stressed",
    excerpt:
      "Heart rate variability isn't a single number worth checking obsessively. It's a trend line worth understanding.",
    category: "Health",
    author: "Marcus Webb",
    readMinutes: 6,
    coverTone: "#0f172a",
    content: `Heart rate variability — the tiny, healthy variation in time between heartbeats — is one of the more misunderstood numbers a watch reports. A single reading tells you almost nothing. A trend line tells you a great deal.

## What it actually measures

A perfectly regular heartbeat sounds healthy but isn't — it's a sign the nervous system isn't adjusting well to changing demands. Higher variability generally indicates a nervous system that recovers and adapts efficiently; lower variability is associated with stress, poor sleep, illness onset, and overtraining.

## Why one reading is nearly useless

HRV varies by time of day, recent caffeine, sleep quality the night before, and dozens of other factors — comparing your HRV to a friend's, or even to your own reading from a different time of day, tells you very little. What matters is your own overnight baseline, tracked over weeks.

## What a dropping trend actually predicts

A sustained drop below your personal baseline is one of the more reliable early indicators of oncoming illness or overtraining, often showing up a day or two before symptoms do. It's not a diagnosis — it's an early nudge to rest, hydrate, and pay attention, which is exactly the kind of decision a glance at a wrist is well suited to prompt.

## The number to ignore

A single day's HRV reading, in isolation, without three weeks of baseline behind it. Trends inform decisions. Isolated numbers mostly just cause anxiety.`,
  },
];

export const boutiques = [
  {
    slug: "san-francisco-market-street",
    name: "Meridian San Francisco",
    city: "San Francisco",
    country: "United States",
    address: "1 Market Street, San Francisco, CA 94105",
    lat: 37.7936,
    lng: -122.3959,
    phone: "+1 415 555 0142",
    email: "sanfrancisco@meridian.example",
    hours: "Mon–Sat 10:00–19:00, Sun 11:00–17:00",
    isFlagship: true,
  },
  {
    slug: "new-york-fifth-avenue",
    name: "Meridian New York",
    city: "New York",
    country: "United States",
    address: "545 Fifth Avenue, New York, NY 10017",
    lat: 40.7549,
    lng: -73.9784,
    phone: "+1 212 555 0198",
    email: "newyork@meridian.example",
    hours: "Mon–Sat 10:00–20:00, Sun 11:00–18:00",
    isFlagship: true,
  },
  {
    slug: "london-regent-street",
    name: "Meridian London",
    city: "London",
    country: "United Kingdom",
    address: "112 Regent Street, London W1B 5FE",
    lat: 51.5142,
    lng: -0.1401,
    phone: "+44 20 7555 0177",
    email: "london@meridian.example",
    hours: "Mon–Sat 10:00–19:00, Sun 12:00–18:00",
    isFlagship: false,
  },
  {
    slug: "tokyo-shibuya",
    name: "Meridian Tokyo",
    city: "Tokyo",
    country: "Japan",
    address: "2-24-12 Shibuya, Shibuya-ku, Tokyo 150-0002",
    lat: 35.6617,
    lng: 139.7041,
    phone: "+81 3 5555 0166",
    email: "tokyo@meridian.example",
    hours: "Daily 11:00–20:00",
    isFlagship: true,
  },
  {
    slug: "dubai-mall",
    name: "Meridian Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Fashion Avenue, The Dubai Mall, Dubai",
    lat: 25.1972,
    lng: 55.2796,
    phone: "+971 4 555 0173",
    email: "dubai@meridian.example",
    hours: "Daily 10:00–22:00",
    isFlagship: false,
  },
  {
    slug: "singapore-orchard",
    name: "Meridian Singapore",
    city: "Singapore",
    country: "Singapore",
    address: "2 Orchard Turn, ION Orchard, Singapore 238801",
    lat: 1.3037,
    lng: 103.8322,
    phone: "+65 6555 0129",
    email: "singapore@meridian.example",
    hours: "Daily 10:30–21:30",
    isFlagship: false,
  },
  {
    slug: "berlin-kurfurstendamm",
    name: "Meridian Berlin",
    city: "Berlin",
    country: "Germany",
    address: "Kurfürstendamm 21, 10719 Berlin",
    lat: 52.5033,
    lng: 13.3319,
    phone: "+49 30 555 0104",
    email: "berlin@meridian.example",
    hours: "Mon–Sat 10:00–20:00",
    isFlagship: true,
  },
  {
    slug: "sydney-pitt-street",
    name: "Meridian Sydney",
    city: "Sydney",
    country: "Australia",
    address: "Pitt Street Mall, Sydney NSW 2000",
    lat: 33.8698,
    lng: 151.2083,
    phone: "+61 2 5555 0190",
    email: "sydney@meridian.example",
    hours: "Daily 9:30–19:00",
    isFlagship: false,
  },
];
