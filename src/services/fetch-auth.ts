import { fetchFromAuthApi } from "@/services/fetch-api";

// 로그인 API 요청 함수
export async function loginApi(data: { email: string; password: string }) {
  const url = "/api/loginForm";
  return fetchFromAuthApi(url, data);
}

// 회원가입 API 요청 함수
export async function registerApi(data: { email: string; password: string }) {
  const url = "/api/signup/request";
  return fetchFromAuthApi(url, data, "POST");
}
// 회원가입 API 최종(이메일 인증) 요청
export async function registerVerificationApi(data: {
  email: string;
  password: string;
  verificationCode: string;
}) {
  const url = "/api/signup/verify";
  return fetchFromAuthApi(url, data, "POST");
}

// 회원 탈퇴 요청
export async function deleteAccountApi(password: string) {
  const url = "/api/deleteAccount";
  return fetchFromAuthApi(url, { password }, "DELETE");
}

// 비밀번호 찾기 요청(인증 번호 요청)
export async function findPasswordVeriApi(data: { email: string }) {
  const url = "/api/password/reset-request/email";
  return fetchFromAuthApi(url, data, "POST");
}

// 비밀번호 최종 찾기->변경 요청
export async function findPasswordApi(data: {
  email: string;
  newPassword: string;
  verificationCode: string;
}) {
  const url = "/api/password/reset";
  return fetchFromAuthApi(url, data, "POST");
}

// 마이페이지 비밀번호 변경
export async function changePasswordApi(
  currentPassword: string,
  newPassword: string
) {
  return await fetchFromAuthApi(
    "/api/password/changePassword",
    { currentPassword, newPassword },
    "PUT"
  );
}
