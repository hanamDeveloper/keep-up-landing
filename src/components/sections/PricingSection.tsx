'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colors, spacing, typography, borderRadius } from '@/styles';
import { appConfig as config } from '@/lib/config';
import { Info } from 'lucide-react';

const Section = styled.section`
  background: ${colors.background};
  padding: ${spacing.xxl}px ${spacing.lg}px;
  border-top: 1px solid ${colors.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xxl}px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  line-height: ${typography.h2.lineHeight}px;
  color: ${colors.text};
  margin: 0 0 ${spacing.md}px 0;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${typography.body.fontSize}px;
  color: ${colors.textSecondary};
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.lg}px;
  max-width: 800px;
  margin: 0 auto;
`;

const PricingCard = styled(motion.div)`
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.xl}px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    border-color: ${colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const PriceAmount = styled.div`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.primary};
  margin-bottom: ${spacing.sm}px;
`;

const PriceLabel = styled.div`
  font-size: ${typography.body.fontSize}px;
  color: ${colors.textSecondary};
  margin-bottom: ${spacing.md}px;
`;

const BetaBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${colors.primary};
  color: ${colors.text};
  padding: ${spacing.xs}px ${spacing.sm}px;
  border-radius: ${borderRadius.sm}px;
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
`;

const InfoBox = styled(motion.div)`
  background: ${colors.info}10;
  border: 1px solid ${colors.info}30;
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.lg}px;
  margin-top: ${spacing.xl}px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const InfoText = styled.p`
  font-size: ${typography.caption.fontSize}px;
  color: ${colors.info};
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
`;

export default function PricingSection() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            베타 가격 (최대 20만원)
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            보증금 성격으로, 시작 전 환불 가능합니다
          </SectionSubtitle>
        </SectionHeader>
        
        <PricingGrid>
          {config.copy.pricing.map((price, index) => (
            <PricingCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BetaBadge>베타</BetaBadge>
              <PriceAmount>{price.amount.toLocaleString()}원</PriceAmount>
              <PriceLabel>{price.label}</PriceLabel>
            </PricingCard>
          ))}
        </PricingGrid>
        
        <InfoBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <InfoText>
            <Info size={16} />
            보증금 성격, 시작 전 환불 가능
          </InfoText>
        </InfoBox>
      </Container>
    </Section>
  );
}
