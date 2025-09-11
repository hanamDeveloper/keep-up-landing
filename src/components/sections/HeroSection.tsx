"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { colors, spacing, typography } from "@/styles";
import { appConfig as config } from "@/lib/config";
import Button from "../Button";
import CTAForm from "../CTAForm";
import Image from "next/image";

const HeroContainer = styled.section`
  /* background: linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 100%); */
  padding: ${spacing.xxl}px ${spacing.lg}px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.xxl}px;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${spacing.xl}px;
    text-align: center;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg}px;
`;

const Headline = styled(motion.h1)`
  font-size: ${typography.h1.fontSize}px;
  font-weight: ${typography.h1.fontWeight};
  line-height: ${typography.h1.lineHeight}px;
  color: ${colors.text};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${typography.h2.fontSize}px;
    line-height: ${typography.h2.lineHeight}px;
  }
`;

const Subheadline = styled(motion.p)`
  font-size: ${typography.h4.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.h4.lineHeight}px;
  color: ${colors.textSecondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${typography.body.fontSize}px;
    line-height: ${typography.body.lineHeight}px;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${spacing.md}px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FormContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MockupContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.surface};
  border-radius: 20px;
  padding: ${spacing.xl}px;
  border: 1px solid ${colors.border};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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
  width: 60px;
  height: 60px;
  background: linear-gradient(
    135deg,
    ${colors.primary}20 0%,
    ${colors.primaryDark}20 100%
  );
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-30px) rotate(180deg);
    }
  }
`;

export default function HeroSection() {
  return (
    <HeroContainer>
      <BackgroundElements>
        <FloatingElement delay={0} style={{ top: "10%", left: "10%" }} />
        <FloatingElement delay={1} style={{ top: "20%", right: "15%" }} />
        <FloatingElement delay={2} style={{ bottom: "30%", left: "20%" }} />
        <FloatingElement delay={3} style={{ bottom: "20%", right: "10%" }} />
      </BackgroundElements>

      <Content>
        <TextContent>
          <Headline
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {config.copy.hero.headline}
          </Headline>

          <Subheadline
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {config.copy.hero.subheadline}
          </Subheadline>

          <ButtonGroup
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open(config.links.kakao, "_blank")}
            >
              {config.copy.hero.cta.secondary}
            </Button>
          </ButtonGroup>
        </TextContent>

        <FormContainer
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Image
            src={"/in-app-keep-up.png"}
            alt="Hero Mockup"
            width={500}
            height={1050}
          />
        </FormContainer>
      </Content>
    </HeroContainer>
  );
}
