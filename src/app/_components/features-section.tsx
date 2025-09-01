"use client";

import { FeatureCard } from './feature-card';
import { CopyCheck, Globe, Search, Sparkles, Target, Wallet } from 'lucide-react';

export function FeaturesSection() {
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
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Advanced AI algorithms ensure fresh, unique, and engaging content ideas every single time.',
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
