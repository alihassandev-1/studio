import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 pt-8">
        <Link href="/">
          <h2 className="text-3xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            AI Powar
          </h2>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-extrabold text-center font-headline">About AI Powar</CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-muted-foreground space-y-6 px-8 pb-8">
              <p>
                Welcome to AI Powar, your ultimate partner in content creation for the Pakistani audience. In a fast-paced digital world, coming up with fresh, engaging, and relevant content ideas can be a constant challenge. That's where we come in.
              </p>
              <p>
                Our mission is simple: to empower creators, marketers, and businesses in Pakistan by providing a powerful, AI-driven tool that generates an endless stream of content ideas tailored for every major social media platform. Whether you're a YouTuber, a TikTok star, an Instagram influencer, a blogger, or a social media manager, AI Powar is designed to eliminate creative blocks and supercharge your content strategy.
              </p>
              <div className="text-center py-4">
                 <Sparkles className="h-12 w-12 mx-auto text-accent" />
              </div>
              <p>
                We believe that great content starts with a great idea. Our advanced AI is specifically trained to understand the nuances of Pakistani culture, trends, and audience preferences. This means you get ideas that are not just creative but also localized, relevant, and optimized for virality.
              </p>
              <p>
                Best of all, AI Powar is completely free to use. No subscriptions, no hidden fees, no limits. Just pure, unadulterated creative power at your fingertips.
              </p>
              <p>
                Stop overthinking and start creating with AI Powar!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-8 mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-4 mb-2">
            <Link href="/about" className="hover:text-foreground">About</Link>
            <Link href="/terms" className="hover:text-foreground">Terms & Privacy</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} AI Powar. Made with ❤️ in Pakistan.</p>
        </div>
      </footer>
    </div>
  );
}
