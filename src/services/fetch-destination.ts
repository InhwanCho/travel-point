// src/services/fetch-destination.ts
import { DestinationDetailType, DestinationType } from "@/types/destination-types";

export interface FetchDestinationProps {
  areaName?: string;
  count?: string;
  page?: string;
}

export async function fetchDestination({
  areaName,
  count = "10",
  page='1',
}: FetchDestinationProps): Promise<DestinationType[]> {
  const baseUrl = typeof window !== "undefined" 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const url = `${baseUrl}/api/destination/location?${areaName && `areaName=${areaName}&`}${count && `count=${count}&`}${page && `&page=${page}`}`;
  
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

export async function fetchDestinationById(contentId: string): Promise<DestinationDetailType> {
  const baseUrl = typeof window !== "undefined"
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