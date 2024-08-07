import { CATEGORIES } from "@/data/data";
import { CategoryName } from "@/types/categoriy-types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from 'jsonwebtoken';
import { AccessUserType, User } from "@/types/user-type";

// 클래스 merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// null or ''인 경우 제거하고 리스트로 만듬
export const filterArray = (arr: (string | null)[]): string[] => {
  return arr.filter((item): item is string => item !== null && item !== "");
};

// 상세페이지 평점 별 계산기
export function calculateStarRating(rating: number) {
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return { fullStars, hasHalfStar, emptyStars };
}

// 날짜 포맷을 변경하는 함수
export function formatDateRange(startDate: string, endDate: string): string {
  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${year}.${month}.${day}`;
  };

  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
}

// 이벤트 상태를 반환하는 함수
export function getEventStatus(
  startDate: string,
  endDate: string
): { status: string; dDay: string } {
  const currentDate = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (currentDate >= start && currentDate <= end) {
    return { status: "진행중", dDay: "" };
  } else if (currentDate < start) {
    const diffTime = start.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { status: "진행 예정", dDay: `D-${diffDays}` };
  } else {
    return { status: "종료", dDay: "" };
  }
}

// cat1, cat2, cat3를 실제 카테고리(한글)로 변경하는 함수
export function getCategoryName(
  cat1: string,
  cat2: string,
  cat3: string
): CategoryName {
  const category1 = CATEGORIES[cat1];
  if (!category1) return {};

  const category2 = category1.subCategories[cat2];
  if (!category2) return { cat2: category1.name };

  const category3 = category2.details[cat3];
  return {
    cat2: category2.name,
    cat3: category3,
  };
}

// throttleHelper - 과한 스크롤 추적 방지
export function throttleHelper(
  callback: () => void,
  waitTime: number
): () => void {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return function () {
    if (timerId === null) {
      timerId = setTimeout(() => {
        callback();
        timerId = null;
      }, waitTime);
    }
  };
}

// 축제 상세 정보 포매팅
export function formatFestivalIntro(intro: string): string {
  // Split the intro by new lines and filter out empty lines
  const lines = intro
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");

  let formattedIntro = "";
  let currentSection = "";

  lines.forEach((line) => {
    if (line.match(/^\d+\./)) {
      // If the line starts with a number followed by a dot, it's a section header
      currentSection = line.trim();
      formattedIntro += `<br><b>${currentSection}</b><br>`;
    } else if (line.startsWith("-")) {
      // If the line starts with a dash, it's a list item
      formattedIntro += `${line.trim()}<br>`;
    } else {
      // Otherwise, it's part of the previous item
      formattedIntro += ` ${line.trim()}`;
    }
  });

  return formattedIntro;
}

// 유저 이메일 마스킹
export function maskEmail(email: string) {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) {
    return email; // 로컬 부분이 2자리 이하인 경우 변경하지 않음
  }
  const maskedLocalPart = `${localPart.slice(0, 2)}${"*".repeat(
    localPart.length - 3
  )}${localPart.slice(-1)}`;
  return `${maskedLocalPart}@${domain}`;
}

export const jwtDecode = (token: string): User | null => {
  try {
    const decoded = jwt.decode(token) as AccessUserType | null;

    if (!decoded) {
      return null;
    }

    const user: User = {
      id: decoded.id.toString(), // string으로 변환
      email: decoded.email,
      role: decoded.auth, // auth를 role로 매핑
      userImgUrl: decoded.userImgUrl,
      createDate: new Date(decoded.createDate).toISOString(), // string으로 변환      
      provider: decoded.provider
    };

    return user;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};