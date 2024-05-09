import PageLayout from "@/components/layout/page-layout";
import MainHero from "@/components/section/main-hero";
import RegionRecommendation from "@/components/section/region-recommendation";
import RegionSelection from "@/components/section/region-selection";
import { Separator } from "@/components/ui/separator";
import TrendingDestinations from "@/components/section/trending-destinations";
import ThemeRecommendation from "@/components/theme-recommendation";

import TouristAttractionsComponent from "@/components/touristAttractionsComponent";
import FestivalRecommendation from "@/components/section/festival-recommendation";


export default function Home() {
  return (
    <main className="">
      <MainHero />
      <PageLayout>
        <RegionRecommendation />
        <RegionSelection title="다른 지역 여행지 구경가기" />
        <Separator className="my-10 md:my-20" />
        <TrendingDestinations />
        <Separator className="my-10 md:my-20" />
        <ThemeRecommendation />
        <Separator className="my-10 md:mt-20" />
        <FestivalRecommendation />
      </PageLayout>

      {/* <TouristAttractionsComponent /> */}

    </main>
  );
}
