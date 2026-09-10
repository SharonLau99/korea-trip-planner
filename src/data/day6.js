export const day6 = {
  date: '2026-10-01',
  dayNumber: 6,
  region: 'SEOUL',
  title: '抵达首尔 · 钟路 + 乙支路 City Walk',
  subtitle: '老首尔街区 + 本地老店 + 清溪川 + 乙支路夜生活',
  theme: '老城区慢走',
  flight: {
    number: 'LJ504',
    from: '济州机场',
    to: '首尔金浦机场',
    departure: '08:25',
    arrival: '09:40',
  },
  hotel: 'N285 Hotel Insadong',
  reminder: '首尔第一天刻意降强度：不购物、不赶景点，以老街、吃饭、休息为主。下午可先回酒店办理入住和休息，再去乙支路。',
  verificationNotes: [
    'LJ504 航班时间来自已确认订单；出发前一天再次查看航班动态。',
    '餐厅营业日、休息时间和排队情况在 9/30 晚或当天用 Naver / DiningCode 再确认。',
    '大连家、文化屋、爱情房刀切面等老店在节假日/临时休业时可能调整营业时间，不把单店作为不可替代锚点。',
  ],
  planOptions: [
    {
      id: 'old-seoul',
      label: '🏙️ Plan A · 老首尔慢走',
      description: '酒店寄存行李 → 钟路午饭 → 清溪川 → 回酒店休息 → 乙支路老工业街与晚饭。',
      nodeOverrides: {},
    },
    {
      id: 'rest-more',
      label: '☕ Plan B · 多休息',
      description: '如果济州连续徒步后比较累，压缩下午 City Walk，优先入住休息，傍晚再去乙支路吃饭。',
      hiddenNodeIds: ['cheonggye'],
      nodeOverrides: {
        checkin: { time: '14:45' },
        euljiro: { time: '17:00' },
        dinner: { time: '18:00' },
        nogari: { time: '19:30' },
      },
    },
  ],
  defaultPlan: 'old-seoul',
  timeline: [
    {
      id: 'gimpo', time: '09:40', title: '抵达首尔金浦机场', icon: '✈️', fixed: true,
      description: '下机、取行李。首尔段从这里开始，不安排购物任务。',
      transportToNext: '机场铁路 / 地铁为主；带大件行李或衔接差时 Taxi。',
    },
    {
      id: 'hotelDrop', time: '11:10', title: 'N285 Hotel Insadong · 寄存行李', icon: '🧳',
      description: '先把行李放酒店。酒店地址已按订单对应到 423 Samil-daero, Jongno-gu。',
      transportToNext: '步行去钟路 3 街一带吃午饭。',
    },
    {
      id: 'lunch', time: '11:45', title: '钟路老店午饭', icon: '🍲',
      description: '优先大连家（生白菜包肉 + 刀切面）；想吃更日常可选合川猪肉汤饭 / 永春屋牛骨汤。',
    },
    {
      id: 'cheonggye', time: '13:15', title: '钟路 → 清溪川慢走', icon: '🚶',
      description: '不打卡，沿老街与清溪川随意走 60–90 分钟，看首尔日常街景。',
      transportToNext: '步行返回酒店区域。',
    },
    {
      id: 'checkin', time: '15:00', title: '酒店入住 + 休息', icon: '🏨', fixed: true,
      description: '正式入住后休息 45–60 分钟，把济州连续徒步后的体力拉回来。',
    },
    {
      id: 'euljiro', time: '16:30', title: '乙支路 3/4 街 · 老工业街 City Walk', icon: '🏙️',
      description: '看印刷、五金、旧楼和巷道，不以网红店为目标；这一带白天仍保留老工业街结构。',
    },
    {
      id: 'dinner', time: '18:00', title: '乙支路老店晚饭', icon: '🍽️',
      description: '文化屋雪浓汤 / 爱情房刀切面与白熟鸡 / 山水甲山血肠汤，根据口味和排队临场选。',
    },
    {
      id: 'nogari', time: '19:30', title: '乙支路 Nogari Alley · 可选', icon: '🍺',
      description: '还有体力就坐一会儿，体验下班后的啤酒 + 烤小明太鱼文化；累了直接回酒店。',
    },
  ],
  places: [
    {
      id: 'gimpo', name: '金浦国际机场国内线航站楼', koreanName: '김포국제공항 국내선', category: 'transport', status: 'fixed', routeOrder: 1,
      lat: 37.55847, lng: 126.80300, address: '76 Haneul-gil, Gangseo-gu, Seoul', note: 'LJ504 抵达。',
    },
    {
      id: 'n285', name: 'N285 Hotel Insadong', koreanName: 'N285 호텔 인사동', category: 'hotel', status: 'fixed', routeOrder: 2,
      lat: 37.5723484, lng: 126.9874114, address: '423 Samil-daero, Jongno-gu, Seoul', note: '10/1–10/3 住宿；15:00 入住，10/3 11:00 前退房。',
    },
    {
      id: 'cheonggye', name: '清溪川 · 乙支路段', koreanName: '청계천', category: 'walk', status: 'fixed', routeOrder: 3,
      lat: 37.5684832, lng: 126.9967908, address: 'Cheonggyecheon-ro, Jung-gu, Seoul', note: 'City Walk 代表点；实际沿溪自由走。', approximate: true,
    },
    {
      id: 'euljiro3', name: '乙支路 3 街', koreanName: '을지로3가', category: 'walk', status: 'fixed', routeOrder: 4,
      lat: 37.566290, lng: 126.992780, address: 'Euljiro 3-ga, Jung-gu, Seoul', note: '老工业街 / 印刷五金巷道区域。',
    },
    {
      id: 'nogari', name: '乙支路 Nogari Alley', koreanName: '을지로 노가리골목', category: 'food', status: 'candidate', routeOrder: 5,
      lat: 37.5663295, lng: 126.9926642, address: '129 Eulji-ro, Jung-gu, Seoul', note: '晚饭后可选；啤酒 + 노가리，体验老乙支路夜晚。',
    },
    {
      id: 'daeryeon', name: '大连家', koreanName: '대련집', category: 'restaurant', status: 'candidate',
      address: '37 Jong-ro 16-gil, Jongno-gu, Seoul', note: '午饭优先。生白菜包肉 + 刀切面；DiningCode 2026-09-10 快照约 4.4/5、120 条评价，老店属性明显。',
    },
    {
      id: 'hapcheon', name: '合川猪肉汤饭', koreanName: '합천돼지국밥', category: 'restaurant', status: 'candidate',
      address: 'Jongno 3-ga, Jongno-gu, Seoul', note: '午饭备选；猪肉汤饭 / 白切肉，本地老店感强；精确门牌与当天营业待 Naver 复核。',
    },
    {
      id: 'yeongchunok', name: '永春屋', koreanName: '영춘옥', category: 'restaurant', status: 'candidate',
      address: '13 Donhwamun-ro 5ga-gil, Jongno-gu, Seoul', note: '牛骨汤 / 牛尾汤方向，适合想吃热汤时；当前公开信息显示长期营业，节前仍复核。',
    },
    {
      id: 'munhwaok', name: '文化屋', koreanName: '문화옥', category: 'restaurant', status: 'candidate',
      address: 'Euljiro 4-ga, Jung-gu, Seoul', note: '晚饭候选；首尔官方旅游资料列为 50+ 年传统雪浓汤老店。精确门牌当天用 Naver 导航。',
    },
    {
      id: 'sarangbang', name: '爱情房刀切面', koreanName: '사랑방칼국수', category: 'restaurant', status: 'candidate',
      address: '46 Toegye-ro 27-gil, Jung-gu, Seoul', note: '白熟鸡 + 刀切面；DiningCode 老店榜 2026-09-10 快照约 4.3/5、90+ 条评价。',
    },
    {
      id: 'sansoogabsan', name: '山水甲山', koreanName: '산수갑산', category: 'restaurant', status: 'candidate',
      address: 'Euljiro 3-ga, Jung-gu, Seoul', note: '血肠汤 / 内脏类老店；只有两人都接受内脏时再选。精确门牌与营业时间出发前复核。',
    },
  ],
  restaurantNotes: [
    '餐厅优先级：路线顺路 > 韩国本地平台口碑 > 老店/当地日常感 > 排队时间；不为了名气跨区打卡。',
    'DiningCode 评分为 2026-09-10 规划时快照，会变化；真正执行前用 Naver / DiningCode 再确认营业和排队。',
  ],
}
