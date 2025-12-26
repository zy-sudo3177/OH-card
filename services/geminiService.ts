
import { RemedyResult, CardSelection } from "../types";
import { TAROT_DECK, REMEDY_TEMPLATES } from "../data/staticData";

export class AlchemistService {
  getTarotDeck() {
    return [...TAROT_DECK];
  }

  getAllRemedies() {
    return [...REMEDY_TEMPLATES];
  }

  calculateRemedyIndex(selections: CardSelection[]): number {
    const sumIds = selections.reduce((acc, curr) => acc + curr.card.id, 0);
    return sumIds % REMEDY_TEMPLATES.length;
  }

  // 纯本地逻辑，无延时，直接根据选牌映射结果
  async generateRemedy(selections: CardSelection[]): Promise<RemedyResult> {
    const idx = this.calculateRemedyIndex(selections);
    return Promise.resolve(REMEDY_TEMPLATES[idx]);
  }
}

export const alchemistService = new AlchemistService();
