import { fetchFromAuthApi } from "@/services/fetch-api";

// 로그인 API 요청 함수
export async function loginApi(data: { email: string, password: string }) {
  const url = '/api/loginForm';
  return fetchFromAuthApi(url, data);
}

// 회원가입 API 요청 함수
export async function registerApi(data: { email: string, password: string }) {
  const url = '/api/signup/request';
  return fetchFromAuthApi(url, data);
}
// 회원가입 API 최종(이메일 인증) 요청
export async function registerVerificationApi(data: { email: string, password: string, verificationCode: string; }) {
  const url = '/api/signup/verify';
  return fetchFromAuthApi(url, data);
}