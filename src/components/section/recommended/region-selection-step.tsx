'use client';
import RegionSelection from "@/components/common/region-selection";
import { Button } from "@/components/ui/button";

export default function RegionSelectionStep({ activeRegion, onRegionChange, onNext, onPrevious }: { activeRegion: string; onRegionChange: (region: string) => void; onNext: () => void; onPrevious: () => void }) {
  return (
    <>
      <RegionSelection
        page="recommended"
        title="여행지 지역 선택"
        activeRegion={activeRegion}
        onRegionChange={onRegionChange}
      />
      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={onPrevious} variant="secondary">
          이전
        </Button>
        <Button onClick={onNext} variant="primary">
          다음
        </Button>
      </div>
    </>
  );
}