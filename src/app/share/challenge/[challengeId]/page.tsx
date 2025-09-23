"use client";

import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { API } from "@/api/axios";

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
`;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px 48px;
`;

const Header = styled.div`
  text-align: center;
  margin: 16px 0 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #4b5563;
  margin: 0;
`;

const Card = styled.div`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  padding: 20px;
  margin-bottom: 16px;
`;

const CongratsCard = styled(Card)`
  background: #ecfdf5;
  border-color: #d1fae5;
`;

const CongratsIcon = styled.div`
  font-size: 48px;
  text-align: center;
`;

const CongratsTitle = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #059669;
  text-align: center;
  margin-top: 8px;
`;

const ChallengeName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-top: 4px;
`;

const SmallMuted = styled.div`
  font-size: 13px;
  color: #6b7280;
  text-align: center;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div<{ color?: string }>`
  font-size: 24px;
  font-weight: 800;
  color: ${(p) => p.color || "#4f46e5"};
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
  &:first-of-type { border-top: 0; }
`;

const RowLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const RowValue = styled.div`
  font-size: 14px;
  color: #111827;
  font-weight: 600;
`;

const Actions = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.a<{ variant?: "primary" | "secondary" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.15s ease; 
  border: 1px solid transparent;
  cursor: pointer;

  ${(p) =>
    p.variant === "secondary"
      ? `background: white; color: #111827; border-color: rgba(0,0,0,0.08);`
      : `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;`}

  &:hover { transform: translateY(-1px); }
`;

const Footer = styled.div`
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 16px;
`;

interface SuccessChallengeDetail {
  id: number;
  title: string;
  categoryType?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  totalDate?: number;
  totalPrice?: number;
  attainmentPercent?: number;
  userCount?: number;
  currentUserCount?: number;
}

interface ApiResponse<T> {
  result: boolean;
  code: number;
  data: T;
  message: string;
}

export default function ShareChallengePage() {
  const params = useParams<{ challengeId: string }>();
  const search = useSearchParams();
  const router = useRouter();

  const challengeId = params.challengeId;
  const entryId = search.get("entryId");
  const joinUrl = search.get("joinUrl");
  const prizeUrl = search.get("prizeUrl");

  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState<SuccessChallengeDetail | null>(null);

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
      if (!challengeId) return;
      try {
        // 1) entryId가 있으면 완료 상세 우선 조회 (백엔드 엔드포인트는 교체 가능)
        if (entryId) {
          const res = await API.get<ApiResponse<SuccessChallengeDetail>>(
            `/challenge/success/${challengeId}`
          );
          if (res.data?.data) setDetail(res.data.data);
        } else {
          // 2) fallback - 관리자 상세를 활용해 기본 정보 표시
          const res = await API.get<ApiResponse<any>>(`/admin/challenge/${challengeId}`);
          if (res.data?.data) {
            const c = res.data.data;
            setDetail({
              id: c.id,
              title: c.title,
              categoryType: c.categoryType,
              price: c.price,
              endDate: c.endDate,
            });
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [challengeId, entryId]);

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const title = `챌린지 완주 인증 - ${detail?.title ?? "KeepUp"}`;
    const text = `저는 챌린지 '${detail?.title ?? ""}'를 완주했어요! 함께 도전해요!`;

    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title, text, url: shareUrl });
      } catch {}
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("공유 링크가 클립보드에 복사되었습니다.");
      } catch {}
    }
  };

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

  if (!detail) {
    return (
      <Page>
        <Container>
          <Header>
            <Title>결과를 찾을 수 없어요</Title>
            <Subtitle>공유 가능한 챌린지 결과가 없습니다.</Subtitle>
          </Header>
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
          <SectionTitle>📊 완주 통계</SectionTitle>
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
              <StatNumber color="#059669">{completionRate}%</StatNumber>
              <StatLabel>달성률</StatLabel>
            </StatItem>
          </StatsGrid>
          <StatsGrid style={{ marginTop: 12 }}>
            <StatItem>
              <StatNumber>{userCount}</StatNumber>
              <StatLabel>참가한 인원</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{currentUserCount}</StatNumber>
              <StatLabel>완주 인원</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber color="#059669">{completionRate}%</StatNumber>
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
            <RowValue>{new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(reward)}</RowValue>
          </Row>
        </Card>

        <Card>
          <SectionTitle>📋 챌린지 정보</SectionTitle>
          <Row>
            <RowLabel>카테고리</RowLabel>
            <RowValue>{detail.categoryType ?? "-"}</RowValue>
          </Row>
          <Row>
            <RowLabel>참가비</RowLabel>
            <RowValue>{new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(detail.price ?? 0)}</RowValue>
          </Row>
          <Row>
            <RowLabel>기간</RowLabel>
            <RowValue>
              {detail.startDate ? new Date(detail.startDate).toLocaleDateString("ko-KR") : "시작일 정보 없음"} - {detail.endDate ? new Date(detail.endDate).toLocaleDateString("ko-KR") : "종료일 정보 없음"}
            </RowValue>
          </Row>
        </Card>

        <Actions>
          <Button onClick={handleShare as any}>📤 결과 공유하기</Button>
          <Button href="/challenge" variant="secondary">🔄 비슷한 챌린지 다시 도전</Button>
          {joinUrl && (
            <Button href={joinUrl} target="_blank" rel="noopener noreferrer">🚀 챌린지 참여하고 상금받기</Button>
          )}
          {prizeUrl && (
            <Button href={prizeUrl} target="_blank" rel="noopener noreferrer" variant="secondary">💰 상금 확인하러 가기</Button>
          )}
        </Actions>

        <Footer>
          공유 전용 페이지 · KeepUp
        </Footer>
      </Container>
    </Page>
  );
}
