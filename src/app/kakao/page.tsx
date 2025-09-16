'use client'
import { useEffect } from "react";

export default function KakaoPage() {
  useEffect(() => {
    // 현재 URL의 쿼리스트링 (?code=...&state=...)
    const qs = window.location.search || "";
    // 앱 스킴으로 붙여서 리다이렉트
    const target = "keepup://kakao" + qs;

    // 앱으로 이동 시도
    window.location.replace(target);
  }, []);

  return <div style={{ color: "white", background: "#0f0f23", height: "100vh" }}>KakaoPage</div>;
}
