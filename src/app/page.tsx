import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { NewArrivals } from "@/components/home/new-arrivals";
import { CraftsmanshipTeaser } from "@/components/home/craftsmanship-teaser";
import { JournalTeaser } from "@/components/home/journal-teaser";
import { BoutiquesTeaser } from "@/components/home/boutiques-teaser";
import { ServicePillars } from "@/components/home/service-pillars";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Manifesto />
      <FeaturedCollections />
      <NewArrivals />
      <CraftsmanshipTeaser />
      <JournalTeaser />
      <BoutiquesTeaser />
      <ServicePillars />
    </div>
  );
}
