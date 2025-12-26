
import { GoogleGenAI, Type } from "@google/genai";
import { RemedyResult, Spread } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateOHCards(count: number = 3): Promise<string[]> {
    const prompt = `一副心理学OH卡图片，风格为极简、抽象的意象艺术。画面柔和、中性，避免过于强烈的暗示。意象包含：流动的线条、远山的轮廓、平静的水面、或者模糊的人影。色彩自然，具有心理疗愈感。`;

    const tasks = Array.from({ length: count }).map(async () => {
      try {
        const response = await this.ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }]
          },
          config: {
            imageConfig: { aspectRatio: "3:4" }
          }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
        throw new Error("No image data");
      } catch (err) {
        console.warn("Card generation failed, using fallback.", err);
        // 返回一个具有禅意的占位图
        return `https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80`;
      }
    });

    const results = await Promise.all(tasks);
    return results.filter(url => !!url);
  }

  async generateRemedy(cards: any[], spread: Spread): Promise<RemedyResult> {
    const summary = cards.map(c => 
      `${c.positionLabel}（用户联想："${c.interpretation}"，选定色值：${c.selectedColor}）`
    ).join('\n');

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是一位深具同理心的心理咨询师。用户刚刚完成了一次主题为"${spread.name}"的OH卡探索。

【用户投射记录】
${summary}

你的任务是：
1. 尊重并镜像反馈用户的联想。
2. 整合为一杯代表“心理能量整合”的特调饮品。
3. 名字：温柔且有力量。
4. 描述：平和地肯定用户的觉察。
5. 配方：将情绪抽象为生活成分（如“三克觉察的耐心”）。
6. 输出JSON格式。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            ingredients: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
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
