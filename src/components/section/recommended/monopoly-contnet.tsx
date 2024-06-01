'use client';

import { useMemo, useState } from "react";
import { FaChessPawn } from "react-icons/fa6";
import Dice from "@/components/section/recommended/dice";

export default function MonopolyContent() {
  const boardCols = 7; // 보드의 열 크기
  const boardRows = 7; // 보드의 행 크기

  // 발판의 순서 정의 (반시계 방향)
  const path = useMemo(() => [
    48, 47, 46, 45, 44, 43, 42, // 아래쪽 가로줄
    35, 28, 21, 14, 7, 0, // 왼쪽 세로줄
    1, 2, 3, 4, 5, 6, // 위쪽 가로줄
    13, 20, 27, 34, 41, // 오른쪽 세로줄    
  ], []);

  // 셀의 내용을 정의
  const cells = useMemo(() => {
    const cellMap = new Map<number, string>();
    path.forEach((pos, index) => {
      cellMap.set(pos, `${index}번 발판`); // 각 발판의 위치와 이름을 매핑
    });
    return cellMap;
  }, [path]);

  const [currentPosition, setCurrentPosition] = useState(48); // 현재 말의 위치 상태
  const [isMoving, setIsMoving] = useState(false); // 이동 중 여부 상태
  const [board, setBoard] = useState(Array(boardCols * boardRows).fill('white')); // 보드의 각 발판 색상 상태

  // 셀의 내용을 가져오는 함수
  const getCellContent = (index: number) => {
    const content = cells.get(index) || '';
    const needsPadding = content.length > 6;
    return { content: needsPadding ? content.substring(0, 6) + '...' : content, needsPadding };
  };

  // 보드의 경계 셀인지 확인하는 함수
  const isEdgeCell = (index: number) => path.includes(index);

  // 주사위 굴림 핸들러
  const handleDiceRoll = (diceNumbers: number[]) => {
    if (isMoving) return; // 이동 중이면 중복 클릭 방지
    setIsMoving(true); // 이동 시작

    // 주사위 애니메이션 후 0.2초 후에 말이 움직이기 시작
    setTimeout(() => {
      moveTokens(diceNumbers); // 주사위 숫자에 따라 말 이동
    }, 200);
  };

  // 토큰을 이동시키는 함수
  const moveTokens = (diceNumbers: number[]) => {
    let newBoard = [...board]; // 보드 상태 복사
    let currentPositionIndex = path.indexOf(currentPosition); // 현재 위치 인덱스
    const movedPositions: string[] = []; // 이동한 발판의 이름을 저장할 배열
    let totalDelay = 0; // 총 지연 시간

    diceNumbers.forEach((diceNumber, diceIndex) => {
      for (let i = 1; i <= diceNumber; i++) {
        totalDelay += 500; // 각 이동마다 0.5초 지연
        setTimeout(() => {
          currentPositionIndex = (currentPositionIndex + 1) % path.length; // 새로운 위치 인덱스 계산
          const newPosition = path[currentPositionIndex]; // 새로운 위치 값
          setCurrentPosition(newPosition); // 현재 위치 업데이트
          if (i === diceNumber) {
            newBoard[newPosition] = 'bg-green-100/70'; // 주사위 숫자에 해당하는 위치 색상 변경
            movedPositions.push(cells.get(newPosition) || ''); // 이동한 위치 저장
          }
          setBoard([...newBoard]); // 보드 상태 업데이트
        }, totalDelay);
      }
      totalDelay += 500; // 각 주사위 이동 후 0.5초 지연
    });

    setTimeout(() => {
      setIsMoving(false); // 모든 이동이 끝난 후 이동 상태 해제
      console.log(movedPositions); // 이동한 발판 출력
    }, totalDelay);
  };

  // 보드 셀을 렌더링하는 함수
  const renderBoardCell = (i: number) => {
    const { content, needsPadding } = getCellContent(i);
    return (
      <div
        key={i}
        className={`md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] flex items-center justify-center border will-change-contents	${isEdgeCell(i) ? 'border-gray-600 shadow-lg' : 'invisible'}`}
        style={{ backgroundColor: board[i] === 'bg-green-100/70' ? 'rgba(187, 247, 208, 0.7)' : 'white' }}
      >
        <div className="transform -rotate-45 flex flex-col items-center">
          <span className={`truncate-6 ${needsPadding ? 'pl-1.5' : ''}`}>{content}</span>
          {currentPosition === i && (
            <span className='animate-bounce'>
              <FaChessPawn className="text-red-500 text-3xl shadow-xl" />            
            </span>            
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="relative w-full sm:w-[90%] md:w-[110%] h-4/5 px-4 sm:px-0">
        {/* md 이상일 때 보드 렌더링 */}
        <div className="hidden md:grid absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 grid-cols-7 grid-rows-7 gap-1">
          {Array.from({ length: boardCols * boardRows }, (_, i) => renderBoardCell(i))}
        </div>
        {/* md 이하일 때 보드 렌더링 */}
        <div className="grid md:hidden grid-cols-7 grid-rows-7 gap-0.5 sm:gap-1 xsm:w-[88%] xsm:mx-auto">
          {Array.from({ length: boardCols * boardRows }, (_, i) => (
            <div
              key={i}
              className={`size-[56px] xsm:size-[60px] sm:size-[70px] flex items-center justify-center border ${isEdgeCell(i) ? 'border-gray-600 shadow-lg' : 'invisible'}`}
              style={{ backgroundColor: board[i] === 'bg-green-100/70' ? 'rgba(187, 247, 208, 0.7)' : 'white' }}
            >
              <div className="flex flex-col items-center">
                <span className={`truncate-6 ${getCellContent(i).needsPadding ? 'pl-1.5' : ''}`}>{getCellContent(i).content}</span>
                {currentPosition === i && (
                  <FaChessPawn className="text-red-500 text-2xl animate-bounce" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dice onRoll={handleDiceRoll} />
    </>
  );
}
