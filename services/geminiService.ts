
import { GoogleGenAI, Type } from "@google/genai";
import { RemedyResult, CardSelection } from "../types";

export class AlchemistService {
  // 选取更符合 40+ 人群审美的意象图：山川、道路、大树、日出、静水、丰收
  getOHDeck() {
    return [
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=800", // 晨曦/希望
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800", // 远山/胸怀
      "https://images.unsplash.com/photo-1501854140884-074bf86ed91c?q=80&w=800", // 宁静湖面/心如止水
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800", // 森林透光/机遇
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800", // 雾中风景/探索
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=800", // 苍劲大树/根基
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800", // 田野/丰收
      "https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=800", // 日出/新生
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800", // 大海/包容
      "https://images.unsplash.com/photo-1542259659439-d42376c94421?q=80&w=800"  // 蜿蜒道路/人生路
    ];
  }

  async generateRemedy(selections: CardSelection[]): Promise<RemedyResult> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    // 构建更接地气的上下文
    const context = selections.map(s => `${s.meaning}（选择了${s.selectedColor}色）：${s.userText}`).join('；');

    const textTask = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `用户是一位阅历丰富的朋友，正在回顾人生（过去、现在、未来）并展望 2026 马年。
他的人生感悟是：${context}。
请你作为一位“老友”或“智者”，为他斟上一杯“2026 开运特调”。
要求：
1. **酒/茶名**：要大气、吉利，如“鹏程万里茶”、“岁月静好酒”、“马到成功饮”。
2. **解读**：不要用玄乎的词（如“量子、能量”）。要用通俗、温暖、有哲理的语言，结合“过去积累、当下奋斗、未来期许”，字数 120 字左右。
3. **成分**：使用具象的、美好的事物，如“五年的陈酿”、“初春的雨前茶”、“午后的暖阳”。
4. **寄语**：一句送给 2026 马年的吉利话，适合发朋友圈。

输出 JSON：
{
  "name": "特调名称",
  "description": "人生解读",
  "ingredients": ["成分1", "成分2", "成分3"],
  "vibe": "马年吉利话"
}`,
      config: {
        thinkingConfig: { thinkingBudget: 1000 },
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

    // 图像生成：更加写实、温暖、高级感，适合中年审美（茶具、酒具、琥珀色、玉色）
    const imgTask = ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `A high-end commercial photography shot of a cup of premium tea or amber whiskey or glowing herbal drink. The liquid is clear and inviting. The cup is elegant (crystal or fine porcelain). The background is warm, zen, and minimalist, suggesting wealth and peace. Subtle hints of 2026 Horse Year elements (like a galloping shadow or horse ornament nearby). Warm lighting, 8k resolution, photorealistic.` }] 
      },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });

    try {
      const [textRes, imgRes] = await Promise.allSettled([textTask, imgTask]);
      let result: RemedyResult;
      
      if (textRes.status === 'fulfilled') {
        result = JSON.parse(textRes.value.text || '{}');
      } else {
        throw new Error("Text Fail");
      }

      if (imgRes.status === 'fulfilled') {
        for (const part of imgRes.value.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            result.cocktailImageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }
      
      if (!result.cocktailImageUrl) {
        result.cocktailImageUrl = "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800";
      }

      return result;
    } catch (e) {
      return {
        name: "岁月回甘 · 2026",
        description: "人生如茶，沉浮之间方显本色。过去的经历是茶底，当下的努力是沸水，未来的甘甜正在酝酿。这杯茶敬你走过的路，也敬你即将迎来的锦绣前程。",
        ingredients: ["三钱过往的阅历", "一两当下的从容", "满杯未来的福气"],
        vibe: "2026 马年，愿您身体康健，阖家幸福，万事顺遂。",
        cocktailImageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800"
      };
    }
  }
}

export const alchemistService = new AlchemistService();
