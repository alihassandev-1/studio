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
  prompt: `You are a real-time trend analyst for Pakistan. Your ONLY function is to identify what is currently buzzing on social media.

  Generate 4-5 hyper-current trending topics for the {{platform}} platform, specifically for a Pakistani audience. The current year is {{currentYear}}.

  **Your output MUST be based on trends from TODAY or THIS WEEK.**
  
  **DO NOT:**
  - Provide topics that were popular last month or last year.
  - Provide evergreen topics (e.g., "Food recipes", "Travel vlogs").
  - Provide general topics.
  - Include hashtags (#).
  
  Your focus is exclusively on what is buzzing at this very moment in Pakistan.
  
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
