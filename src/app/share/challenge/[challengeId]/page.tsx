"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import {
  getSuccessChallengeDetail,
  SuccessChallengeDetail,
  SuccessChallengeDetailResponse,
} from "@/api/challenge";
import { colors, spacing, borderRadius, typography } from "@/styles/tokens";
import { categoryMapping } from "@/lib/static";

const Page = styled.div`
  min-height: 100vh;
  background: ${colors.background};
`;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: ${spacing.lg}px ${spacing.md}px ${spacing.xxl}px;
`;

const Header = styled.div`
  text-align: center;
  margin: ${spacing.md}px 0 ${spacing.lg}px;
`;

const Title = styled.h1`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  line-height: ${typography.h2.lineHeight}px;
  color: ${colors.text};
  margin: 0 0 ${spacing.sm}px 0;
`;

const Subtitle = styled.p`
  font-size: ${typography.body.fontSize}px;
  color: ${colors.textSecondary};
  margin: 0;
`;

const Card = styled.div`
  background: ${colors.card};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg}px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  padding: ${spacing.lg}px;
  margin-bottom: ${spacing.md}px;
`;

const CongratsCard = styled(Card)`
  background: ${colors.success}15;
  border-color: ${colors.success}40;
`;

const CongratsIcon = styled.div`
  font-size: 48px;
  text-align: center;
`;

const CongratsTitle = styled.div`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.success};
  text-align: center;
  margin-top: ${spacing.sm}px;
`;

const ChallengeName = styled.div`
  font-size: ${typography.h4.fontSize}px;
  font-weight: ${typography.h4.fontWeight};
  color: ${colors.text};
  text-align: center;
  margin-top: ${spacing.xs}px;
`;

const SmallMuted = styled.div`
  font-size: ${typography.caption.fontSize}px;
  color: ${colors.textTertiary};
  text-align: center;
`;

const SectionTitle = styled.div`
  font-size: ${typography.h4.fontSize}px;
  font-weight: ${typography.h4.fontWeight};
  color: ${colors.text};
  margin-bottom: ${spacing.md}px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.md}px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div<{ color?: string }>`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${(p) => p.color || colors.primary};
`;

const StatLabel = styled.div`
  font-size: ${typography.small.fontSize}px;
  color: ${colors.textSecondary};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.sm}px 0;
  border-top: 1px dashed ${colors.border};
  &:first-of-type {
    border-top: 0;
  }
`;

const RowLabel = styled.div`
  font-size: ${typography.caption.fontSize}px;
  color: ${colors.textSecondary};
`;

const RowValue = styled.div`
  font-size: ${typography.caption.fontSize}px;
  color: ${colors.text};
  font-weight: ${typography.captionBold.fontWeight};
`;

const Actions = styled.div`
  display: grid;
  gap: ${spacing.md}px;
  margin-top: ${spacing.md}px;
`;

const Button = styled.a<{ variant?: "primary" | "secondary" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  width: 100%;
  padding: ${spacing.md}px ${spacing.md}px;
  border-radius: ${borderRadius.md}px;
  text-decoration: none;
  font-weight: ${typography.bodyBold.fontWeight};
  transition: transform 0.15s ease;
  border: 1px solid transparent;
  cursor: pointer;

  ${(p) =>
    p.variant === "secondary"
      ? `background: ${colors.surface}; color: ${colors.text}; border-color: ${colors.border};`
      : `background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%); color: ${colors.text};`}

  &:hover {
    transform: translateY(-1px);
  }
`;

const StoreButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md}px;
  margin-bottom: ${spacing.md}px;
`;

const StoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  width: 100%;
  padding: ${spacing.md}px ${spacing.md}px;
  border-radius: ${borderRadius.md}px;
  text-decoration: none;
  font-weight: ${typography.captionBold.fontWeight};
  font-size: ${typography.caption.fontSize}px;
  transition: transform 0.15s ease;
  border: 1px solid ${colors.border};
  background: ${colors.surface};
  color: ${colors.text};

  &:hover {
    transform: translateY(-1px);
    background: ${colors.surfaceVariant};
  }
`;

const Footer = styled.div`
  text-align: center;
  font-size: ${typography.small.fontSize}px;
  color: ${colors.textTertiary};
  margin-top: ${spacing.md}px;
`;

const ErrorMessage = styled.div`
  background: ${colors.error}15;
  border: 1px solid ${colors.error}40;
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.md}px;
  color: ${colors.error};
  text-align: center;
  margin-bottom: ${spacing.md}px;
`;

interface ApiResponse<T> {
  result: boolean;
  code: number;
  data: T;
  message: string;
}

export default function ShareChallengePage() {
  const params = useParams<{ challengeId: string }>();
  const search = useSearchParams();

  const challengeId = params.challengeId;

  const joinUrl = search.get("joinUrl");
  const prizeUrl = search.get("prizeUrl");

  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState<SuccessChallengeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const completedDate = useMemo(() => {
    const date = detail?.endDate ? new Date(detail.endDate) : new Date();
    return date.toLocaleDateString("ko-KR");
  }, [detail?.endDate]);

  const completionRate = detail?.attainmentPercent ?? 100;
  const totalCheckins = detail?.totalDate ?? 0;
  const challengePeriod = detail?.totalDate ?? 0;
  const reward = detail?.totalPrice ?? 0;
  const userCount = detail?.userCount ?? 0;
  const currentUserCount = detail?.currentUserCount ?? 0;

  useEffect(() => {
    const fetchData = async () => {
      if (!challengeId) {
        setError("챌린지 ID가 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        let response;

        // 1) entryId가 있으면 완료 상세 우선 조회
        if (challengeId) {
          response = await getSuccessChallengeDetail(parseInt(challengeId));
        }

        if (response?.data) {
          const data = response.data as any;

          // 새로운 스키마에 맞게 데이터 매핑
          setDetail({
            attainmentDate: data.attainmentDate || 0,
            attainmentPercent: data.attainmentPercent || 100,
            categoryType: data.categoryType || "",
            endDate: data.endDate || "",
            id: data.id,
            price: data.price || 0,
            startDate: data.startDate || "",
            title: data.title,
            totalDate: data.totalDate || 0,
            totalPrice: data.totalPrice || 0,
            userCount: data.userCount || 0,
            currentUserCount: data.currentUserCount || 0,
          });
          setError(null);
        } else {
          console.log("No data found in response:", response);
          setError("챌린지 데이터를 찾을 수 없습니다.");
        }
      } catch (e) {
        console.error("API call failed:", e);
        setError(
          `데이터 로드 실패: ${
            e instanceof Error ? e.message : "알 수 없는 오류"
          }`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [challengeId]);

  if (isLoading) {
    return (
      <Page>
        <Container>
          <Header>
            <Title>로딩 중...</Title>
            <Subtitle>잠시만 기다려주세요.</Subtitle>
          </Header>
        </Container>
      </Page>
    );
  }

  // if (error) {
  //   return (
  //     <Page>
  //       <Container>
  //         <Header>
  //           <Title>오류 발생</Title>
  //           <Subtitle>{error}</Subtitle>
  //         </Header>
  //         <ErrorMessage>
  //           <div>챌린지 ID: {challengeId}</div>

  //           <div>
  //             브라우저:{" "}
  //             {typeof window !== "undefined" ? navigator.userAgent : "SSR"}
  //           </div>
  //         </ErrorMessage>
  //         <Actions>
  //           <StoreButtons>
  //             <StoreButton
  //               href="https://apps.apple.com/kr/app/keepup"
  //               target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               📱 App Store
  //             </StoreButton>
  //             <StoreButton
  //               href="https://play.google.com/store/apps/details?id=com.keepup"
  //               target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               🤖 Google Play
  //             </StoreButton>
  //           </StoreButtons>
  //         </Actions>
  //       </Container>
  //     </Page>
  //   );
  // }

  if (!detail) {
    return (
      <Page>
        <Container>
          <Header>
            <Title>결과를 찾을 수 없어요</Title>
            <Subtitle>공유 가능한 챌린지 결과가 없습니다.</Subtitle>
          </Header>
          <ErrorMessage>
            <div>챌린지 ID: {challengeId}</div>

            <div>상세 정보가 로드되지 않았습니다.</div>
          </ErrorMessage>
          <Actions>
            <StoreButtons>
              <StoreButton
                href="https://apps.apple.com/kr/app/keepup"
                target="_blank"
                rel="noopener noreferrer"
              >
                📱 App Store
              </StoreButton>
              <StoreButton
                href="https://play.google.com/store/apps/details?id=com.keepup"
                target="_blank"
                rel="noopener noreferrer"
              >
                🤖 Google Play
              </StoreButton>
            </StoreButtons>
          </Actions>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container>
        <Header>
          <Title>챌린지 완료</Title>
          <Subtitle>축하합니다! 챌린지를 성공적으로 완주했습니다</Subtitle>
        </Header>

        <CongratsCard>
          <CongratsIcon>🎉</CongratsIcon>
          <CongratsTitle>완주 축하합니다!</CongratsTitle>
          <ChallengeName>{detail.title}</ChallengeName>
          <SmallMuted>완료일: {completedDate}</SmallMuted>
        </CongratsCard>

        <Card>
          <SectionTitle>통계</SectionTitle>
          <StatsGrid>
            <StatItem>
              <StatNumber>{totalCheckins}</StatNumber>
              <StatLabel>완료한 일수</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{challengePeriod}</StatNumber>
              <StatLabel>전체 기간</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber color={colors.success}>{completionRate}%</StatNumber>
              <StatLabel>달성률</StatLabel>
            </StatItem>
          </StatsGrid>
          <StatsGrid style={{ marginTop: spacing.md }}>
            <StatItem>
              <StatNumber>{userCount}</StatNumber>
              <StatLabel>참가한 인원</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{currentUserCount}</StatNumber>
              <StatLabel>완주 인원</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber color={colors.success}>{completionRate}%</StatNumber>
              <StatLabel>완주율</StatLabel>
            </StatItem>
          </StatsGrid>
        </Card>

        <Card>
          <SectionTitle>🎁 상금 완료</SectionTitle>
          <Row>
            <RowLabel>입금 상태</RowLabel>
            <RowValue>완료</RowValue>
          </Row>
          <Row>
            <RowLabel>입금 금액</RowLabel>
            <RowValue>
              {new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
              }).format(reward)}
            </RowValue>
          </Row>
        </Card>

        <Card>
          <SectionTitle>📋 챌린지 정보</SectionTitle>
          <Row>
            <RowLabel>카테고리</RowLabel>
            <RowValue>{categoryMapping[detail.categoryType as keyof typeof categoryMapping] ?? "-"}</RowValue>
          </Row>
          <Row>
            <RowLabel>참가비</RowLabel>
            <RowValue>
              {new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
              }).format(detail.price ?? 0)}
            </RowValue>
          </Row>
          <Row>
            <RowLabel>기간</RowLabel>
            <RowValue>
              {detail.startDate
                ? new Date(detail.startDate).toLocaleDateString("ko-KR")
                : "시작일 정보 없음"}{" "}
              -{" "}
              {detail.endDate
                ? new Date(detail.endDate).toLocaleDateString("ko-KR")
                : "종료일 정보 없음"}
            </RowValue>
          </Row>
        </Card>

        <Actions>
          <StoreButtons>
            <StoreButton
              href="https://apps.apple.com/kr/app/keepup"
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 App Store
            </StoreButton>
            <StoreButton
              href="https://play.google.com/store/apps/details?id=com.keepup"
              target="_blank"
              rel="noopener noreferrer"
            >
              🤖 Google Play
            </StoreButton>
          </StoreButtons>

          {joinUrl && (
            <Button href={joinUrl} target="_blank" rel="noopener noreferrer">
              🚀 챌린지 참여하고 상금받기
            </Button>
          )}
          {prizeUrl && (
            <Button
              href={prizeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              💰 상금 확인하러 가기
            </Button>
          )}
        </Actions>

        <Footer>공유 전용 페이지 · KeepUp</Footer>
      </Container>
    </Page>
  );
}
