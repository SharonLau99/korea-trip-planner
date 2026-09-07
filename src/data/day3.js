export const day3 = {
  date: '2026-09-28',
  dayNumber: 3,
  title: '城山日出峰 + Olle Route 7',
  subtitle: '可选日出 + Route 7 + 入住 Hotel Bridge Seogwipo',
  theme: '日出 + 徒步',
  hotel: 'Hotel Bridge Seogwipo',
  reminder: '今天开始连续徒步日。出发前确认鞋袜、补水、碳水和能量零食；行李从 Playce Camp 配送到 Hotel Bridge。',
  verificationNotes: [
    '9/28 日出时间接近 06:25 的旧计划值，出发前需按当天天文时间再确认。',
    'Route 7 当前官方里程与具体起终点以出发前官方 Olle 信息复核；项目暂沿用此前讨论的约 12.9 km 版本。',
  ],
  planOptions: [
    {
      id: 'sunrise',
      label: '🌅 Plan A · 看日出',
      description: '早起看城山日出峰，然后早餐、转场 Route 7。',
      nodeOverrides: {},
    },
    {
      id: 'sleep',
      label: '😴 Plan B · 不看日出',
      description: '多睡一会儿，直接早餐后前往 Route 7；后续时间整体更宽松。',
      hiddenNodeIds: ['sunrise'],
      nodeOverrides: {
        checkout: { time: '07:20', description: '起床后直接退房并交接行李，不再折返酒店。' },
        breakfast: { time: '07:35' },
        transfer: { time: '08:20' },
        routeStart: { time: '10:20' },
        beophwan: { time: '13:10' },
        routeFinish: { time: '15:30' },
        bridge: { time: '16:20' },
        dinner: { time: '17:50' },
        market: { time: '19:10' },
      },
    },
  ],
  defaultPlan: 'sunrise',
  timeline: [
    {
      id: 'checkout', time: '05:20', title: 'Playce Camp 退房 + 交行李', icon: '🧳',
      description: '先退房、把行李交给配送/前台，再向前走；不安排返回酒店。',
      transportToNext: 'Taxi 前往城山日出峰。',
    },
    {
      id: 'sunrise', time: '06:25', title: '城山日出峰 · 日出', icon: '🌅', fixed: true,
      description: 'Plan A 固定锚点。若天气差或不想早起，切换 Plan B。',
    },
    {
      id: 'breakfast', time: '07:10', title: '城山早餐', icon: '🍲',
      description: '早餐候选包含 동뜬식당；以当天营业状态为准。',
    },
    {
      id: 'transfer', time: '08:00', title: '城山 → 西归浦 / Route 7', icon: '🚌',
      description: '长距离转场，优先公共交通；若衔接差再考虑 Taxi。',
    },
    {
      id: 'routeStart', time: '10:00', title: 'Olle Route 7 开始', icon: '🥾',
      description: '按此前确认的 Route 7 版本执行，今天重点是稳定完成而不是赶速度。',
    },
    {
      id: 'beophwan', time: '13:00', title: '法还浦补给 / 午饭', icon: '🍙',
      description: '中段补水、午饭和腿部状态检查。',
    },
    {
      id: 'routeFinish', time: '15:00', title: 'Route 7 完成', icon: '🏁',
      description: '完成后直接前往 Hotel Bridge，不额外加景点。',
    },
    {
      id: 'bridge', time: '16:00', title: 'Hotel Bridge Seogwipo', icon: '🏨',
      description: '入住、取行李、洗澡休息。',
    },
    {
      id: 'dinner', time: '17:30', title: 'Hotel Bridge 晚饭池', icon: '🍽️',
      description: '9/28 与 9/29 共用同一餐厅池；今天略偏向 뽈살집 本店。',
    },
    {
      id: 'market', time: '19:00', title: '西归浦每日偶来市场 · 可选', icon: '🛍️',
      description: '有体力再去；也可留到 9/29。顺便补第二天徒步的水、零食和水果。',
    },
  ],
  places: [
    {
      id: 'playce', name: 'Playce Camp Jeju', koreanName: '플레이스캠프 제주', category: 'hotel', status: 'fixed', routeOrder: 1,
      lat: 33.449, lng: 126.9188, address: 'Dongnyuam-ro, Seongsan-eup, Seogwipo-si', note: 'Day 3 出发酒店。', approximate: true,
    },
    {
      id: 'seongsanPeak', name: '城山日出峰', koreanName: '성산일출봉', category: 'attraction', status: 'candidate', routeOrder: 2,
      lat: 33.4581, lng: 126.9425, address: 'Seongsan-eup, Seogwipo-si', note: 'Plan A 日出点；Plan B 跳过。', approximate: true,
    },
    {
      id: 'route7Start', name: 'Olle Route 7 起点区域', category: 'hike', status: 'fixed', routeOrder: 3,
      lat: 33.244, lng: 126.565, address: 'Seogwipo-si', note: '当前为路线区域约略点；出发前按官方最新路线复核。', approximate: true,
    },
    {
      id: 'beophwan', name: '法还浦', koreanName: '법환포', category: 'hike', status: 'fixed', routeOrder: 4,
      lat: 33.234, lng: 126.515, address: 'Beophwan-dong, Seogwipo-si', note: 'Route 7 中段午饭 / 补给点。', approximate: true,
    },
    {
      id: 'route7Finish', name: 'Route 7 终点区域', category: 'hike', status: 'fixed', routeOrder: 5,
      lat: 33.241, lng: 126.464, address: 'Wolpyeong-dong, Seogwipo-si', note: '沿用此前讨论路线的终点区域，官方最新点位出发前复核。', approximate: true,
    },
    {
      id: 'bridge', name: 'Hotel Bridge Seogwipo', koreanName: '호텔브릿지 서귀포', category: 'hotel', status: 'fixed', routeOrder: 6,
      lat: 33.2455925, lng: 126.5666523, address: '436 Taepyeong-ro, Seogwipo-si, Jeju-do', note: '9/28、9/29 住宿。',
    },
    {
      id: 'olleMarket', name: '西归浦每日偶来市场', koreanName: '서귀포매일올레시장', category: 'market', status: 'candidate',
      lat: 33.2501, lng: 126.5658, address: '18 Jungang-ro 62beon-gil, Seogwipo-si', note: '晚饭后可选；也可留到 9/29。', approximate: true,
    },
    {
      id: 'ppolsal', name: '뽈살집 本店', koreanName: '뽈살집 본점', category: 'restaurant', status: 'candidate',
      address: 'Seogwipo-si', note: '共用晚饭池；9/28 略优先。精确地图点位待复核。',
    },
    {
      id: 'negeori', name: 'Negeori Restaurant', koreanName: '네거리식당', category: 'restaurant', status: 'candidate',
      address: '20 Seomun-ro 29beon-gil, Seogwipo-si', note: '带鱼汤 / 烤带鱼 / 炖带鱼候选。精确坐标待复核。',
    },
    {
      id: 'meokgojeong', name: '먹고정', koreanName: '먹고정', category: 'restaurant', status: 'candidate',
      address: 'Seogwipo-si', note: '黑猪炭火烧烤；9/29 略优先，但两晚都可选。',
    },
    {
      id: 'yongi', name: 'Yong’s Restaurant', koreanName: '용이식당', category: 'restaurant', status: 'candidate',
      address: 'Seogwipo-si', note: '快、当地感强的 두루치기 备选。',
    },
  ],
}
