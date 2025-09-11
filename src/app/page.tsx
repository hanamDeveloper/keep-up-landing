'use client';

import { useEffect } from 'react';
import AnnouncementBanner from '@/components/sections/AnnouncementBanner';
import HeroSection from '@/components/sections/HeroSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import PricingSection from '@/components/sections/PricingSection';
import ComplianceSection from '@/components/sections/ComplianceSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <AnnouncementBanner />
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <ComplianceSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
