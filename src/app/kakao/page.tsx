'use client';
import { useEffect } from "react";

export default function KakaoPage() {
  useEffect(() => {
    const qs = window.location.search || "";
    const target = "keepup://kakao" + qs;

    // 1) 앱 스킴 시도
    const t1 = setTimeout(() => {
      window.location.href = target;
    }, 500);

    // 2) 실패 시 강제 replace
    const t2 = setTimeout(() => {
      window.location.replace(target);
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div style={{ color: "white", background: "#0f0f23", height: "100vh",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
      Kakao 로그인 연결 중...
    </div>
  );
}
