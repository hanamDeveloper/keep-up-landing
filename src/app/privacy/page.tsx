"use client";

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { colors, spacing, borderRadius, typography } from "@/styles/tokens";

// 설정값 - 실제 값으로 교체 필요
const CONFIG = {
  companyName: "KeepUp",
  cpoName: "김영섭",
  cpoEmail: "jobroapp@gmail.com",
  cpoPhone: "010-9613-8868",
  companyAddress: "서울특별시 강남구 테헤란로 123",
  lastUpdated: "2025-01-15",
  effectiveDate: "2025-01-01",
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${spacing.md}px 0;
  font-size: ${typography.caption.fontSize}px;
  line-height: ${typography.caption.lineHeight}px;
  
  @media (max-width: 768px) {
    font-size: ${typography.small.fontSize}px;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const TableHeader = styled.th`
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  padding: ${spacing.sm}px;
  text-align: left;
  font-weight: ${typography.captionBold.fontWeight};
  color: ${colors.text};
`;

const TableCell = styled.td`
  border: 1px solid ${colors.border};
  padding: ${spacing.sm}px;
  color: ${colors.text};
  vertical-align: top;
`;

const Note = styled.div`
  background: ${colors.info}15;
  border: 1px solid ${colors.info}40;
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.md}px;
  margin: ${spacing.md}px 0;
  font-size: ${typography.caption.fontSize}px;
  line-height: ${typography.caption.lineHeight}px;
  color: ${colors.text};
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

const Link = styled.a`
  color: ${colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${spacing.xl}px 0;
  border-top: 1px solid ${colors.border};
  margin-top: ${spacing.xl}px;
  font-size: ${typography.small.fontSize}px;
  color: ${colors.textSecondary};
`;

export default function PrivacyPolicyPage() {
  return (
    <Page>
      <Container>
        <Header>
          <MainTitle>개인정보 처리방침</MainTitle>
          <LastUpdatedBadge>최종 업데이트 {CONFIG.lastUpdated}</LastUpdatedBadge>
          <Intro>
            {CONFIG.companyName}(이하 "회사")은 「개인정보 보호법」 및 관련 법령을 준수하며, 이용자의 개인정보를 소중히 보호하기 위하여 
            다음과 같이 개인정보 처리방침을 수립·공개합니다. 본 방침은 회사가 제공하는 챌린지 서비스(이하 "서비스") 이용과 관련하여 
            수집·이용·보관·파기되는 개인정보에 적용됩니다.
          </Intro>
        </Header>

        <ContentCard>
          <Section>
            <SectionTitle>제1조 (수집하는 개인정보 항목 및 방법)</SectionTitle>
            <Paragraph>회사는 회원가입, 서비스 제공, 고객 상담 등을 위하여 아래와 같은 개인정보를 수집합니다.</Paragraph>
            
            <SubSectionTitle>회원가입 및 로그인 시</SubSectionTitle>
            <List>
              <ListItem><strong>수집항목</strong>: 이름(또는 닉네임), 이메일, 소셜 로그인 식별자(애플, 카카오)</ListItem>
              <ListItem><strong>선택항목</strong>: 프로필 이미지</ListItem>
            </List>

            <SubSectionTitle>서비스 이용 과정에서 자동 수집되는 정보</SubSectionTitle>
            <List>
              <ListItem>접속 로그(IP, 기기정보, 브라우저/OS 정보, 접속 시간 등)</ListItem>
              <ListItem>서비스 이용 기록(참가한 챌린지, 인증 기록 등)</ListItem>
            </List>

            <SubSectionTitle>상금 지급 및 정산 시</SubSectionTitle>
            <List>
              <ListItem>은행명, 계좌번호, 예금주명</ListItem>
            </List>

            <SubSectionTitle>고객 문의 및 지원 시</SubSectionTitle>
            <List>
              <ListItem>문의 내용, 연락처(이메일, 전화번호)</ListItem>
            </List>

            <HighlightBox>
              <strong>수집 방법:</strong><br />
              • 소셜 로그인 API (애플, 카카오)<br />
              • 이용자의 직접 입력<br />
              • 서비스 이용 과정에서 자동 수집
            </HighlightBox>
          </Section>

          <Section>
            <SectionTitle>제2조 (개인정보의 수집 및 이용 목적)</SectionTitle>
            <Paragraph>회사는 수집한 개인정보를 다음의 목적을 위해 사용합니다.</Paragraph>
            <List>
              <ListItem>회원 식별 및 서비스 제공</ListItem>
              <ListItem>챌린지 참가 관리 및 인증 심사</ListItem>
              <ListItem>참가비 납부 확인 및 상금 정산</ListItem>
              <ListItem>고객 문의 대응 및 서비스 알림 발송</ListItem>
              <ListItem>서비스 개선, 신규 서비스 개발, 통계 분석</ListItem>
              <ListItem>법령 준수 및 분쟁 해결</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제3조 (개인정보의 보유 및 이용 기간)</SectionTitle>
            <Paragraph>원칙적으로 개인정보는 수집·이용 목적 달성 시 지체 없이 파기합니다.</Paragraph>
            <Paragraph>다만, 법령에 따라 일정 기간 보관해야 하는 정보는 아래와 같습니다.</Paragraph>
            
            <Table>
              <thead>
                <tr>
                  <TableHeader>구분</TableHeader>
                  <TableHeader>보유기간</TableHeader>
                  <TableHeader>근거법령</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>결제·정산 기록</TableCell>
                  <TableCell>5년</TableCell>
                  <TableCell>전자상거래법</TableCell>
                </tr>
                <tr>
                  <TableCell>계약·청약철회 기록</TableCell>
                  <TableCell>5년</TableCell>
                  <TableCell>전자상거래법</TableCell>
                </tr>
                <tr>
                  <TableCell>소비자 불만·분쟁 처리 기록</TableCell>
                  <TableCell>3년</TableCell>
                  <TableCell>전자상거래법</TableCell>
                </tr>
                <tr>
                  <TableCell>접속 로그(IP 등)</TableCell>
                  <TableCell>3개월</TableCell>
                  <TableCell>통신비밀보호법</TableCell>
                </tr>
              </tbody>
            </Table>

            <Note>
              챌린지 인증 자료(사진·영상 등)는 챌린지 종료 후 7일 이내 파기합니다. 
              단, 분쟁 발생 시 최대 30일까지 보관할 수 있습니다.
            </Note>
          </Section>

          <Section>
            <SectionTitle>제4조 (개인정보의 제3자 제공)</SectionTitle>
            <Paragraph>회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.</Paragraph>
            <Paragraph>다만, 다음의 경우 예외적으로 제공할 수 있습니다.</Paragraph>
            <List>
              <ListItem>이용자가 사전에 동의한 경우</ListItem>
              <ListItem>법령에 의거 수사기관 등이 적법한 절차에 따라 요청하는 경우</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제5조 (개인정보 처리의 위탁)</SectionTitle>
            <Paragraph>회사는 안정적인 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁할 수 있습니다.</Paragraph>
            
            <Table>
              <thead>
                <tr>
                  <TableHeader>위탁받는 자</TableHeader>
                  <TableHeader>위탁업무 내용</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>Amazon Web Services (AWS)</TableCell>
                  <TableCell>클라우드 인프라 및 데이터 보관</TableCell>
                </tr>
                <tr>
                  <TableCell>Expo Notification, Firebase</TableCell>
                  <TableCell>푸시/알림 서비스</TableCell>
                </tr>
                <tr>
                  <TableCell>Gmail (Google)</TableCell>
                  <TableCell>이메일 발송</TableCell>
                </tr>
              </tbody>
            </Table>

            <Note>
              위탁 시, 개인정보 보호를 위해 법령이 요구하는 사항을 계약에 반영합니다.
            </Note>
          </Section>

          <Section>
            <SectionTitle>제6조 (개인정보의 파기 절차 및 방법)</SectionTitle>
            <Paragraph>회사는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 파기합니다.</Paragraph>
            <Paragraph>파기 절차 및 방법은 다음과 같습니다.</Paragraph>
            <List>
              <ListItem><strong>전자적 파일</strong>: 복구 불가능한 기술적 방법으로 삭제</ListItem>
              <ListItem><strong>종이 문서</strong>: 분쇄 또는 소각</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제7조 (이용자의 권리와 행사 방법)</SectionTitle>
            <List>
              <ListItem>이용자는 언제든지 자신의 개인정보를 열람·정정·삭제·처리정지를 요구할 수 있습니다.</ListItem>
              <ListItem>회원 탈퇴 시 계정 정보는 즉시 삭제되며, 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관 후 파기됩니다.</ListItem>
              <ListItem>권리 행사는 고객센터 또는 이메일(<Link href={`mailto:${CONFIG.cpoEmail}`}>{CONFIG.cpoEmail}</Link>)로 신청할 수 있습니다.</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제8조 (개인정보의 안전성 확보 조치)</SectionTitle>
            <Paragraph>회사는 이용자의 개인정보 보호를 위해 다음과 같은 조치를 취합니다.</Paragraph>
            <List>
              <ListItem><strong>관리적 조치</strong>: 개인정보 관리 규정 수립, 접근 권한 최소화</ListItem>
              <ListItem><strong>기술적 조치</strong>: SSL/TLS 암호화, 접근 제어, 비밀번호 단방향 암호화, JWT 토큰 만료 관리</ListItem>
              <ListItem><strong>물리적 조치</strong>: AWS 데이터센터 보안 정책 적용, 내부 단말기 보안 유지</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제9조 (개인정보 보호책임자)</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <TableHeader>구분</TableHeader>
                  <TableHeader>내용</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>성명</TableCell>
                  <TableCell>{CONFIG.cpoName}</TableCell>
                </tr>
                <tr>
                  <TableCell>직책</TableCell>
                  <TableCell>개인정보보호책임자 (CPO)</TableCell>
                </tr>
                <tr>
                  <TableCell>이메일</TableCell>
                  <TableCell><Link href={`mailto:${CONFIG.cpoEmail}`}>{CONFIG.cpoEmail}</Link></TableCell>
                </tr>
                <tr>
                  <TableCell>연락처</TableCell>
                  <TableCell><Link href={`tel:${CONFIG.cpoPhone}`}>{CONFIG.cpoPhone}</Link></TableCell>
                </tr>
              </tbody>
            </Table>
          </Section>

          <Section>
            <SectionTitle>제10조 (개인정보 처리방침 변경)</SectionTitle>
            <List>
              <ListItem>본 개인정보 처리방침은 법령 및 회사 정책 변경에 따라 개정될 수 있습니다.</ListItem>
              <ListItem>개정 시, 변경 내용과 시행일을 최소 7일 전 서비스 내 공지사항을 통해 고지합니다.</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>부칙</SectionTitle>
            <Paragraph>본 개인정보 처리방침은 {CONFIG.effectiveDate}부터 시행됩니다.</Paragraph>
          </Section>
        </ContentCard>

        <Footer>
          <div>시행일: {CONFIG.effectiveDate}</div>
          <div>최종 업데이트: {CONFIG.lastUpdated}</div>
          <div style={{ marginTop: spacing.sm }}>
            <Link href={CONFIG.website} target="_blank" rel="noopener">{CONFIG.website}</Link>
          </div>
        </Footer>
      </Container>
    </Page>
  );
}

const SubSectionTitle = styled.h3`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  line-height: ${typography.h3.lineHeight}px;
  color: ${colors.text};
  margin: ${spacing.lg}px 0 ${spacing.md}px 0;
`;
