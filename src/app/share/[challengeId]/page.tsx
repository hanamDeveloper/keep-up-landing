"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// 스타일드 컴포넌트 정의
const Page = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  text-align: center;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px 20px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const Logo = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 30px;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Loading = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s ease-in-out infinite;
`;

const Fallback = styled.div<{ show: boolean }>`
  display: ${props => props.show ? 'block' : 'none'};
`;

const StoreButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  margin: 10px;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// 딥링크 훅
const useDeepLink = (challengeId: string) => {
  const [appOpened, setAppOpened] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  const deepLink = `keepup://challenge/${challengeId}`;
  const appStoreUrl = 'https://apps.apple.com/app/id6751836138';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.keepup.challengeapp';

  const redirectToApp = () => {
    console.log('딥링크 시도:', deepLink);
    
    // 딥링크 시도
    window.location.href = deepLink;
    
    // 페이지가 숨겨지면 앱이 열린 것으로 간주
    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        setAppOpened(true);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // 2초 후 앱이 열리지 않았으면 스토어로 이동
    setTimeout(() => {
      if (!appOpened) {
        console.log('앱이 열리지 않음, 스토어로 이동');
        setShowFallback(true);
      }
    }, 2000);
  };

  const getStoreUrl = () => {
    if (isIOS) return appStoreUrl;
    if (isAndroid) return playStoreUrl;
    return playStoreUrl; // 기본값
  };

  const getStoreButtonText = () => {
    if (isIOS) return 'App Store에서 다운로드';
    if (isAndroid) return 'Google Play에서 다운로드';
    return '앱 다운로드';
  };

  return {
    redirectToApp,
    showFallback,
    storeUrl: getStoreUrl(),
    storeButtonText: getStoreButtonText(),
  };
};

export default function ChallengeDeepLinkPage() {
  const params = useParams<{ challengeId: string }>();
  const challengeId = params.challengeId || '';
  
  const { redirectToApp, showFallback, storeUrl, storeButtonText } = useDeepLink(challengeId);

  useEffect(() => {
    // 페이지 로드 시 즉시 실행
    redirectToApp();
  }, [redirectToApp]);

  return (
    <Page>
      <Container>
        <Logo>🎯</Logo>
        <Title>KeepUp 챌린지</Title>
        <Description>
          {showFallback ? '앱이 설치되어 있지 않습니다.' : '앱으로 이동 중입니다...'}
        </Description>
        
        {!showFallback && <Loading />}
        
        <Fallback show={showFallback}>
          <p>아래 버튼을 눌러 앱을 다운로드하세요!</p>
          <StoreButton href={storeUrl} target="_blank" rel="noopener noreferrer">
            {storeButtonText}
          </StoreButton>
        </Fallback>
      </Container>
    </Page>
  );
}
