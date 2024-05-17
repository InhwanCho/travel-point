import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import SiteHeader from "@/components/site-header";
import { ViewTransitions } from 'next-view-transitions';
import QueryProvider from "@/contexts/query-provider";
import { cn } from "@/libs/utils";
import SiteFooter from "@/components/site-footer";
import { siteConfig } from "@/config/site-config";
import Fonts from "@/components/fonts";

const inter = Inter({ subsets: ["latin"] });

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
  // icons: {
  //   icon: '/static/favicons/favicon.ico',
  //   shortcut: '/static/favicons/favicon-32x32.png',
  //   apple: '/static/favicons/apple-touch-icon.png',
  //   other: [
  //     {
  //       rel: 'icon',
  //       url: '/static/favicons/android-chrome-192x192.png',
  //       sizes: '192x192',
  //       type: 'image/png'
  //     },
  //     {
  //       rel: 'icon',
  //       url: '/static/favicons/android-chrome-512x512.png',
  //       sizes: '512x512',
  //       type: 'image/png'
  //     },
  //     {
  //       rel: 'icon',
  //       sizes: '16x16',
  //       url: '/static/favicons/favicon-16x16.png',
  //       type: 'image/png'
  //     },
  //     {
  //       rel: 'apple-touch-icon',
  //       url: '/static/favicons/apple-touch-icon.png',
  //       sizes: '180x180',
  //       type: 'image/png'
  //     },
  //     {
  //       rel: 'manifest',
  //       url: '/static/favicons/site.webmanifest'
  //     }
  //   ]
  // },
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
        <body className={'min-h-dvh font-spoqa antialiased'}>
          <Fonts/>
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
