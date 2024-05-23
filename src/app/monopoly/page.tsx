// @/app/sample/page.tsx
import Title from '@/components/common/title';
import React from 'react';

export default function MonopolyPage() {
  const boardColsMdUp = 6; // md 이상일 때 보드의 열 크기
  const boardRowsMdUp = 7; // md 이상일 때 보드의 행 크기
  const boardColsSmDown = 7; // md 이하일 때 보드의 열 크기
  const boardRowsSmDown = 6; // md 이하일 때 보드의 행 크기
  const specialCells = new Map<number, string>([
    [41, '가즈아'], // 시작 위치를 맨 아래로 변경
    [6, '무인도'],
    [35, '세금'],
  ]);

  // 셀의 내용을 가져오는 함수
  const getCellContent = (index: number, isMdUp: boolean) => {
    const adjustedIndex = isMdUp ? index : adjustIndexForSmallBoard(index);
    return specialCells.get(adjustedIndex) || '';
  };

  // 보드의 경계 셀인지 확인하는 함수
  const isEdgeCell = (index: number, isMdUp: boolean) => {
    const boardCols = isMdUp ? boardColsMdUp : boardColsSmDown;
    const boardRows = isMdUp ? boardRowsMdUp : boardRowsSmDown;
    const row = Math.floor(index / boardCols);
    const col = index % boardCols;
    return row === 0 || row === boardRows - 1 || col === 0 || col === boardCols - 1;
  };

  // 작은 보드에 맞게 인덱스를 조정하는 함수
  const adjustIndexForSmallBoard = (index: number) => {
    // Adjust the special cells indices for the smaller board
    if (index === 41) return 35; // '가즈아'
    if (index === 6) return 6; // '무인도'
    if (index === 35) return 41; // '세금'
    return index;
  };

  return (
    <main>
      <section className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4 relative">
        <Title className='absolute top-12'>부루마블</Title>
        <div>주사위</div>
        <div className="relative w-full h-4/5">
          {/* md: 이상일 때 */}
          <div className="hidden md:grid absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 grid-cols-6 grid-rows-7 gap-1">
            {Array.from({ length: boardColsMdUp * boardRowsMdUp }, (_, i) => (
              <div
                key={i}
                className={`flex items-center justify-center border bg-white ${isEdgeCell(i, true) ? 'bg-green-200 border-gray-600 shadow-lg' : 'invisible'
                }`}
                style={{ minWidth: '70px', minHeight: '70px' }} // 각 셀의 최소 크기를 설정
              >
                <div className="transform -rotate-45">
                  <span className="text-lg font-semibold">{getCellContent(i, true)}</span>
                </div>
              </div>
            ))}
          </div>
          {/* md: 이하일 때 */}
          <div className="grid md:hidden grid-cols-7 grid-rows-6 gap-0.5 sm:gap-1 xsm:w-[88%] xsm:mx-auto">
            {Array.from({ length: boardColsSmDown * boardRowsSmDown }, (_, i) => (
              <div
                key={i}
                className={`size-[56px] xsm:size-[60px] sm:size-[70px] flex items-center justify-center border bg-white ${isEdgeCell(i, false) ? 'bg-green-200 border-gray-600 shadow-lg' : 'invisible'
                }`}
              >
                <div>
                  <span className="text-lg font-semibold">{getCellContent(i, false)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
