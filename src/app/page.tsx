import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/product/product-card";
import { HeroWatch3D } from "@/components/home/hero-watch-3d";
import {
  getCollections,
  getFeaturedProducts,
  getJournalPosts,
  getNewArrivals,
} from "@/lib/queries";
import { formatDate } from "@/lib/utils";

const STATS = [
  { value: "21", unit: "days", label: "Longest battery, Aero Max" },
  { value: "36", unit: "hrs", label: "Always-on, Summit Titanium" },
  { value: "100", unit: "m", label: "Water resistance, Summit line" },
  { value: "4", unit: "lines", label: "Pulse, Summit, Studio, Aero" },
];

export default async function HomePage() {
  const [collections, featured, newArrivals, journal] = await Promise.all([
    getCollections(),
    getFeaturedProducts(4),
    getNewArrivals(4),
    getJournalPosts(3),
  ]);

  return (
    <>
      {/* Hero — scroll-driven 3D puck ------------------------------------ */}
      <HeroWatch3D
        eyebrow={`Engineered for the Edge · Since 2019`}
        title={
          <>
            Time, computed.
            <br />
            Worn, not carried.
          </>
        }
        description="A screen that never sleeps, a battery that outlasts the week, and a case built for whatever the week throws at it. Scroll to look Summit Titanium in the eye."
      >
        <ButtonLink href="/watches" variant="gold" size="lg">
          Shop the Lineup
        </ButtonLink>
        <ButtonLink href="/craftsmanship" variant="outline" size="lg">
          How It's Built
        </ButtonLink>
      </HeroWatch3D>

      {/* Stat row ---------------------------------------------------------- */}
      <Section className="bg-ink py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90}>
                <p className="font-display text-5xl font-bold text-cream lg:text-6xl">
                  {stat.value}
                  <span className="ml-1 text-xl font-normal text-gold-light">
                    {stat.unit}
                  </span>
                </p>
                <p className="mt-3 text-xs tracking-wide text-cream/50">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured pieces ------------------------------------------------- */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Signature Models"
              title="The watches that define the lineup"
              description="Four references chosen from across the range — the everyday tracker, the expedition instrument, the classic face, and the lightest case we make."
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-8">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 90}>
                <ProductCard product={product} priority={i < 2} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 text-center">
            <ButtonLink href="/watches" variant="outline">
              View All Watches
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* Collections ----------------------------------------------------- */}
      <Section className="bg-cream-dark">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Four Lines"
              title="Each line is built for a different day"
              description="Pulse tracks your workout. Summit survives the trail. Studio passes for an analog watch. Aero disappears on your wrist and doesn't come off for weeks."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {collections.map((collection, i) => (
              <Reveal key={collection.id} delay={i * 90}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group relative block aspect-16/10 overflow-hidden bg-ink"
                >
                  <Image
                    src={collection.heroImage}
                    alt={collection.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                    <p className="eyebrow text-gold-light">
                      {collection._count.products} Models
                    </p>
                    <h3 className="mt-3 font-display text-3xl text-cream lg:text-4xl">
                      {collection.name}
                    </h3>
                    <p className="mt-2.5 max-w-sm text-sm text-cream/65">
                      {collection.tagline}
                    </p>
                    <span className="eyebrow mt-6 inline-flex items-center gap-2.5 text-cream">
                      Discover
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Technology split -------------------------------------------------- */}
      <section>
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[26rem] lg:min-h-[38rem]">
            <Image
              src="/images/atelier/finishing.svg"
              alt="Precision assembly inside a Meridian sensor module"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center bg-ink px-8 py-20 lg:px-16 lg:py-28">
            <Reveal>
              <p className="eyebrow text-gold-light">Engineering</p>
              <h2 className="mt-6 font-display text-3xl leading-[1.15] font-bold text-cream lg:text-[2.5rem]">
                Four hundred readings
                <br />
                a second, off one LED
              </h2>
              <p className="mt-7 max-w-md text-[0.9375rem] leading-relaxed text-cream/60">
                Heart rate, SpO2, and ECG all come from the same sensor
                cluster on the caseback — no wires, no clinic, no gel.
                Motion data is fused in to cancel the noise a swinging arm
                creates, so a sprint reads as cleanly as a resting pulse.
              </p>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-cream/60">
                None of it requires you to open an app. A glance at the
                wrist is the whole interface.
              </p>
              <div className="mt-11">
                <ButtonLink href="/craftsmanship" variant="light">
                  How It's Built
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* New arrivals ---------------------------------------------------- */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Recently Shipped"
              title="New this season"
              align="left"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-8">
            {newArrivals.map((product, i) => (
              <Reveal key={product.id} delay={i * 90}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stories --------------------------------------------------------- */}
      <Section className="bg-cream-dark">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Stories"
              title="Notes from the team"
              description="How the sensors work, what a software update actually does, and the field test that put a button on Summit."
            />
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {journal.map((post, i) => (
              <Reveal key={post.id} delay={i * 90}>
                <Link href={`/journal/${post.slug}`} className="group block">
                  <div className="relative aspect-16/10 overflow-hidden bg-ink">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  </div>
                  <p className="eyebrow mt-6 text-gold">{post.category}</p>
                  <h3 className="mt-3 font-display text-xl leading-snug font-bold text-ink transition-colors duration-300 group-hover:text-gold-dark">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-xs text-stone-light">
                    {post.publishedAt ? formatDate(post.publishedAt) : null} ·{" "}
                    {post.readMinutes} min read
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 text-center">
            <ButtonLink href="/journal" variant="outline">
              Read All Stories
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* Store invitation --------------------------------------------- */}
      <Section className="bg-ink">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow text-gold-light">Stores</p>
              <h2 className="mt-6 font-display text-3xl leading-[1.15] font-bold text-cream lg:text-[2.5rem]">
                Case size is easier to judge
                <br />
                with it actually on your wrist
              </h2>
              <p className="mt-7 text-[0.9375rem] leading-relaxed text-cream/60">
                Eight stores across seven countries, every model on display
                and ready to try. A specialist can also walk you through
                sizing over chat if there isn't one nearby.
              </p>
              <div className="mt-11 flex flex-wrap justify-center gap-4">
                <ButtonLink href="/boutiques" variant="gold">
                  Find a Store
                </ButtonLink>
                <ButtonLink href="/contact" variant="light">
                  Chat With Support
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
