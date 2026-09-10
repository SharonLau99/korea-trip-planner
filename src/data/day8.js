export const day8 = {
  date: '2026-10-03',
  dayNumber: 8,
  region: 'SEOUL',
  title: '首尔早晨 + 仁川机场返程',
  subtitle: '近酒店早餐 + 短 City Walk + 提前去机场',
  theme: '轻松收尾',
  flight: {
    number: 'ZH634',
    from: '首尔仁川机场',
    to: '深圳',
    departure: '15:15',
    arrival: '18:00',
  },
  hotel: 'N285 Hotel Insadong',
  reminder: '今天不跨区、不追景点。10/3 是韩国开天节，部分小店营业可能变化；早餐和短走都以“近酒店、随时可撤”为原则。',
  verificationNotes: [
    'ZH634 15:15 仁川起飞来自已确认订单；出发前一天确认航站楼、值机柜台和航班状态。',
    '10/3 为韩国开天节，餐厅和公共交通可能执行节假日安排，早餐店前一晚再核验。',
    '建议 10:30 左右从酒店出发去仁川机场，目标 12:00 左右到机场；实际根据当天交通和航站楼再微调。',
  ],
  planOptions: [
    {
      id: 'easy-morning',
      label: '☕ Plan A · 悠闲早晨',
      description: '附近早餐 → 钟路/清溪川短走 → 回酒店退房 → 提前去仁川机场。',
      nodeOverrides: {},
    },
    {
      id: 'airport-early',
      label: '🛫 Plan B · 提前去机场',
      description: '如果下雨、累或担心交通，吃完早餐直接退房去机场，完全不加 City Walk。',
      hiddenNodeIds: ['morningWalk'],
      nodeOverrides: {
        checkout: { time: '09:45' },
        airportTransfer: { time: '10:00' },
        airport: { time: '11:30' },
      },
    },
  ],
  defaultPlan: 'easy-morning',
  timeline: [
    {
      id: 'breakfast', time: '08:00', title: '钟路附近早餐', icon: '🍲',
      description: '想吃热汤可优先永春屋牛骨汤；也可临场选酒店附近开门的猪肉汤饭 / 雪浓汤。',
    },
    {
      id: 'morningWalk', time: '09:00', title: '最后一段老首尔短走', icon: '🚶',
      description: '只在钟路 3 街、清溪川或酒店周边走 45–60 分钟，不去远处，也不安排购物。',
    },
    {
      id: 'checkout', time: '10:10', title: '回酒店取行李 + 退房', icon: '🧳',
      description: '酒店要求 11:00 前退房，留出整理和叫车/转乘缓冲。',
    },
    {
      id: 'airportTransfer', time: '10:30', title: '前往仁川机场', icon: '🚆',
      description: '优先选择稳定、少折腾的方案：Taxi/地铁到首尔站后接 AREX；若行李多或不想换乘可直接 Taxi。',
      transportToNext: '目标约 12:00 左右抵达机场。',
    },
    {
      id: 'airport', time: '12:00', title: '抵达仁川机场', icon: '🛫',
      description: '值机、托运、安检、出境。当天不靠压缩机场时间来换最后一个景点。',
    },
    {
      id: 'flight', time: '15:15', title: 'ZH634 · 首尔 → 深圳', icon: '✈️', fixed: true,
      description: '15:15 起飞，18:00 抵达深圳。',
    },
  ],
  places: [
    {
      id: 'n285', name: 'N285 Hotel Insadong', koreanName: 'N285 호텔 인사동', category: 'hotel', status: 'fixed', routeOrder: 1,
      lat: 37.5723484, lng: 126.9874114, address: '423 Samil-daero, Jongno-gu, Seoul', note: '10/3 11:00 前退房。',
    },
    {
      id: 'jongno3', name: '钟路 3 街', koreanName: '종로3가', category: 'walk', status: 'candidate', routeOrder: 2,
      lat: 37.5700, lng: 126.9910, address: 'Jongno 3-ga, Jongno-gu, Seoul', note: '最后一段短 City Walk 代表点；无需按精确路线走。', approximate: true,
    },
    {
      id: 'incheon', name: '仁川国际机场', koreanName: '인천국제공항', category: 'transport', status: 'fixed', routeOrder: 3,
      lat: 37.4638, lng: 126.4394, address: '272 Gonghang-ro, Jung-gu, Incheon', note: 'ZH634 出发机场；具体航站楼出发前一天核验。',
    },
    {
      id: 'yeongchunok', name: '永春屋', koreanName: '영춘옥', category: 'restaurant', status: 'candidate',
      address: '13 Donhwamun-ro 5ga-gil, Jongno-gu, Seoul', note: '牛骨汤 / 牛尾汤方向；距离酒店近，适合返程日早餐。节假日营业仍以前一晚 Naver 为准。',
    },
    {
      id: 'hapcheon', name: '合川猪肉汤饭', koreanName: '합천돼지국밥', category: 'restaurant', status: 'candidate',
      address: 'Jongno 3-ga, Jongno-gu, Seoul', note: '猪肉汤饭 / 白切肉早餐或早午饭备选；精确门牌与节假日营业待复核。',
    },
  ],
  restaurantNotes: [
    '10/3 早餐只选“近、开门、好吃”的店，不为某家餐厅绕路。',
    '开天节可能改变营业安排，前一晚核验后再决定最终早餐。',
  ],
}
