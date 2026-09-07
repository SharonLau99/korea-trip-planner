export const day2 = {
  date: '2026-09-27',
  dayNumber: 2,
  title: '咸德 + 牛岛',
  subtitle: '咸德海水浴场 + Udo / Olle 1-1 + 城山入住',
  theme: '海岛徒步',
  hotel: 'Playce Camp Jeju',
  reminder: '牛岛船班、天气与末班船需要前一晚再次确认；护照、防晒、水和能量补给随身。',
  verificationNotes: [
    '牛岛 2026-09-27 实际船班与末班船：T-1 以官方/码头公告为准。',
    'I-Jin → Playce Camp 的行李配送是否已预订，当前项目记录仍需最终确认。',
  ],
  planOptions: [
    {
      id: 'full-olle',
      label: '🥾 Route 1-1 完整徒步',
      description: '时间、天气、体力都合适时优先；牛岛体验优先于硬刷完成。',
      nodeOverrides: {
        udoExplore: {
          description: '完整走 Olle Route 1-1。纯步行约 4–5 小时，实际含拍照/休息按 4–6 小时预留。',
        },
      },
    },
    {
      id: 'hybrid',
      label: '🥾🚲 精华徒步 + 电助力',
      description: '默认机动方案：重点风景步行，其余用电助力串联，避免赶末班船。',
      nodeOverrides: {
        udoExplore: {
          time: '12:15',
          description: '挑选 Olle 1-1 精华段徒步，其余用电助力串联牛岛峰、黑沙滩、下古水洞、西滨白沙等。',
        },
        returnPort: { time: '16:10' },
      },
    },
    {
      id: 'ebike',
      label: '🚲 电助力环岛',
      description: '天气一般、到岛偏晚或腿累时使用。',
      nodeOverrides: {
        udoExplore: {
          time: '12:10',
          description: '以电助力环岛为主，在喜欢的海滩/观景点停留；不追求完整 Route 1-1。',
        },
        returnPort: { time: '15:50' },
      },
    },
  ],
  defaultPlan: 'hybrid',
  timeline: [
    {
      id: 'checkout',
      time: '07:30',
      title: 'I-Jin Hotel 出发',
      icon: '🏨',
      description: '早餐后离店。若已预约行李配送，在前台交接后轻装出发。',
      transportToNext: 'Taxi 前往咸德；公共交通合适也可选。',
    },
    {
      id: 'hamdeok',
      time: '08:10',
      title: '咸德海水浴场',
      icon: '🌊',
      description: '默认停留约 1 小时；除非天气明显不适合，否则保留。',
      transportToNext: '前往城山港，优先看 Naver；等待过久可 Taxi。',
    },
    {
      id: 'seongsanPort',
      time: '10:15',
      title: '城山港',
      icon: '⛴️',
      description: '购票/换票、登船缓冲建议 30–45 分钟；护照随身。',
      transportToNext: '渡轮约 15 分钟；实际船班当天确认。',
    },
    {
      id: 'udoArrival',
      time: '11:00',
      title: '抵达牛岛',
      icon: '🏝️',
      description: '到岛后先确认回程末班船，再决定完整徒步 / 混合 / 电助力。',
    },
    {
      id: 'lunch',
      time: '12:00',
      title: '牛岛午饭',
      icon: '🍜',
      description: '优先 Sumsonai；若排队超过约 30 分钟，不死等。随身带少量能量零食和水。',
    },
    {
      id: 'udoExplore',
      time: '12:40',
      title: '牛岛 Olle 1-1 / 环岛',
      icon: '🥾',
      description: '根据所选方案执行。风景与体验优先，末班船是硬约束。',
    },
    {
      id: 'returnPort',
      time: '16:30',
      title: '回到码头 / 准备离岛',
      icon: '⛴️',
      description: '这里的时间只是计划值；真正固定锚点是当日确认后的末班船时间。',
    },
    {
      id: 'playce',
      time: '18:00',
      title: 'Playce Camp Jeju',
      icon: '🏨',
      description: '城山港返回后入住、休息。',
      transportToNext: '城山港 → Playce Camp 短程 Taxi 最省力。',
    },
    {
      id: 'dinner',
      time: '18:45',
      title: '城山晚饭候选池',
      icon: '🍽️',
      description: '优先济州土锅；城山珍味食堂为第二候选。根据回岛时间和营业状态决定。',
    },
  ],
  places: [
    {
      id: 'ijin', name: 'I-Jin Hotel', category: 'hotel', status: 'fixed', routeOrder: 1,
      lat: 33.482402, lng: 126.494812, address: '4 Sindae-ro 22-gil, Jeju-si, Jeju-do',
      note: 'Day 2 出发酒店。',
    },
    {
      id: 'hamdeok', name: '咸德海水浴场', koreanName: '함덕해수욕장', category: 'attraction', status: 'fixed', routeOrder: 2,
      lat: 33.5432, lng: 126.6692, address: 'Hamdeok-ri, Jocheon-eup, Jeju-si',
      note: 'Day 2 固定停留，约 1 小时。', approximate: true,
    },
    {
      id: 'seongsanPort', name: '城山港', koreanName: '성산항', category: 'transport', status: 'fixed', routeOrder: 3,
      lat: 33.4714, lng: 126.9338, address: 'Seongsan-eup, Seogwipo-si, Jeju-do',
      note: '前往牛岛的码头；船班 T-1 核验。', approximate: true,
    },
    {
      id: 'udoPort', name: '牛岛码头区域', koreanName: '우도', category: 'transport', status: 'fixed', routeOrder: 4,
      lat: 33.505, lng: 126.952, address: 'Udo-myeon, Jeju-si, Jeju-do',
      note: '实际到港可能因船班而不同，地图先用于空间理解。', approximate: true,
    },
    {
      id: 'udobong', name: '牛岛峰 / 灯塔区域', koreanName: '우도봉', category: 'attraction', status: 'candidate',
      lat: 33.4933, lng: 126.957, address: 'Udo-myeon, Jeju-si', note: '牛岛重点风景候选。', approximate: true,
    },
    {
      id: 'geommeolle', name: '黑沙滩', koreanName: '검멀레해변', category: 'attraction', status: 'candidate',
      lat: 33.4937, lng: 126.966, address: 'Udo-myeon, Jeju-si', note: '精华停留点候选。', approximate: true,
    },
    {
      id: 'hagosudong', name: '下古水洞海水浴场', koreanName: '하고수동해수욕장', category: 'attraction', status: 'candidate',
      lat: 33.5156, lng: 126.9582, address: 'Udo-myeon, Jeju-si', note: '牛岛北东侧海滩候选。', approximate: true,
    },
    {
      id: 'seobin', name: '西滨白沙', koreanName: '서빈백사', category: 'attraction', status: 'candidate',
      lat: 33.5108, lng: 126.9446, address: 'Udo-myeon, Jeju-si', note: '牛岛西侧海滩候选。', approximate: true,
    },
    {
      id: 'sumsonai', name: 'Sumsonai', koreanName: '섬소나이', category: 'restaurant', status: 'candidate',
      address: 'Udo-myeon, Jeju-si', note: '优先午饭候选；排队过长则切换。地图精确点位待核验。',
    },
    {
      id: 'playce', name: 'Playce Camp Jeju', koreanName: '플레이스캠프 제주', category: 'hotel', status: 'fixed', routeOrder: 5,
      lat: 33.449, lng: 126.9188, address: 'Dongnyuam-ro, Seongsan-eup, Seogwipo-si',
      note: '9/27 住宿。', approximate: true,
    },
    {
      id: 'jejuTtukbaegi', name: '济州土锅', koreanName: '제주뚝배기', category: 'restaurant', status: 'candidate',
      lat: 33.4611419, lng: 126.932983, address: '255 Ilchul-ro, Seongsan-eup, Seogwipo-si',
      note: '9/27 晚饭优先候选：鲍鱼海鲜土锅、炖带鱼、烤鲭鱼。',
    },
    {
      id: 'seongsanJinmi', name: '城山珍味食堂', koreanName: '성산진미식당', category: 'restaurant', status: 'candidate',
      address: 'Seongsan-eup, Seogwipo-si', note: '9/27 晚饭第二候选；精确点位与当天营业时间待核验。',
    },
  ],
}
