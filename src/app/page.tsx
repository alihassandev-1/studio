"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generatePlatformSpecificContentIdeas,
  type GeneratePlatformSpecificContentIdeasInput,
} from '@/ai/flows/generate-platform-specific-content-ideas';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle,
  Copy,
  Loader2,
  Newspaper,
  Instagram,
  Youtube,
  Facebook,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 2.17-5.45 1.02-1.66-1.02-2.6-2.96-2.6-4.95-.01-1.99.93-3.96 2.41-5.16 1.12-.91 2.52-1.34 3.99-1.32.01-4.04-.01-8.08.02-12.12z"></path>
    </svg>
);

const platformIcons: { [key: string]: React.ElementType } = {
  Blog: Newspaper,
  Instagram: Instagram,
  TikTok: TikTokIcon,
  YouTube: Youtube,
  Facebook: Facebook,
};

const platforms: GeneratePlatformSpecificContentIdeasInput['platform'][] = [
  'Blog',
  'Instagram',
  'TikTok',
  'YouTube',
  'Facebook',
];

const formSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
  platform: z.enum(platforms),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: 'Blog',
    },
  });

  const selectedPlatform = watch('platform');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setIdeas([]);
    try {
      const result = await generatePlatformSpecificContentIdeas(data);
      setIdeas(result.ideas);
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast({
        title: 'Error generating ideas',
        description: 'There was an issue connecting to the AI. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: 'You can now paste the content idea.',
    });
  };

  const features = [
    'Topic-Based Idea Generation',
    'Platform-Specific Trending Ideas',
    'Localized for Pakistani Audience',
    '100% Free to Use',
    'One-Click Copy for Easy Sharing',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 pt-6">
        <h2 className="text-xl font-bold font-headline text-primary">Pakistani Content Compass</h2>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 dark:text-white">
              AI-Powered Content Idea Generator <span className="text-primary">– Free in Pakistan</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Stop overthinking, start creating!
            </p>
          </div>

          <Card className="max-w-3xl mx-auto mt-10 shadow-lg border-2 border-primary/10 overflow-hidden bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-base font-medium">Enter a topic or keyword</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., 'Street Food in Lahore'"
                    {...register('topic')}
                    className="text-base py-6"
                  />
                  {errors.topic && <p className="text-sm text-destructive">{errors.topic.message}</p>}
                </div>

                <div className="space-y-3">
                   <Label className="text-base font-medium">Select a platform</Label>
                   <div className="flex flex-wrap gap-3">
                    {platforms.map((platform) => {
                      const Icon = platformIcons[platform];
                      return (
                        <Button
                          key={platform}
                          type="button"
                          variant={selectedPlatform === platform ? 'default' : 'outline'}
                          onClick={() => setValue('platform', platform, { shouldValidate: true })}
                          className={`transition-all duration-200 h-12 flex-1 min-w-[120px] ${selectedPlatform === platform ? 'scale-105' : 'hover:bg-primary/5'}`}
                        >
                          <Icon className={`h-5 w-5 mr-2 ${selectedPlatform !== platform ? 'text-primary' : ''}`} />
                          <span className="font-semibold">{platform}</span>
                        </Button>
                      );
                    })}
                   </div>
                   {errors.platform && <p className="text-sm text-destructive">{errors.platform.message}</p>}
                </div>

                <Button type="submit" disabled={isLoading} size="lg" className="w-full text-lg font-bold">
                  {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
                  Generate Ideas
                </Button>
              </form>
            </CardContent>
          </Card>

          {(isLoading || ideas.length > 0) && (
            <div className="max-w-3xl mx-auto mt-12">
                <h2 className="text-2xl font-bold font-headline text-center mb-6">
                  Here are your fresh ideas!
                </h2>
                <div className="space-y-4">
                  <AnimatePresence>
                    {isLoading &&
                      [...Array(3)].map((_, i) => (
                        <motion.div
                          key={`loader-${i}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                            <Card className="p-4 flex items-center justify-between">
                                <div className="h-6 bg-muted rounded-md w-3/4 animate-pulse"></div>
                                <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
                            </Card>
                        </motion.div>
                      ))}

                    {!isLoading && ideas.map((idea, index) => (
                        <motion.div
                          key={`${idea}-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                        >
                            <Card className="p-4 flex items-center justify-between gap-4 group">
                                <p className="flex-1 text-slate-700 dark:text-slate-200">{idea}</p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleCopyToClipboard(idea)}
                                    aria-label="Copy idea"
                                    className="opacity-50 group-hover:opacity-100 transition-opacity"
                                >
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
            </div>
          )}

          <section className="mt-16 md:mt-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center font-headline text-slate-800 dark:text-white">
                Features
              </h2>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <Card key={feature} className="p-4 bg-card/50 backdrop-blur-sm border-primary/10">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700 dark:text-slate-200">{feature}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="py-6">
        <div className="container mx-auto text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Pakistani Content Compass. Made with ❤️ in Pakistan.</p>
        </div>
      </footer>
    </div>
  );
}
