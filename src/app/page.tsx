import { Hero } from "@/components/home/hero";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { NewArrivals } from "@/components/home/new-arrivals";
import { BannerSlider } from "@/components/home/banner-slider";
import { TopSelling } from "@/components/home/top-selling";
import { WatchGallery } from "@/components/home/watch-gallery";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <BannerSlider />
      <TopSelling />
      <WatchGallery />
    </div>
  );
}
