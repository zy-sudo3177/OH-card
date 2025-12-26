
export enum AppStep {
  WELCOME = 'WELCOME',
  DRAW_CARDS = 'DRAW_CARDS',
  INTERPRET = 'INTERPRET',
  REMEDY = 'REMEDY'
}

export interface TarotCard {
  id: number;
  name: string; // 塔罗牌名称 (e.g., The Fool)
  imageUrl: string;
}

export interface CardSelection {
  card: TarotCard;
  index: number;
}

export interface RemedyResult {
  name: string;      // 特调名称
  subName: string;   // 心理学术语
  description: string; // 解读
  ingredients: string[]; // 配方
  actionItem: string; // 行动建议
  cocktailImageUrl: string;
}
