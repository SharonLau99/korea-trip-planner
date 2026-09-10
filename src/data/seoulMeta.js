export const seoulMeta = {
  city: 'Seoul',
  startDate: '2026-10-01',
  endDate: '2026-10-03',
  hotel: {
    name: 'N285 Insadong Hotel',
    checkIn: '2026-10-01 15:00',
    checkOut: '2026-10-03 11:00',
    nights: 2,
    room: '双人床 C1间',
    breakfastIncluded: false,
  },
  flights: [
    {
      date: '2026-10-01',
      number: 'LJ504',
      from: 'Jeju',
      to: 'Seoul / Gimpo',
      departure: '08:25',
      arrival: '09:40',
      status: 'confirmed',
    },
    {
      date: '2026-10-03',
      number: 'ZH634',
      from: 'Seoul / Incheon',
      to: 'Shenzhen',
      departure: '15:15',
      arrival: '18:00',
      status: 'confirmed',
    },
  ],
  planningNotes: [
    '10/1 09:40 抵达首尔后，酒店 15:00 才可入住；规划时优先考虑先寄存行李，再开始市区行程。',
    '10/3 15:15 从仁川机场飞深圳，且酒店 11:00 退房；当天只安排轻量上午行程，不安排跨城或远距离景点。',
    '首尔段偏好：不购物、不网红打卡；优先本地特色、休闲、City Walk、美食与都市生活体验。',
  ],
  sourceNote: '酒店与航班信息来自用户提供的已订订单截图；后续首尔行程以本文件为固定锚点。',
}
