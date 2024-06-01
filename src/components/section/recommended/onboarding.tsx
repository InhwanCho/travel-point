'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import StepProgress from '@/components/section/recommended/step-progress';
import StartSection from '@/components/section/recommended/start-section';
import RegionSelection from '@/components/section/recommended/region-selection-step';
import PreferenceSelection from '@/components/section/recommended/preference-selection';
import TravelGameStep from '@/components/section/recommended/travel-game';

// 나중에 여행지 추천 결과값
export function ResultStep({ preferences, activeRegion, onRestart }: { preferences: any; activeRegion: string; onRestart: () => void }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">여행 추천 결과</h1>
      <p className="text-base sm:text-lg mb-4">여기에서 추천된 여행지를 확인하세요!</p>
      <div>
        <h2 className="text-xl font-bold mb-4">설문 결과</h2>
        <ul className="space-y-2">
          <li className="flex justify-between bg-gray-100 p-4 rounded-lg">
            <span className="font-medium">선택한 지역:</span>
            <span>{activeRegion}</span>
          </li>
          <li className="flex justify-between bg-gray-100 p-4 rounded-lg">
            <span className="font-medium">선호하는 취향:</span>
            <span>{preferences.preference}</span>
          </li>
        </ul>
      </div>
      <Button onClick={onRestart} variant="primary" className="mt-8">
        다시 시작
      </Button>
    </div>
  );
}

export default function TravelRecommendations() {
  const [state, setState] = useState({
    step: 0,
    preferences: {
      preference: '전체',
    },
    activeRegion: 'all',
  });

  const handlePreferenceChange = (newValue: string) => {
    setState(prevState => ({
      ...prevState,
      preferences: { preference: newValue }
    }));
  };

  const handleRegionChange = (region: string) => {
    setState(prevState => ({
      ...prevState,
      activeRegion: region
    }));
  };

  const goToNextStep = () => {
    setState(prevState => ({
      ...prevState,
      step: prevState.step + 1
    }));
  };

  const goToPreviousStep = () => {
    setState(prevState => ({
      ...prevState,
      step: prevState.step - 1
    }));
  };

  const skipToGameStep = () => {
    setState(prevState => ({
      ...prevState,
      step: 3
    }));
  };

  const restart = () => {
    setState({
      step: 0,
      preferences: {
        preference: '전체',
      },
      activeRegion: 'all',
    });
  };

  const renderStep = () => {
    switch (state.step) {
    case 0:
      return <StartSection onNext={goToNextStep} onSkip={skipToGameStep} />;
    case 1:
      return (
        <RegionSelection
          activeRegion={state.activeRegion}
          onRegionChange={handleRegionChange}
          onNext={goToNextStep}
          onPrevious={goToPreviousStep}
        />
      );
    case 2:
      return (
        <PreferenceSelection
          preference={state.preferences.preference}
          onPreferenceChange={handlePreferenceChange}
          onNext={goToNextStep}
          onPrevious={goToPreviousStep}
        />
      );
    case 3:
      return <TravelGameStep onNext={goToNextStep} onPrevious={goToPreviousStep} />;
    case 4:
      return <ResultStep preferences={state.preferences} activeRegion={state.activeRegion} onRestart={restart} />;
    default:
      return null;
    }
  };

  return (
    <>
      <StepProgress step={state.step + 1} />
      {renderStep()}
    </>
  );
}
