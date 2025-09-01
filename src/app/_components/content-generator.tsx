"use client";

import { useState, useCallback, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  generatePlatformSpecificContentIdeas,
  type GeneratePlatformSpecificContentIdeasInput,
} from '@/ai/flows/generate-platform-specific-content-ideas';
import { generateTrendingTopics } from '@/ai/flows/generate-trending-topics';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, Loader2, Sparkles, CopyCheck, Hash, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { platformIcons } from './platform-icons';

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

function ResultCard({ idea, index, onCopy, isCopied }: { idea: string, index: number, onCopy: (idea: string) => void, isCopied: boolean }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card className="p-4 flex items-center justify-between gap-4 group hover:shadow-lg transition-shadow duration-300 rounded-2xl">
                <p className="flex-1 text-lg">{idea}</p>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onCopy(idea)}
                    aria-label="Copy idea"
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                >
                    {isCopied ? <CopyCheck className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </Button>
            </Card>
        </motion.div>
    );
}

function SkeletonCard() {
    return (
        <Card className="p-4 flex items-center justify-between shadow-sm rounded-2xl">
            <div className="h-6 bg-slate-700 rounded-md w-3/4 animate-pulse"></div>
            <div className="h-8 w-8 bg-slate-700 rounded-full animate-pulse"></div>
        </Card>
    );
}

export function ContentGenerator({ initialTrendingTopics, currentYear }: { initialTrendingTopics: string[], currentYear: number }) {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<string[]>(initialTrendingTopics);
  const [isTrendsLoading, startTrendsTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdea, setCopiedIdea] = useState<string | null>(null);
  const { toast } = useToast();
  const [showResults, setShowResults] = useState(false);

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
  
  const fetchTrendingTopics = useCallback(async (platform: FormValues['platform']) => {
    startTrendsTransition(async () => {
        try {
            const result = await generateTrendingTopics({ platform, currentYear });
            setTrendingTopics(result.topics);
        } catch (error) {
            console.error('Error fetching trending topics:', error);
            setTrendingTopics([]);
        }
    });
  }, [currentYear]);

  const onPlatformChange = (platform: FormValues['platform']) => {
    setValue('platform', platform, { shouldValidate: true });
    fetchTrendingTopics(platform);
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setShowResults(true);
    setIdeas([]);
    setHashtags([]);
    try {
      const result = await generatePlatformSpecificContentIdeas({
        ...data,
        currentYear,
      });
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

  const handleTrendClick = (topic: string) => {
    setValue('topic', topic, { shouldValidate: true });
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-3xl mx-auto mt-12 shadow-lg rounded-2xl overflow-hidden bg-card">
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
                        onClick={() => onPlatformChange(platform)}
                        className={`transition-all duration-300 ease-in-out h-14 text-base justify-start pl-4 rounded-lg
                          ${selectedPlatform === platform 
                            ? 'ring-2 ring-primary/80 scale-105 shadow-lg bg-gradient-to-r from-primary to-accent text-primary-foreground' 
                            : 'hover:bg-secondary'
                          }`}
                      >
                        <Icon className="h-6 w-6 mr-3" />
                        <span className="font-semibold">{platform}</span>
                      </Button>
                    );
                  })}
                 </div>
                 {errors.platform && <p className="text-sm text-destructive">{errors.platform.message}</p>}
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Or try a trending topic for {selectedPlatform}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {isTrendsLoading ? (
                    [...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 bg-slate-700 rounded-lg w-28 animate-pulse"></div>
                    ))
                  ) : (
                    trendingTopics.map((topic, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-base px-4 py-2 cursor-pointer hover:bg-primary/20 transition-colors rounded-lg border-border"
                        onClick={() => handleTrendClick(topic)}
                      >
                        {topic}
                      </Badge>
                    ))
                  )}
                </div>
              </div>

              <Button type="submit" disabled={isLoading} size="lg" className="w-full text-lg font-bold rounded-lg h-14 bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300">
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
                Generate Ideas
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mt-12"
          >
              <h2 className="text-3xl font-bold font-headline text-center mb-8">
                Here are your fresh ideas!
              </h2>
              <div className="space-y-4">
                {isLoading &&
                    [...Array(3)].map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}

                  {!isLoading && ideas.map((idea, index) => (
                      <ResultCard 
                          key={`${idea}-${index}`}
                          idea={idea}
                          index={index}
                          onCopy={handleCopyToClipboard}
                          isCopied={copiedIdea === idea}
                      />
                  ))}
              </div>
              {!isLoading && hashtags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8"
              >
                <h3 className="text-2xl font-bold font-headline text-center mb-4">
                  Trending Hashtags
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {hashtags.map((tag, index) => (
                    <motion.div
                        key={tag}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Badge
                        variant="secondary"
                        className="text-base px-4 py-2 cursor-pointer hover:bg-secondary/80 transition-colors rounded-lg border-border"
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
      </AnimatePresence>
    </>
  );
}
