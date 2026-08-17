/**
 * Renders the demo product/editorial artwork as SVG into `public/images/`.
 *
 * The store has no photography, so imagery is drawn from the same colour fields
 * the seed uses for specs — one screen render, one macro crop, one profile,
 * and one band view per reference. Run with: npm run images
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  boutiques,
  collections,
  journalPosts,
  products,
  type SeedProduct,
} from "../prisma/seed-data";

const publicDir = join(process.cwd(), "public", "images");

type Art = SeedProduct["art"];

const SANS = "Helvetica,Arial,sans-serif";
const round = (n: number) => Math.round(n * 100) / 100;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [round(cx + r * Math.cos(rad)), round(cy + r * Math.sin(rad))] as const;
}

function caseGradients(art: Art, id: string) {
  return `
    <linearGradient id="metal-${id}" x1="0.1" y1="0" x2="0.95" y2="1">
      <stop offset="0%" stop-color="${art.metal}"/>
      <stop offset="16%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="30%" stop-color="${art.metal}"/>
      <stop offset="58%" stop-color="${art.metalDark}"/>
      <stop offset="80%" stop-color="${art.metal}"/>
      <stop offset="100%" stop-color="${art.metalDark}"/>
    </linearGradient>
    <radialGradient id="dial-${id}" cx="42%" cy="34%" r="78%">
      <stop offset="0%" stop-color="${art.dial}"/>
      <stop offset="100%" stop-color="${art.dialEdge}"/>
    </radialGradient>
    <linearGradient id="strap-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${art.strap}"/>
      <stop offset="100%" stop-color="${art.strapDark}"/>
    </linearGradient>
    <linearGradient id="glare-${id}" x1="0.05" y1="0" x2="0.9" y2="0.95">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
      <stop offset="22%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="68%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="76%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="84%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vignette-${id}" cx="50%" cy="42%" r="72%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="65%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.22"/>
    </radialGradient>
    <filter id="blur-${id}" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>`;
}

/** Case-edge treatment differs per line: rugged guard, polished ring, or bare. */
function bezelDetail(art: Art, cx: number, cy: number, r: number) {
  if (art.bezel === "rugged") {
    const studs = Array.from({ length: 12 }, (_, i) => {
      const [x, y] = polar(cx, cy, r - 7, i * 30);
      return `<circle cx="${x}" cy="${y}" r="2.6" fill="${art.metalDark}" fill-opacity="0.7"/>`;
    }).join("");
    return `<circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="none" stroke="${art.metalDark}" stroke-width="6" stroke-opacity="0.55"/>${studs}`;
  }
  if (art.bezel === "round") {
    return `<circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="none" stroke="${art.metalDark}" stroke-width="1.5" stroke-opacity="0.4"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 7}" fill="none" stroke="${art.metalDark}" stroke-width="0.75" stroke-opacity="0.25"/>`;
  }
  if (art.bezel === "digital") {
    return `<circle cx="${cx}" cy="${cy}" r="${r - 2}" fill="none" stroke="${art.metalDark}" stroke-width="1" stroke-opacity="0.3"/>`;
  }
  // minimal
  return `<circle cx="${cx}" cy="${cy}" r="${r - 1.5}" fill="none" stroke="${art.metalDark}" stroke-width="0.6" stroke-opacity="0.2"/>`;
}

/**
 * The screen face: a digital time readout over a cluster of activity rings —
 * the one visual every smart watch shares, so it's the signature the whole
 * catalog is built from rather than an afterthought.
 */
function dialFace(art: Art, cx: number, cy: number, r: number, id: string) {
  const ringCenterY = round(cy + r * 0.16);
  const baseRadius = r * 0.46;
  const ringGap = r * 0.155;
  const ringWidth = round(r * 0.095);

  const ringSpecs = [
    { frac: 0.86, color: art.accent, opacity: 1 },
    { frac: 0.62, color: "#ffffff", opacity: 0.9 },
    { frac: 0.4, color: art.accent, opacity: 0.5 },
  ];

  const rings = ringSpecs
    .map((spec, i) => {
      const radius = round(baseRadius - i * ringGap);
      const circumference = round(2 * Math.PI * radius);
      const dash = round(spec.frac * circumference);
      return `
      <circle cx="${cx}" cy="${ringCenterY}" r="${radius}" fill="none" stroke="${spec.color}" stroke-width="${ringWidth}" stroke-opacity="0.16"/>
      <circle cx="${cx}" cy="${ringCenterY}" r="${radius}" fill="none" stroke="${spec.color}" stroke-width="${ringWidth}" stroke-linecap="round" stroke-opacity="${spec.opacity}" stroke-dasharray="${dash} ${circumference}" transform="rotate(-90 ${cx} ${ringCenterY})"/>`;
    })
    .join("");

  const heartX = round(cx - r * 0.6);
  const heartY = round(cy - r * 0.72);
  const battX = round(cx + r * 0.52);
  const battY = round(cy - r * 0.72);

  return `
    <circle cx="${cx}" cy="${cy}" r="${r - 4}" fill="url(#dial-${id})"/>
    <text x="${cx}" y="${round(cy - r * 0.4)}" fill="#ffffff" font-family="${SANS}" font-weight="700" font-size="${round(r * 0.3)}" letter-spacing="-1.5" text-anchor="middle">9:41</text>
    <text x="${cx}" y="${round(cy - r * 0.21)}" fill="#ffffff" fill-opacity="0.5" font-family="${SANS}" font-size="${round(r * 0.075)}" letter-spacing="1.5" text-anchor="middle">TUE 17 AUG</text>
    ${rings}
    <circle cx="${heartX}" cy="${heartY}" r="${round(r * 0.075)}" fill="none" stroke="${art.accent}" stroke-width="1.6"/>
    <path d="M ${round(heartX - r * 0.035)} ${heartY} l ${round(r * 0.018)} ${round(-r * 0.03)} l ${round(r * 0.018)} ${round(r * 0.05)} l ${round(r * 0.018)} ${round(-r * 0.03)} l ${round(r * 0.018)} 0" fill="none" stroke="${art.accent}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="${round(battX - r * 0.09)}" y="${round(battY - r * 0.04)}" width="${round(r * 0.18)}" height="${round(r * 0.08)}" rx="${round(r * 0.02)}" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.2"/>
    <rect x="${round(battX - r * 0.075)}" y="${round(battY - r * 0.026)}" width="${round(r * 0.11)}" height="${round(r * 0.052)}" rx="${round(r * 0.012)}" fill="#ffffff" fill-opacity="0.65"/>`;
}

function watchFront(art: Art, id: string, bg: [string, string]) {
  const W = 900;
  const H = 1125;
  const cx = W / 2;
  const cy = H / 2;
  const r = 250;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    ${caseGradients(art, id)}
    <radialGradient id="bg-${id}" cx="46%" cy="38%" r="75%">
      <stop offset="0%" stop-color="${bg[1]}"/>
      <stop offset="100%" stop-color="${bg[0]}"/>
    </radialGradient>
    <filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="26" stdDeviation="30" flood-color="#000000" flood-opacity="0.32"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <ellipse cx="${cx}" cy="${cy + r + 122}" rx="${r * 0.95}" ry="30" fill="#000" opacity="0.32" filter="url(#blur-${id})"/>

  <g filter="url(#shadow-${id})">
    <!-- band, upper and lower -->
    <path d="M ${cx - 78} ${cy - r + 40} L ${cx - 92} 70 Q ${cx} 34 ${cx + 92} 70 L ${cx + 78} ${cy - r + 40} Z" fill="url(#strap-${id})"/>
    <path d="M ${cx - 78} ${cy + r - 40} L ${cx - 92} ${H - 70} Q ${cx} ${H - 34} ${cx + 92} ${H - 70} L ${cx + 78} ${cy + r - 40} Z" fill="url(#strap-${id})"/>
    <rect x="${cx - 60}" y="${cy - r - 24}" width="120" height="34" rx="8" fill="url(#metal-${id})"/>
    <rect x="${cx - 60}" y="${cy + r - 10}" width="120" height="34" rx="8" fill="url(#metal-${id})"/>

    <!-- digital crown -->
    <rect x="${cx + r - 6}" y="${cy - 20}" width="26" height="40" rx="6" fill="url(#metal-${id})"/>

    <!-- case + bezel -->
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#metal-${id})"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="none" stroke="#000" stroke-opacity="0.18" stroke-width="1.5"/>
    ${bezelDetail(art, cx, cy, r)}
    <circle cx="${cx}" cy="${cy}" r="${r - 30}" fill="url(#metal-${id})"/>
    ${dialFace(art, cx, cy, r - 30, id)}
    <circle cx="${cx}" cy="${cy}" r="${r - 36}" fill="url(#glare-${id})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#vignette-${id})"/>
  </g>
</svg>`;
}

function watchMacro(art: Art, id: string, bg: [string, string]) {
  const W = 900;
  const H = 1125;
  const cx = W / 2 - 40;
  const cy = H / 2;
  const r = 430;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    ${caseGradients(art, id)}
    <radialGradient id="bg-${id}" cx="42%" cy="42%" r="80%">
      <stop offset="0%" stop-color="${bg[1]}"/>
      <stop offset="100%" stop-color="${bg[0]}"/>
    </radialGradient>
    <clipPath id="crop-${id}"><rect width="${W}" height="${H}"/></clipPath>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <g clip-path="url(#crop-${id})">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#metal-${id})"/>
    ${bezelDetail(art, cx, cy, r)}
    <circle cx="${cx}" cy="${cy}" r="${r - 54}" fill="url(#metal-${id})"/>
    ${dialFace(art, cx, cy, r - 54, id)}
    <circle cx="${cx}" cy="${cy}" r="${r - 60}" fill="url(#glare-${id})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#vignette-${id})"/>
  </g>
</svg>`;
}

function watchProfile(art: Art, id: string, bg: [string, string]) {
  const W = 900;
  const H = 1125;
  const cy = H / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    ${caseGradients(art, id)}
    <linearGradient id="bg-${id}" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="${bg[0]}"/>
      <stop offset="100%" stop-color="${bg[1]}"/>
    </linearGradient>
    <filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <g filter="url(#shadow-${id})">
    <!-- side profile: band sweeping in from both edges into a thin case band -->
    <path d="M 40 ${cy + 150} Q 250 ${cy + 120} 330 ${cy + 34} L 330 ${cy + 74} Q 240 ${cy + 170} 40 ${cy + 196} Z" fill="url(#strap-${id})"/>
    <path d="M ${W - 40} ${cy + 150} Q ${W - 250} ${cy + 120} ${W - 330} ${cy + 34} L ${W - 330} ${cy + 74} Q ${W - 240} ${cy + 170} ${W - 40} ${cy + 196} Z" fill="url(#strap-${id})"/>
    <rect x="320" y="${cy - 46}" width="260" height="92" rx="22" fill="url(#metal-${id})"/>
    <rect x="320" y="${cy - 46}" width="260" height="26" rx="12" fill="${art.dialEdge}" fill-opacity="0.5"/>
    <rect x="330" y="${cy - 52}" width="240" height="14" rx="7" fill="${art.dial}" fill-opacity="0.85"/>
    <rect x="${580}" y="${cy - 14}" width="34" height="28" rx="7" fill="url(#metal-${id})"/>
    <rect x="352" y="${cy + 16}" width="196" height="8" rx="4" fill="#000" opacity="0.15"/>
  </g>
  <text x="${W / 2}" y="${H - 90}" fill="#ffffff" fill-opacity="0.4" font-family="${SANS}" font-size="15" letter-spacing="4" text-anchor="middle">CASE PROFILE</text>
</svg>`;
}

function watchStrap(art: Art, id: string, bg: [string, string]) {
  const W = 900;
  const H = 1125;

  const stitches = Array.from({ length: 22 }, (_, i) => {
    const y = 150 + i * 38;
    return `<line x1="330" y1="${y}" x2="360" y2="${y}" stroke="${art.dial}" stroke-width="3" stroke-opacity="0.55" stroke-linecap="round"/>
            <line x1="${W - 360}" y1="${y}" x2="${W - 330}" y2="${y}" stroke="${art.dial}" stroke-width="3" stroke-opacity="0.55" stroke-linecap="round"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    ${caseGradients(art, id)}
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bg[1]}"/>
      <stop offset="100%" stop-color="${bg[0]}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <rect x="300" y="90" width="300" height="945" rx="26" fill="url(#strap-${id})"/>
  ${stitches}
  <rect x="330" y="470" width="240" height="185" rx="10" fill="url(#metal-${id})"/>
  <rect x="356" y="500" width="188" height="125" rx="6" fill="${art.metalDark}" fill-opacity="0.45"/>
  <text x="${W / 2}" y="${H - 60}" fill="#ffffff" fill-opacity="0.4" font-family="${SANS}" font-size="15" letter-spacing="4" text-anchor="middle">BAND &amp; CLASP</text>
</svg>`;
}

function collectionHero(
  name: string,
  tagline: string,
  from: string,
  to: string,
  art: Art,
  id: string,
) {
  const W = 1800;
  const H = 1000;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    ${caseGradients(art, id)}
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="halo-${id}" cx="72%" cy="45%" r="45%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <rect width="${W}" height="${H}" fill="url(#halo-${id})"/>
  <g opacity="0.95" transform="translate(1280 500)">
    <circle r="250" fill="url(#metal-${id})"/>
    ${bezelDetail(art, 0, 0, 250)}
    <circle r="220" fill="url(#metal-${id})"/>
    ${dialFace(art, 0, 0, 220, id)}
  </g>
  <text x="120" y="470" fill="#ffffff" font-family="${SANS}" font-weight="700" font-size="98" letter-spacing="-1">${name}</text>
  <text x="124" y="540" fill="#ffffff" fill-opacity="0.55" font-family="${SANS}" font-size="25" letter-spacing="2">${tagline}</text>
  <line x1="124" y1="590" x2="420" y2="590" stroke="${art.accent}" stroke-width="2"/>
</svg>`;
}

function editorialCover(title: string, tone: string, id: string) {
  const W = 1600;
  const H = 1000;
  const rings = Array.from({ length: 9 }, (_, i) => {
    const r = 120 + i * 78;
    return `<circle cx="${W * 0.72}" cy="${H * 0.5}" r="${r}" fill="none" stroke="#7d95ff" stroke-opacity="${round(0.2 - i * 0.018)}" stroke-width="1.4"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${tone}"/>
      <stop offset="100%" stop-color="#0a0a0c"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  ${rings}
  <line x1="110" y1="${H * 0.5 - 60}" x2="330" y2="${H * 0.5 - 60}" stroke="#3d5cff" stroke-width="2"/>
  <text x="110" y="${H * 0.5 + 20}" fill="#fafafa" font-family="${SANS}" font-weight="700" font-size="58" letter-spacing="-1">${escapeXml(title.length > 28 ? title.slice(0, 27) + "…" : title)}</text>
  <text x="110" y="${H * 0.5 + 78}" fill="#fafafa" fill-opacity="0.45" font-family="${SANS}" font-size="19" letter-spacing="4">MERIDIAN STORIES</text>
</svg>`;
}

function boutiqueImage(name: string, city: string, id: string) {
  const W = 1400;
  const H = 900;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0a0c"/>
      <stop offset="100%" stop-color="#1c1e24"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <!-- storefront: tall windows behind a signed fascia -->
  <rect x="150" y="220" width="1100" height="560" fill="#050506" opacity="0.55"/>
  ${Array.from({ length: 4 }, (_, i) => `<rect x="${205 + i * 265}" y="280" width="180" height="440" fill="#3d5cff" opacity="${0.09 + i * 0.03}"/>`).join("")}
  <rect x="150" y="150" width="1100" height="80" fill="#050506"/>
  <text x="700" y="203" fill="#7d95ff" font-family="${SANS}" font-weight="700" font-size="30" letter-spacing="5" text-anchor="middle">${escapeXml(name.toUpperCase())}</text>
  <text x="700" y="840" fill="#fafafa" fill-opacity="0.5" font-family="${SANS}" font-size="20" letter-spacing="6" text-anchor="middle">${escapeXml(city.toUpperCase())}</text>
</svg>`;
}

/**
 * Summit Titanium is deliberately chosen for the hero over a Pulse or Aero —
 * its titanium case and orange accent hold enough value-contrast to carry a
 * full-bleed dark opener, and its "engineered for the edge" positioning is
 * the most cinematic starting point for the brand.
 */
function homeHero() {
  const W = 2000;
  const H = 1125;
  const art = products.find((p) => p.slug === "summit-titanium-49")!.art;
  const cx = W * 0.62;
  const cy = H * 0.5;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    ${caseGradients(art, "hero")}
    <radialGradient id="glow-hero" cx="62%" cy="48%" r="42%">
      <stop offset="0%" stop-color="#3d5cff" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#3d5cff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow-hero)"/>
  ${Array.from({ length: 7 }, (_, i) => `<circle cx="${cx}" cy="${cy}" r="${300 + i * 95}" fill="none" stroke="#3d5cff" stroke-opacity="${round(0.14 - i * 0.017)}" stroke-width="1.2"/>`).join("")}
  <g transform="translate(${cx} ${cy})">
    <circle r="285" fill="url(#metal-hero)"/>
    ${bezelDetail(art, 0, 0, 285)}
    <circle r="252" fill="url(#metal-hero)"/>
    ${dialFace(art, 0, 0, 252, "hero")}
    <circle r="246" fill="url(#glare-hero)"/>
  </g>
</svg>`;
}

/** Tightly-cropped, transparent-background watch face used as the front
 * texture of the CSS 3D hero puck on the home page. */
function heroWatchFace(art: Art, id: string) {
  const S = 900;
  const cx = S / 2;
  const cy = S / 2;
  const r = 400;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img">
  <defs>
    ${caseGradients(art, id)}
    <filter id="shadow-${id}" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="14" stdDeviation="20" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>
  <g filter="url(#shadow-${id})">
    <rect x="${cx + r - 10}" y="${cy - 28}" width="36" height="56" rx="9" fill="url(#metal-${id})"/>
    <rect x="${cx + r - 6}" y="${cy + 42}" width="26" height="36" rx="7" fill="url(#metal-${id})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#metal-${id})"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="none" stroke="#000" stroke-opacity="0.22" stroke-width="2"/>
    ${bezelDetail(art, cx, cy, r)}
    <circle cx="${cx}" cy="${cy}" r="${r - 36}" fill="url(#metal-${id})"/>
    ${dialFace(art, cx, cy, r - 36, id)}
    <circle cx="${cx}" cy="${cy}" r="${r - 42}" fill="url(#glare-${id})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#vignette-${id})"/>
  </g>
</svg>`;
}

/** The reverse side of the hero puck — a plain caseback, shown mid-rotation. */
function heroWatchBack(art: Art, id: string) {
  const S = 900;
  const cx = S / 2;
  const cy = S / 2;
  const r = 400;

  const bolts = Array.from({ length: 4 }, (_, i) => {
    const [x, y] = polar(cx, cy, r * 0.78, i * 90 + 45);
    return `<circle cx="${x}" cy="${y}" r="7" fill="${art.metalDark}" fill-opacity="0.55"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img">
  <defs>${caseGradients(art, id)}</defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#metal-${id})"/>
  <circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="none" stroke="#000" stroke-opacity="0.22" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="${round(r * 0.58)}" fill="none" stroke="${art.metalDark}" stroke-width="2" stroke-opacity="0.5"/>
  <circle cx="${cx}" cy="${cy}" r="${round(r * 0.36)}" fill="none" stroke="${art.metalDark}" stroke-width="1.2" stroke-opacity="0.35"/>
  ${bolts}
  <text x="${cx}" y="${cy + 12}" fill="${art.metalDark}" fill-opacity="0.65" font-family="${SANS}" font-weight="700" font-size="36" letter-spacing="5" text-anchor="middle">MERIDIAN</text>
</svg>`;
}

function labImage(label: string, tone: string, id: string) {
  const W = 1400;
  const H = 1000;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${tone}"/>
      <stop offset="100%" stop-color="#0a0a0c"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <!-- abstract circuit: traces, pads, and component nodes -->
  <circle cx="520" cy="440" r="230" fill="none" stroke="#3d5cff" stroke-opacity="0.3" stroke-width="1.5"/>
  <circle cx="520" cy="440" r="150" fill="none" stroke="#3d5cff" stroke-opacity="0.22" stroke-width="1.5"/>
  ${Array.from({ length: 36 }, (_, i) => {
    const a = (i * 360) / 36;
    const [x1, y1] = polar(520, 440, 150, a);
    const [x2, y2] = polar(520, 440, 172, a);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3d5cff" stroke-opacity="0.4" stroke-width="2"/>`;
  }).join("")}
  <circle cx="900" cy="620" r="130" fill="none" stroke="#3d5cff" stroke-opacity="0.25" stroke-width="1.5"/>
  ${Array.from({ length: 24 }, (_, i) => {
    const a = (i * 360) / 24;
    const [x1, y1] = polar(900, 620, 130, a);
    const [x2, y2] = polar(900, 620, 150, a);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3d5cff" stroke-opacity="0.32" stroke-width="2"/>`;
  }).join("")}
  <circle cx="520" cy="440" r="9" fill="#ff6b5b" opacity="0.75"/>
  <circle cx="900" cy="620" r="7" fill="#34d399" opacity="0.75"/>
  <circle cx="1080" cy="330" r="7" fill="#f2c14e" opacity="0.75"/>
  <text x="${W / 2}" y="${H - 70}" fill="#fafafa" fill-opacity="0.5" font-family="${SANS}" font-size="20" letter-spacing="6" text-anchor="middle">${escapeXml(label.toUpperCase())}</text>
</svg>`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function write(relativePath: string, contents: string) {
  const full = join(publicDir, relativePath);
  mkdirSync(join(full, ".."), { recursive: true });
  writeFileSync(full, contents, "utf8");
}

// ---------------------------------------------------------------------------

const backdrops: Record<string, [string, string]> = {
  pulse: ["#08140f", "#123d2f"],
  summit: ["#140d05", "#3d2810"],
  studio: ["#121116", "#2f2b38"],
  aero: ["#07090f", "#16203d"],
};

let count = 0;

for (const product of products) {
  const bg = backdrops[product.collection] ?? ["#0a0a0c", "#1c1e24"];
  const id = product.slug.replace(/[^a-z0-9]/g, "");
  write(`watches/${product.slug}-1.svg`, watchFront(product.art, `${id}a`, bg));
  write(`watches/${product.slug}-2.svg`, watchMacro(product.art, `${id}b`, bg));
  write(`watches/${product.slug}-3.svg`, watchProfile(product.art, `${id}c`, bg));
  write(`watches/${product.slug}-4.svg`, watchStrap(product.art, `${id}d`, bg));
  count += 4;
}

for (const collection of collections) {
  const first = products.find((p) => p.collection === collection.slug)!;
  write(
    `collections/${collection.slug}.svg`,
    collectionHero(
      collection.name,
      collection.tagline,
      collection.heroFrom,
      collection.heroTo,
      first.art,
      `col${collection.slug}`,
    ),
  );
  count += 1;
}

for (const post of journalPosts) {
  write(
    `journal/${post.slug}.svg`,
    editorialCover(post.title, post.coverTone, `jr${post.slug.replace(/[^a-z0-9]/g, "")}`),
  );
  count += 1;
}

for (const boutique of boutiques) {
  write(
    `boutiques/${boutique.slug}.svg`,
    boutiqueImage(boutique.name, boutique.city, `bt${boutique.slug.replace(/[^a-z0-9]/g, "")}`),
  );
  count += 1;
}

write("hero/home-hero.svg", homeHero());
{
  const heroArt = products.find((p) => p.slug === "summit-titanium-49")!.art;
  write("hero/watch-face.svg", heroWatchFace(heroArt, "heroface"));
  write("hero/watch-back.svg", heroWatchBack(heroArt, "heroback"));
  count += 2;
}
write("atelier/movement.svg", labImage("Sensor calibration", "#0f1726", "at1"));
write("atelier/finishing.svg", labImage("Precision assembly", "#181f26", "at2"));
write("atelier/regulation.svg", labImage("Software validation", "#0f1f1c", "at3"));
write("atelier/case.svg", labImage("Stress testing", "#1a1420", "at4"));
count += 5;

console.log(`Generated ${count} SVG assets into public/images/`);
