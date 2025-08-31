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
  Sparkles,
  CopyCheck,
  Hash,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const BlogIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4.5 4.5H19.5V8.5H4.5V4.5Z" fill="#3B82F6"/>
        <path d="M4.5 10.5H14.5V12.5H4.5V10.5Z" fill="#3B82F6" fillOpacity="0.7"/>
        <path d="M4.5 14.5H19.5V16.5H4.5V14.5Z" fill="#3B82F6" fillOpacity="0.7"/>
        <path d="M16 10.5H19.5V12.5H16V10.5Z" fill="#3B82F6" fillOpacity="0.7"/>
        <path d="M4.5 18.5H14.5V20.5H4.5V18.5Z" fill="#3B82F6" fillOpacity="0.7"/>
    </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <radialGradient id="insta-gradient" cx="0.3" cy="1.2" r="1.3">
                <stop offset="0" stopColor="#FEDA77" />
                <stop offset="0.1" stopColor="#F58529" />
                <stop offset="0.3" stopColor="#DD2A7B" />
                <stop offset="0.6" stopColor="#8134AF" />
                <stop offset="1" stopColor="#515BD4" />
            </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#insta-gradient)" />
        <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 6.51L17.51 6.499" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="28" height="28" rx="6" fill="black"/>
        <path d="M19.14 7.32996C18.2 7.31996 17.26 7.32996 16.32 7.32996C16.27 8.52996 15.82 9.72996 14.93 10.59C14.04 11.48 12.83 11.9 11.63 12.04V15.2C13.06 15.16 14.49 14.88 15.78 14.37C16.25 14.17 16.69 13.9 17.1 13.62C17.11 15.89 17.09 18.16 17.12 20.43C17.08 21.55 16.63 22.66 15.85 23.51C14.77 25.04 12.89 25.24 11.16 24.3C9.74001 23.44 8.91001 21.84 8.91001 20.21C8.92001 18.57 9.68001 16.92 11.02 15.93C11.94 15.2 13.11 14.85 14.28 14.86C14.27 11.66 14.29 8.46996 14.26 5.27996L19.14 7.32996Z" fill="#FE2C55"/>
        <path d="M19.14 7.32996L14.26 5.27996V14.86C13.09 14.85 11.92 15.2 11.00 15.93C9.66001 16.92 8.90001 18.57 8.91001 20.21C8.91001 21.84 9.74001 23.44 11.16 24.3C12.89 25.24 14.77 25.04 15.85 23.51C16.63 22.66 17.08 21.55 17.12 20.43C17.09 18.16 17.11 15.89 17.1 13.62C17.51 13.9 17.95 14.17 18.42 14.37C18.66 14.46 18.9 14.56 19.14 14.63V10.87C17.99 10.73 16.84 10.38 15.78 9.84C14.93 10.59 15.38 9.39996 14.93 10.59C15.82 9.72996 16.27 8.52996 16.32 7.32996H19.14V10.87C18.9 10.8 18.66 10.71 18.42 10.61C16.95 10.02 15.52 10.29 14.28 11.23V7.32996H16.32C17.26 7.32996 18.2 7.31996 19.14 7.32996Z" fill="#20F1ED"/>
    </svg>
);
const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="6" fill="#FF0000"/>
        <path d="M10 15L15 12L10 9V15Z" fill="white"/>
    </svg>
);
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="6" fill="#1877F2"/>
        <path d="M14.5 21V13.5H17.5L18 9.5H14.5V7.5C14.5 6.47 14.5 5.5 16.5 5.5H18V2.14C17.674 2.097 16.637 2 15.426 2C12.896 2 11 3.657 11 6.7V9.5H8V13.5H11V21H14.5Z" fill="white"/>
    </svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="6" fill="black"/>
        <path d="M18.244 2.25H21.552L14.325 10.51L23.054 21.75H16.388L10.395 14.093L3.678 21.75H0.369L8.097 12.91L-0.375 2.25H6.46L11.83 8.917L18.244 2.25ZM17.083 19.467H19.14L7.042 4.126H4.88L17.083 19.467Z" fill="white"/>
    </svg>
);
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="14" cy="14" r="9" stroke="#3B82F6" strokeWidth="2"/>
        <path d="M21 21L28 28" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="16" cy="16" r="12" stroke="#F59E0B" strokeWidth="2"/>
        <circle cx="16" cy="16" r="6" stroke="#F59E0B" strokeWidth="2"/>
        <circle cx="16" cy="16" r="1" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2"/>
    </svg>
);
const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="16" cy="16" r="12" stroke="#10B981" strokeWidth="2"/>
        <path d="M4.24268 16H27.7574" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 4.24265C19.3137 7.55635 21 11.6863 21 16C21 20.3137 19.3137 24.4437 16 27.7574" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 4.24265C12.6863 7.55635 11 11.6863 11 16C11 20.3137 12.6863 24.4437 16 27.7574" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const WalletIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="5" y="8" width="22" height="16" rx="4" stroke="#8B5CF6" strokeWidth="2"/>
        <path d="M22 13H24" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5 12H7" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const CopyCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M13 22H7C5.89543 22 5 21.1046 5 20V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V10" stroke="#EC4899" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 17L17 20L25 12" stroke="#EC4899" strokeWidth="2" strokeLinecap="round"/>
        <rect x="12" y="12" width="15" height="15" rx="3" stroke="#EC4899" strokeWidth="2" strokeDasharray="4 4"/>
    </svg>
);
const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M16 4L18.6667 9.33333L24 12L18.6667 14.6667L16 20L13.3333 14.6667L8 12L13.3333 9.33333L16 4Z" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M25 20L26 22L28 23L26 24L25 26L24 24L22 23L24 22L25 20Z" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 22L9 24L11 25L9 26L8 28L7 26L5 25L7 24L8 22Z" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const platformIcons: { [key: string]: React.ElementType } = {
  Blog: BlogIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  YouTube: YouTubeIcon,
  Facebook: FacebookIcon,
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
  const [hashtags, setHashtags] = useState<string[]>([]);
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
    setHashtags([]);
    try {
      const result = await generatePlatformSpecificContentIdeas(data);
      setIdeas(result.ideas);
      setHashtags(result.hashtags || []);
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
      icon: SearchIcon,
      title: 'Topic-Based Generation',
      description: 'Enter any topic, and our AI will generate a list of creative content ideas in seconds.'
    },
    {
      icon: TargetIcon,
      title: 'Platform-Specific Ideas',
      description: 'Get ideas tailored for blogs, Instagram, TikTok, and more to maximize your reach.'
    },
    {
      icon: GlobeIcon,
      title: 'Localized for Pakistan',
      description: 'Ideas are culturally relevant and designed to resonate with the Pakistani audience.'
    },
    {
      icon: WalletIcon,
      title: '100% Free to Use',
      description: 'No subscriptions, no fees. Just endless content ideas to fuel your creativity.'
    },
    {
      icon: CopyCheckIcon,
      title: 'One-Click Copy',
      description: 'Easily copy your favorite ideas to your clipboard for quick sharing and planning.'
    },
    {
      icon: SparklesIcon,
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
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline text-slate-800 dark:text-white leading-tight">
              Never Run Out of <span className="text-primary">Content Ideas</span> Again
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Stop overthinking, start creating! Generate viral content ideas for any platform in seconds.
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
                          className={`transition-all duration-200 h-14 text-base justify-start pl-4 ${selectedPlatform === platform ? 'ring-2 ring-primary-foreground scale-105' : 'hover:bg-primary/5'}`}
                        >
                          <Icon className="h-6 w-6 mr-3" />
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
                {hashtags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-8"
                >
                  <h3 className="text-2xl font-bold font-headline text-center mb-4">
                    Trending Hashtags
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {hashtags.map((tag, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge
                          variant="secondary"
                          className="text-base px-4 py-2 cursor-pointer hover:bg-primary/10 transition-colors"
                          onClick={() => handleCopyToClipboard(tag)}
                        >
                          <Hash className="h-4 w-4 mr-1.5" />
                          {tag.replace(/^#/, '')}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          <section className="mt-20 md:mt-32">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-center font-headline text-slate-800 dark:text-white">
                Why Choose Us?
              </h2>
               <p className="mt-4 text-lg text-center text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                 Everything you need to create viral content for the Pakistani audience, all in one place.
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
                          <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-3">
                            <Icon className="h-8 w-8" />
                          </div>
                          <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center px-6 pb-6">
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
