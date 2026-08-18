import Link from "next/link";

const POSTS = [
  {
    slug: "choosing-your-case-size-40mm-vs-45mm",
    category: "Buying Guide",
    title: "Choosing Your Case Size: 40mm vs 45mm",
    excerpt: "Wrist size, cuff clearance, and the case that actually wears the way it looks in photos.",
  },
  {
    slug: "the-language-of-complications",
    category: "Horology",
    title: "The Language of Complications",
    excerpt: "What a chronograph, a GMT, and a moonphase are each actually doing under the dial.",
  },
  {
    slug: "a-short-history-of-the-chronograph",
    category: "Heritage",
    title: "A Short History of the Chronograph",
    excerpt: "From pocket-watch stopwatches to the wrist — how the pusher earned its place.",
  },
];

export function JournalTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="eyebrow">The Journal</span>
          <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
            Notes from the Maison.
          </h2>
        </div>
        <Link
          href="/journal"
          className="hidden shrink-0 cursor-pointer border-b border-foreground/30 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-gold hover:text-gold sm:block"
        >
          Read the Journal
        </Link>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-3">
        {POSTS.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="group cursor-pointer">
            <div className="aspect-[16/10] border border-hairline bg-secondary transition-colors group-hover:border-gold" />
            <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
              {post.category}
            </p>
            <h3 className="mt-2 font-serif text-lg leading-snug text-foreground">{post.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
