import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Pakistani Content Compass',
  description: 'AI-Powered Content Idea Generator – Free in Pakistan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased h-full bg-background')}>
        <div className="relative flex min-h-screen flex-col">
          <div className="absolute top-0 left-0 right-0 -z-10 h-96 w-full bg-gradient-to-b from-primary/5 to-background"></div>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
