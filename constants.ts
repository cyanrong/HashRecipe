import { Recipe, HistoryItem, Language, Algorithm } from './types';

export const TRANSLATIONS = {
  en: {
    navbar: {
      title: "HashRecipe",
      subtitle: "CROSS-MODAL DISCOVERY",
      login: "Login / Register",
      account: "Account",
      profile: "My Profile",
      history: "Retrieval History",
      logout: "Sign Out",
      metrics: { index: "INDEX", hash: "HASH", latency: "LATENCY" }
    },
    hero: {
      titleStart: "Discover Recipes with",
      titleEnd: "Deep Hashing Intelligence",
      subtitle: "Experience ultra-fast cross-modal retrieval. Search by ingredients, taste, or simply upload a photo of a dish you crave.",
      tabText: "Text Search",
      tabImage: "Image Search",
      placeholderText: "E.g., Low carb spicy noodle soup...",
      placeholderImage: "Drop food image or click to upload",
      algoDSH: "Algorithm: DSH (Fast)",
      algoCLIP: "Algorithm: CLIP (Accurate)",
      searchBtn: "Search",
      searching: "Retrieving..."
    },
    feed: {
      recommended: "Recommended for you",
      results: "results",
      retrieving: "Retrieving..."
    },
    card: {
      viewDetails: "View Details",
      kcal: "kcal",
      min: "m"
    },
    modal: {
      calories: "Calories",
      cookTime: "Cook Time",
      ingredientsCount: "Ingredients",
      ingredientsLabel: "Ingredients",
      instructionsLabel: "Instructions",
      startCooking: "Start Cooking Mode",
      hashId: "HASH",
      id: "ID"
    },
    profile: {
      collections: "Collections",
      searches: "Searches",
      myCollections: "My Collections",
      empty: "You haven't liked any recipes yet.",
      startExploring: "Start Exploring",
      accountType: "Pro Chef"
    },
    history: {
      title: "Retrieval History",
      subtitle: "Track your cross-modal search footprints",
      export: "Export CSV",
      headers: {
        timestamp: "Timestamp",
        query: "Query Input",
        modality: "Modality",
        algorithm: "Algorithm",
        results: "Results",
        status: "Status"
      },
      empty: "No history found. Start searching!",
      found: "Found",
      success: "Success"
    },
    auth: {
      welcome: "Welcome Back",
      subtitle: "Sign in to sync your culinary journey",
      email: "Email",
      password: "Password",
      signIn: "Sign In"
    },
    footer: {
      copyright: "HashRecipe. Graduation Project."
    }
  },
  zh: {
    navbar: {
      title: "HashRecipe",
      subtitle: "跨模态检索系统",
      login: "登录 / 注册",
      account: "账户",
      profile: "个人主页",
      history: "检索记录",
      logout: "退出登录",
      metrics: { index: "索引量", hash: "哈希位", latency: "检索耗时" }
    },
    hero: {
      titleStart: "探索美食，基于",
      titleEnd: "深度哈希智能检索",
      subtitle: "体验超高速跨模态检索。通过食材、口味描述搜索，或直接上传一张让你垂涎的美食照片。",
      tabText: "文本搜索",
      tabImage: "图片搜索",
      placeholderText: "例如：低卡辣味牛肉面...",
      placeholderImage: "拖拽美食图片或点击上传",
      algoDSH: "算法：DSH (高速)",
      algoCLIP: "算法：CLIP (高精)",
      searchBtn: "搜索",
      searching: "检索中..."
    },
    feed: {
      recommended: "为您推荐",
      results: "条结果",
      retrieving: "正在检索..."
    },
    card: {
      viewDetails: "查看详情",
      kcal: "千卡",
      min: "分钟"
    },
    modal: {
      calories: "卡路里",
      cookTime: "烹饪时长",
      ingredientsCount: "食材数",
      ingredientsLabel: "所需食材",
      instructionsLabel: "烹饪步骤",
      startCooking: "开始烹饪模式",
      hashId: "哈希值",
      id: "编号"
    },
    profile: {
      collections: "收藏夹",
      searches: "搜索次数",
      myCollections: "我的收藏",
      empty: "您还没有收藏任何食谱。",
      startExploring: "开始探索",
      accountType: "专业厨师"
    },
    history: {
      title: "检索历史",
      subtitle: "追踪您的跨模态搜索足迹",
      export: "导出 CSV",
      headers: {
        timestamp: "时间戳",
        query: "搜索内容",
        modality: "模态",
        algorithm: "算法",
        results: "结果数",
        status: "状态"
      },
      empty: "暂无历史记录，快去搜索吧！",
      found: "条结果",
      success: "成功"
    },
    auth: {
      welcome: "欢迎回来",
      subtitle: "登录以同步您的美食之旅",
      email: "邮箱",
      password: "密码",
      signIn: "登录"
    },
    footer: {
      copyright: "HashRecipe. 毕业设计作品。"
    }
  }
};

const RECIPES_EN: Recipe[] = [
  {
    id: '1',
    title: 'Avocado Toast with Poached Egg',
    calories: 320,
    timeMinutes: 15,
    ingredients: ['Sourdough Bread', 'Ripe Avocado', 'Large Egg', 'Chili Flakes', 'Lemon Juice'],
    instructions: ['Toast the bread.', 'Mash avocado with lemon juice.', 'Poach the egg for 4 minutes.', 'Assemble and season.'],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414395d8?auto=format&fit=crop&q=80&w=800',
    hashCode: '10110011010101101000101101010100',
    tags: ['Breakfast', 'Healthy']
  },
  {
    id: '2',
    title: 'Spicy Miso Ramen',
    calories: 550,
    timeMinutes: 45,
    ingredients: ['Ramen Noodles', 'Miso Paste', 'Chili Oil', 'Pork Belly', 'Green Onions', 'Soft Boiled Egg'],
    instructions: ['Prepare broth with miso.', 'Cook noodles separately.', 'Sear pork belly.', 'Assemble bowl and top with oil.'],
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800',
    hashCode: '00101011011101101001101100010101',
    tags: ['Japanese', 'Spicy']
  },
  {
    id: '3',
    title: 'Grilled Salmon Bowl',
    calories: 480,
    timeMinutes: 25,
    ingredients: ['Salmon Fillet', 'Quinoa', 'Cucumber', 'Edamame', 'Sesame Dressing'],
    instructions: ['Grill salmon skin-side down.', 'Cook quinoa.', 'Slice vegetables.', 'Serve with dressing.'],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=800',
    hashCode: '11110011010100001000101111110100',
    tags: ['Lunch', 'High Protein']
  },
  {
    id: '4',
    title: 'Classic Margherita Pizza',
    calories: 700,
    timeMinutes: 60,
    ingredients: ['Pizza Dough', 'San Marzano Tomatoes', 'Fresh Mozzarella', 'Basil', 'Olive Oil'],
    instructions: ['Stretch dough.', 'Spread crushed tomatoes.', 'Add cheese.', 'Bake at max temp for 8 mins.'],
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
    hashCode: '01010011010101101011101101010100',
    tags: ['Italian', 'Vegetarian']
  },
  {
    id: '5',
    title: 'Berry Smoothie Bowl',
    calories: 280,
    timeMinutes: 10,
    ingredients: ['Frozen Berries', 'Banana', 'Almond Milk', 'Granola', 'Chia Seeds'],
    instructions: ['Blend frozen fruits with milk.', 'Pour into bowl.', 'Top with granola and seeds.'],
    imageUrl: 'https://images.unsplash.com/photo-1626078436418-d426372d80d2?auto=format&fit=crop&q=80&w=800',
    hashCode: '11000011010111101000100001010111',
    tags: ['Breakfast', 'Vegan']
  },
  {
    id: '6',
    title: 'Beef Tacos',
    calories: 450,
    timeMinutes: 30,
    ingredients: ['Corn Tortillas', 'Ground Beef', 'Lime', 'Cilantro', 'Onion', 'Salsa'],
    instructions: ['Season and cook beef.', 'Warm tortillas.', 'Chop onions and cilantro.', 'Serve with lime.'],
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800',
    hashCode: '10110111010101101111101101010000',
    tags: ['Mexican', 'Dinner']
  }
];

const RECIPES_ZH: Recipe[] = [
  {
    id: '1',
    title: '牛油果水波蛋吐司',
    calories: 320,
    timeMinutes: 15,
    ingredients: ['酸面包', '熟牛油果', '大号鸡蛋', '辣椒片', '柠檬汁'],
    instructions: ['烤面包。', '将牛油果与柠檬汁捣碎。', '煮水波蛋4分钟。', '组装并调味。'],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414395d8?auto=format&fit=crop&q=80&w=800',
    hashCode: '10110011010101101000101101010100',
    tags: ['早餐', '健康']
  },
  {
    id: '2',
    title: '辣味味噌拉面',
    calories: 550,
    timeMinutes: 45,
    ingredients: ['拉面', '味噌酱', '辣椒油', '五花肉', '葱', '溏心蛋'],
    instructions: ['用味噌准备肉汤。', '分开煮面条。', '煎五花肉。', '组装碗并淋上油。'],
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800',
    hashCode: '00101011011101101001101100010101',
    tags: ['日式', '辣味']
  },
  {
    id: '3',
    title: '烤三文鱼盖饭',
    calories: 480,
    timeMinutes: 25,
    ingredients: ['三文鱼柳', '藜麦', '黄瓜', '毛豆', '芝麻酱'],
    instructions: ['三文鱼皮朝下烤。', '煮藜麦。', '切蔬菜。', '淋上酱汁上桌。'],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=800',
    hashCode: '11110011010100001000101111110100',
    tags: ['午餐', '高蛋白']
  },
  {
    id: '4',
    title: '经典玛格丽特披萨',
    calories: 700,
    timeMinutes: 60,
    ingredients: ['披萨面团', '圣马扎诺番茄', '新鲜马苏里拉奶酪', '罗勒', '橄榄油'],
    instructions: ['拉伸面团。', '涂抹碎番茄。', '加入奶酪。', '最高温烘烤8分钟。'],
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
    hashCode: '01010011010101101011101101010100',
    tags: ['意式', '素食']
  },
  {
    id: '5',
    title: '莓果果昔碗',
    calories: 280,
    timeMinutes: 10,
    ingredients: ['冷冻莓果', '香蕉', '杏仁奶', '格兰诺拉麦片', '奇亚籽'],
    instructions: ['将冷冻水果与牛奶混合。', '倒入碗中。', '撒上麦片和种子。'],
    imageUrl: 'https://images.unsplash.com/photo-1626078436418-d426372d80d2?auto=format&fit=crop&q=80&w=800',
    hashCode: '11000011010111101000100001010111',
    tags: ['早餐', '纯素']
  },
  {
    id: '6',
    title: '牛肉塔可',
    calories: 450,
    timeMinutes: 30,
    ingredients: ['玉米饼', '牛肉末', '青柠', '香菜', '洋葱', '莎莎酱'],
    instructions: ['调味并烹饪牛肉。', '加热玉米饼。', '切洋葱和香菜。', '配青柠上桌。'],
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800',
    hashCode: '10110111010101101111101101010000',
    tags: ['墨西哥', '晚餐']
  }
];

export const getMockRecipes = (lang: Language): Recipe[] => {
  return lang === 'zh' ? RECIPES_ZH : RECIPES_EN;
};

export const INITIAL_HISTORY: HistoryItem[] = [
  { id: 'h1', timestamp: '2023-10-24 10:30', query: 'Healthy Breakfast', type: 'TEXT', algorithm: Algorithm.DSH, resultsCount: 12 },
  { id: 'h2', timestamp: '2023-10-23 18:45', query: 'IMG_2023.jpg', type: 'IMAGE', algorithm: Algorithm.CLIP, resultsCount: 5 },
  { id: 'h3', timestamp: '2023-10-22 14:15', query: 'Spicy Noodle', type: 'TEXT', algorithm: Algorithm.DSH, resultsCount: 8 },
];