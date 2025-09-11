'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colors, spacing, typography, borderRadius } from '@/styles';
import { appConfig as config } from '@/lib/config';
import { Search, CreditCard, Trophy } from 'lucide-react';

const Section = styled.section`
  background: ${colors.surface};
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

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing.xl}px;
  position: relative;
`;

const StepCard = styled(motion.div)`
  background: ${colors.card};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.xl}px;
  text-align: center;
  position: relative;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: ${colors.primary};
  color: ${colors.text};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${typography.bodyBold.fontWeight};
  margin: 0 auto ${spacing.lg}px;
`;

const StepIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${colors.primary}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.lg}px;
  color: ${colors.primary};
`;

const StepTitle = styled.h3`
  font-size: ${typography.h4.fontSize}px;
  font-weight: ${typography.h4.fontWeight};
  line-height: ${typography.h4.lineHeight}px;
  color: ${colors.text};
  margin: 0 0 ${spacing.md}px 0;
`;

const StepDescription = styled.p`
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.textSecondary};
  margin: 0;
`;

const WarningBox = styled(motion.div)`
  background: ${colors.warning}10;
  border: 1px solid ${colors.warning}30;
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.lg}px;
  margin-top: ${spacing.xl}px;
  text-align: center;
`;

const WarningText = styled.p`
  font-size: ${typography.caption.fontSize}px;
  color: ${colors.warning};
  margin: 0;
  font-weight: ${typography.captionBold.fontWeight};
`;

const icons = [Search, CreditCard, Trophy];

export default function HowItWorksSection() {
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
            어떻게 작동하나요?
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            간단한 3단계로 습관 형성을 시작하세요
          </SectionSubtitle>
        </SectionHeader>
        
        <StepsContainer>
          {config.copy.howItWorks.map((step, index) => {
            const IconComponent = icons[index] || Search;
            return (
              <StepCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <StepNumber>{step.step}</StepNumber>
                <StepIcon>
                  <IconComponent size={24} />
                </StepIcon>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepCard>
            );
          })}
        </StepsContainer>
        
        <WarningBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <WarningText>
            ⚠️ 챌린지 시작 전까지는 환불 가능, 시작 후에는 환불이 제한됩니다. (자세히 보기)
          </WarningText>
        </WarningBox>
      </Container>
    </Section>
  );
}
