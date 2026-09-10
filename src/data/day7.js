export const day7 = {
  date: '2026-10-02',
  dayNumber: 7,
  region: 'SEOUL',
  title: '西村慢走 + 望远洞 + 汉江夜晚',
  subtitle: '安静街巷 + 本地午饭 + 社区市场 + 汉江日落与夜景',
  theme: '社区生活 + 汉江',
  hotel: 'N285 Hotel Insadong',
  reminder: '今天唯一真正的固定体验是傍晚到晚上留给汉江。白天不要排满，给西村和望远洞留出随意坐咖啡、休息和改计划的空间。',
  verificationNotes: [
    '10/2 首尔日落约在 18:10 左右，出发前一天再看当天精确日落与天气。',
    '汉江遇大雨/强风不硬撑；Plan B 改为望远洞晚饭 + 室内休闲，天气转好再短暂去江边。',
    '望远市场各摊位营业时间不一致；正式执行前用 Naver 查看目标店铺和市场营业状态。',
    '青鱼蓝（청어람）等热门本地店可能排队，20:30 左右通常临近最后点单，若想吃应提前决策。',
  ],
  planOptions: [
    {
      id: 'hanriver',
      label: '🌇 Plan A · 汉江日落 + 夜晚',
      description: '西村慢走 → 望远市场补给 → 17:00 左右到望远汉江公园 → 日落、野餐、散步到晚上。',
      nodeOverrides: {},
    },
    {
      id: 'rain',
      label: '🌧️ Plan B · 雨天降级',
      description: '保留西村与望远洞，汉江改成短停；晚饭优先青鱼蓝牛肠锅，减少在江边久坐。',
      hiddenNodeIds: ['picnic'],
      nodeOverrides: {
        mangwon: { time: '15:30' },
        hangang: { time: '17:15', description: '雨势允许就去江边短走 20–40 分钟；强风大雨直接跳过。' },
        dinner: { time: '18:15', description: '雨天主餐优先青鱼蓝（청어람）牛肠锅，也可在望远洞临场选本地韩餐。' },
      },
    },
  ],
  defaultPlan: 'hanriver',
  timeline: [
    {
      id: 'breakfast', time: '08:30', title: '酒店附近慢早餐', icon: '☕',
      description: '不用专程打卡，睡够后在钟路附近解决早餐；今天重点从西村开始。',
      transportToNext: '地铁 / Bus / Taxi 前往景福宫站、西村。',
    },
    {
      id: 'seochon', time: '09:45', title: '西村 · 无目的慢走', icon: '🚶',
      description: '从景福宫站西侧进入西村，走韩屋、小巷、住宅街和山脚街区；不以购物或网红店为目标。',
    },
    {
      id: 'suseong', time: '11:15', title: '水声洞溪谷 · 可选延伸', icon: '🌿',
      description: '体力舒服就沿西村往仁王山脚走到水声洞溪谷，看看山景后折返；累了可直接去午饭。',
    },
    {
      id: 'lunch', time: '12:15', title: '西村本地午饭', icon: '🍜',
      description: '优先 잘빠진메밀 西村本店（荞麦面 + 白切肉）；想更朴素可选 옹시미（土豆团子 / 荞麦刀切面）或 체부동잔치집。',
    },
    {
      id: 'coffee', time: '13:30', title: '西村咖啡 / 发呆', icon: '☕',
      description: '留 45–60 分钟坐着休息，不把下午排成景点接力。',
      transportToNext: '地铁 / Taxi 前往望远洞。',
    },
    {
      id: 'mangwon', time: '15:15', title: '望远洞 + 望远市场', icon: '🏘️',
      description: '先走社区街区，再进市场买水果、小吃、饮料或适合带去汉江的食物。',
    },
    {
      id: 'hangang', time: '17:00', title: '望远汉江公园', icon: '🌊',
      description: '傍晚到江边找舒服位置坐下，慢慢等日落；这是今天的主体验，不赶下一站。',
    },
    {
      id: 'picnic', time: '18:15', title: '汉江野餐 + 夜间散步', icon: '🌙',
      description: '市场小吃 / 便利店泡面 / 外卖炸鸡都可以。天黑后继续沿江散步或坐着聊天。',
    },
    {
      id: 'dinner', time: '20:00', title: '晚饭 Plan B / 加餐', icon: '🍲',
      description: '如果汉江只吃了零食、还想正经吃一顿，可回望远洞吃 청어람 牛肠锅；若已经吃饱就直接回酒店。',
    },
  ],
  places: [
    {
      id: 'n285', name: 'N285 Hotel Insadong', koreanName: 'N285 호텔 인사동', category: 'hotel', status: 'fixed', routeOrder: 1,
      lat: 37.5723484, lng: 126.9874114, address: '423 Samil-daero, Jongno-gu, Seoul', note: 'Day 7 出发 / 返回酒店。',
    },
    {
      id: 'gyeongbokgungStation', name: '景福宫站 · 西村入口', koreanName: '경복궁역', category: 'walk', status: 'fixed', routeOrder: 2,
      lat: 37.575770, lng: 126.973590, address: 'Gyeongbokgung Station, Jongno-gu, Seoul', note: '西村慢走的方便入口，不等于安排景福宫打卡。',
    },
    {
      id: 'suseong', name: '水声洞溪谷', koreanName: '인왕산 수성동계곡', category: 'park', status: 'candidate', routeOrder: 3,
      lat: 37.58247, lng: 126.96307, address: 'Suseong-dong Valley, Jongno-gu, Seoul', note: '西村北侧山脚可选延伸；不需要正式徒步。',
    },
    {
      id: 'mangwonMarket', name: '望远市场', koreanName: '망원시장', category: 'market', status: 'fixed', routeOrder: 4,
      lat: 37.55707, lng: 126.90580, address: '27 Poeun-ro 6-gil, Mapo-gu, Seoul', note: '40+ 年社区市场；主要用来补汉江野餐食物，不做购物任务。',
    },
    {
      id: 'hangang', name: '望远汉江公园', koreanName: '망원한강공원', category: 'park', status: 'fixed', routeOrder: 5,
      lat: 37.55038, lng: 126.90177, address: 'Mangwon Hangang Park, Mapo-gu, Seoul', note: '今天傍晚和晚上的核心体验。',
    },
    {
      id: 'jalppajin', name: '잘빠진메밀 西村本店', koreanName: '잘빠진메밀 서촌 본점', category: 'restaurant', status: 'candidate',
      address: '41-1 Jahamun-ro, Jongno-gu, Seoul', note: '午饭优先；荞麦面、白切肉、饺子。DiningCode 2026-09-10 快照约 4.2/5、70+ 条评价；其他本地/地图平台样本也较多。',
    },
    {
      id: 'ongsimi', name: '옹시미 景福宫店', koreanName: '옹시미 경복궁점', category: 'restaurant', status: 'candidate',
      address: 'Seochon, Jongno-gu, Seoul', note: '土豆团子 + 荞麦刀切面；DiningCode 规划快照约 4.8/5、8 条评价，样本较小但口味反馈好。精确门牌待 Naver 复核。',
    },
    {
      id: 'chebudong', name: '体府洞宴席家', koreanName: '체부동잔치집', category: 'restaurant', status: 'candidate',
      address: '16 Jahamun-ro 1-gil, Jongno-gu, Seoul', note: '朴素面馆类午饭备选，价格友好、本地日常感强。',
    },
    {
      id: 'cheongeoram', name: '青鱼蓝 · 望远店', koreanName: '청어람 망원점', category: 'restaurant', status: 'candidate',
      lat: 37.5580112, lng: 126.9075533, address: '97 Mangwon-ro, Mapo-gu, Seoul', note: '牛肠锅。DiningCode 2026-09-10 快照约 4.4/5、80+ 条评价；雨天 Plan B 或汉江后仍饿时优先。',
    },
  ],
  restaurantNotes: [
    '10/2 晚餐默认不是“必须进餐厅”：天气好时，把望远市场 + 汉江野餐本身当作晚餐体验。',
    '青鱼蓝更适合作为雨天或正餐需求较强时的备选；热门时可能排队，避免为了它牺牲汉江日落。',
    '西村午饭不追网红热度，优先面食、白切肉、土豆团子这类当地日常食物。',
  ],
}
