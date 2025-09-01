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
  prompt: `You are an expert in social media trends in Pakistan.

  Generate 4-5 trending topics for the {{platform}} platform, specifically for a Pakistani audience.
  
  The topics should be short keywords or phrases that are currently popular. Do not include hashtags (#).
  
  Examples:
  - For YouTube: "PSL 2025 Highlights", "Pakistani Drama Reviews", "Travel Vlogs Murree"
  - For TikTok: "Viral Dance Challenge", "Street Food Karachi", "Funny Skits"

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
