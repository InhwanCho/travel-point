import {
  fetchAttractionsByArea,  
} from "@/services/attractions-by-area";
import { FetchTouristAttractionsByAreaParams } from "@/types/att-area-types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useAttractionsByArea(
  params: FetchTouristAttractionsByAreaParams
) {
  return useSuspenseQuery({
    queryKey: ["AttractionsByArea", params],
    queryFn: () => fetchAttractionsByArea(params),
  });
}
