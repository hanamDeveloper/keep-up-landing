'use client';
import { useEffect } from "react";

function getQueryString() {
  // Kakao가 간혹 fragment로 code를 주는 케이스도 방어
  if (typeof window === 'undefined') return '';
  const { search, hash } = window.location;
  if (search && search.includes('code=')) return search;
  if (hash && hash.includes('code=')) {
    // #code=... 형태 → ?code=...로 변환
    return '?' + hash.replace(/^#/, '');
  }
  return search || '';
}

export default function KakaoPage() {
  useEffect(() => {
    const qs = getQueryString();
    const ua = (typeof navigator !== 'undefined' ? navigator.userAgent : '').toLowerCase();
    const isAndroid = ua.includes('android');

    if (isAndroid) {
      // ✅ 1) Android: intent로 강제 오픈 + 실패 시 fallback
      const fallback = 'https://keep-up.me/download'; // 스토어/가이드 페이지 등
      const intentUrl =
        `intent://kakao${qs}` +
        `#Intent;scheme=keepup;` +
        `package=com.keepup.challengeapp;` +
        `S.browser_fallback_url=${encodeURIComponent(fallback)};` +
        `end`;

      // 첫 시도
      window.location.href = intentUrl;

      // 일부 인앱브라우저에서 첫 시도 무반응 → 짧은 지연 후 replace 재시도
      const t = setTimeout(() => {
        try {
          window.location.replace(intentUrl);
        } catch {}
      }, 600);

      return () => clearTimeout(t);
    } else {
      // ✅ 2) iOS: 스킴으로 즉시 이동
      const url = `keepup://kakao${qs}`;
      // iOS에선 replace만으로 충분하지만, 혹시 몰라 href → replace 순서로
      try { window.location.href = url; } catch {}
      const t = setTimeout(() => {
        try { window.location.replace(url); } catch {}
      }, 300);
      return () => clearTimeout(t);
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