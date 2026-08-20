import { Hero } from "@/components/home/hero";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { NewArrivals } from "@/components/home/new-arrivals";
import { BannerSlider } from "@/components/home/banner-slider";
import { CraftsmanshipTeaser } from "@/components/home/craftsmanship-teaser";
import { JournalTeaser } from "@/components/home/journal-teaser";
import { BoutiquesTeaser } from "@/components/home/boutiques-teaser";
import { ServicePillars } from "@/components/home/service-pillars";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <BannerSlider />
      <CraftsmanshipTeaser />
      <JournalTeaser />
      <BoutiquesTeaser />
      <ServicePillars />
    </div>
  );
}
