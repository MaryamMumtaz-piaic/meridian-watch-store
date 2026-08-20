import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Maison Temps Cookie Policy — how we use cookies and how to manage your preferences.",
};

const COOKIE_TYPES = [
  {
    name: "Essential Cookies",
    required: true,
    description:
      "Required for the website to function. These enable core features such as your shopping cart, user session, and secure checkout. They cannot be disabled without breaking the site.",
    examples: ["Cart session (maison-temps-cart)", "Authentication token", "CSRF protection"],
  },
  {
    name: "Functional Cookies",
    required: false,
    description:
      "Remember your preferences to enhance your experience — such as your wishlist, display settings, and recently viewed products.",
    examples: ["Wishlist (maison-temps-wishlist)", "Cookie consent preference"],
  },
  {
    name: "Analytics Cookies",
    required: false,
    description:
      "Help us understand how visitors use our website by collecting anonymous usage data. We use this to improve pages, fix issues, and understand what content matters most.",
    examples: ["Google Analytics (_ga, _gid)", "Vercel Web Analytics"],
  },
  {
    name: "Marketing Cookies",
    required: false,
    description:
      "Used to serve relevant advertisements and measure campaign effectiveness. These are only set if you give explicit consent via our cookie banner.",
    examples: ["Meta Pixel", "Google Ads conversion tracking"],
  },
];

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <span className="eyebrow">Legal</span>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground sm:text-5xl">Cookie Policy</h1>
      <p className="mt-3 text-xs text-stone">Last updated: January 2026</p>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-stone">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-3">What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They allow the
          website to remember information about your visit — such as your cart contents or login status
          — and help us improve the experience on future visits.
        </p>
        <p>
          We also use similar technologies such as local storage (for your cart and wishlist) and
          pixel tags for analytics. This policy covers all of these.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        <h2 className="font-serif text-xl font-semibold text-foreground">Types We Use</h2>
        {COOKIE_TYPES.map(({ name, required, description, examples }) => (
          <div key={name} className="border border-hairline p-6">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h3 className="font-serif text-base font-semibold text-foreground">{name}</h3>
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.14em] px-2 py-0.5 ${
                  required
                    ? "bg-gold/10 text-gold"
                    : "border border-hairline text-stone"
                }`}
              >
                {required ? "Required" : "Optional"}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone">{description}</p>
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone/70">Examples</p>
              <ul className="space-y-1">
                {examples.map((ex) => (
                  <li key={ex} className="flex items-center gap-2 text-xs text-stone">
                    <span className="h-1 w-1 rounded-full bg-gold/50" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Managing Cookies</h2>
        <p className="text-sm leading-relaxed text-stone">
          You can control cookies through our consent banner when you first visit the site.
          You may also manage cookies via your browser settings — most browsers allow you to
          view, delete, and block cookies for specific or all websites.
        </p>
        <p className="text-sm leading-relaxed text-stone">
          Note that disabling essential cookies will prevent certain features from working,
          including your shopping cart and account login.
        </p>
        <p className="text-sm leading-relaxed text-stone">
          For more information on how to manage cookies in your browser, visit{" "}
          <a
            href="https://www.allaboutcookies.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline underline-offset-4 hover:text-gold-bright"
          >
            allaboutcookies.org
          </a>
          .
        </p>
      </div>

      <div className="mt-14 border-t border-hairline pt-8">
        <p className="text-sm text-stone">
          Cookie questions?{" "}
          <a href="/contact" className="text-gold underline underline-offset-4 hover:text-gold-bright">
            Contact us
          </a>
          {" or "}
          <a href="/privacy" className="text-gold underline underline-offset-4 hover:text-gold-bright">
            read our Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
