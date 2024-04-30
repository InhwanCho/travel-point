import { FetchTouristAttractionsByAreaParams } from "@/types/att-area-types";

export async function fetchAttractionsByArea(
  params: FetchTouristAttractionsByAreaParams
) {
  const {
    areaCode,
    sigunguCode,
    contentTypeId,
    cat1,
    cat2,
    cat3,
    pageNo = 1,
    numOfRows = 5,
  } = params;

  const serviceKey = process.env.NEXT_PUBLIC_DATA_API_KEY;

  const url =
    `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${serviceKey}` +
    `&numOfRows=${numOfRows ? numOfRows : ""}` +
    `&pageNo=${pageNo ? pageNo : ""}` +
    `&MobileOS=ETC` +
    `&MobileApp=AppTest` +
    `&_type=json` +
    `&listYN=Y` +
    `&arrange=A` +
    `&contentTypeId=${contentTypeId ? contentTypeId : ""}` +
    `&areaCode=${areaCode ? areaCode : ""}` +
    `&sigunguCode=${sigunguCode ? sigunguCode : ""}` +
    `${cat1 ? "&cat1=" + cat1 : ""}` +
    `${cat2 ? "&cat2=" + cat2 : ""}` +
    `${cat3 ? "&cat3=" + cat3 : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("API call failed with status: " + response.status);
  }
  return response.json();
}
