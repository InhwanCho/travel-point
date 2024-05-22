// src/services/fetch-destination.ts
import { FetchDestinationProps, fetchThemeDestinationByCatProps, themeCategories } from "@/types/destination-fetch-props";
import {
  DestinationDetailType,
  DestinationType,
} from "@/types/destination-types";

export async function fetchDestination({
  areaName,
  count = "10",
  page = "1",
}: FetchDestinationProps): Promise<DestinationType[]> {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_API_BASE_URL;

  const url = `${baseUrl}/api/destination/location?${
    areaName && `areaName=${areaName}&`
  }${count && `count=${count}&`}${page && `&page=${page}`}`;

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

export async function fetchDestinationById(
  contentId: string
): Promise<DestinationDetailType> {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_API_BASE_URL;

  const url = `${baseUrl}/api/destination/contentId?contentId=${contentId}`;

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

export async function fetchThemeDestinationByCat({
  areaName,
  count = "8",
  page = "1",
  theme,
}: fetchThemeDestinationByCatProps): Promise<DestinationType[]> {  // 배열을 반환하도록 수정
  const { cat1, cat2 } = themeCategories[theme];

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_API_BASE_URL;

  const urlParams = new URLSearchParams({
    count,
    page,
    ...(areaName && { areaName }),
    ...(cat1 && { cat1 }),
    ...(cat2 && { cat2 }),
  });

  const url = `${baseUrl}/api/theme/type?${urlParams.toString()}`;

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