
export enum AppStep {
  WELCOME = 'WELCOME',
  SELECT_SPREAD = 'SELECT_SPREAD',
  DRAWING = 'DRAWING',
  INTERPRETATION = 'INTERPRETATION',
  MIXING = 'MIXING',
  REMEDY = 'REMEDY'
}

export interface SpreadPosition {
  label: string;
  description: string;
}

export interface Spread {
  id: string;
  name: string;
  description: string;
  icon: string;
  positions: SpreadPosition[];
}

export interface OHCard {
  id: string;
  positionLabel: string;
  positionDescription: string;
  imageUrl: string;
  interpretation: string;
  selectedColor: string;
  extractedColors: string[];
  isFlipped: boolean;
}

export interface RemedyResult {
  name: string;
  description: string;
  ingredients: string[];
  vibe: string;
}

export const SPREADS: Spread[] = [
  {
    id: 'spring-renewal',
    name: '辞旧迎新',
    description: '审视过往岁月的积淀，在这个春天寻找破土而出的新生命力。',
    icon: 'fa-sun',
    positions: [
      { label: '岁月的余韵', description: '过去一年留在心底最深的印记。' },
      { label: '立春的觉察', description: '此刻你内心正在复苏的愿望。' },
      { label: '盛放的可能', description: '未来一年生命最绚烂的指向。' }
    ]
  },
  {
    id: 'inner-wealth',
    name: '丰盈内在',
    description: '探索新年的精神财富，审视自己与世界的连接厚度。',
    icon: 'fa-coins',
    positions: [
      { label: '珍视的资源', description: '你内心已经拥有的核心力量。' },
      { label: '流动的连接', description: '你与外界交互中最真实的场域。' },
      { label: '丰盛的愿景', description: '理想中自我实现的圆满状态。' }
    ]
  },
  {
    id: 'harmony-field',
    name: '阖家场域',
    description: '在团圆的时刻，觉察血缘与情感连接中的温暖与流动。',
    icon: 'fa-house-chimney-window',
    positions: [
      { label: '归处的暖意', description: '家赋予你的最坚实的心理支柱。' },
      { label: '互动的投射', description: '在亲密关系中你最真实的投射。' },
      { label: '和解的契机', description: '那些可以达成共鸣与谅解的关键。' }
    ]
  }
];
