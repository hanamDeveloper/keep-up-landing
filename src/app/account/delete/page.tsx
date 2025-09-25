"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { colors, spacing, borderRadius, typography } from "@/styles/tokens";

const Page = styled.div`
  min-height: 100vh;
  background: ${colors.background};
  color: ${colors.text};
  padding: ${spacing.lg}px;
`;

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding-top: ${spacing.xl}px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xl}px;
`;

const Title = styled.h1`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  line-height: ${typography.h2.lineHeight}px;
  color: ${colors.text};
  margin: 0 0 ${spacing.md}px 0;
`;

const Subtitle = styled.p`
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.textSecondary};
  margin: 0;
`;

const Card = styled.div`
  background: ${colors.card};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.xl}px;
  margin-bottom: ${spacing.lg}px;
`;

const WarningBox = styled.div`
  background: ${colors.error}15;
  border: 1px solid ${colors.error}40;
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.md}px;
  margin-bottom: ${spacing.lg}px;
`;

const WarningTitle = styled.div`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.error};
  margin-bottom: ${spacing.sm}px;
`;

const WarningList = styled.ul`
  font-size: ${typography.caption.fontSize}px;
  line-height: ${typography.caption.lineHeight}px;
  color: ${colors.text};
  margin: 0;
  padding-left: ${spacing.md}px;
`;

const WarningItem = styled.li`
  margin-bottom: ${spacing.xs}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  width: 100%;
  padding: ${spacing.md}px;
  border-radius: ${borderRadius.md}px;
  border: 1px solid transparent;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: ${spacing.sm}px;

  ${(p) =>
    p.variant === "secondary"
      ? `
        background: ${colors.surface};
        color: ${colors.text};
        border-color: ${colors.border};
        
        &:hover {
          background: ${colors.surfaceVariant};
        }
      `
      : `
        background: ${colors.error};
        color: ${colors.text};
        
        &:hover {
          background: #dc2626;
        }
        
        &:disabled {
          background: ${colors.textTertiary};
          cursor: not-allowed;
        }
      `}
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${spacing.sm}px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: ${colors.error}15;
  border: 1px solid ${colors.error}40;
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.md}px;
  color: ${colors.error};
  font-size: ${typography.caption.fontSize}px;
  text-align: center;
  margin-bottom: ${spacing.md}px;
`;

const SuccessMessage = styled.div`
  background: ${colors.success}15;
  border: 1px solid ${colors.success}40;
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.md}px;
  color: ${colors.success};
  font-size: ${typography.caption.fontSize}px;
  text-align: center;
  margin-bottom: ${spacing.md}px;
`;

export default function AccountDeletionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // 컴포넌트 마운트 시 해시에서 토큰 추출
  useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#token=")) {
        const extractedToken = hash.substring(7); // "#token=" 제거
        setToken(extractedToken);
      }
    }
  });

  // WebView에서 메시지를 받기 위한 함수
  const sendMessageToApp = (type: string, data?: any) => {
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type, ...data }));
    }
  };

  // 계정 삭제 API 호출
  const handleDeleteAccount = async () => {
    if (!token) {
      setError("인증 토큰이 없습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/account/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        sendMessageToApp("DELETE_OK");
        
        // 2초 후 앱으로 성공 메시지 전송
        setTimeout(() => {
          sendMessageToApp("DELETE_OK");
        }, 2000);
      } else {
        const errorMessage = result.message || "계정 삭제에 실패했습니다.";
        setError(errorMessage);
        sendMessageToApp("DELETE_FAIL", { reason: errorMessage });
      }
    } catch {
      const errorMessage = "네트워크 오류가 발생했습니다.";
      setError(errorMessage);
      sendMessageToApp("DELETE_FAIL", { reason: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // 취소 버튼 클릭
  const handleCancel = () => {
    sendMessageToApp("DELETE_CANCEL");
  };

  // 토큰이 없으면 에러 표시
  if (!token) {
    return (
      <Page>
        <Container>
          <ErrorMessage>
            인증 토큰이 없습니다. 앱에서 다시 시도해주세요.
          </ErrorMessage>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container>
        <Header>
          <Title>계정 삭제</Title>
          <Subtitle>정말로 계정을 삭제하시겠습니까?</Subtitle>
        </Header>

        <Card>
          <WarningBox>
            <WarningTitle>⚠️ 계정 삭제 시 주의사항</WarningTitle>
            <WarningList>
              <WarningItem>모든 개인정보가 즉시 삭제됩니다</WarningItem>
              <WarningItem>참여 중인 챌린지는 자동으로 탈락 처리됩니다</WarningItem>
              <WarningItem>진행 중인 챌린지 환불은 불가능합니다</WarningItem>
              <WarningItem>삭제된 계정은 복구할 수 없습니다</WarningItem>
            </WarningList>
          </WarningBox>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessMessage>
              계정이 성공적으로 삭제되었습니다. 잠시 후 자동으로 로그아웃됩니다.
            </SuccessMessage>
          )}

          {!success && (
            <>
              <Button
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                {isLoading && <LoadingSpinner />}
                {isLoading ? "삭제 중..." : "계정 삭제하기"}
              </Button>
              
              <Button variant="secondary" onClick={handleCancel}>
                취소
              </Button>
            </>
          )}
        </Card>
      </Container>
    </Page>
  );
}

// WebView에서 사용할 수 있도록 window 객체에 타입 추가
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
