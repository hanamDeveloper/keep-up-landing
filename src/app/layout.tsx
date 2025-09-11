import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EmotionProvider } from "./emotion-provider";
import { appConfig as config } from '@/lib/config';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  authors: [{ name: 'KeepUp Team' }],
  creator: 'KeepUp',
  publisher: 'KeepUp',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://keepup.kr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: config.seo.title,
    description: config.seo.description,
    url: 'https://keepup.kr',
    siteName: 'KeepUp',
    images: [
      {
        url: config.seo.ogImage,
        width: 1200,
        height: 630,
        alt: 'KeepUp - 습관을 돈으로 지키는 가장 현실적인 방법',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: config.seo.title,
    description: config.seo.description,
    images: [config.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "KeepUp",
              "url": "https://keepup.kr",
              "logo": "https://keepup.kr/logo.png",
              "description": config.seo.description,
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+82-10-0000-0000",
                "contactType": "customer service",
                "email": config.links.email
              },
              "sameAs": [
                config.links.kakao
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "KeepUp",
              "url": "https://keepup.kr",
              "description": config.seo.description,
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://keepup.kr/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": config.copy.faq.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EmotionProvider>
          {children}
        </EmotionProvider>
      </body>
    </html>
  );
}
