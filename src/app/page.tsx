
import PageLayout from "@/components/layout/page-layout";
import MainHero from "@/components/section/mainPage/main-hero";
import RegionRecommendation from "@/components/section/mainPage/region-recommendation";
import RegionSelection from "@/components/section/region-selection";
import { Separator } from "@/components/ui/separator";
import TrendingDestinations from "@/components/section/mainPage/trending-destinations";
import ThemeRecommendation from "@/components/theme-recommendation";

import TouristAttractionsComponent from "@/components/touristAttractionsComponent";
import FestivalRecommendation from "@/components/section/festival-recommendation";



export default function Home() {
  
  return (
    <main className="">
      {/* 히어로 섹션 */}
      <MainHero />
      <PageLayout>        
        {/* 지역 섹션 */}
        <RegionRecommendation />
        <RegionSelection title="다른 지역 여행지 구경가기" />
        <Separator className="my-10 md:my-20" />
        {/* 추천 섹션 */}
        <TrendingDestinations />
        <Separator className="my-10 md:my-20" />
        {/* 테마 섹션 */}
        <ThemeRecommendation />
        <Separator className="my-10 md:mt-20" />
        {/* 축제 섹션 */}
        <FestivalRecommendation />
      </PageLayout>

      {/* <TouristAttractionsComponent /> */}

    </main>
  );
}
