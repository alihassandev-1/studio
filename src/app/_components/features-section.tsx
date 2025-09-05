"use client";

import { FeatureCard } from './feature-card';
import { CopyCheck, Globe, Search, Sparkles, Target, Wallet, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function FeaturesSection() {
    const { toast } = useToast();

    const features = [
        {
          icon: Search,
          title: 'Topic-Based Generation',
          description:
            'Enter any keyword and get creative, relevant content ideas instantly tailored to your niche.',
        },
        {
          icon: Target,
          title: 'Platform-Specific Ideas',
          description:
            'Get optimized content ideas for Blog, Instagram, TikTok, YouTube, and Facebook that actually work.',
        },
        {
          icon: Globe,
          title: 'Localized for Pakistan',
          description:
            'Content ideas that resonate with Pakistani culture, trends, and local context for maximum engagement.',
        },
        {
          icon: Wallet,
          title: '100% Free to Use',
          description: 'No fees, no subscriptions, no limits. Generate unlimited content ideas absolutely free.',
        },
        {
          icon: CopyCheck,
          title: 'One-Click Copy',
          description: 'Easily copy your favorite ideas to your clipboard for quick sharing and planning.',
        },
        {
          icon: Share2,
          title: 'Share with Friends',
          description: 'Love our tool? Share it with your friends and help them create amazing content too!',
          onClick: async () => {
            const shareUrl = 'https://aipowar.com';
            const shareTitle = 'AI Powar - Free AI Content Idea Generator for Pakistan';
            const shareText = 'Check out this awesome AI tool for generating content ideas for the Pakistani audience!';

            if (navigator.share) {
              try {
                await navigator.share({
                  title: shareTitle,
                  text: shareText,
                  url: shareUrl,
                });
              } catch (error) {
                console.error('Error sharing:', error);
              }
            } else {
              navigator.clipboard.writeText(shareUrl);
              toast({
                title: 'Link Copied!',
                description: 'The link has been copied to your clipboard.',
              });
            }
          }
        },
      ];
      
  return (
    <section className="mt-20 md:mt-32">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center font-headline">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-lg text-center text-muted-foreground max-w-3xl mx-auto">
          Everything you need to create viral content for the Pakistani audience, all in one place.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              onClick={feature.onClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
