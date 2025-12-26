
import { GoogleGenAI, Type } from "@google/genai";
import { RemedyResult, Spread } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateOHCards(count: number = 3): Promise<string[]> {
    // 极简 Prompt 提高 Flash 模型响应速度
    const prompt = `Abstract digital art for psychological OH card. 2026 New Year, Year of the Horse, vitality, rising sun, minimalist, bright colors, optimistic energy. No text.`;

    const tasks = Array.from({ length: count }).map(async (_, idx) => {
      try {
        const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        const response = await aiInstance.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt + ` seed:${Math.random()}` }] },
          config: { imageConfig: { aspectRatio: "3:4" } }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
        }
        throw new Error("No image");
      } catch (err) {
        console.warn(`Card ${idx} generation failed, using optimized fallback.`);
        const fallbacks = [
          'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1598974357851-98166a9d9b4c?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&w=600&q=80'
        ];
        return fallbacks[idx % fallbacks.length];
      }
    });

    return Promise.all(tasks);
  }

  async generateRemedy(cards: any[], spread: Spread): Promise<RemedyResult> {
    const summary = cards.map(c => `- ${c.positionLabel}: "${c.interpretation}"`).join('\n');

    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await aiInstance.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `用户正在进行 2026 马年元旦心理觉察。
根据以下感悟，调制一杯“元气能量饮”：
${summary}

输出纯中文 JSON：
{
  "name": "极具动力的特调名称",
  "description": "100字以内的励志描述",
  "ingredients": ["3个诗意的活力成分"],
  "vibe": "一句充满马年精神的座右铭"
}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            vibe: { type: Type.STRING }
          },
          required: ["name", "description", "ingredients", "vibe"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  }
}

export const geminiService = new GeminiService();
