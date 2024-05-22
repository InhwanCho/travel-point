// src/hooks/useFetchDestination.ts
import {
  fetchDestination,
  fetchDestinationById,
  fetchThemeDestinationByCat,
} from "@/services/fetch-destination";
import { FetchDestinationProps, fetchThemeDestinationByCatProps } from "@/types/destination-fetch-props";
import {
  DestinationDetailType,
  DestinationType,
} from "@/types/destination-types";
import { useQuery } from "@tanstack/react-query";

export function useFetchDestination({
  areaName,
  count,
  page,
}: FetchDestinationProps) {
  return useQuery<DestinationType[], Error>({
    queryKey: ["destinationData", { areaName, count, page }],
    queryFn: ({ queryKey }) =>
      fetchDestination(queryKey[1] as FetchDestinationProps),
  });
}

export function useFetchDestinationById(contentId: string) {
  return useQuery<DestinationDetailType, Error>({
    queryKey: ["destinationDetail", contentId],
    queryFn: () => fetchDestinationById(contentId),
  });
}

export function useFetchThemeDestinationByCat({
  areaName,
  count,
  page,
  theme,
}: fetchThemeDestinationByCatProps) {
  return useQuery<DestinationType[], Error>({
    queryKey: [
      "themedestinationData",
      { areaName, count, page, theme },
    ],
    queryFn: ({ queryKey }) =>
      fetchThemeDestinationByCat(queryKey[1] as fetchThemeDestinationByCatProps),
  });
}

