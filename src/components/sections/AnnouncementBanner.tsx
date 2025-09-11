'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colors, spacing, typography } from '@/styles';
import { appConfig as config } from '@/lib/config';

const Banner = styled(motion.div)`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
  color: ${colors.text};
  text-align: center;
  padding: ${spacing.sm}px ${spacing.md}px;
  position: relative;
  overflow: hidden;
`;

const BannerText = styled.p`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.captionBold.fontWeight};
  margin: 0;
  position: relative;
  z-index: 1;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: float 6s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

export default function AnnouncementBanner() {
  return (
    <Banner
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundPattern />
      <BannerText>
        {config.copy.announcement}
      </BannerText>
    </Banner>
  );
}
