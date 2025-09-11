'use client';

import styled from '@emotion/styled';
import { colors, spacing, typography } from '@/styles';
import { appConfig as config } from '@/lib/config';
import { Mail, MessageCircle } from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${colors.surface};
  border-top: 1px solid ${colors.border};
  padding: ${spacing.xl}px ${spacing.lg}px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.xl}px;
  margin-bottom: ${spacing.xl}px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md}px;
`;

const FooterTitle = styled.h3`
  font-size: ${typography.h4.fontSize}px;
  font-weight: ${typography.h4.fontWeight};
  line-height: ${typography.h4.lineHeight}px;
  color: ${colors.text};
  margin: 0;
`;

const FooterText = styled.p`
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.textSecondary};
  margin: 0;
`;

const FooterLink = styled.a`
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.textSecondary};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${colors.primary};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
  font-size: ${typography.body.fontSize}px;
  color: ${colors.textSecondary};
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${colors.border};
  padding-top: ${spacing.lg}px;
  text-align: center;
`;

const Copyright = styled.p`
  font-size: ${typography.caption.fontSize}px;
  color: ${colors.textTertiary};
  margin: 0;
`;

const BusinessInfo = styled.div`
  font-size: ${typography.small.fontSize}px;
  color: ${colors.textTertiary};
  margin-top: ${spacing.sm}px;
  line-height: 1.4;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <FooterTitle>KeepUp</FooterTitle>
            <FooterText>
              습관을 돈으로 지키는 가장 현실적인 방법
            </FooterText>
            <FooterText>
              매일 인증하는 챌린지로 습관을 형성하고 보너스를 받으세요.
            </FooterText>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>연락처</FooterTitle>
            <ContactItem>
              <Mail size={16} />
              <FooterLink href={`mailto:${config.links.email}`}>
                {config.links.email}
              </FooterLink>
            </ContactItem>
            <ContactItem>
              <MessageCircle size={16} />
              <FooterLink href={config.links.kakao} target="_blank" rel="noopener noreferrer">
                카카오 채널
              </FooterLink>
            </ContactItem>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>정책</FooterTitle>
            <FooterLink href={config.links.terms} target="_blank" rel="noopener noreferrer">
              이용약관
            </FooterLink>
            <FooterLink href={config.links.privacy} target="_blank" rel="noopener noreferrer">
              개인정보처리방침
            </FooterLink>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>
            © 2024 KeepUp. All rights reserved.
          </Copyright>
          <BusinessInfo>
            사업자등록번호: 000-00-00000 | 대표: 홍길동<br />
            주소: 서울특별시 강남구 테헤란로 123, 456호<br />
            통신판매업신고번호: 2024-서울강남-0000
          </BusinessInfo>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
}
