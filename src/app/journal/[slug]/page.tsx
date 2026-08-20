import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

const STATIC_ARTICLES: Record<
  string,
  { category: string; title: string; excerpt: string; date: string; content: string }
> = {
  "choosing-your-case-size-40mm-vs-45mm": {
    category: "Buying Guide",
    title: "Choosing Your Case Size: 40mm vs 45mm",
    excerpt: "Wrist size, cuff clearance, and the case that actually wears the way it looks in photos.",
    date: "March 15, 2025",
    content: `The single question we receive most often from first-time buyers has nothing to do with movements or complications. It is almost always this: what size watch should I buy? It seems simple. It is not.

Case diameter is a measurement of the dial's circular face, taken at three o'clock and nine o'clock. What it does not measure is lug-to-lug distance — the span between the two sets of lugs that defines how far the watch extends up and down your wrist. A 42mm watch with long lugs can wear larger than a 45mm with short ones. The number on the spec sheet is a starting point, not an answer.

A useful rule of thumb: for a wrist between 16cm and 18cm in circumference, a case between 38mm and 42mm will generally proportion well. For wrists above 18cm, 42mm to 44mm sits naturally. Beyond 44mm, you are in territory that is genuinely bold — it will read, and it is meant to. If your wrist sits closer to 15cm or below, 36mm to 38mm is historically the territory that fits without overhang.

The most reliable method remains the same one watch dealers have used for decades: try the watch on. Ask for a loaner strap if the bracelet does not match your size, and note how the lugs sit relative to your wrist edge. A watch that extends past the wrist bone will never feel quite right, regardless of how good it looks on a display stand. Wear it, move your wrist, pull back a cuff, and then decide.`,
  },
  "the-language-of-complications": {
    category: "Horology",
    title: "The Language of Complications",
    excerpt: "What a chronograph, a GMT, and a moonphase are each actually doing under the dial.",
    date: "February 20, 2025",
    content: `In watchmaking, a complication is any function beyond the simple display of hours and minutes. The name implies difficulty — and rightly so. Each additional function requires additional components: more gears, more levers, more springs, more potential failure points. A chronograph might add 250 components to a movement. A perpetual calendar, close to 500. This is why complications carry prestige. They are problems that have been solved in metal, inside a case the size of a walnut.

The chronograph is perhaps the most widely understood complication: press a pusher, and a seconds hand begins tracking elapsed time; press again to stop; press a third time to reset. The mechanism that reads the split-second difference between the running movement and the stopped chronograph hand is called a column wheel — and the quality of its execution separates an instrument from a trinket.

The GMT hand — a fourth hand that circles the dial once every 24 hours — was developed in the 1950s for airline pilots navigating time zones before GPS. A second time zone is read against a 24-hour bezel. Set the bezel to your home city; the GMT hand shows you what time it is there while the main hands tell you local time. Elegant, functional, and more useful today than it has ever been.

The moonphase is, among complications, perhaps the most poetic. A rotating disc bearing two painted moons advances by one tooth every 24 hours and 44.3 minutes — the average length of the lunar day. After 29.5 days, a full cycle completes. The best moonphase modules deviate by one full day only after 120 years of operation. That precision in service of something as ineffable as the moon is, we think, what makes horology an art.`,
  },
  "a-short-history-of-the-chronograph": {
    category: "Heritage",
    title: "A Short History of the Chronograph",
    excerpt: "From pocket-watch stopwatches to the wrist — how the pusher earned its place.",
    date: "January 10, 2025",
    content: `The chronograph did not arrive on the wrist fully formed. Its origins are in the royal courts of Europe, where timing horse races demanded accuracy that the human pulse could not provide. In 1816, a French watchmaker named Louis Moinet created what is generally accepted as the first true chronograph movement — a pocket watch capable of measuring elapsed time to one sixtieth of a second. He called it the compteur de tierces, the counter of thirds.

The mechanism spread to sporting life quickly. By the 1860s, chronographs were standard issue for timing athletic events. The first wristwatch chronograph — credited to various makers depending on the criterion used — appeared between 1910 and 1915, worn primarily by military officers who needed to time artillery barrages without reaching for a pocket.

The post-war era brought refinement. Swiss makers in the Jura and Geneva began competing on complication quality: column-wheel vs. cam-lever actuation, vertical vs. horizontal clutch engagement. By the 1960s, brands like Heuer, Breitling, Longines, and Omega had made the chronograph the preeminent sporting watch, worn by racing drivers, astronauts, and mountaineers. The Speedmaster reached the moon in 1969 as a tool — not a statement.

Today, a chronograph movement remains one of the most respected calibres a watchmaker can produce. The challenge of coupling a running escapement to a stopping seconds hand — without interrupting timekeeping, without binding, without slipping — is as technically demanding now as it was in 1816. The pusher may be smaller. The case may be lighter. The precision is considerably greater. But the problem being solved is exactly the same.`,
  },
  "how-to-read-a-gmt-bezel": {
    category: "Buying Guide",
    title: "How to Read a GMT Bezel",
    excerpt: "The 24-hour bezel decoded — tracking a second timezone in three seconds.",
    date: "December 5, 2024",
    content: `A GMT bezel is simply a 24-hour scale. Where a standard watch bezel marks 60 minutes, a GMT bezel marks 24 hours — half the ring for day (typically rendered in white or silver), half for night (in black or blue). The GMT hand points at this bezel to display a second timezone in the 24-hour format that eliminates any ambiguity about AM versus PM.

Setting the GMT hand is done by adjusting the bezel, not the hand itself on most designs. Rotate the bezel so that your home timezone city name — or simply your home time offset — aligns with the GMT hand at the moment you set the watch. From that point on, wherever you travel, the main hour hand shows local time and the GMT hand shows home time against the 24-hour scale.

Reading it requires only a glance: if the GMT hand points to a numeral on the white half of the bezel (roughly noon to midnight), it is daytime at home. If it points to the black half, your home is dark. A single glance, no arithmetic. This is why pilots, traders, and journalists working across time zones have worn GMT watches since the 1950s.

The most common mistake new GMT owners make is adjusting the movement's hour hand rather than the bezel when changing local time zones. On a true GMT with an independently adjustable hour hand — rather than a GMT on a standard movement — you can advance the local hour hand in full-hour increments without disturbing the running seconds hand or the GMT hand. Set the local hour, leave everything else alone. The watch does the rest.`,
  },
  "the-art-of-dial-making": {
    category: "Craftsmanship",
    title: "The Art of Dial Making",
    excerpt: "Eleven passes, a brass blank, and the invisible work behind every sunray finish.",
    date: "November 18, 2024",
    content: `A watch dial is, in engineering terms, one of the simplest components in a movement. It is a disc — usually brass, occasionally gold or silver — with holes drilled for the hands and feet. Everything that happens before the dial reaches the movement is art, chemistry, and patience.

The blank begins its journey in a stamping press. Brass sheet stock, rolled to precise thickness, is punched into circles. The edges are trued on a lathe. Feet are soldered. Then the disc enters finishing, which is where the craft begins: galvanic treatments to build up metal thickness, lacquering in colours that require multiple fired coats to achieve depth and uniformity, and the sunray finishing that gives a dial its signature light-catching quality.

Sunray brushing — the radiating finish that makes a dial seem to generate its own light — is achieved by holding the dial against a rotating brush while slowly rotating the dial itself on a second axis. Eleven passes at controlled pressure, each one slightly offset. Too much pressure and the finish becomes coarse. Too little, and it washes out. The result, when done correctly, is a surface that seems to change depth as the light moves across it.

Applied indices — the raised hour markers you see on many dress dials — are placed by hand. Each one is attached to a small foot, bent from the same metal as the marker, and pressed into a pre-drilled hole in the dial blank. The tolerances are measured in tenths of a millimetre. A misaligned marker, visible only under magnification in the factory, will become obvious to the wearer after a decade of looking at their wrist. This is why dial makers take as long as they do.`,
  },
  "caring-for-your-mechanical-watch": {
    category: "Care Guide",
    title: "Caring for Your Mechanical Watch",
    excerpt: "The five habits that extend service intervals and keep your movement performing at its best.",
    date: "October 3, 2024",
    content: `A mechanical watch is a living instrument. Unlike a quartz movement — which runs until the battery dies and then stops — a mechanical calibre is in constant motion, its parts wearing fractionally against each other with every oscillation of the balance wheel. Proper care does not prevent wear. It slows it to a rate where the movement remains accurate and enjoyable for decades between services.

The first and most important habit is winding. If you wear your automatic watch daily, the rotor will keep the mainspring charged. If you leave it on the nightstand for more than 36 to 48 hours, wind it by hand before strapping it on — around 20 to 25 full turns of the crown, feeling for the slight increase in resistance as the spring fills. Do not overwind: on a modern automatic, the slipping clutch prevents this, but the habit of winding firmly and then stopping is a good one.

Keep your watch away from strong magnetic fields. Electric motors, MRI machines, audio speakers, and magnetic closures on bags and laptop covers can all magnetise the steel components in a movement — particularly the hairspring — causing the watch to gain time. If your watch suddenly runs fast, demagnetisation by a watchmaker is a quick and inexpensive fix.

Water resistance ratings degrade over time. The gaskets that keep water out of the case dry out and compress with each crown rotation and temperature change. Most manufacturers recommend re-testing water resistance annually for watches rated 100m or higher, and every service interval for dress watches. Never operate the crown underwater regardless of the rating.

Finally: service your watch. A movement running continuously for more than five years is running on lubricants that have begun to degrade, thicken, and in some cases migrate away from the surfaces they protect. The service interval varies by calibre and use — three to five years is typical for a daily wearer — but following it faithfully is the only maintenance that genuinely extends the life of the movement.`,
  },
};

const RELATED_POSTS = [
  {
    slug: "choosing-your-case-size-40mm-vs-45mm",
    category: "Buying Guide",
    title: "Choosing Your Case Size: 40mm vs 45mm",
  },
  {
    slug: "the-language-of-complications",
    category: "Horology",
    title: "The Language of Complications",
  },
  {
    slug: "a-short-history-of-the-chronograph",
    category: "Heritage",
    title: "A Short History of the Chronograph",
  },
];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.journalPost.findUnique({ where: { slug } });
  const staticData = STATIC_ARTICLES[slug];
  const title = post?.title ?? staticData?.title ?? "Journal";
  return {
    title,
    description: post?.excerpt ?? staticData?.excerpt,
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.journalPost.findUnique({ where: { slug } });
  const staticData = STATIC_ARTICLES[slug];

  const title = post?.title ?? staticData?.title ?? "An Atelier Dispatch";
  const category = staticData?.category ?? "Horology";
  const dateStr = post
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : (staticData?.date ?? "2025");
  const content = post?.content ?? staticData?.content ?? "";
  const coverImage = post?.coverImage;

  const paragraphs = content.split(/\n\n+/).filter(Boolean);
  const wordCount = content.split(/\s+/).length;
  const readMins = Math.max(1, Math.round(wordCount / 200));

  return (
    <article>
      {/* ── Back link ── */}
      <div className="mx-auto max-w-3xl px-6 pt-10 lg:px-10">
        <Link
          href="/journal"
          className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-stone transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
          The Journal
        </Link>
      </div>

      {/* ── Header ── */}
      <header className="mx-auto max-w-3xl px-6 py-12 lg:px-10">
        <span className="eyebrow">{category}</span>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground lg:text-5xl">
          {title}
        </h1>
        <div className="mt-5 flex items-center gap-4 text-xs text-stone/70">
          <span>{dateStr}</span>
          <span>·</span>
          <span>{readMins} min read</span>
        </div>
      </header>

      {/* ── Hero Image ── */}
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-hairline bg-secondary">
          {coverImage && (
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-3xl px-6 py-14 lg:px-10">
        {paragraphs.length > 0 ? (
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-[1.9] text-stone">
                {p}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-base leading-[1.9] text-stone">
            This dispatch from the atelier is being prepared. Check back shortly.
          </p>
        )}

        {/* Byline */}
        <div className="mt-12 border-t border-hairline pt-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone/60">
            By The Maison Temps Atelier
          </p>
        </div>
      </div>

      {/* ── Related Posts ── */}
      <section className="border-t border-hairline bg-[#f5f1ea] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Continue Reading</span>
              <h2 className="mt-3 font-serif text-2xl font-bold text-foreground">
                More from the Journal
              </h2>
            </div>
            <Link
              href="/journal"
              className="group hidden shrink-0 items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] text-stone transition-colors hover:text-gold sm:flex"
            >
              All Articles
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {RELATED_POSTS.filter((p) => p.slug !== slug).slice(0, 3).map((rp) => (
              <Link
                key={rp.slug}
                href={`/journal/${rp.slug}`}
                className="group flex flex-col"
              >
                <div className="aspect-[16/10] border border-hairline bg-secondary transition-colors group-hover:border-gold" />
                <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                  {rp.category}
                </p>
                <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-gold">
                  {rp.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
