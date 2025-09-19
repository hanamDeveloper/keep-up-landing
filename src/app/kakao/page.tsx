'use client'
import { useEffect } from "react";

export default function KakaoPage() {
  useEffect(() => {
    const qs = window.location.search || "";
    const target = "keepup://kakao" + qs;

    // 1) 약간의 지연 후 커스텀 스킴 시도
    const t1 = setTimeout(() => {
      window.location.href = target; // href 먼저
    }, 50);

    // 2) 혹시 막히면 replace 재시도
    const t2 = setTimeout(() => {
      window.location.replace(target);
    }, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div style={{ color: "white", background: "#0f0f23", height: "100vh" }}>
      KakaoPage
    </div>
  );
}
