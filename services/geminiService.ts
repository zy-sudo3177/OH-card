
import { RemedyResult, CardSelection } from "../types";
import { TAROT_DECK, REMEDY_TEMPLATES } from "../data/staticData";

export class AlchemistService {
  getTarotDeck() {
    return [...TAROT_DECK];
  }

  // 纯本地逻辑，无延时，直接根据选牌映射结果
  async generateRemedy(selections: CardSelection[]): Promise<RemedyResult> {
    // 简单哈希算法：ID之和 % 模版数量
    const sumIds = selections.reduce((acc, curr) => acc + curr.card.id, 0);
    const resultIndex = sumIds % REMEDY_TEMPLATES.length;
    return Promise.resolve(REMEDY_TEMPLATES[resultIndex]);
  }
}

export const alchemistService = new AlchemistService();
