import { fetchFromAuthApi } from "@/services/fetch-api";

// 리뷰 신고
export async function reportReview(commentId: Number) {
  return await fetchFromAuthApi(`/api/reports/${commentId}`, commentId, "POST");
}

// 신고 리뷰 조회
export async function checkReports() {
  return await fetchFromAuthApi(`/api/reports`, null, "GET");
}
