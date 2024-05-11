'use client';
import { useState } from 'react';

interface PreferenceSliderProps {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
}

function PreferenceSlider({ label, value, onChange }: PreferenceSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="mb-6">
      <label className="block text-lg font-medium mb-2">{label}</label>
      <input
        type="range"
        min="0"
        max="5"
        value={value}
        onChange={handleChange}
        className="w-full slider"
      />
      <p className="mt-2 text-sm text-gray-700">{label} Preference: {value}/5</p>
    </div>
  );
}

export default function TravelRecommendations() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    nature: 3,
    relaxation: 3,
    history: 3,
    experience: 3,
    activity: 3,
  });
  const [survey, setSurvey] = useState({
    age: '20대',
    travelCompanion: '혼자',
    travelDuration: '당일치기',
  });

  const handleSliderChange = (type: string, newValue: number) => {
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

  const renderStep = () => {
    switch (step) {
    case 1:
      return (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Welcome to Travel Recommender!</h1>
          <p className="text-lg mb-4">Discover the best destinations tailored just for you.</p>
          <div className="space-x-4">
            <button onClick={goToNextStep} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Get Started
            </button>
            <button onClick={skipToFinalStep} className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                무작위 여행지 추천
            </button>
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <h1 className="text-3xl font-bold mb-8 text-center">Personalize Your Preferences</h1>
          <PreferenceSlider
            label="자연"
            value={preferences.nature}
            onChange={(value) => handleSliderChange('nature', value)}
          />
          <PreferenceSlider
            label="휴양"
            value={preferences.relaxation}
            onChange={(value) => handleSliderChange('relaxation', value)}
          />
          <PreferenceSlider
            label="역사"
            value={preferences.history}
            onChange={(value) => handleSliderChange('history', value)}
          />
          <PreferenceSlider
            label="체험"
            value={preferences.experience}
            onChange={(value) => handleSliderChange('experience', value)}
          />
          <PreferenceSlider
            label="엑티비티"
            value={preferences.activity}
            onChange={(value) => handleSliderChange('activity', value)}
          />
          <button onClick={goToNextStep} className="px-6 py-3 mt-8 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Next
          </button>
        </div>
      );
    case 3:
      return (
        <div>
          <h1 className="text-3xl font-bold mb-8 text-center">Additional Survey</h1>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">나이</label>
            <select
              value={survey.age}
              onChange={(e) => handleSurveyChange('age', e.target.value)}
              className="w-full p-2 border rounded"
            >
              {['20대', '30대', '40대', '50대', '60대 이상'].map((age) => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">함께 가는 사람</label>
            <select
              value={survey.travelCompanion}
              onChange={(e) => handleSurveyChange('travelCompanion', e.target.value)}
              className="w-full p-2 border rounded"
            >
              {['혼자', '친구', '연인', '가족', '어르신', '아이'].map((companion) => (
                <option key={companion} value={companion}>{companion}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">여행 기간</label>
            <select
              value={survey.travelDuration}
              onChange={(e) => handleSurveyChange('travelDuration', e.target.value)}
              className="w-full p-2 border rounded"
            >
              {['당일치기', '1박2일', '2박3일', '그 이상'].map((duration) => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </div>
          <button onClick={goToNextStep} className="px-6 py-3 mt-8 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Next
          </button>
        </div>
      );
    case 4:
      return (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Survey Results</h1>
          <p className="text-lg mb-4">Here are your personalized travel recommendations:</p>
          <ul className="list-disc list-inside text-left">
            <li>자연 선호도: {preferences.nature}/5</li>
            <li>휴양 선호도: {preferences.relaxation}/5</li>
            <li>역사 선호도: {preferences.history}/5</li>
            <li>체험 선호도: {preferences.experience}/5</li>
            <li>엑티비티 선호도: {preferences.activity}/5</li>
            <li>나이대: {survey.age}</li>
            <li>함께 가는 사람: {survey.travelCompanion}</li>
            <li>여행 기간: {survey.travelDuration}</li>
          </ul>
        </div>
      );
    default:
      return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {renderStep()}
    </div>
  );
}
