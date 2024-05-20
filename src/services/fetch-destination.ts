// src/services/fetch-destination.ts
import { DestinationType } from "@/types/att-area-types";

export interface FetchDestinationProps {
  location?: string;
  count?: string;
}

export async function fetchDestination({
  location ,
  count = "10",
}: FetchDestinationProps): Promise<DestinationType[]> {
  // 클라이언트 측에서만 window 객체에 접근할 수 있으므로, window 객체를 사용하여 절대 경로 생성
  const baseUrl = typeof window !== "undefined" 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_API_BASE_URL; // 서버 사이드에서는 환경 변수로 base URL을 설정
  
  const url = `${baseUrl}/api/destination/seoul?${location ? "areaCode=" + location : ""}${count ? "&limit=" + count : ""}`;
  
  const username = process.env.NEXT_PUBLIC_API_USERNAME;
  const password = process.env.NEXT_PUBLIC_API_PASSWORD;

  const response = await fetch(url, {
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
  });

  if (!response.ok) {
    throw new Error("API call failed with status: " + response.status);
  }

  return response.json();
}
