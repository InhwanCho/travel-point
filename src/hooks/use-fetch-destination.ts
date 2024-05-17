// src/hooks/useFetchDestination.ts
import { fetchDestination } from '@/services/fetch-destination';
import { useSuspenseQuery } from '@tanstack/react-query';


export function useFetchDestination() {
  return useSuspenseQuery({
    queryKey: ['destinationData'],
    queryFn: fetchDestination,
  });
}
