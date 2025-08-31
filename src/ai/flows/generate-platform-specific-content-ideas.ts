'use server';
/**
 * @fileOverview Generates platform-specific content ideas based on a topic and selected platform.
 *
 * - generatePlatformSpecificContentIdeas - A function that generates content ideas.
 * - GeneratePlatformSpecificContentIdeasInput - The input type for the generatePlatformSpecificContentIdeas function.
 * - GeneratePlatformSpecificContentIdeasOutput - The return type for the generatePlatformSpecificContentIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePlatformSpecificContentIdeasInputSchema = z.object({
  topic: z.string().describe('The topic to generate content ideas for.'),
  platform: z
    .enum(['Blog', 'Instagram', 'TikTok', 'YouTube', 'Facebook', 'X'])
    .describe('The platform to tailor content ideas for.'),
  currentYear: z.number().describe('The current year.'),
});
export type GeneratePlatformSpecificContentIdeasInput = z.infer<
  typeof GeneratePlatformSpecificContentIdeasInputSchema
>;

const GeneratePlatformSpecificContentIdeasOutputSchema = z.object({
  ideas: z
    .array(z.string())
    .describe('An array of content ideas tailored for the specified platform.'),
  hashtags: z
    .array(z.string())
    .describe('An array of 5 relevant hashtags for the topic.'),
});
export type GeneratePlatformSpecificContentIdeasOutput = z.infer<
  typeof GeneratePlatformSpecificContentIdeasOutputSchema
>;

export async function generatePlatformSpecificContentIdeas(
  input: GeneratePlatformSpecificContentIdeasInput
): Promise<GeneratePlatformSpecificContentIdeasOutput> {
  return generatePlatformSpecificContentIdeasFlow(input);
}

const generatePlatformSpecificContentIdeasPrompt = ai.definePrompt({
  name: 'generatePlatformSpecificContentIdeasPrompt',
  input: {schema: GeneratePlatformSpecificContentIdeasInputSchema},
  output: {schema: GeneratePlatformSpecificContentIdeasOutputSchema},
  prompt: `You are a content creation expert specializing in generating trending content ideas for various platforms in Pakistan.

  Generate 3-5 content ideas tailored for {{platform}} based on the topic: '{{topic}}'.
  The ideas should be relevant and engaging for a Pakistani audience. The current year is {{currentYear}}. Avoid referencing past years unless the user's topic explicitly asks for it.

  Adhere to the following word count guidelines for each idea:
  - Blog: A descriptive and engaging headline (10-15 words).
  - Instagram: A catchy caption starter (15-25 words).
  - TikTok: A short, viral video concept (under 15 words).
  - YouTube: A compelling video title (under 15 words).
  - Facebook: An engaging post idea (20-30 words).
  - X: A concise tweet idea (under 20 words).
  
  Also, generate 5 relevant hashtags for the topic.

  Do not include introductory or concluding sentences. Only include the numbered list of ideas and the hashtags.
  `,
});

const generatePlatformSpecificContentIdeasFlow = ai.defineFlow(
  {
    name: 'generatePlatformSpecificContentIdeasFlow',
    inputSchema: GeneratePlatformSpecificContentIdeasInputSchema,
    outputSchema: GeneratePlatformSpecificContentIdeasOutputSchema,
  },
  async input => {
    const {output} = await generatePlatformSpecificContentIdeasPrompt(input);
    return {
      ideas: output!.ideas,
      hashtags: output!.hashtags,
    };
  }
);
