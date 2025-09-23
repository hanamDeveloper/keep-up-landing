'use client';
import { useEffect } from "react";

export default function KakaoPage() {
  useEffect(() => {
    const qs = window.location.search || "";
    // 타이머 없이 즉시 넘기기
    window.location.replace(`keepup://kakao${qs}`);
  }, []);

  return (
    <div style={{ color: "white", background: "#0f0f23", height: "100vh",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
      Kakao 로그인 연결 중...
    </div>
  );
}
