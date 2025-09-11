'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colors, spacing, typography } from '@/styles';
import { appConfig as config } from '@/lib/config';

const Section = styled.section`
  background: ${colors.surface};
  padding: ${spacing.xl}px ${spacing.lg}px;
  border-top: 1px solid ${colors.border};
  border-bottom: 1px solid ${colors.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: ${spacing.xxl}px;
  flex-wrap: wrap;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: ${spacing.lg}px;
  background: ${colors.card};
  border-radius: 16px;
  border: 1px solid ${colors.border};
  min-width: 200px;
`;

const StatNumber = styled.div`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  color: ${colors.primary};
  margin-bottom: ${spacing.sm}px;
`;

const StatLabel = styled.div`
  font-size: ${typography.caption.fontSize}px;
  color: ${colors.textSecondary};
  font-weight: ${typography.captionBold.fontWeight};
`;

const BetaBadge = styled.span`
  display: inline-block;
  background: ${colors.primary}20;
  color: ${colors.primary};
  padding: ${spacing.xs}px ${spacing.sm}px;
  border-radius: 12px;
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  margin-left: ${spacing.sm}px;
`;

export default function SocialProofSection() {
  return (
    <Section>
      <Container>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <StatNumber>
            {config.copy.socialProof.satisfaction}
            <BetaBadge>베타</BetaBadge>
          </StatNumber>
          <StatLabel>테스터 만족도</StatLabel>
        </StatCard>
        
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <StatNumber>
            {config.copy.socialProof.certifications}
            <BetaBadge>베타</BetaBadge>
          </StatNumber>
          <StatLabel>누적 인증</StatLabel>
        </StatCard>
      </Container>
    </Section>
  );
}
