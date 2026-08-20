import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the Maison — buying guides, horological history, and care advice from the Maison Temps atelier.",
};

const STATIC_POSTS = [
  {
    slug: "choosing-your-case-size-40mm-vs-45mm",
    category: "Buying Guide",
    title: "Choosing Your Case Size: 40mm vs 45mm",
    excerpt: "Wrist size, cuff clearance, and the case that actually wears the way it looks in photos.",
    date: "March 2025",
  },
  {
    slug: "the-language-of-complications",
    category: "Horology",
    title: "The Language of Complications",
    excerpt: "What a chronograph, a GMT, and a moonphase are each actually doing under the dial.",
    date: "February 2025",
  },
  {
    slug: "a-short-history-of-the-chronograph",
    category: "Heritage",
    title: "A Short History of the Chronograph",
    excerpt: "From pocket-watch stopwatches to the wrist — how the pusher earned its place.",
    date: "January 2025",
  },
  {
    slug: "how-to-read-a-gmt-bezel",
    category: "Buying Guide",
    title: "How to Read a GMT Bezel",
    excerpt: "The 24-hour bezel decoded — tracking a second timezone in three seconds.",
    date: "December 2024",
  },
  {
    slug: "the-art-of-dial-making",
    category: "Craftsmanship",
    title: "The Art of Dial Making",
    excerpt: "Eleven passes, a brass blank, and the invisible work behind every sunray finish.",
    date: "November 2024",
  },
  {
    slug: "caring-for-your-mechanical-watch",
    category: "Care Guide",
    title: "Caring for Your Mechanical Watch",
    excerpt: "The five habits that extend service intervals and keep your movement performing at its best.",
    date: "October 2024",
  },
];

const CATEGORIES = ["All", "Buying Guide", "Horology", "Heritage", "Craftsmanship", "Care Guide"];

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const dbPosts = await prisma.journalPost.findMany({
    orderBy: { publishedAt: "desc" },
  });

  const hasPosts = dbPosts.length > 0;

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="bg-ink py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <span className="eyebrow text-gold-bright">The Journal</span>
          <h1 className="mt-6 font-serif text-5xl font-bold leading-tight text-parchment sm:text-6xl">
            Notes from{" "}
            <em className="not-italic text-gold-bright">the Maison.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-parchment/70">
            Buying guides, horological history, care advice, and atelier dispatches — from the
            people who make the watches.
          </p>
        </div>
      </section>

      {/* ── Category Pills ── */}
      <div className="sticky top-20 z-30 border-b border-hairline bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-4 lg:px-10">
          {CATEGORIES.map((cat) => {
            const isActive = cat === "All" ? !category : category === cat;
            const href = cat === "All" ? "/journal" : `/journal?category=${encodeURIComponent(cat)}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`shrink-0 rounded-none border px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
                  isActive
                    ? "border-gold bg-gold text-white"
                    : "border-hairline text-stone hover:border-gold hover:text-gold"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Posts Grid ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {hasPosts ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {dbPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/journal/${post.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border border-hairline bg-secondary transition-colors group-hover:border-gold">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="mt-5 flex flex-col flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                      Maison Journal
                    </p>
                    <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-gold">
                      {post.title}
                    </h2>
                    <p className="mt-3 border-l border-gold/40 pl-3 text-sm leading-[1.8] text-stone">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-stone/60">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors group-hover:text-gold">
                      Read More
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {STATIC_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="group flex flex-col"
                >
                  <div className="aspect-[16/10] border border-hairline bg-secondary transition-colors group-hover:border-gold" />
                  <div className="mt-5 flex flex-col flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                      {post.category}
                    </p>
                    <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-gold">
                      {post.title}
                    </h2>
                    <p className="mt-3 border-l border-gold/40 pl-3 text-sm leading-[1.8] text-stone">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 text-xs text-stone/60">{post.date}</div>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors group-hover:text-gold">
                      Read More
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
