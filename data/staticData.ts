
import { TarotCard, RemedyResult } from "../types";

// 标准塔罗大阿卡纳 (Rider-Waite Deck) - 使用公有领域经典原版图片
export const TAROT_DECK: TarotCard[] = [
  { 
    id: 0, 
    name: "THE FOOL · 愚人", 
    meaning: "新的开始，无限可能，像孩子一样天真与冒险。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" 
  },
  { 
    id: 1, 
    name: "THE MAGICIAN · 魔术师", 
    meaning: "创造力，自信，你拥有实现目标所需的一切资源。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" 
  },
  { 
    id: 2, 
    name: "THE HIGH PRIESTESS · 女祭司", 
    meaning: "直觉，潜意识，倾听内心的声音，保持神秘与冷静。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg" 
  },
  { 
    id: 3, 
    name: "THE EMPRESS · 皇后", 
    meaning: "丰盛，母性，感官享受，拥抱生活中的美与富足。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg" 
  },
  { 
    id: 4, 
    name: "THE EMPEROR · 皇帝", 
    meaning: "结构，权威，领导力，建立秩序并坚定地执行计划。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg" 
  },
  { 
    id: 5, 
    name: "THE HIEROPHANT · 教皇", 
    meaning: "传统，学习，精神指引，尊重既有的智慧与规则。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg" 
  },
  { 
    id: 6, 
    name: "THE LOVERS · 恋人", 
    meaning: "爱，和谐，选择，在关系中寻找平衡与真实的自我。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg" 
  },
  { 
    id: 7, 
    name: "THE CHARIOT · 战车", 
    meaning: "意志力，胜利，决心，驾驭矛盾的力量冲向目标。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg" 
  },
  { 
    id: 8, 
    name: "STRENGTH · 力量", 
    meaning: "勇气，耐心，内在力量，以柔克刚的智慧。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg" 
  },
  { 
    id: 9, 
    name: "THE HERMIT · 隐士", 
    meaning: "反思，独处，内省，暂时退出喧嚣寻找内心的光。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg" 
  },
  { 
    id: 10, 
    name: "WHEEL OF FORTUNE · 命运之轮", 
    meaning: "改变，循环，机遇，接受生命的起伏，顺势而为。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" 
  },
  { 
    id: 11, 
    name: "JUSTICE · 正义", 
    meaning: "公平，真理，因果，理智地权衡利弊，做出公正的决定。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg" 
  },
  { 
    id: 12, 
    name: "THE HANGED MAN · 倒吊人", 
    meaning: "换位思考，牺牲，等待，从不同的角度看世界。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg" 
  },
  { 
    id: 13, 
    name: "DEATH · 死神", 
    meaning: "结束，转化，重生，告别旧的模式，迎接新的篇章。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg" 
  },
  { 
    id: 14, 
    name: "TEMPERANCE · 节制", 
    meaning: "平衡，适度，融合，在极端之间寻找和谐的中庸之道。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg" 
  },
  { 
    id: 15, 
    name: "THE DEVIL · 恶魔", 
    meaning: "束缚，诱惑，物质主义，正视内心的阴影与欲望。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg" 
  },
  { 
    id: 16, 
    name: "THE TOWER · 高塔", 
    meaning: "突变，觉醒，打破，旧的不去新的不来，在废墟中重建。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg" 
  },
  { 
    id: 17, 
    name: "THE STAR · 星星", 
    meaning: "希望，灵感，治愈，即使在黑夜中也能看到指引的光。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg" 
  },
  { 
    id: 18, 
    name: "THE MOON · 月亮", 
    meaning: "幻觉，潜意识，不安，在迷雾中相信直觉的指引。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg" 
  },
  { 
    id: 19, 
    name: "THE SUN · 太阳", 
    meaning: "快乐，成功，活力，像孩子一样单纯地享受当下的温暖。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg" 
  },
  { 
    id: 20, 
    name: "JUDGEMENT · 审判", 
    meaning: "觉醒，召唤，决断，听从内心的呼唤，做出重要改变。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg" 
  },
  { 
    id: 21, 
    name: "THE WORLD · 世界", 
    meaning: "圆满，达成，整合，一个周期的结束与新旅程的开始。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg" 
  }
];

// 15款精选年会特调 (固定图片源，确保高质量加载)
export const REMEDY_TEMPLATES: RemedyResult[] = [
  {
    name: "破晓 · Gin Fizz",
    subName: "新年启程 (New Beginning)",
    description: "金酒的冷冽与气泡的升腾，象征着新一年的清醒与活力。既然抽到了这张牌，说明你已经准备好迎接新的挑战。干了这杯，万象更新。",
    ingredients: ["孟买蓝宝石金酒", "鲜榨柠檬汁", "强劲气泡", "蛋白霜"],
    actionItem: "Action: 在年会合影中占据C位。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1551024709-8f673c6c17f6?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "涅槃 · Old Fashioned",
    subName: "经典复刻 (Classic)",
    description: "经过时间的沉淀，越发醇厚。这杯酒敬你过去的积累，所有的经验都将成为新年的燃料。稳扎稳打，步步高升。",
    ingredients: ["陈年波本威士忌", "苦精", "方糖", "橙皮"],
    actionItem: "Action: 与老同事碰杯，互道感谢。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "生机 · Mojito",
    subName: "无限生长 (Growth)",
    description: "薄荷的清凉与青柠的酸爽，寓意永远年轻，永远热泪盈眶。新的一年，愿你的事业如这抹绿色般野蛮生长。",
    ingredients: ["白朗姆酒", "新鲜薄荷", "青柠", "苏打水"],
    actionItem: "Action:许下一个关于‘成长’的新年愿望。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "硬汉 · Whiskey Sour",
    subName: "坚韧不拔 (Grit)",
    description: "酸甜平衡，口感厚重。生活会有酸涩，但回甘更甜。这杯酒，敬那些默默耕耘、不轻言放弃的实干家。新年快乐！",
    ingredients: ["黑麦威士忌", "柠檬汁", "糖浆", "蛋白液"],
    actionItem: "Action: 为自己鼓一次掌。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "深蓝 · Blue Lagoon",
    subName: "心如大海 (Ocean Heart)",
    description: "深邃的蓝，象征着广阔的胸怀与无限的可能。2026年，愿你乘风破浪，直挂云帆济沧海。",
    ingredients: ["伏特加", "蓝橙力娇酒", "雪碧", "柠檬片"],
    actionItem: "Action: 发一条朋友圈，配图是蓝色大海或天空。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1560526860-1f0e56046c85?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "庆典 · Champagne",
    subName: "欢庆时刻 (Celebration)",
    description: "升腾的气泡，是纯粹的喜悦。今晚不谈工作，只谈快乐。允许自己尽情大笑，为了过去一年的不易，也为了未来的无限可能。",
    ingredients: ["干型香槟", "方糖", "安格斯特拉苦精"],
    actionItem: "Action: 大声喊出一句‘新年快乐’！",
    cocktailImageUrl: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "觉醒 · Espresso Martini",
    subName: "能量满满 (Full Power)",
    description: "咖啡因与酒精的碰撞，唤醒沉睡的潜能。2026年，愿你精力充沛，火力全开，在该冲锋时全速前进！",
    ingredients: ["伏特加", "咖啡力娇酒", "浓缩咖啡", "咖啡豆"],
    actionItem: "Action: 今晚做那个最嗨的派对动物。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1616447547198-d784eb923485?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "通透 · Dry Martini",
    subName: "洞见未来 (Vision)",
    description: "极简，通透，烈。这杯酒敬你敏锐的洞察力。在复杂的环境中，保持清醒的头脑，看清未来的方向。",
    ingredients: ["金酒", "干味美思", "橄榄"],
    actionItem: "Action: 立下一个清晰的年度Flag。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "日出 · Tequila Sunrise",
    subName: "旭日东升 (Sunrise)",
    description: "从红到黄的渐变，如日出东方。这杯酒，预祝你2026年如旭日东升，光芒万丈，红红火火。",
    ingredients: ["龙舌兰", "橙汁", "红石榴糖浆"],
    actionItem: "Action: 笑着说出你的新年愿望。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1525268323846-d867316d51e9?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "醇厚 · Cabernet",
    subName: "品味人生 (Savoring)",
    description: "红酒的单宁，需要细品。工作要快，生活要慢。不要匆忙赶路，停下来，品味这一刻的成功与团聚。",
    ingredients: ["赤霞珠红酒", "醒酒器", "高脚杯"],
    actionItem: "Action: 细细品味一口酒，享受当下。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "仙境 · Absinthe",
    subName: "奇思妙想 (Curiosity)",
    description: "绿色的精灵，迷幻而神秘。新的一年，试着打破常规，做一些以前从未做过的尝试，去探索未知的精彩。",
    ingredients: ["苦艾酒", "方糖", "冰水滴漏"],
    actionItem: "Action: 尝试一款从未喝过的饮料。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "给予 · Mimosa",
    subName: "乐于分享 (Sharing)",
    description: "橙汁与香槟的分享。分享快乐，快乐会加倍。你的善意，最终会汇聚成你的运气。新年快乐，Cheers!",
    ingredients: ["鲜橙汁", "香槟", "橙片"],
    actionItem: "Action: 为身边的人倒满酒杯。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "橙光 · Aperol Spritz",
    subName: "积极乐观 (Optimism)",
    description: "意大利的阳光，明媚的橙色。爱笑的人运气都不会太差。保持乐观的心态，你眼中的2026将充满机会。",
    ingredients: ["阿佩罗开胃酒", "普罗塞克", "苏打水", "橙片"],
    actionItem: "Action: 对着镜头比个耶。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "禅意 · Matcha Gin",
    subName: "活在当下 (Mindfulness)",
    description: "抹茶的微苦与回甘。不念过往，不畏将来，专注于此时此刻的酒香、人声、欢笑。新年快乐，岁岁平安。",
    ingredients: ["抹茶粉", "金酒", "汤力水", "竹叶"],
    actionItem: "Action: 享受当下的这一口酒。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1533036933333-d863372c2195?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "太极 · White Russian",
    subName: "完美平衡 (Balance)",
    description: "咖啡与奶油的交融，黑白分明又浑然一体。工作与生活，动态平衡。祝你事业生活双丰收，幸福美满。",
    ingredients: ["伏特加", "咖啡力娇酒", "鲜奶油"],
    actionItem: "Action: 享受此刻的惬意。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1583577610738-9580cb035889?q=80&w=800&auto=format&fit=crop"
  }
];
