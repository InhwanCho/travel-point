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
  const url = `https://pingulion.shop/destination/seoul?${location ? "areaCode=" + location : ""}${count ? "&limit=" + count : ""}`;
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
