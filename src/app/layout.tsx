import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { CookieConsent } from '@/components/ui/cookie-consent';

export const metadata: Metadata = {
  title: 'AI Powar - Free AI Content Idea Generator for Pakistan',
  description: 'Generate unlimited, viral content ideas for TikTok, YouTube, Instagram, and more with AI Powar. Get platform-specific, localized content ideas for Pakistani audiences for free.',
  keywords: ['content ideas', 'ai content generator', 'pakistan content creation', 'viral ideas', 'tiktok ideas', 'youtube ideas', 'instagram ideas', 'free ai tool'],
  openGraph: {
    title: 'AI Powar - Free AI Content Idea Generator for Pakistan',
    description: 'Generate unlimited, viral content ideas for TikTok, YouTube, Instagram, and more with AI Powar. Get platform-specific, localized content ideas for Pakistani audiences for free.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Powar - Free AI Content Idea Generator for Pakistan',
    description: 'Generate unlimited, viral content ideas for TikTok, YouTube, Instagram, and more with AI Powar. Get platform-specific, localized content ideas for Pakistani audiences for free.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
        <Toaster />
        <CookieConsent />
      </body>
    </html>
  );
}
