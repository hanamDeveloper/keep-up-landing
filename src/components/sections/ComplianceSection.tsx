"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { colors, spacing, typography, borderRadius } from "@/styles";
import { appConfig as config } from "@/lib/config";
import Button from "../Button";
import { Shield, Database } from "lucide-react";

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

const ComplianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing.xl}px;
  margin-bottom: ${spacing.xl}px;
`;

const ComplianceCard = styled(motion.div)`
  background: ${colors.card};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.xl}px;
  text-align: center;
`;

const ComplianceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${colors.success}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.lg}px;
  color: ${colors.success};
`;

const ComplianceTitle = styled.h3`
  font-size: ${typography.h4.fontSize}px;
  font-weight: ${typography.h4.fontWeight};
  line-height: ${typography.h4.lineHeight}px;
  color: ${colors.text};
  margin: 0 0 ${spacing.md}px 0;
`;

const SecurityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${spacing.lg}px 0;
`;

const SecurityItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
  padding: ${spacing.sm}px 0;
  font-size: ${typography.body.fontSize}px;
  color: ${colors.textSecondary};

  &::before {
    content: "✓";
    color: ${colors.success};
    font-weight: bold;
  }
`;

const PolicyLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${spacing.lg}px;
  flex-wrap: wrap;
  margin-top: ${spacing.xl}px;
`;

export default function ComplianceSection() {
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
            보안 및 정책
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            안전하고 투명한 서비스 운영을 위한 보안 및 정책
          </SectionSubtitle>
        </SectionHeader>

        <ComplianceGrid>
          <ComplianceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <ComplianceIcon>
              <Shield size={24} />
            </ComplianceIcon>
            <ComplianceTitle>보안 시스템</ComplianceTitle>
            <SecurityList>
              {config.copy.compliance.security
                .slice(0, 2)
                .map((item, index) => (
                  <SecurityItem key={index}>{item}</SecurityItem>
                ))}
            </SecurityList>
          </ComplianceCard>

          <ComplianceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <ComplianceIcon>
              <Database size={24} />
            </ComplianceIcon>
            <ComplianceTitle>데이터 보호</ComplianceTitle>
            <SecurityList>
              {config.copy.compliance.security.slice(2).map((item, index) => (
                <SecurityItem key={index}>{item}</SecurityItem>
              ))}
            </SecurityList>
          </ComplianceCard>
        </ComplianceGrid>

        <PolicyLinks
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            onClick={() => window.open(config.links.terms, "_blank")}
          >
            이용약관
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(config.links.privacy, "_blank")}
          >
            개인정보처리방침
          </Button>
        </PolicyLinks>
      </Container>
    </Section>
  );
}
