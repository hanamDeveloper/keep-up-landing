import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '계정 삭제 | KeepUp',
  description: 'KeepUp 계정 삭제 페이지',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountDeletionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
