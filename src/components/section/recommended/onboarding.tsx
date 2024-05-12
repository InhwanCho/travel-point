'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

function PreferenceRadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <div className="mb-6 flex items-center space-x-3">
      <label className="text-lg flex font-medium mb-2 items-center min-w-[70px]">{label}</label>
      <RadioGroup
        value={value}
        onValueChange={(newValue) => onChange(newValue)}
        className="space-y-2 flex items-center"
      >
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

function StepProgress({ step }: { step: number }) {
  const steps = ['취향 설정', '추가 설문', '결과 확인'];
  return (
    <div className="mb-8">
      <h2 className="sr-only">단계</h2>
      <ol className="flex items-center gap-4 text-xs font-medium text-gray-500">
        {steps.map((title, index) => (
          <li key={title} className="flex items-center gap-2">
            {index < step ? (
              <span className="rounded bg-green-50 p-1.5 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ) : (
              <span
                className={`size-6 rounded ${index === step ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
                } text-center text-[10px]/6 font-bold`}
              >
                {index + 1}
              </span>
            )}
            <span>{title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function TravelRecommendations() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    nature: '보통',
    relaxation: '보통',
    history: '보통',
    experience: '보통',
    activity: '보통',
  });
  const [survey, setSurvey] = useState({
    age: '20대',
    travelCompanion: '혼자',
    travelDuration: '당일치기',
  });

  const handleRadioGroupChange = (type: string, newValue: string) => {
    setPreferences((prev) => ({ ...prev, [type]: newValue }));
  };

  const handleSurveyChange = (key: string, value: string) => {
    setSurvey((prev) => ({ ...prev, [key]: value }));
  };

  const goToNextStep = () => {
    setStep(step + 1);
  };

  const skipToFinalStep = () => {
    setStep(4);
  };

  const toBeginningStep = () => {
    setStep(1);
  };

  const renderStep = () => {
    switch (step) {
    case 1:
      return (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">여행 추천에 오신 것을 환영합니다!</h1>
          <p className="text-lg mb-4">맞춤 여행지를 찾아보세요.</p>
          <div className="space-x-4">
            <Button onClick={goToNextStep} variant="primary">
                시작하기
            </Button>
            <Button onClick={skipToFinalStep} variant="secondary">
                무작위 여행지 추천
            </Button>
          </div>
        </div>
      );
    case 2:
      return (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">취향 설정</h1>
          <div className='flex flex-col '>
            <PreferenceRadioGroup
              label="자연"
              options={['매우 낮음', '낮음', '보통', '높음', '매우 높음']}
              value={preferences.nature}
              onChange={(value) => handleRadioGroupChange('nature', value)}
            />
            <PreferenceRadioGroup
              label="휴양"
              options={['매우 낮음', '낮음', '보통', '높음', '매우 높음']}
              value={preferences.relaxation}
              onChange={(value) => handleRadioGroupChange('relaxation', value)}
            />
            <PreferenceRadioGroup
              label="역사"
              options={['매우 낮음', '낮음', '보통', '높음', '매우 높음']}
              value={preferences.history}
              onChange={(value) => handleRadioGroupChange('history', value)}
            />
            <PreferenceRadioGroup
              label="체험"
              options={['매우 낮음', '낮음', '보통', '높음', '매우 높음']}
              value={preferences.experience}
              onChange={(value) => handleRadioGroupChange('experience', value)}
            />
            <PreferenceRadioGroup
              label="액티비티"
              options={['매우 낮음', '낮음', '보통', '높음', '매우 높음']}
              value={preferences.activity}
              onChange={(value) => handleRadioGroupChange('activity', value)}
            />
            <Button onClick={goToNextStep} variant="primary" className="mt-8">
                다음
            </Button>
          </div></>
      );
    case 3:
      return (
        <div>
          <h1 className="text-3xl font-bold mb-8 text-center">추가 설문</h1>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">나이대</label>
            <Select onValueChange={(value) => handleSurveyChange('age', value)}>
              <SelectTrigger>
                <SelectValue placeholder={survey.age} />
              </SelectTrigger>
              <SelectContent>
                {['20대', '30대', '40대', '50대', '60대 이상'].map((age) => (
                  <SelectItem key={age} value={age}>{age}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">함께 가는 사람</label>
            <Select onValueChange={(value) => handleSurveyChange('travelCompanion', value)}>
              <SelectTrigger>
                <SelectValue placeholder={survey.travelCompanion} />
              </SelectTrigger>
              <SelectContent>
                {['혼자', '친구', '연인', '가족', '어르신', '아이'].map((companion) => (
                  <SelectItem key={companion} value={companion}>{companion}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">여행 기간</label>
            <Select onValueChange={(value) => handleSurveyChange('travelDuration', value)}>
              <SelectTrigger>
                <SelectValue placeholder={survey.travelDuration} />
              </SelectTrigger>
              <SelectContent>
                {['당일치기', '1박2일', '2박3일', '그 이상'].map((duration) => (
                  <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={goToNextStep} variant="primary" className="mt-8">
              다음
          </Button>
        </div>
      );
    case 4:
      return (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">결과 확인</h1>
          <p className="text-lg mb-4">설문 결과에 따라 추천 여행지 리스트:</p>
          <ul className="list-disc list-inside text-left">
            <li>자연 선호도: {preferences.nature}</li>
            <li>휴양 선호도: {preferences.relaxation}</li>
            <li>역사 선호도: {preferences.history}</li>
            <li>체험 선호도: {preferences.experience}</li>
            <li>액티비티 선호도: {preferences.activity}</li>
            <li>나이대: {survey.age}</li>
            <li>함께 가는 사람: {survey.travelCompanion}</li>
            <li>여행 기간: {survey.travelDuration}</li>
          </ul>
          <Button onClick={toBeginningStep} variant="primary" className="mt-8">
              다시 처음으로
          </Button>
        </div>
      );
    default:
      return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 p-4">
      <StepProgress step={step} />
      {renderStep()}
    </div>
  );
}
