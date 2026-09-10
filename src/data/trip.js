import { day1 } from './day1'
import { day2 } from './day2'
import { day3 } from './day3'
import { day4 } from './day4'
import { day5 } from './day5'
import { day6 } from './day6'
import { day7 } from './day7'
import { day8 } from './day8'

export const koreaTrip = [day1, day2, day3, day4, day5, day6, day7, day8]

// Backward-compatible alias: App.jsx 旧版本仍引用 jejuTrip。
export const jejuTrip = koreaTrip

export const tripMeta = {
  title: 'Korea Trip 2026',
  phase: 'Jeju + Seoul',
  startDate: '2026-09-26',
  endDate: '2026-10-03',
  note: '本目录是韩国行程的结构化 Single Source of Truth。已确认航班、酒店与已锁定行程直接写入；营业时间、船班、天气、路线版本等易变化信息使用 verificationNotes 标记，避免把未核验信息伪装成最终事实。',
}
