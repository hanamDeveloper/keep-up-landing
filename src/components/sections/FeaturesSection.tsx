'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colors, spacing, typography, borderRadius } from '@/styles';
import { appConfig as config } from '@/lib/config';
import { CheckCircle, Shield, Users, CreditCard, MessageSquare } from 'lucide-react';

const Section = styled.section`
  background: ${colors.background};
  padding: ${spacing.xxl}px ${spacing.lg}px;
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing.xl}px;
`;

const FeatureCard = styled(motion.div)`
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.xl}px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
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

const FeatureTitle = styled.h3`
  font-size: ${typography.h4.fontSize}px;
  font-weight: ${typography.h4.fontWeight};
  line-height: ${typography.h4.lineHeight}px;
  color: ${colors.text};
  margin: 0 0 ${spacing.md}px 0;
`;

const FeatureDescription = styled.p`
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.textSecondary};
  margin: 0;
`;

const icons = [CheckCircle, Shield, Users, CreditCard, MessageSquare];

export default function FeaturesSection() {
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
            KeepUp의 핵심 기능
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            습관 형성을 위한 모든 기능을 한 곳에서
          </SectionSubtitle>
        </SectionHeader>
        
        <FeaturesGrid>
          {config.copy.features.map((feature, index) => {
            const IconComponent = icons[index] || CheckCircle;
            return (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureIcon>
                  <IconComponent size={24} />
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            );
          })}
        </FeaturesGrid>
      </Container>
    </Section>
  );
}
