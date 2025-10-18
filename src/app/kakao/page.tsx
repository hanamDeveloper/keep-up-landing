'use client';
import { useEffect } from "react";

export default function KakaoPage() {
  useEffect(() => {
    const qs = window.location.search || "";
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.includes("android");

    if (isAndroid) {
      const intentUrl =
        `intent://kakao${qs}` +
        `#Intent;scheme=keepup;package=com.keepup.challengeapp;end`;
      window.location.replace(intentUrl);
    } else {
      window.location.replace(`keepup://kakao${qs}`);
    }
  }, []);

  return (
    <div style={{
      color: "#fff", background: "#0f0f23", height: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      KeepUp 로그인 중...
    </div>
  );
}