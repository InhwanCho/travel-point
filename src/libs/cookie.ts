export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  
  // 쿠키의 만료 시간을 설정합니다.
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  
  // 만료 시간을 UTC 문자열 형식으로 변환합니다.
  const expires = "expires=" + date.toUTCString();
  // 쿠키 이름, 값, 만료 시간, 그리고 경로를 지정하여 쿠키를 생성합니다.
  document.cookie = `${name}=${value};${expires};path=/`;
};
