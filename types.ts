
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
    id: 'horse-gallop',
    name: '2026 · 跃马扬鞭',
    description: '在元旦清晨开启第一步，捕捉内心深处奔腾的执行力与勇气。',
    icon: 'fa-horse-head',
    positions: [
      { label: '起跑原动力', description: '过去积累的经验中，能让你在新的一年瞬间加速的动力。' },
      { label: '跨越的节奏', description: '此刻你最需要调整的心理节奏或最想突破的障碍。' },
      { label: '奔腾的终点', description: '2026年终，你期待自己抵达的那片壮阔草场。' }
    ]
  },
  {
    id: 'vitality-boost',
    name: '开年 · 龙马精神',
    description: '发现如何以最饱满、最阳光的状态，驰骋在2026的人生赛道。',
    icon: 'fa-sun',
    positions: [
      { label: '自信之源', description: '你性格中如良驹般矫健、充满生命力的核心闪光点。' },
      { label: '正向交互', description: '新的一年，你与周围的人和环境产生正能量连接的方式。' },
      { label: '辉煌志向', description: '你期待中那个无所畏惧、勇往直前的自我形象。' }
    ]
  },
  {
    id: 'vision-steed',
    name: '宏图 · 千里之志',
    description: '从细微的觉察中发现宏大的蓝图，为马年的每一项计划注入远见。',
    icon: 'fa-compass',
    positions: [
      { label: '稳固基石', description: '目前的资源和环境，你起跑前最坚实的基础。' },
      { label: '远方召唤', description: '2026年里最吸引你的机遇或让你感到使命感的召唤。' },
      { label: '达成庆典', description: '当你实现目标时，内心那份充盈的成就感与快乐。' }
    ]
  }
];
