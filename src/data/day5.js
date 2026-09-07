export const day5 = {
  date: '2026-09-30',
  dayNumber: 5,
  title: 'Olle Route 10',
  subtitle: '华顺 → 山房山 → 松岳山 → 阿尔德勒 → 摹瑟浦 → 返回济州市',
  theme: '徒步 + 回城',
  hotel: 'I-Jin Hotel',
  reminder: '今天徒步结束后要回济州市，晚上尽量早点睡，为 10/1 08:25 济州 → 金浦航班留足休息。',
  verificationNotes: [
    'Route 10 当前沿用此前讨论的 15.6 km、约 5–6 小时版本；旧资料可能仍显示 17.3 km，出发前按官方最新路线复核。',
    '龙头海岸是否开放受潮汐与天气影响，不列为必去。',
    '151 / 102 巴士实际时刻与候车时间当天看 Naver；等待过久可直接 Taxi。',
  ],
  timeline: [
    {
      id: 'breakfast', time: '07:00', title: '起床 + 早餐', icon: '🥣',
      description: '吃够碳水，准备水、能量零食、防晒和徒步装备。',
    },
    {
      id: 'checkout', time: '07:40', title: 'Hotel Bridge 退房 + 交行李', icon: '🧳',
      description: '行李配送至 I-Jin Hotel；自己轻装走 Route 10。',
    },
    {
      id: 'transfer', time: '07:55', title: '前往华顺金砂海滩', icon: '🚌',
      description: '优先 202 路；若下一班等待超过约 30 分钟，改 Taxi。',
    },
    {
      id: 'start', time: '08:50', title: '华顺金砂海滩 / Route 10 起点', icon: '🥾',
      description: '厕所、补水、盖章后开始。',
    },
    {
      id: 'sagye', time: '10:30', title: '沙溪海岸补水', icon: '💧',
      description: '经过便利店时检查水量；低于一半就补。龙头海岸仅在开放且时间宽裕时临时决定。',
    },
    {
      id: 'lunch', time: '11:30', title: 'Route 10 午饭候选', icon: '🍜',
      description: '优先 SunChaehyang；Yomangjin Bapsang / Olle Madang 为备选。路线适配优先于网红热度。',
    },
    {
      id: 'songaksan', time: '12:45', title: '松岳山', icon: '⛰️',
      description: 'Route 10 重点风景段，预留约 1 小时以上，不赶路。',
    },
    {
      id: 'seotal', time: '14:05', title: 'Seotal Oreum / 中点章', icon: '📍',
      description: '中点盖章并短休，随后继续阿尔德勒飞行场方向。',
    },
    {
      id: 'altteureu', time: '14:35', title: '阿尔德勒飞行场', icon: '🛩️',
      description: '沿路线通过历史遗迹区。',
    },
    {
      id: 'finish', time: '15:45', title: 'Hamo Sports Park · Route 10 完成', icon: '🏁',
      description: '15:30–16:00 完成都正常，慢一点到 16:30 也可。',
    },
    {
      id: 'returnJeju', time: '16:20', title: '返回济州市 / 新济州', icon: '🚌',
      description: '151 快线优先；102 可到机场后再 Taxi。等待明显过久或很累时直接 Taxi。',
    },
    {
      id: 'ijin', time: '18:00', title: 'I-Jin Hotel', icon: '🏨',
      description: '取行李、洗澡、休息。',
    },
    {
      id: 'dinner', time: '18:40', title: '新济州轻松晚饭', icon: '🍽️',
      description: '复用济州市/莲洞餐饮池；可优先 Ollae Guksu，也可猪蹄或 24h 土豆汤。不要为了晚饭远距离折腾。',
    },
  ],
  places: [
    {
      id: 'bridge', name: 'Hotel Bridge Seogwipo', koreanName: '호텔브릿지 서귀포', category: 'hotel', status: 'fixed', routeOrder: 1,
      lat: 33.2455925, lng: 126.5666523, address: '436 Taepyeong-ro, Seogwipo-si, Jeju-do', note: 'Day 5 出发酒店。',
    },
    {
      id: 'hwasun', name: '华顺金砂海滩', koreanName: '화순금모래해수욕장', category: 'hike', status: 'fixed', routeOrder: 2,
      lat: 33.2407, lng: 126.3338, address: 'Hwasun-ri, Andeok-myeon, Seogwipo-si', note: 'Route 10 起点区域。', approximate: true,
    },
    {
      id: 'sanbangsan', name: '山房山区域', koreanName: '산방산', category: 'attraction', status: 'fixed', routeOrder: 3,
      lat: 33.2468, lng: 126.313, address: 'Andeok-myeon, Seogwipo-si', note: 'Route 10 途中主要地标。', approximate: true,
    },
    {
      id: 'yongmeori', name: '龙头海岸', koreanName: '용머리해안', category: 'attraction', status: 'candidate',
      lat: 33.2319, lng: 126.3146, address: 'Sagye-ri, Andeok-myeon, Seogwipo-si', note: '只在开放 + 时间宽裕 + 两人都想去时进入。', approximate: true,
    },
    {
      id: 'sagye', name: '沙溪海岸', koreanName: '사계해안', category: 'hike', status: 'fixed', routeOrder: 4,
      lat: 33.2295, lng: 126.307, address: 'Sagye-ri, Andeok-myeon, Seogwipo-si', note: '补水与午饭区域。', approximate: true,
    },
    {
      id: 'sunchaehyang', name: 'SunChaehyang', koreanName: '선채향', category: 'restaurant', status: 'candidate',
      lat: 33.2308, lng: 126.3093, address: '6 Sagyenam-ro 84beon-gil, Andeok-myeon, Seogwipo-si', note: '午饭优先：鲍鱼粥 / 鲍鱼刀切面；当天营业状态需确认。', approximate: true,
    },
    {
      id: 'yomangjin', name: 'Yomangjin Bapsang', koreanName: '요망진밥상', category: 'restaurant', status: 'candidate',
      address: 'Andeok-myeon, Seogwipo-si', note: '当地家常定食午饭候选；精确点位待核验。',
    },
    {
      id: 'olleMadang', name: 'Olle Madang', koreanName: '올레마당', category: 'restaurant', status: 'candidate',
      lat: 33.229, lng: 126.311, address: '135-1 Sagye-ri, Andeok-myeon, Seogwipo-si', note: '海鲜家常菜备选。', approximate: true,
    },
    {
      id: 'songaksan', name: '松岳山', koreanName: '송악산', category: 'hike', status: 'fixed', routeOrder: 5,
      lat: 33.199, lng: 126.29, address: 'Andeok-myeon, Seogwipo-si', note: 'Route 10 重点风景段。', approximate: true,
    },
    {
      id: 'seotal', name: 'Seotal Oreum', koreanName: '섯알오름', category: 'hike', status: 'fixed', routeOrder: 6,
      lat: 33.205, lng: 126.272, address: 'Daejeong-eup, Seogwipo-si', note: '中点章区域。', approximate: true,
    },
    {
      id: 'altteureu', name: '阿尔德勒飞行场', koreanName: '알뜨르비행장', category: 'historic', status: 'fixed', routeOrder: 7,
      lat: 33.204, lng: 126.266, address: 'Daejeong-eup, Seogwipo-si', note: 'Route 10 历史遗迹节点。', approximate: true,
    },
    {
      id: 'hamo', name: 'Hamo Sports Park', koreanName: '하모체육공원', category: 'hike', status: 'fixed', routeOrder: 8,
      lat: 33.218, lng: 126.253, address: 'Daejeong-eup, Seogwipo-si', note: 'Route 10 终点。', approximate: true,
    },
    {
      id: 'ijin', name: 'I-Jin Hotel', category: 'hotel', status: 'fixed', routeOrder: 9,
      lat: 33.482402, lng: 126.494812, address: '4 Sindae-ro 22-gil, Jeju-si, Jeju-do', note: '9/30 住宿，次日早班机。',
    },
    {
      id: 'ollaeGuksu', name: 'Ollae Guksu', koreanName: '올래국수', category: 'restaurant', status: 'candidate',
      address: 'Jeju-si / Yeondong area', note: '最后一晚想吃轻松猪肉面时优先；精确点位待核验。',
    },
    {
      id: 'jokbal', name: '贵韩猪蹄 · 新济州店', koreanName: '귀한족발 신제주점', category: 'restaurant', status: 'candidate',
      lat: 33.490949, lng: 126.494754, address: '18 Sindae-ro 10-gil, Jeju-si, Jeju-do', note: '复用 Day 1 莲洞晚饭池。',
    },
  ],
}
