import Link from 'next/link';
import { generateTrendingTopics } from '@/ai/flows/generate-trending-topics';
import { Card } from '@/components/ui/card';
import { ContentGenerator } from './_components/content-generator';
import { FeaturesSection } from './_components/features-section';

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

          <FeaturesSection />
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
