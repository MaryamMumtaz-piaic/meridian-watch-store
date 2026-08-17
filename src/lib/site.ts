export const site = {
  name: "Meridian",
  tagline: "The line time is measured from.",
  description:
    "Meridian builds precision-engineered smart watches — health intelligence, all-day battery, and a screen that never asks you to reach for your phone.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  established: 2019,
  email: "hello@meridian.example",
  phone: "+1 (415) 555-0142",
  social: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
};

export const mainNav = [
  { label: "Watches", href: "/watches" },
  { label: "Collections", href: "/collections" },
  { label: "Technology", href: "/craftsmanship" },
  { label: "Stories", href: "/journal" },
  { label: "Stores", href: "/boutiques" },
];

export const footerNav = [
  {
    title: "Lineup",
    links: [
      { label: "All Watches", href: "/watches" },
      { label: "Pulse", href: "/collections/pulse" },
      { label: "Summit", href: "/collections/summit" },
      { label: "Studio", href: "/collections/studio" },
      { label: "Aero", href: "/collections/aero" },
    ],
  },
  {
    title: "Meridian",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Technology", href: "/craftsmanship" },
      { label: "Stories", href: "/journal" },
      { label: "Stores", href: "/boutiques" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Services & Care", href: "/services" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "My Account", href: "/account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
