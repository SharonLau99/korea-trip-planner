export const day1 = {
  date: '2026-09-26',
  dayNumber: 1,
  title: '济州市适应日',
  subtitle: '免税店 + 旧济州小店 + 轻松晚饭',
  theme: '轻松适应',
  flight: {
    number: 'ZH641',
    from: '深圳宝安 T3',
    to: '济州机场',
    departure: '09:45',
    arrival: '13:55',
  },
  hotel: 'I-Jin Hotel',
  reminder: '明天：咸德海水浴场 + 牛岛。今晚确认天气、船班、防晒和饮水。',
  verificationNotes: [
    '旧济州小店与部分餐厅的营业状态前一天/当天再次确认。',
    '东门市场 / 旧济州新增餐厅候选先进入餐饮池；没有核实精确坐标的店暂不强行落地图点，导航时直接用韩文店名在 Naver 搜索。',
  ],
  planOptions: [
    {
      id: 'shopping',
      label: '🛍️ Shopping',
      description: '保留新罗 + 旧济州小店；根据时间决定逛一到两家。',
      nodeOverrides: {},
    },
    {
      id: 'relax',
      label: '☕ Relax',
      description: '保留新罗，旧济州小店降级；优先早点吃饭和休息。',
      hiddenNodeIds: ['oldtown'],
      nodeOverrides: {
        dinner: { time: '18:00' },
      },
    },
  ],
  defaultPlan: 'shopping',
  timeline: [
    {
      id: 'airport',
      time: '13:55',
      title: '抵达济州机场',
      icon: '✈️',
      fixed: true,
      description: '入境、取行李。航班时间为固定锚点。',
      transportToNext: 'Taxi 约 5–10 分钟',
    },
    {
      id: 'hotel',
      time: '15:00',
      title: 'I-Jin Hotel',
      icon: '🏨',
      description: '放行李、简单整理。',
      transportToNext: '步行约 10–15 分钟',
    },
    {
      id: 'shilla',
      time: '16:00',
      title: '新罗免税店济州店',
      icon: '🛍️',
      description: '预计停留约 60–90 分钟。',
      transportToNext: 'Taxi 约 15–20 分钟到旧济州',
    },
    {
      id: 'oldtown',
      time: '17:30',
      title: '旧济州小店探索',
      icon: '🏪',
      description: 'Everybody Vintage / OMNIPEOPLE JEJUSA，根据营业状态和体力灵活选。',
      transportToNext: '晚饭按最终选择地点导航',
    },
    {
      id: 'dinner',
      time: '18:30',
      title: '晚饭候选池',
      icon: '🍽️',
      description: '莲洞保留黑猪 / 猪蹄；若人在东门市场 / 旧济州，则从本地口碑候选里就近选择。当天根据体力、排队和口味决定，不锁死。',
    },
  ],
  places: [
    {
      id: 'airport', name: '济州国际机场', category: 'transport', status: 'fixed', routeOrder: 1,
      lat: 33.510413, lng: 126.491353, address: '2 Gonghang-ro, Jeju-si, Jeju-do', note: 'Day 1 抵达点',
    },
    {
      id: 'hotel', name: 'I-Jin Hotel', category: 'hotel', status: 'fixed', routeOrder: 2,
      lat: 33.482402, lng: 126.494812, address: '4 Sindae-ro 22-gil, Jeju-si, Jeju-do', note: '第一晚住宿',
    },
    {
      id: 'shilla', name: '新罗免税店济州店', koreanName: '신라면세점 제주점', category: 'shopping', status: 'fixed', routeOrder: 3,
      lat: 33.486069, lng: 126.487744, address: '69 Noyeon-ro, Jeju-si, Jeju-do', note: '固定购物节点；当前官方营业时间建议出发前再次确认',
    },
    {
      id: 'everybody', name: 'Everybody Vintage', category: 'shop', status: 'candidate',
      lat: 33.514043, lng: 126.525933, address: '11 Gwandeok-ro 13-gil, Jeju-si, Jeju-do', note: '旧济州古着候选；前一天确认营业状态',
    },
    {
      id: 'omnipeople', name: 'OMNIPEOPLE JEJUSA', category: 'shop', status: 'candidate',
      lat: 33.51355, lng: 126.52805, address: '43 Sanji-ro, Jeju-si, Jeju-do', note: '候选小店；地图点按门牌位置近似，导航时以 Naver 搜索结果为准', approximate: true,
    },
    {
      id: 'stonewall', name: '石墙黑猪 · 莲洞本店', koreanName: '돌담흑돼지 연동', category: 'restaurant', status: 'candidate',
      lat: 33.486746, lng: 126.490847, address: '35 Yeondong 7-gil, Jeju-si, Jeju-do', note: 'Day 1 原有优先候选；想吃一顿代表性济州黑猪时优先。韩国本地餐饮平台口碑强。',
    },
    {
      id: 'jokbal', name: '贵韩猪蹄 · 新济州店', koreanName: '귀한족발 신제주점', category: 'restaurant', status: 'candidate',
      lat: 33.490949, lng: 126.494754, address: '18 Sindae-ro 10-gil, Jeju-si, Jeju-do', note: 'Day 1 原有候选；想吃轻松的韩式猪蹄 / 包肉时选择。',
    },
    {
      id: 'haebaragi', name: 'Haebaragi Bunsik 本店', koreanName: '해바라기분식 본점', category: 'restaurant', status: 'candidate',
      address: 'Dongmun Market / old Jeju area, Jeju-si', note: '东门市场周边本地日常饭候选；嫩豆腐汤等，偏便宜、当地、快速。精确点位待核验。',
    },
    {
      id: 'dalmaGalbi', name: 'Dalma 炭火排骨', koreanName: '달마숯불갈비', category: 'restaurant', status: 'candidate',
      address: 'Dongmun Market / old Jeju area, Jeju-si', note: '东门市场周边烤肉优先候选；生猪排骨 / 猪排骨，本地平台评价较强。精确点位待核验。',
    },
    {
      id: 'udoGeungogi', name: 'Udo Geun-gogi', koreanName: '우도근고기', category: 'restaurant', status: 'candidate',
      address: 'Dongmun Market / old Jeju area, Jeju-si', note: '东门市场周边黑猪 / 厚切猪肉候选，本地平台口碑较好。精确点位待核验。',
    },
    {
      id: 'topBupyeong', name: 'Top Bupyeong', koreanName: '탑부평', category: 'restaurant', status: 'candidate',
      address: 'Dongmun Market / old Jeju area, Jeju-si', note: '更偏当地老烤肉馆氛围的候选，本地居民标签较强。精确点位待核验。',
    },
    {
      id: 'jayang', name: 'Jayang Sikdang', koreanName: '자양식당', category: 'restaurant', status: 'candidate',
      address: 'Dongmun Market / old Jeju area, Jeju-si', note: '面类候选；主打 닭짬뽕（鸡汤底辣汤面 / 韩式 짬뽕），适合想吃热汤面时。精确点位待核验。',
    },
    {
      id: 'jejuBomalKalguksu', name: 'Jeju Bomal Kalguksu', koreanName: '제주보말칼국수', category: 'restaurant', status: 'candidate',
      address: 'Dongmun Market / old Jeju area, Jeju-si', note: '济州风格 보말칼국수 / 보말죽 候选，适合想吃当地海味面食时。精确点位待核验。',
    },
    {
      id: 'chori', name: 'Chori', koreanName: '초리', category: 'restaurant', status: 'candidate',
      address: 'Dongmun Market / old Jeju area, Jeju-si', note: '寿司 / 熟成刺身方向候选，本地平台评价较好。精确点位待核验。',
    },
    {
      id: 'hayoungOlleGuksu', name: 'Hayoung Olle Guksu', koreanName: '하영올레국수', category: 'restaurant', status: 'candidate',
      address: 'Jeju-si', note: '旧候选正式加入餐饮池；猪肉汤面等轻松面食方向。本地平台口碑不错，精确点位待核验。',
    },
    {
      id: 'daechunHaejangguk', name: 'Daechun Haejangguk', koreanName: '대춘해장국', category: 'restaurant', status: 'candidate',
      address: 'Jeju-si', note: '旧候选正式加入餐饮池；济州本地解酒汤 / 热汤方向，适合想吃暖胃正餐时。精确点位待核验。',
    },
  ],
  restaurantNotes: [
    'Day 1 餐饮池已扩展为“莲洞 + 东门市场 / 旧济州”两组；新增候选优先保留韩文店名，方便直接在 Naver 搜索。',
    '没有确认精确坐标的新增餐厅暂不画到地图上；临近出发再核验门店、营业状态和精确位置。',
  ],
}
