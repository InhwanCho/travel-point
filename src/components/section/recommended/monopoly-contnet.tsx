// MonopolyContent.tsx
import { useState, useMemo } from "react";
import { FaChessPawn } from "react-icons/fa6";
import Dice from "@/components/section/recommended/dice";
import { useFetchThemeDestinationByCat } from "@/hooks/use-fetch-destination";
import { REGIONS } from "@/data/data";
import { Theme } from "@/store/themeStore";
import { useRecommendStore } from "@/store/recommendStore";


interface MonopolyContentProps {
  areaName: string;
  theme: Theme;
}

export default function MonopolyContent({ theme, areaName }: MonopolyContentProps) {
  const regionPath = REGIONS.find((r) => r.name === areaName)?.path || '';
  const { data, isLoading, isError } = useFetchThemeDestinationByCat({ areaName: regionPath, count: '24', theme: theme, page:'1'});

  const setMovedPositions = useRecommendStore((state) => state.setMovedPositions);

  const boardCols = 7; 
  const boardRows = 7; 
  const path = useMemo(() => [
    48, 47, 46, 45, 44, 43, 42, 
    35, 28, 21, 14, 7, 0, 
    1, 2, 3, 4, 5, 6, 
    13, 20, 27, 34, 41, 
  ], []);

  const cells = useMemo(() => {
    const cellMap = new Map<number, string>();
    path.forEach((pos, index) => {
      cellMap.set(pos, `${data && data[index].title}`);
    });
    return cellMap;
  }, [data, path]);

  const [currentPosition, setCurrentPosition] = useState(48);
  const [isMoving, setIsMoving] = useState(false);
  const [board, setBoard] = useState(Array(boardCols * boardRows).fill('white'));

  const getCellContent = (index: number) => {
    const content = cells.get(index) || '';
    const needsPadding = content.length > 6;
    return { content: needsPadding ? content.substring(0, 6) + '...' : content, needsPadding };
  };

  const isEdgeCell = (index: number) => path.includes(index);

  const handleDiceRoll = (diceNumbers: number[]) => {
    if (isMoving) return;
    setIsMoving(true);

    setTimeout(() => {
      moveTokens(diceNumbers);
    }, 200);
  };

  const moveTokens = (diceNumbers: number[]) => {
    let newBoard = [...board];
    let currentPositionIndex = path.indexOf(currentPosition);
    const movedPositions: string[] = [];
    let totalDelay = 0;

    diceNumbers.forEach((diceNumber, diceIndex) => {
      for (let i = 1; i <= diceNumber; i++) {
        totalDelay += 500;
        setTimeout(() => {
          currentPositionIndex = (currentPositionIndex + 1) % path.length;
          const newPosition = path[currentPositionIndex];
          setCurrentPosition(newPosition);
          if (i === diceNumber) {
            newBoard[newPosition] = 'bg-green-100/70';
            movedPositions.push(cells.get(newPosition) || '');
          }
          setBoard([...newBoard]);
        }, totalDelay);
      }
      totalDelay += 500;
    });

    setTimeout(() => {
      setIsMoving(false);
      setMovedPositions(movedPositions); // Zustand 스토어에 movedPositions 설정
      console.log(movedPositions);
    }, totalDelay);
  };

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
        <div className="hidden md:grid absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 grid-cols-7 grid-rows-7 gap-1">
          {Array.from({ length: boardCols * boardRows }, (_, i) => renderBoardCell(i))}
        </div>
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
