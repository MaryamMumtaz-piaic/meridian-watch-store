import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getCollections } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Four lines, each built for a different day — Pulse, Summit, Studio, and Aero.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <>
      <section className="bg-ink pt-[calc(var(--header-height)+4rem)] pb-16 lg:pb-20">
        <Container>
          <Reveal>
            <p className="eyebrow text-gold-light">The Lineup</p>
            <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] font-bold text-cream sm:text-5xl lg:text-6xl">
              Four collections
            </h1>
            <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-cream/60">
              Every watch we make belongs to one of four lines. Each started
              as an answer to a specific kind of day, and every model in it
              still has to earn its place there.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {collections.map((collection, i) => (
              <Reveal key={collection.id} delay={i * 90}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group relative block aspect-4/5 overflow-hidden bg-ink sm:aspect-16/11"
                >
                  <Image
                    src={collection.heroImage}
                    alt={collection.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                    <p className="eyebrow text-gold-light">
                      {collection._count.products} Models
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-cream lg:text-4xl">
                      {collection.name}
                    </h2>
                    <p className="mt-2.5 max-w-sm text-sm text-cream/65">
                      {collection.tagline}
                    </p>
                    <span className="eyebrow mt-6 inline-flex items-center gap-2.5 text-cream">
                      Discover the Collection
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
    </>
  );
}
