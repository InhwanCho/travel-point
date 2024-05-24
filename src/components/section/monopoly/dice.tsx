'use client';
import { useState } from 'react';
import '@/styles/dice.css';

// Dice 컴포넌트 정의
const Dice = () => {
  // 주사위 번호 상태와 애니메이션 상태 설정
  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  // 주사위를 굴리는 함수, 1부터 6까지의 랜덤 숫자를 설정
  const rollDice = () => {
    if (isRolling) return; // 주사위가 굴러가는 중이면 중복 클릭 방지
    setIsRolling(true);
    setDiceNumber(Math.floor(Math.random() * 6) + 1);

    // 2초 후에 애니메이션 상태를 초기화
    setTimeout(() => {
      setIsRolling(false);
    }, 2000);
  };

  return (
    // 화면 중앙에 주사위 배치
    <div className="flex justify-center items-center h-screen">
      {/* 주사위를 클릭하면 rollDice 함수가 호출됨 */}
      <div
        onClick={rollDice}
        className={`dice show-${diceNumber} ${isRolling ? 'roll-dice' : ''}`}
      >
        {/* 각 주사위 면을 DiceSide 컴포넌트로 렌더링 */}
        <DiceSide sideNumber={1} />
        <DiceSide sideNumber={2} />
        <DiceSide sideNumber={3} />
        <DiceSide sideNumber={4} />
        <DiceSide sideNumber={5} />
        <DiceSide sideNumber={6} />
      </div>
    </div>
  );
};

// DiceSide 컴포넌트는 각 주사위 면을 나타냄
const DiceSide = ({ sideNumber }: { sideNumber: number }) => {
  // 주사위 면의 점 위치를 가져옴
  const dots = getDots(sideNumber);

  return (
    // 주사위 면의 클래스 설정
    <div className={`side side-${sideNumber}`}>
      {/* 점들을 반복하여 렌더링 */}
      {dots.map((dot, index) => (
        <div key={index} className={`dot ${dot.className}`}></div>
      ))}
    </div>
  );
};

// 각 주사위 면의 점 위치를 정의하는 함수
const getDots = (sideNumber: number) => {
  // 주사위 면에 따른 점 위치를 정의한 객체
  const dotPositions: { [key: number]: { className: string }[] } = {
    1: [{ className: "one-1" }],
    2: [
      { className: "two-1" },
      { className: "two-2" }
    ],
    3: [
      { className: "three-1" },
      { className: "three-2" },
      { className: "three-3" }
    ],
    4: [
      { className: "four-1" },
      { className: "four-2" },
      { className: "four-3" },
      { className: "four-4" }
    ],
    5: [
      { className: "five-1" },
      { className: "five-2" },
      { className: "five-3" },
      { className: "five-4" },
      { className: "five-5" }
    ],
    6: [
      { className: "six-1" },
      { className: "six-2" },
      { className: "six-3" },
      { className: "six-4" },
      { className: "six-5" },
      { className: "six-6" }
    ],
  };

  // 주어진 주사위 면에 대한 점 위치 반환
  return dotPositions[sideNumber];
};

export default Dice;
