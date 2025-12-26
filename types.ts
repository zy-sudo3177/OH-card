
export enum AppStep {
  WELCOME = 'WELCOME',
  DRAW_CARDS = 'DRAW_CARDS', // 抽三张牌
  INTERPRET = 'INTERPRET',   // 对三张牌分别解读和选色
  MIXING = 'MIXING',         // 调色融合仪式
  REMEDY = 'REMEDY'          // 最终结果
}

export interface CardSelection {
  imageUrl: string;
  meaning: string; // 时间节点：过去/现在/未来
  userText: string;
  selectedColor: string;
  palette: string[];
}

export interface RemedyResult {
  name: string;
  description: string;
  ingredients: string[];
  vibe: string;
  cocktailImageUrl?: string;
}
