// src/hooks/useFetchDestination.ts

import { fetchDestination, FetchDestinationProps } from "@/services/fetch-destination";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useFetchDestination({ areaName, count, page }: FetchDestinationProps) {
  return useSuspenseQuery({
    queryKey: ["destinationData", { areaName, count, page }],
    queryFn: ({ queryKey }) => fetchDestination(queryKey[1] as FetchDestinationProps),
  });
}
