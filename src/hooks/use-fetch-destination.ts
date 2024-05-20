// src/hooks/useFetchDestination.ts

import { fetchDestination, FetchDestinationProps } from "@/services/fetch-destination";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useFetchDestination({ location, count }: FetchDestinationProps) {
  return useSuspenseQuery({
    queryKey: ["destinationData", { location, count }],
    queryFn: ({ queryKey }) => fetchDestination(queryKey[1] as FetchDestinationProps),
  });
}
