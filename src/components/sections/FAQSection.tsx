'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography, borderRadius } from '@/styles';
import { appConfig as config } from '@/lib/config';
import { ChevronDown } from 'lucide-react';

const Section = styled.section`
  background: ${colors.background};
  padding: ${spacing.xxl}px ${spacing.lg}px;
  border-top: 1px solid ${colors.border};
`;

const Container = styled.div`
  max-width: 800px;
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
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md}px;
`;

const FAQItem = styled.div`
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg}px;
  overflow: hidden;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: ${colors.primary}40;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: ${spacing.lg}px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${colors.surfaceVariant};
  }
  
  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: -2px;
  }
`;

const QuestionText = styled.h3`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.text};
  margin: 0;
  flex: 1;
  transition: color 0.2s ease;
`;

const ChevronIcon = styled(motion.div)`
  color: ${colors.textSecondary};
  margin-left: ${spacing.md}px;
  transition: color 0.2s ease;
`;

const FAQAnswer = styled(motion.div)`
  overflow: hidden;
`;

const AnswerContent = styled.div`
  padding: 0 ${spacing.lg}px ${spacing.lg}px;
  border-top: 1px solid ${colors.border};
`;

const AnswerText = styled.p`
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.textSecondary};
  margin: 0;
  padding-top: ${spacing.md}px;
`;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            자주 묻는 질문
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            KeepUp에 대해 궁금한 점들을 확인해보세요
          </SectionSubtitle>
        </SectionHeader>
        
        <FAQList>
          {config.copy.faq.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <QuestionText>{faq.question}</QuestionText>
                <ChevronIcon
                  animate={{ 
                    rotate: openIndex === index ? 180 : 0,
                    scale: openIndex === index ? 1.1 : 1
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronDown size={20} />
                </ChevronIcon>
              </FAQQuestion>
              
              <AnimatePresence mode="wait">
                {openIndex === index && (
                  <FAQAnswer
                    initial={{ 
                      height: 0, 
                      opacity: 0 
                    }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1 
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0 
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1], // 커스텀 이징
                      opacity: { duration: 0.3 }
                    }}
                    style={{ overflow: "hidden" }}
                  >
                    <AnswerContent>
                      <AnswerText>{faq.answer}</AnswerText>
                    </AnswerContent>
                  </FAQAnswer>
                )}
              </AnimatePresence>
            </FAQItem>
          ))}
        </FAQList>
      </Container>
    </Section>
  );
}
