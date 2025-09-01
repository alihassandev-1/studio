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
  prompt: `You are an expert in real-time social media trends in Pakistan. Your goal is to provide the most current and popular topics.

  Generate 4-5 trending topics for the {{platform}} platform, specifically for a Pakistani audience.
  The current year is {{currentYear}}.
  
  The topics should be short keywords or phrases that are currently popular *today* or *this week*. Do not provide evergreen or general topics. Focus on what is buzzing right now. Do not include hashtags (#).
  
  Examples:
  - For YouTube: "New Government Policy", "Pakistani Drama Episode 25", "Travel Vlogs Hunza"
  - For TikTok: "Latest Viral Dance", "New Food Spot in Lahore", "Eid Shopping Haul"

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
