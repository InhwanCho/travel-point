// src/services/fetch-destination.ts
interface fetchDestinationPrps {
  params: {
    location?: string;
    count?: string;
  };
}

export async function fetchDestination({ params }: fetchDestinationPrps) {
  const url = "https://pingulion.shop/destination/seoul";
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
