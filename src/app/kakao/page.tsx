'use client';
import { useEffect, useMemo } from 'react';

function getQS() {
  if (typeof window === 'undefined') return '';
  const { search, hash } = window.location;
  if (search && /code=/.test(search)) return search;
  if (hash && /code=/.test(hash)) return '?' + hash.replace(/^#/, '');
  return search || '';
}

export default function KakaoPage() {
  const qs = useMemo(getQS, []);
  useEffect(() => {
    const ua = (navigator.userAgent || '').toLowerCase();
    const isAndroid = ua.includes('android');

    if (isAndroid) {
      const fallback = 'https://keep-up.me/download';
      const intentUrl =
        `intent://kakao${qs}` +
        `#Intent;scheme=keepup;package=com.keepup.challengeapp;` +
        `S.browser_fallback_url=${encodeURIComponent(fallback)};end`;

      // 첫 시도
      window.location.href = intentUrl;

      // 무반응 방지 재시도
      const t = setTimeout(() => {
        try { window.location.replace(intentUrl); } catch {}
      }, 600);
      return () => clearTimeout(t);
    } else {
      const url = `keepup://kakao${qs}`;
      try { window.location.href = url; } catch {}
      const t = setTimeout(() => { try { window.location.replace(url); } catch {} }, 300);
      return () => clearTimeout(t);
    }
  }, [qs]);

  // 클릭 유도 버튼 (인앱브라우저에서 사용자 제스처 필요할 때)
  const manual = () => {
    const ua = (navigator.userAgent || '').toLowerCase();
    const isAndroid = ua.includes('android');
    if (isAndroid) {
      const fallback = 'https://keep-up.me/download';
      location.href =
        `intent://kakao${qs}#Intent;scheme=keepup;package=com.keepup.challengeapp;` +
        `S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
    } else {
      location.href = `keepup://kakao${qs}`;
    }
  };

  return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',background:'#0f0f23',color:'#fff'}}>
      <div>KeepUp 앱으로 이동 중...</div>
      <button onClick={manual} style={{marginTop:16,padding:'10px 16px',borderRadius:8}}>앱으로 돌아가기</button>
    </div>
  );
}