export interface Attraction {
  firstimage?: string;     // 대표이미지(원본)
  firstimage2?: string;    // 대표이미지(썸네일)
  mapx: string;           // GPS X좌표
  mapy: string;           // GPS Y좌표
  mlevel: string;         // Map Level
  addr2?: string;         // 상세주소
  areacode: string;       // 지역코드
  modifiedtime: string;   // 수정일
  cpyrhtDivCd: string;    // 저작권 유형
  booktour: string;       // 교과서속여행지 여부
  cat1: string;           // 대분류
  sigungucode: string;    // 시군구코드
  tel: string;            // 전화번호
  title: string;          // 제목
  addr1: string;          // 주소
  cat2?: string;          // 중분류
  cat3?: string;          // 소분류
  contentid: string;      // 콘텐츠ID
  contenttypeid: string;  // 콘텐츠타입ID
  createdtime: string;    // 등록일
  zipcode?: string;       // 우편번호
}

export interface TouristAttractionsViewProps {
  params: FetchTouristAttractionsByAreaParams;
}

export interface FetchTouristAttractionsByAreaParams {
  areaCode: string;
  sigunguCode: string;
  contentTypeId?: string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  pageNo?: string;
  numOfRows?: string;
}