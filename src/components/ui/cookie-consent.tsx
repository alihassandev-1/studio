"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie-consent-accepted';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // This code runs only on the client
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-3xl mx-auto shadow-2xl bg-secondary/80 backdrop-blur-lg border-border/50 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Cookie className="h-8 w-8 text-primary shrink-0" />
            <div className="flex-1 text-center md:text-left">
              <p className="text-foreground">
                We use essential cookies to ensure the proper functioning of our website. By continuing to use this site, you agree to our use of cookies.
                {' '}
                <Link href="/terms" className="underline hover:text-primary transition-colors">
                  Learn more
                </Link>.
              </p>
            </div>
            <Button
              onClick={handleAccept}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg px-6 py-3"
            >
              Accept
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
