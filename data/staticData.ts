
import { TarotCard, RemedyResult } from "../types";

// 标准塔罗大阿卡纳 (Rider-Waite Deck) - 使用公有领域经典原版图片
export const TAROT_DECK: TarotCard[] = [
  { id: 0, name: "THE FOOL · 愚人", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" },
  { id: 1, name: "THE MAGICIAN · 魔术师", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" },
  { id: 2, name: "THE HIGH PRIESTESS · 女祭司", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg" },
  { id: 3, name: "THE EMPRESS · 皇后", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg" },
  { id: 4, name: "THE EMPEROR · 皇帝", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg" },
  { id: 5, name: "THE HIEROPHANT · 教皇", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg" },
  { id: 6, name: "THE LOVERS · 恋人", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg" },
  { id: 7, name: "THE CHARIOT · 战车", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg" },
  { id: 8, name: "STRENGTH · 力量", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg" },
  { id: 9, name: "THE HERMIT · 隐士", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg" },
  { id: 10, name: "WHEEL OF FORTUNE · 命运之轮", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
  { id: 11, name: "JUSTICE · 正义", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg" },
  { id: 12, name: "THE HANGED MAN · 倒吊人", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg" },
  { id: 13, name: "DEATH · 死神", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg" },
  { id: 14, name: "TEMPERANCE · 节制", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg" },
  { id: 15, name: "THE DEVIL · 恶魔", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg" },
  { id: 16, name: "THE TOWER · 高塔", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg" },
  { id: 17, name: "THE STAR · 星星", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg" },
  { id: 18, name: "THE MOON · 月亮", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg" },
  { id: 19, name: "THE SUN · 太阳", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg" },
  { id: 20, name: "JUDGEMENT · 审判", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg" },
  { id: 21, name: "THE WORLD · 世界", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg" }
];

// 30款年会特调鸡尾酒 (使用真实的高质量鸡尾酒摄影图)
export const REMEDY_TEMPLATES: RemedyResult[] = [
  // 1-10: 能量与行动
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
    name: "暖阳 · Hot Toddy",
    subName: "温暖连接 (Warmth)",
    description: "温热的威士忌，驱散寒冬。年会不仅是狂欢，更是团聚。这杯酒提醒你：在这场战斗中，你从不孤单，身边皆是伙伴。",
    ingredients: ["威士忌", "蜂蜜", "热水", "肉桂棒"],
    actionItem: "Action: 给好朋友一个大大的拥抱。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1576092768241-dec231844f74?q=80&w=800&auto=format&fit=crop"
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
    name: "温柔 · Baileys Milk",
    subName: "甜蜜宠爱 (Sweetness)",
    description: "丝滑的百利甜，像一个温暖的拥抱。新的一年，记得对自己好一点。工作再忙，也要留点时间给生活，给爱。",
    ingredients: ["百利甜酒", "全脂牛奶", "冰块", "可可粉"],
    actionItem: "Action: 喝完这杯，去吃点甜品。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop"
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
  
  // 11-20: 关系与成长
  {
    name: "岁月 · Aged Rum",
    subName: "智慧沉淀 (Wisdom)",
    description: "橡木桶的陈酿，时间的礼物。智慧不仅仅是经验的积累，更是对生活的深刻理解。这杯酒敬岁月，也敬成长的你。",
    ingredients: ["陈年朗姆酒", "大冰球", "雪茄烟雾(香氛)"],
    actionItem: "Action: 向一位长辈或导师敬酒。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1516535794938-6063878f08cc?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "甜蜜 · Peach Bellini",
    subName: "心怀感恩 (Gratitude)",
    description: "桃子的香甜，生活的小确幸。感恩是提升幸福感最快的方法。感谢团队，感谢平台，感谢那个不放弃的自己。",
    ingredients: ["白桃果泥", "普罗塞克起泡酒", "覆盆子"],
    actionItem: "Action: 发个红包到群里，传递喜气。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1629249727768-45450428d013?q=80&w=800&auto=format&fit=crop"
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
    name: "纯粹 · Neat Scotch",
    subName: "真实自我 (Authentic)",
    description: "不加冰，不加水，纯粹的烈酒。新的一年，愿你活出真我，不戴面具，做最真实、最快乐的自己。",
    ingredients: ["单一麦芽威士忌", "郁金香杯"],
    actionItem: "Action: 分享一个你的真实想法。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=800&auto=format&fit=crop"
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
    name: "凯旋 · Kir Royale",
    subName: "成就达成 (Achievement)",
    description: "黑加仑的甜与香槟的爽。这是一杯庆祝胜利的酒。不论目标大小，每一个里程碑都值得被铭记。祝你新年战无不胜！",
    ingredients: ["黑加仑力娇酒", "香槟", "黑莓"],
    actionItem: "Action: 庆祝你此刻的开心。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "风暴 · Dark 'n' Stormy",
    subName: "辞旧迎新 (Release)",
    description: "黑朗姆与姜汁啤酒的冲撞。喝下这杯烈酒，把去年的烦恼、焦虑、不快统统冲刷干净。轻装上阵，迎接好运。",
    ingredients: ["黑朗姆酒", "姜汁啤酒", "青柠角"],
    actionItem: "Action: 深呼吸，把烦恼吐出去。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1581006155699-2b8744535b9c?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "橙光 · Aperol Spritz",
    subName: "积极乐观 (Optimism)",
    description: "意大利的阳光，明媚的橙色。爱笑的人运气都不会太差。保持乐观的心态，你眼中的2026将充满机会。",
    ingredients: ["阿佩罗开胃酒", "普罗塞克", "苏打水", "橙片"],
    actionItem: "Action: 对着镜头比个耶。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=800&auto=format&fit=crop"
  },

  // 21-30: 境界与格局
  {
    name: "禅意 · Matcha Gin",
    subName: "活在当下 (Mindfulness)",
    description: "抹茶的微苦与回甘。不念过往，不畏将来，专注于此时此刻的酒香、人声、欢笑。新年快乐，岁岁平安。",
    ingredients: ["抹茶粉", "金酒", "汤力水", "竹叶"],
    actionItem: "Action: 享受当下的这一口酒。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1533036933333-d863372c2195?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "本源 · Negroni",
    subName: "寻找意义 (Meaning)",
    description: "苦、甜、烈的三重奏。工作不仅是为了薪水，更是为了寻找意义。愿你在新的一年里，找到属于你的星辰大海。",
    ingredients: ["金酒", "金巴利", "红味美思", "橙皮"],
    actionItem: "Action: 敬我们共同的理想。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "彩虹 · Rainbow Shot",
    subName: "希望之光 (Hope)",
    description: "分层的绚丽色彩。只要心怀希望，哪里都是彩虹。2026年，愿你的生活五彩斑斓，精彩纷呈。",
    ingredients: ["红石榴", "橙汁", "伏特加", "蓝橙"],
    actionItem: "Action: 许下一个彩色的梦。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "翡翠 · Cucumber Gimlet",
    subName: "生机勃勃 (Vitality)",
    description: "黄瓜的清香，沁人心脾。身体是革命的本钱。无论工作多忙，都要照顾好自己。祝你新年身体健康，元气满满！",
    ingredients: ["金酒", "鲜榨青柠汁", "黄瓜片", "糖浆"],
    actionItem: "Action: 约定明天去运动。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1606704044941-7c98007a840e?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "谦逊 · Moscow Mule",
    subName: "虚怀若谷 (Humility)",
    description: "铜杯中的清凉。保持空杯心态，才能装下更多的福气和智慧。三人行，必有我师。新年共勉！",
    ingredients: ["伏特加", "姜汁啤酒", "青柠", "铜杯"],
    actionItem: "Action: 赞美一位身边的伙伴。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1513273379669-70335e80dc6f?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "宁静 · Lavender Gin",
    subName: "从容接纳 (Acceptance)",
    description: "薰衣草的幽香。面对变化，保持内心的平和与柔韧。接纳是改变的开始。愿你新年从容优雅，处变不惊。",
    ingredients: ["薰衣草糖浆", "金酒", "柠檬汁", "苏打水"],
    actionItem: "Action: 碰个杯，说声‘没关系’。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1542259659439-d42376c94421?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "黄金 · Galliano",
    subName: "丰盛富足 (Abundance)",
    description: "金黄色的液体，象征财富与机会。2026年，祝你财源广进，资源如这杯酒般满溢，富足且丰盛。",
    ingredients: ["加利安奴", "橙汁", "奶油"],
    actionItem: "Action: 说一句‘恭喜发财’！",
    cocktailImageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "星空 · Viniq",
    subName: "美好愿景 (Vision)",
    description: "闪烁的珠光，如浩瀚星空。抬头看天，脚踏实地。祝你在新的一年里，梦想成真，星途璀璨。",
    ingredients: ["银河星空酒", "伏特加", "柠檬汽水"],
    actionItem: "Action: 聊聊你对未来的期待。",
    cocktailImageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "海风 · Sea Breeze",
    subName: "宽恕释怀 (Forgiveness)",
    description: "蔓越莓与葡萄柚的酸甜。职场没有永远的敌人，放下恩怨，合作共赢。让内心重获自由，新年新气象。",
    ingredients: ["伏特加", "蔓越莓汁", "葡萄柚汁"],
    actionItem: "Action: 再次加满酒杯，干杯！",
    cocktailImageUrl: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=800&auto=format&fit=crop"
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
