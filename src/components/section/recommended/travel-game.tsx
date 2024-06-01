
import { Button } from "@/components/ui/button";
import MonopolyContent from "@/components/section/recommended/monopoly-contnet";

export default function TravelGameStep({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) {
  return (
    // <main className='w-full overflow-hidden'>
    <>
      <h2 className="text-center py-8 font-semibold">여행지 부루마블</h2>
      <section className="min-h-screen bg-blue-100 flex flex-col items-center justify-center relative w-full">        
        <MonopolyContent />
      </section>
      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={onPrevious} variant="secondary">
          이전
        </Button>
        <Button onClick={onNext} variant="primary">
          다음
        </Button>
      </div>
    </>
    // </main>

  );
}

