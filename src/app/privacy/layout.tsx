import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | KeepUp',
  description: 'KeepUp의 개인정보 수집·이용·보관·국외이전 등 처리방침 안내',
  openGraph: {
    title: '개인정보 처리방침 | KeepUp',
    description: 'KeepUp의 개인정보 수집·이용·보관·국외이전 등 처리방침 안내',
    url: 'https://keepup.com/privacy',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
