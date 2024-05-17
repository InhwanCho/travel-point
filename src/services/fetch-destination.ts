// src/services/fetch-destination.ts

export interface FetchDestinationProps {
  location?: string;
  count?: string;
}

export async function fetchDestination({
  location = "서울",
  count = "10",
}: FetchDestinationProps) {
  
  const url = `https://pingulion.shop/destination/${location}`;
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
