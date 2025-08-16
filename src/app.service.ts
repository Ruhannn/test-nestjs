import { google } from '@ai-sdk/google';
import { Injectable } from '@nestjs/common';
import { generateText } from 'ai';

@Injectable()
export class AppService {
  async askAI(sentence: string): Promise<string> {
    try {
      const { text } = await generateText({
        model: google('gemini-2.5-pro'),
        system: `You are an expert English editor.
- The user will give sentences that may contain spelling and grammar errors.
- First prioritize correcting spelling mistakes.
- Then fix grammar where necessary.
- If they use punctuation (e.g., full stops, commas), keep it.
- If they omit punctuation, do not add it unnecessarily.
- Maintain the original capitalization style
- Return ONLY the corrected sentence (no explanations, no extra text, no surrounding quotes).`,
        prompt: `Please correct the following sentence and return ONLY the corrected sentence:\n\n${sentence}`,
        temperature: 0,
      });
      return text;
    } catch (error) {
      console.error('AI Error:', error);
      return error;
    }
  }
}
