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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Copy,
  Loader2,
  Newspaper,
  Instagram,
  Youtube,
  Facebook,
  Sparkles,
  Search,
  Target,
  Globe,
  Wallet,
  CopyCheck,
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

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const platformIcons: { [key: string]: React.ElementType } = {
  Blog: Newspaper,
  Instagram: Instagram,
  TikTok: TikTokIcon,
  YouTube: Youtube,
  Facebook: Facebook,
  X: XIcon,
};

const platforms: GeneratePlatformSpecificContentIdeasInput['platform'][] = [
  'Blog',
  'Instagram',
  'TikTok',
  'YouTube',
  'Facebook',
  'X',
];

const formSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
  platform: z.enum(platforms),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdea, setCopiedIdea] = useState<string | null>(null);
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
    setCopiedIdea(text);
    setTimeout(() => setCopiedIdea(null), 2000);
    toast({
      title: 'Copied to clipboard!',
      description: 'You can now paste the content idea.',
    });
  };

  const features = [
    {
      icon: Search,
      title: 'Topic-Based Generation',
      description: 'Enter any topic, and our AI will generate a list of creative content ideas in seconds.'
    },
    {
      icon: Target,
      title: 'Platform-Specific Ideas',
      description: 'Get ideas tailored for blogs, Instagram, TikTok, and more to maximize your reach.'
    },
    {
      icon: Globe,
      title: 'Localized for Pakistan',
      description: 'Ideas are culturally relevant and designed to resonate with the Pakistani audience.'
    },
    {
      icon: Wallet,
      title: '100% Free to Use',
      description: 'No subscriptions, no fees. Just endless content ideas to fuel your creativity.'
    },
    {
      icon: CopyCheck,
      title: 'One-Click Copy',
      description: 'Easily copy your favorite ideas to your clipboard for quick sharing and planning.'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Leveraging cutting-edge AI to deliver fresh, trending, and engaging content suggestions.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
       <div className="absolute top-0 left-0 right-0 -z-10 h-[50vh] w-full bg-gradient-to-br from-primary/10 via-background to-background"></div>
      <header className="container mx-auto px-4 pt-6">
        <h2 className="text-xl font-bold font-headline text-primary">Pakistani Content Compass</h2>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-slate-800 dark:text-white leading-tight">
              Never Run Out of <span className="text-primary">Content Ideas</span> Again
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Unlock viral potential with AI-generated content ideas tailored for the Pakistani audience. 100% free.
            </p>
          </motion.div>

          <Card className="max-w-3xl mx-auto mt-12 shadow-2xl border-2 border-primary/10 overflow-hidden bg-card/80 backdrop-blur-xl">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-base font-medium">Enter a topic or keyword</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., 'Street Food in Lahore'"
                    {...register('topic')}
                    className="text-base py-6 rounded-lg"
                  />
                  {errors.topic && <p className="text-sm text-destructive">{errors.topic.message}</p>}
                </div>

                <div className="space-y-3">
                   <Label className="text-base font-medium">Select a platform</Label>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {platforms.map((platform) => {
                      const Icon = platformIcons[platform];
                      return (
                        <Button
                          key={platform}
                          type="button"
                          variant={selectedPlatform === platform ? 'default' : 'outline'}
                          onClick={() => setValue('platform', platform, { shouldValidate: true })}
                          className={`transition-all duration-200 h-14 text-base ${selectedPlatform === platform ? 'ring-2 ring-primary-foreground scale-105' : 'hover:bg-primary/5'}`}
                        >
                          <Icon className={`h-6 w-6 mr-2 ${selectedPlatform !== platform ? 'text-primary' : ''}`} />
                          <span className="font-semibold">{platform}</span>
                        </Button>
                      );
                    })}
                   </div>
                   {errors.platform && <p className="text-sm text-destructive">{errors.platform.message}</p>}
                </div>

                <Button type="submit" disabled={isLoading} size="lg" className="w-full text-lg font-bold rounded-lg h-14">
                  {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
                  Generate Ideas
                </Button>
              </form>
            </CardContent>
          </Card>

          {(isLoading || ideas.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-3xl mx-auto mt-12"
            >
                <h2 className="text-3xl font-bold font-headline text-center mb-8">
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
                            <Card className="p-4 flex items-center justify-between shadow-sm">
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
                            <Card className="p-4 flex items-center justify-between gap-4 group hover:shadow-lg transition-shadow duration-300">
                                <p className="flex-1 text-slate-700 dark:text-slate-200 text-lg">{idea}</p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleCopyToClipboard(idea)}
                                    aria-label="Copy idea"
                                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                                >
                                    {copiedIdea === idea ? <CopyCheck className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
            </motion.div>
          )}

          <section className="mt-20 md:mt-32">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-center font-headline text-slate-800 dark:text-white">
                Why Choose Us?
              </h2>
               <p className="mt-4 text-lg text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                 We provide powerful tools to supercharge your content creation journey, helping you stay ahead of the curve.
               </p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    >
                      <Card className="h-full bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                        <CardHeader className="items-center text-center">
                          <div className="p-4 bg-primary/10 rounded-full mb-2">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="py-8 mt-12">
        <div className="container mx-auto text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Pakistani Content Compass. Made with ❤️ in Pakistan.</p>
        </div>
      </footer>
    </div>
  );
}
