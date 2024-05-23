import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterArray = (arr: (string | null)[]): string[] => {
  return arr.filter((item): item is string => item !== null && item !== "");
};

export function calculateStarRating(rating: number) {
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return { fullStars, hasHalfStar, emptyStars };
}

// 기본 데이터 생성 함수 - 임시
export function generateData() {
  return [...Array(16)].map((_, i) => ({
    location: '강원특별자치도 춘천시',
    title: `대관령 삼양목장 ${i}`,
    description: '정답게 이야기를 나눌 수 있는',
  }));
}