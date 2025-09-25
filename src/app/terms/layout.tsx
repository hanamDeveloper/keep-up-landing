import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | KeepUp',
  description: 'KeepUp 서비스 이용약관 - 습관 형성 챌린지 플랫폼 서비스 이용과 관련된 권리, 의무 및 책임사항',
  openGraph: {
    title: '이용약관 | KeepUp',
    description: 'KeepUp 서비스 이용약관 - 습관 형성 챌린지 플랫폼 서비스 이용과 관련된 권리, 의무 및 책임사항',
    url: 'https://keepup.com/terms',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
