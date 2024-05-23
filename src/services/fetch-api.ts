// DB API 설정
const username = process.env.NEXT_PUBLIC_API_USERNAME;
const password = process.env.NEXT_PUBLIC_API_PASSWORD;

// 공통 API 요청 함수
export async function fetchFromApi(endpoint: string, params: Record<string, string | undefined>) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_API_BASE_URL;

  // undefined 값을 제거하고 URLSearchParams 생성
  const filteredParams: Record<string, string> = {};
  for (const key in params) {
    if (params[key] !== undefined) {
      filteredParams[key] = params[key]!;
    }
  }

  const urlParams = new URLSearchParams(filteredParams);
  const url = `${baseUrl}${endpoint}?${urlParams.toString()}`;

  const response = await fetch(url, {
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }
  
  return response.json();
}