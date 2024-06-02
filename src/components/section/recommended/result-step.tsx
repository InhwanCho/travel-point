'use client';
import DestinationCard from "@/components/common/destination-card";
import Title from "@/components/common/title";
import CardLayout from "@/components/layout/card-layout";
import { Button } from "@/components/ui/button";
import { useRecommendStore } from "@/store/recommendStore";

export default function ResultStep({ onRestart }: { onRestart: () => void }) {
  const movedPositions = useRecommendStore((state) => state.movedPositions);

  return (
    <section className='py-10 sm:py-16 container max-w-[800px] mx-auto'>
      <Title className='border-b'>추천 여행지</Title>
      <CardLayout className='gap-6'>
        {movedPositions.map((item, i) => (
          <DestinationCard
            key={i}
            contentId={item.contentId}
            location={item.location}
            title={item.title}
            description={item.destinationDescription}
            imageSrc={item.firstImage}
          />
        ))}
      </CardLayout>
      <div className='flex justify-center'>
        <Button onClick={onRestart} variant="primary" className="mt-8">
          다시 시작
        </Button>
      </div>
    </section>
  );
}