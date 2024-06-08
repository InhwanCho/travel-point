'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import MonopolyContent from "@/components/section/recommended/monopoly-contnet";
import { ThemeType } from '@/types/categoriy-types';

interface TravelGameStepProps {
  onNext: () => void;
  onPrevious: () => void;
  theme: ThemeType;
  areaName: string;
}

export default function TravelGameStep({ onNext, onPrevious, theme, areaName }: TravelGameStepProps) {
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  useEffect(() => {
    if (isGameCompleted) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [isGameCompleted]);

  return (
    <>
      <h2 className="text-center py-8 font-semibold">여행지 부루마블</h2>      
      <section className="min-h-screen bg-blue-100 flex flex-col items-center justify-center relative w-full">
        <MonopolyContent theme={theme} areaName={areaName} setIsGameCompleted={setIsGameCompleted} />
        <div className="absolute bottom-10">
          <div className="flex justify-center gap-4 sm:gap-6 mt-8">
            <Button onClick={onPrevious} variant="secondary">
              이전
            </Button>
            <Button
              onClick={isGameCompleted ? onNext : undefined}
              variant={isGameCompleted ? "primary" : "secondary"}
              disabled={!isGameCompleted}
              className={isGameCompleted ? "" : "opacity-50 cursor-not-allowed"}
            >
              다음
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
