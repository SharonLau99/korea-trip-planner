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

export default function ChecklistPanel({ day, mode = 'daily', compact = false }) {
  const [state, setState] = useState(() => loadChecklistState())
  const [manuallyExpanded, setManuallyExpanded] = useState(false)

  const dailyItems = mode === 'daily' && day ? (dailyDepartureChecklists[day.date] || []) : []
  const groups = useMemo(() => {
    if (mode === 'packing') return tripPackingChecklist
    if (!day) return []
    return [{
      id: `daily-${day.date}`,
      title: '出发前 Checklist',
      items: dailyItems.map((label, index) => ({ id: `daily-${index}`, label })),
    }]
  }, [mode, day, dailyItems])

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
  const allDone = flatItems.length > 0 && doneCount === flatItems.length
  const collapsed = mode === 'daily' && compact && allDone && !manuallyExpanded

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
    setManuallyExpanded(true)
  }

  if (collapsed) {
    return (
      <section className="panel checklist-collapsed-card">
        <div>
          <p className="eyebrow">出发前准备</p>
          <h2>✅ 今日 Checklist 已完成</h2>
          <p>{doneCount}/{flatItems.length} · 可以出发了</p>
        </div>
        <button className="secondary-button" onClick={() => setManuallyExpanded(true)}>展开</button>
      </section>
    )
  }

  return (
    <>
      <section className={`panel checklist-hero ${compact ? 'checklist-compact' : ''}`}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">{mode === 'packing' ? 'BEFORE THE TRIP' : 'BEFORE LEAVING'}</p>
            <h2>{mode === 'packing' ? '🧳 总行李清单' : '🎒 今日出发前'}</h2>
          </div>
          <span className="check-progress-badge">{doneCount}/{flatItems.length}</span>
        </div>
        <div className="check-progress"><div style={{ width: `${percent}%` }} /></div>
        <p className="check-progress-text">
          {allDone ? '全部完成 ✓' : `已完成 ${percent}%`}
          {mode === 'packing' ? ' · 出发前逐项确认' : ' · 出门前快速过一遍'}
        </p>
      </section>

      {groups.map((group) => (
        <section className="panel checklist-group" key={group.id}>
          {mode === 'packing' && <h2>{group.title}</h2>}
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

      {!compact && (
        <section className="panel checklist-reset-panel">
          <button className="reset-button checklist-reset" onClick={resetCurrent}>清空当前清单勾选</button>
        </section>
      )}
    </>
  )
}
