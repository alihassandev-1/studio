'use server';
/**
 * @fileOverview Generates platform-specific trending topics.
 *
 * - generateTrendingTopics - A function that generates trending topics.
 * - GenerateTrendingTopicsInput - The input type for the generateTrendingTopics function.
 * - GenerateTrendingTopicsOutput - The return type for the generateTrendingTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTrendingTopicsInputSchema = z.object({
  platform: z
    .enum(['Blog', 'Instagram', 'TikTok', 'YouTube', 'Facebook', 'X'])
    .describe('The platform to find trending topics for.'),
  currentYear: z.number().describe('The current year to get the most relevant and timely topics.'),
});
export type GenerateTrendingTopicsInput = z.infer<
  typeof GenerateTrendingTopicsInputSchema
>;

const GenerateTrendingTopicsOutputSchema = z.object({
  topics: z
    .array(z.string())
    .describe(
      'An array of 4-5 trending topics (keywords, not hashtags) for the specified platform.'
    ),
});
export type GenerateTrendingTopicsOutput = z.infer<
  typeof GenerateTrendingTopicsOutputSchema
>;

export async function generateTrendingTopics(
  input: GenerateTrendingTopicsInput
): Promise<GenerateTrendingTopicsOutput> {
  return generateTrendingTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTrendingTopicsPrompt',
  input: {schema: GenerateTrendingTopicsInputSchema},
  output: {schema: GenerateTrendingTopicsOutputSchema},
  prompt: `You are an expert in real-time social media trends in Pakistan. Your goal is to provide hyper-current and popular topics that are buzzing right now.

  Generate 4-5 trending topics for the {{platform}} platform, specifically for a Pakistani audience. The current year is {{currentYear}}.
  
  **Crucially, the topics must be from *today* or *this week*.** Do not, under any circumstances, provide topics that were popular months or years ago, even if they were significant. Avoid evergreen or general topics. Your focus is exclusively on what is buzzing at this very moment. Do not include hashtags (#).
  
  Examples of the *type* of timely topics to look for:
  - For YouTube: "New Government Policy Announcement", "Pakistani Drama Episode 25 Review", "Latest Cricket Match Highlights"
  - For TikTok: "Viral Food Challenge", "New Cafe in Karachi", "Eid Shopping Haul 2024"

  Do not include any introductory or concluding sentences. Only provide the list of topics.
  `,
});

const generateTrendingTopicsFlow = ai.defineFlow(
  {
    name: 'generateTrendingTopicsFlow',
    inputSchema: GenerateTrendingTopicsInputSchema,
    outputSchema: GenerateTrendingTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      topics: output!.topics,
    };
  }
);
