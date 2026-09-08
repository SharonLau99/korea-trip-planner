import { useMemo, useState } from 'react'
import { tripPackingChecklist, dailyDepartureChecklists } from '../data/checklists'

const STORAGE_KEY = 'korea-trip-checklist-state-v2'

function loadChecklistState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export default function ChecklistPanel({ day }) {
  const [mode, setMode] = useState('daily')
  const [state, setState] = useState(() => loadChecklistState())

  const dailyItems = dailyDepartureChecklists[day.date] || []
  const groups = useMemo(() => {
    if (mode === 'packing') return tripPackingChecklist
    return [{ id: `daily-${day.date}`, title: `${day.date.slice(5).replace('-', '/')} · 出发前 Checklist`, items: dailyItems.map((label, index) => ({ id: `daily-${index}`, label })) }]
  }, [mode, day.date, dailyItems])

  function itemKey(groupId, itemId) {
    return mode === 'packing' ? `packing:${groupId}:${itemId}` : `${day.date}:${itemId}`
  }

  function toggle(groupId, itemId) {
    const key = itemKey(groupId, itemId)
    setState((previous) => {
      const next = { ...previous, [key]: !previous[key] }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const flatItems = groups.flatMap((group) => group.items.map((item) => ({ groupId: group.id, item })))
  const doneCount = flatItems.filter(({ groupId, item }) => state[itemKey(groupId, item.id)]).length
  const percent = flatItems.length ? Math.round(doneCount / flatItems.length * 100) : 0

  function resetCurrent() {
    const prefixes = mode === 'packing' ? ['packing:'] : [`${day.date}:`]
    setState((previous) => {
      const next = { ...previous }
      Object.keys(next).forEach((key) => {
        if (prefixes.some((prefix) => key.startsWith(prefix))) delete next[key]
      })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  return (
    <>
      <section className="panel checklist-hero">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TRIP CHECKLIST</p>
            <h2>✅ 出行清单</h2>
          </div>
          <span className="check-progress-badge">{doneCount}/{flatItems.length}</span>
        </div>
        <div className="check-progress"><div style={{ width: `${percent}%` }} /></div>
        <p className="check-progress-text">已完成 {percent}% · 勾选状态保存在当前浏览器</p>
        <div className="segmented checklist-segmented">
          <button className={mode === 'daily' ? 'active' : ''} onClick={() => setMode('daily')}>今日出发前</button>
          <button className={mode === 'packing' ? 'active' : ''} onClick={() => setMode('packing')}>总行李清单</button>
        </div>
      </section>

      {mode === 'daily' && (
        <section className="panel reminder-panel checklist-tip">
          <p className="eyebrow">当天执行</p>
          <h2>🎒 出门前快速过一遍</h2>
          <p>当天清单只保留真正会影响当天执行的项目；船班、天气、路线等易变化信息仍以当天实际为准。</p>
        </section>
      )}

      {groups.map((group) => (
        <section className="panel checklist-group" key={group.id}>
          <h2>{group.title}</h2>
          {group.note && <p className="section-note">{group.note}</p>}
          <div className="checklist-items">
            {group.items.map((item) => {
              const key = itemKey(group.id, item.id)
              const checked = !!state[key]
              return (
                <label className={`checklist-row ${checked ? 'checked' : ''}`} key={item.id}>
                  <input type="checkbox" checked={checked} onChange={() => toggle(group.id, item.id)} />
                  <span>{item.label}</span>
                </label>
              )
            })}
          </div>
        </section>
      ))}

      <section className="panel checklist-reset-panel">
        <button className="reset-button checklist-reset" onClick={resetCurrent}>清空当前清单勾选</button>
      </section>
    </>
  )
}
