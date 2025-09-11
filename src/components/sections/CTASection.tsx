'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colors, spacing, typography } from '@/styles';
import { appConfig as config } from '@/lib/config';
import CTAForm from '../CTAForm';

const Section = styled.section`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
  padding: ${spacing.xxl}px ${spacing.lg}px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 ${spacing.xl}px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FormWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)<{ delay: number }>`
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 10s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-40px) rotate(180deg); }
  }
`;

export default function CTASection() {
  return (
    <Section>
      <BackgroundElements>
        <FloatingElement delay={0} style={{ top: '10%', left: '10%' }} />
        <FloatingElement delay={2} style={{ top: '20%', right: '15%' }} />
        <FloatingElement delay={4} style={{ bottom: '30%', left: '20%' }} />
        <FloatingElement delay={6} style={{ bottom: '20%', right: '10%' }} />
      </BackgroundElements>
      
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {config.copy.cta.headline}
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {config.copy.cta.subheadline}
        </SectionSubtitle>
        
        <FormWrapper
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CTAForm />
        </FormWrapper>
      </Container>
    </Section>
  );
}
