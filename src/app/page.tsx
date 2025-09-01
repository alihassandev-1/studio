import Link from 'next/link';
import { generateTrendingTopics } from '@/ai/flows/generate-trending-topics';
import { Card } from '@/components/ui/card';
import { ContentGenerator } from './_components/content-generator';
import { FeatureCard } from './_components/feature-card';
import { CopyCheck, Globe, Search, Sparkles, Target, Wallet } from 'lucide-react';

async function getInitialTrendingTopics() {
  try {
    const topics = await generateTrendingTopics({
      platform: 'Blog',
      currentYear: new Date().getFullYear(),
    });
    return topics.topics;
  } catch (error) {
    console.error('Failed to fetch initial trending topics:', error);
    return [];
  }
}

export default async function Home() {
  const initialTrendingTopics = await getInitialTrendingTopics();
  const currentYear = new Date().getFullYear();

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
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header className="container mx-auto px-4 pt-8">
        <Link href="/">
          <h2 className="text-3xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            AI Powar
          </h2>
        </Link>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <Card className="max-w-4xl mx-auto text-center bg-transparent border-none shadow-none">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline text-foreground leading-tight">
              Never Run Out of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Content Ideas</span> Again
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop overthinking, start creating! Generate viral content ideas for any platform in seconds.
            </p>
          </Card>

          <ContentGenerator
            initialTrendingTopics={initialTrendingTopics}
            currentYear={currentYear}
          />

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
        </div>
      </main>
      <footer className="py-8 mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-4 mb-2">
            <Link href="/about" className="hover:text-foreground">About</Link>
            <Link href="/terms" className="hover:text-foreground">Terms & Privacy</Link>
          </div>
          <p>&copy; {currentYear} AI Powar. Made with ❤️ in Pakistan.</p>
        </div>
      </footer>
    </div>
  );
}
