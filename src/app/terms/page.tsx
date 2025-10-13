"use client";

import styled from "@emotion/styled";
import { colors, spacing, borderRadius, typography } from "@/styles/tokens";

// 설정값 - 실제 값으로 교체 필요
const CONFIG = {
  companyName: "KeepUp",
  effectiveDate: "2025-01-01",
  lastUpdated: "2025-01-15",
  website: "https://keepup.com",
};

const Page = styled.div`
  min-height: 100vh;
  background: ${colors.background};
  color: ${colors.text};
`;

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: ${spacing.lg}px ${spacing.md}px;

  @media (min-width: 768px) {
    padding: ${spacing.xl}px ${spacing.lg}px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xl}px;
  padding-bottom: ${spacing.lg}px;
  border-bottom: 1px solid ${colors.border};
`;

const MainTitle = styled.h1`
  font-size: ${typography.h1.fontSize}px;
  font-weight: ${typography.h1.fontWeight};
  line-height: ${typography.h1.lineHeight}px;
  color: ${colors.text};
  margin: 0 0 ${spacing.md}px 0;
`;

const LastUpdatedBadge = styled.div`
  display: inline-block;
  background: ${colors.primary}20;
  color: ${colors.primary};
  padding: ${spacing.xs}px ${spacing.sm}px;
  border-radius: ${borderRadius.sm}px;
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  margin-bottom: ${spacing.md}px;
`;

const Intro = styled.div`
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.textSecondary};
  text-align: center;
`;

const ContentCard = styled.div`
  background: ${colors.card};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.xl}px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const Section = styled.section`
  margin-bottom: ${spacing.xl}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  line-height: ${typography.h2.lineHeight}px;
  color: ${colors.text};
  margin: 0 0 ${spacing.lg}px 0;
  padding-top: ${spacing.lg}px;
  border-top: 2px solid ${colors.border};

  &:first-of-type {
    border-top: none;
    padding-top: 0;
  }
`;

const Paragraph = styled.p`
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.text};
  margin: 0 0 ${spacing.md}px 0;
`;

const List = styled.ul`
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.text};
  margin: 0 0 ${spacing.md}px 0;
  padding-left: ${spacing.lg}px;
`;

const ListItem = styled.li`
  margin-bottom: ${spacing.xs}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const HighlightBox = styled.div`
  background: ${colors.warning}15;
  border: 1px solid ${colors.warning}40;
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.md}px;
  margin: ${spacing.md}px 0;
  font-size: ${typography.caption.fontSize}px;
  line-height: ${typography.caption.lineHeight}px;
  color: ${colors.text};
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${spacing.xl}px 0;
  border-top: 1px solid ${colors.border};
  margin-top: ${spacing.xl}px;
  font-size: ${typography.small.fontSize}px;
  color: ${colors.textSecondary};
`;

const Link = styled.a`
  color: ${colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function TermsPage() {
  return (
    <Page>
      <Container>
        <Header>
          <MainTitle>이용약관</MainTitle>
          <LastUpdatedBadge>
            최종 업데이트 {CONFIG.lastUpdated}
          </LastUpdatedBadge>
          <Intro>
            {CONFIG.companyName} 서비스 이용약관 (직접 정산 구조 반영 최종본)
          </Intro>
        </Header>

        <ContentCard>
          <Section>
            <SectionTitle>제1조 (목적)</SectionTitle>
            <Paragraph>
              본 약관은 {CONFIG.companyName}(이하 "회사")이 제공하는 습관 형성
              챌린지 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의
              권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제2조 (정의)</SectionTitle>
            <Paragraph>
              이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            </Paragraph>
            <List>
              <ListItem>
                <strong>서비스</strong>: 회사가 제공하는 습관 형성을 위한 챌린지
                플랫폼.
              </ListItem>
              <ListItem>
                <strong>이용자</strong>: 서비스에 접속하여 이 약관에 따라
                서비스를 이용하는 회원 및 비회원.
              </ListItem>
              <ListItem>
                <strong>회원</strong>: 개인정보를 제공하여 회원가입을 한 자로서,
                지속적으로 서비스를 이용할 수 있는 자.
              </ListItem>
              <ListItem>
                <strong>챌린지</strong>: 이용자가 일정 참가비를 납부하고 특정
                목표를 달성하기 위해 참여하는 기간제 활동.
              </ListItem>
              <ListItem>
                <strong>참가비</strong>: 챌린지 참여를 위해 회사가 지정한
                방법(계좌이체 등)을 통해 납부하는 금액.
              </ListItem>
              <ListItem>
                <strong>상금</strong>: 챌린지 완주자에게 회사가 직접
                정산·지급하는 금액.
              </ListItem>
              <ListItem>
                <strong>인증 자료</strong>: 회원이 챌린지 참여를 증명하기 위하여
                제출하는 사진, 영상, 텍스트 등의 정보.
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제3조 (약관의 효력 및 변경)</SectionTitle>
            <List>
              <ListItem>
                본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써
                효력이 발생합니다.
              </ListItem>
              <ListItem>
                회사는 합리적인 사유가 있는 경우 관계 법령을 위반하지 않는
                범위에서 약관을 변경할 수 있습니다.
              </ListItem>
              <ListItem>
                약관이 변경되는 경우, 회사는 변경된 내용과 시행일을 명시하여
                최소 7일 전부터 공지합니다.
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제4조 (서비스의 제공 및 변경)</SectionTitle>
            <Paragraph>회사는 다음과 같은 서비스를 제공합니다.</Paragraph>
            <List>
              <ListItem>습관 형성을 위한 챌린지 플랫폼 제공</ListItem>
              <ListItem>챌린지 참가 및 인증 시스템 운영</ListItem>
              <ListItem>참가비 정산 및 상금 지급 서비스</ListItem>
              <ListItem>기타 회사가 정하는 부가 서비스</ListItem>
            </List>
            <Paragraph>
              회사는 서비스의 기술적 사양 변경 등 불가피한 사유가 있는 경우 제공
              내용을 변경할 수 있으며, 사전 공지합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제5조 (참가비 납부 및 환불)</SectionTitle>
            <List>
              <ListItem>
                참가비는 회사가 지정한 계좌로 직접 이체하는 방식 등 회사가
                정하는 방법에 따라 납부합니다.
              </ListItem>
              <ListItem>
                참가비는 결제(입금) 완료 시 납부된 것으로 간주됩니다.
              </ListItem>
              <ListItem>
                챌린지 시작 전까지는 참가비 전액 환불이 가능합니다.
              </ListItem>
            </List>

            <Paragraph>
              챌린지 시작 이후에는 원칙적으로 환불이 불가합니다. 다만, 다음의
              경우 예외적으로 환불이 가능합니다.
            </Paragraph>
            <List>
              <ListItem>회사의 귀책사유로 서비스가 중단된 경우</ListItem>
              <ListItem>법령에 따라 환불 의무가 발생하는 경우</ListItem>
              <ListItem>기타 회사가 인정하는 특별한 사유가 있는 경우</ListItem>
            </List>

            <HighlightBox>
              환불은 회원이 지정한 계좌로 송금되며, 처리 절차 및 기간은 회사의
              환불 정책에 따릅니다.
            </HighlightBox>
            <HighlightBox>
              참가비는 서비스 이용료의 성격을 가지며, 상금 지급 여부와 무관하게
              환급 의무가 없습니다.
            </HighlightBox>
          </Section>

          <Section>
            <SectionTitle>제6조 (상금 지급)</SectionTitle>
            <List>
              <ListItem>
                챌린지 종료 후 완주자로 판정된 회원에게는 상금이 지급됩니다.
              </ListItem>
              <ListItem>
                상금은 회사가 직접 회원이 등록한 계좌로 송금하며, 지급
                시점·방식·분배 기준은 서비스 운영 정책에 따릅니다.
              </ListItem>
              <ListItem>
                상금은 회사가 운영 정책에 따라 산정하며, 참가자 수 및 챌린지
                조건에 따라 회사가 정한 기준에 의해 지급됩니다.
              </ListItem>
              <ListItem>
                회원이 잘못된 계좌정보를 입력하여 발생한 불이익에 대해 회사는
                책임지지 않습니다.
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제7조 (이용자의 의무)</SectionTitle>
            <Paragraph>이용자는 다음 행위를 하여서는 안 됩니다.</Paragraph>
            <List>
              <ListItem>
                타인의 개인정보를 도용하거나 부정하게 사용하는 행위
              </ListItem>
              <ListItem>챌린지 인증 시 허위의 자료를 제출하는 행위</ListItem>
              <ListItem>서비스의 안정적 운영을 방해하는 행위</ListItem>
              <ListItem>
                회사 또는 제3자의 지식재산권, 초상권 등 권리를 침해하는 행위
              </ListItem>
              <ListItem>
                범죄와 결부되거나 공공질서 및 미풍양속에 반하는 행위
              </ListItem>
              <ListItem>기타 관련 법령을 위반하는 행위</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제8조 (회사의 의무)</SectionTitle>
            <List>
              <ListItem>
                회사는 관련 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를
                하지 않으며, 지속적이고 안정적인 서비스를 제공하기 위해 최선을
                다합니다.
              </ListItem>
              <ListItem>
                회사는 이용자의 개인정보를 보호하기 위하여 「개인정보 보호법」
                등 관계 법령을 준수하며, 별도의 개인정보 처리방침을 수립하여
                운영합니다.
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제9조 (개인정보 보호)</SectionTitle>
            <List>
              <ListItem>
                회사는 이용자의 개인정보를 관련 법령에 따라 안전하게 보호하며,
                개인정보 처리방침을 통해 상세 내용을 안내합니다.
              </ListItem>
              <ListItem>
                챌린지 인증 자료는 챌린지 종료 후 7일 이내 파기합니다. 단, 분쟁
                발생 시 최대 30일간 보관 후 파기할 수 있습니다.
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제10조 (서비스의 중단)</SectionTitle>
            <Paragraph>
              회사는 다음 각 호의 사유가 발생한 경우 서비스 제공을 일시적으로
              중단할 수 있습니다.
            </Paragraph>
            <List>
              <ListItem>설비 보수, 교체, 점검 등 불가피한 경우</ListItem>
              <ListItem>
                정전, 통신 장애, 천재지변 등 불가항력적 사유가 있는 경우
              </ListItem>
              <ListItem>
                기타 회사의 경영상 판단에 따라 서비스 중단이 필요하다고 인정되는
                경우
              </ListItem>
            </List>
            <Paragraph>
              이 경우 회사는 사전에 공지하며, 긴급한 경우 사후에 공지할 수
              있습니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제11조 (손해배상)</SectionTitle>
            <List>
              <ListItem>
                회사의 고의 또는 중대한 과실로 인하여 이용자에게 손해가 발생한
                경우 회사는 그 손해를 배상합니다.
              </ListItem>
              <ListItem>
                다만, 무료로 제공되는 서비스와 관련하여 발생한 손해에 대해서는
                회사의 고의 또는 중대한 과실이 없는 한 책임을 부담하지 않습니다.
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제12조 (청소년 보호)</SectionTitle>
            <Paragraph>
              회사는 만 14세 미만 아동의 회원가입을 제한하며, 부득이하게 수집이
              필요한 경우 법정대리인의 동의를 받아야 합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제13조 (준거법 및 관할법원)</SectionTitle>
            <List>
              <ListItem>본 약관은 대한민국 법령에 따릅니다.</ListItem>
              <ListItem>
                서비스 이용과 관련하여 분쟁이 발생하는 경우, 회사 본사 소재지를
                관할하는 법원을 전속 관할 법원으로 합니다.
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>부칙</SectionTitle>
            <List>
              <ListItem>
                본 약관은 {CONFIG.effectiveDate}부터 시행합니다.
              </ListItem>
              <ListItem>
                회사는 본 약관을 개정할 경우 개정 사유와 시행일을 명시하여 최소
                7일 전 공지합니다.
              </ListItem>
            </List>
          </Section>
        </ContentCard>

        <Footer>
          <div>시행일: {CONFIG.effectiveDate}</div>
          <div>최종 업데이트: {CONFIG.lastUpdated}</div>
          <div style={{ marginTop: spacing.sm }}>
            <Link href={CONFIG.website} target="_blank" rel="noopener">
              {CONFIG.website}
            </Link>
          </div>
        </Footer>
      </Container>
    </Page>
  );
}
