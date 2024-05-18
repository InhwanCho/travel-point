import type { Metadata } from "next";
import { Inter, Noto_Sans_KR, Roboto } from "next/font/google";
import "@/styles/globals.css";
import SiteHeader from "@/components/site-header";
import { ViewTransitions } from 'next-view-transitions';
import QueryProvider from "@/contexts/query-provider";
import { cn } from "@/libs/utils";
import SiteFooter from "@/components/site-footer";
import { siteConfig } from "@/config/site-config";
import Fonts from "@/components/fonts";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Sans_KR({ subsets: ['latin'] });
const roboto = Roboto({ weight: ['300','400','500','700'],subsets:['latin'] },);

export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s | ${siteConfig.title}` },
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.applicationName,
  generator: siteConfig.generator,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  formatDetection: siteConfig.formatDetection,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  openGraph: {
    locale: siteConfig.locale,
    type: "article",
  },
  icons: {
    icon: '/assets/favicons/favicon.ico',
    shortcut: '/assets/favicons/favicon-32x32.png',
    apple: '/assets/favicons/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/assets/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'icon',
        url: '/assets/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        rel: 'icon',
        sizes: '16x16',
        url: '/assets/favicons/favicon-16x16.png',
        type: 'image/png'
      },
      {
        rel: 'apple-touch-icon',
        url: '/assets/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        rel: 'manifest',
        url: '/assets/favicons/site.webmanifest'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
  }
};


export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {

  return (
    <ViewTransitions>
      <html lang="ko" className="scroll-smooth scroll-pt-20">
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/assets/favicons/site.webmanifest" />
        <link rel="shortcut icon" href="/assets/favicons/favicon.ico" />
        <body className={cn('min-h-dvh antialiased', noto.className)}>
          <Fonts />
          <QueryProvider>
            {modal}
            <SiteHeader />
            {children}
          </QueryProvider>
          <SiteFooter />
        </body>
      </html>
    </ViewTransitions>
  );
}
