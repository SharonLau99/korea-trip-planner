import { useEffect, useMemo, useState } from 'react'
import DailyMap from './components/DailyMap'
import PlaceCard from './components/PlaceCard'
import { jejuTrip } from './data/trip'

const STORAGE_KEY = 'korea-trip-jeju-state-v2'

function timeToMinutes(time) {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

function minutesToTime(total) {
  const normalized = ((total % 1440) + 1440) % 1440
  const hour = Math.floor(normalized / 60)
  const minute = normalized % 60
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

function shiftedTime(node, shiftMinutes) {
  if (node.fixed) return node.time
  return minutesToTime(timeToMinutes(node.time) + shiftMinutes)
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function todayDayIndex() {
  const now = new Date()
  const localDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const index = jejuTrip.findIndex((day) => day.date === localDate)
  return index >= 0 ? index : 0
}

function delayAdvice(dayNumber, shiftMinutes) {
  if (shiftMinutes <= 20) return '节奏正常，按当前方案继续即可。'
  if (dayNumber === 2) {
    if (shiftMinutes >= 60) return '牛岛日延迟明显：优先切“精华徒步 + 电助力”或“电助力环岛”，末班船永远优先。'
    return '牛岛日有少量延迟：压缩咸德或岛上非核心停留，不要挤压回程船班缓冲。'
  }
  if (dayNumber === 3) {
    if (shiftMinutes >= 60) return 'Route 7 延迟明显：市场直接降级为可选，晚饭和休息优先。'
    return 'Route 7 仍可执行，沿途少加停留，把体力留给后两天。'
  }
  if (dayNumber === 4) {
    if (shiftMinutes >= 60) return 'Route 8 是最长徒步日：建议切 Plan B，缩短海滩段，避免后半程摸黑或过度疲劳。'
    return 'Route 8 有一些延迟：午饭控制时长，中段按腿部状态决定 A/B。'
  }
  if (dayNumber === 5) {
    if (shiftMinutes >= 60) return 'Route 10 后还要回济州市：龙头海岸直接跳过，结束后优先最快的返城方式。'
    return 'Route 10 仍在可控范围；不要额外增加独立景点。'
  }
  if (shiftMinutes >= 60) return 'Day 1 延迟明显：旧济州只选一家小店或直接进入晚饭。'
  return 'Day 1 有少量延迟，但完整 Shopping 方案仍可执行。'
}

export default function App() {
  const saved = useMemo(() => loadState(), [])
  const [activeTab, setActiveTab] = useState('itinerary')
  const [activeDayIndex, setActiveDayIndex] = useState(saved?.activeDayIndex ?? todayDayIndex())
  const [dayStates, setDayStates] = useState(saved?.dayStates || {})
  const [userPosition, setUserPosition] = useState(null)
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')

  const day = jejuTrip[activeDayIndex]
  const dayState = dayStates[day.date] || {}
  const completed = dayState.completed || []
  const shiftMinutes = dayState.shiftMinutes || 0
  const selectedRestaurant = dayState.selectedRestaurant || null
  const planId = dayState.planId || day.defaultPlan || day.planOptions?.[0]?.id || null
  const activePlan = day.planOptions?.find((plan) => plan.id === planId) || null

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeDayIndex, dayStates }))
  }, [activeDayIndex, dayStates])

  function updateDayState(patchOrFactory) {
    setDayStates((previous) => {
      const current = previous[day.date] || {}
      const patch = typeof patchOrFactory === 'function' ? patchOrFactory(current) : patchOrFactory
      return { ...previous, [day.date]: { ...current, ...patch } }
    })
  }

  const timeline = useMemo(() => {
    const hidden = new Set(activePlan?.hiddenNodeIds || [])
    const overrides = activePlan?.nodeOverrides || {}
    return day.timeline
      .filter((node) => !hidden.has(node.id))
      .map((node) => {
        const baseNode = { ...node, ...(overrides[node.id] || {}) }
        return {
          ...baseNode,
          baseTime: baseNode.time,
          displayTime: shiftedTime(baseNode, shiftMinutes),
        }
      })
  }, [activePlan, day.timeline, shiftMinutes])

  const currentNode = timeline.find((node) => !completed.includes(node.id)) || timeline[timeline.length - 1]
  const currentIndex = timeline.findIndex((node) => node.id === currentNode?.id)
  const nextNode = currentIndex >= 0 ? timeline[currentIndex + 1] : null
  const foodPlaces = day.places.filter((place) => place.category === 'restaurant' || place.category === 'food')

  function toggleComplete(id) {
    updateDayState((current) => {
      const items = current.completed || []
      return { completed: items.includes(id) ? items.filter((item) => item !== id) : [...items, id] }
    })
  }

  function setShiftMinutes(valueOrFactory) {
    updateDayState((current) => {
      const currentValue = current.shiftMinutes || 0
      return { shiftMinutes: typeof valueOrFactory === 'function' ? valueOrFactory(currentValue) : valueOrFactory }
    })
  }

  function setPlan(nextPlanId) {
    updateDayState({ planId: nextPlanId })
  }

  function selectRestaurant(placeId) {
    updateDayState({ selectedRestaurant: placeId })
  }

  function locateMe() {
    setLocationError('')
    if (!navigator.geolocation) {
      setLocationError('当前浏览器不支持定位。')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude])
        setLocating(false)
      },
      () => {
        setLocationError('定位失败，请在浏览器设置里允许此网站访问位置。')
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    )
  }

  function startNextNow() {
    if (!currentNode || currentNode.fixed) return
    const tripDate = new Date(`${day.date}T00:00:00`)
    const now = new Date()
    const sameDay = now.getFullYear() === tripDate.getFullYear()
      && now.getMonth() === tripDate.getMonth()
      && now.getDate() === tripDate.getDate()

    if (!sameDay) return
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    setShiftMinutes(nowMinutes - timeToMinutes(currentNode.baseTime))
  }

  function resetDay() {
    setDayStates((previous) => ({ ...previous, [day.date]: {} }))
  }

  function switchDay(index) {
    setActiveDayIndex(index)
    setLocationError('')
    setActiveTab('itinerary')
  }

  const pageTitle = `${day.date.slice(5).replace('-', '/')} · ${day.title}`
  const advice = delayAdvice(day.dayNumber || activeDayIndex + 1, shiftMinutes)

  return (
    <div className="app-shell">
      <main className="content">
        <header className="hero-card">
          <div>
            <p className="eyebrow">KOREA TRIP · JEJU</p>
            <h1>{pageTitle}</h1>
            <p className="hero-subtitle">{day.subtitle}</p>
          </div>
          <div className="hero-tags">
            <span>Day {day.dayNumber || activeDayIndex + 1}</span>
            <span>{day.theme || 'Jeju'}</span>
          </div>
        </header>

        <section className="day-switcher" aria-label="济州行程日期切换">
          {jejuTrip.map((item, index) => (
            <button
              key={item.date}
              className={index === activeDayIndex ? 'active' : ''}
              onClick={() => switchDay(index)}
            >
              <span>D{item.dayNumber || index + 1}</span>
              <strong>{item.date.slice(5).replace('-', '/')}</strong>
            </button>
          ))}
        </section>

        {activeTab === 'itinerary' && (
          <>
            {day.flight && (
              <section className="panel flight-card">
                <div>
                  <p className="eyebrow">航班锚点</p>
                  <h2>✈️ {day.flight.number}</h2>
                  <p>{day.flight.from} → {day.flight.to}</p>
                </div>
                <div className="flight-times">
                  <strong>{day.flight.departure}</strong>
                  <span>→</span>
                  <strong>{day.flight.arrival}</strong>
                </div>
              </section>
            )}

            {currentNode && (
              <section className="panel current-panel">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">当前节点</p>
                    <h2>{currentNode.icon} {currentNode.title}</h2>
                  </div>
                  <span className="time-badge">{currentNode.displayTime}</span>
                </div>
                <p>{currentNode.description}</p>
                {nextNode && <p className="next-line">下一步：<strong>{nextNode.displayTime} · {nextNode.title}</strong></p>}
                <div className="current-actions">
                  <button className="primary-button" onClick={() => toggleComplete(currentNode.id)}>✓ 完成当前节点</button>
                  {!currentNode.fixed && <button className="secondary-button" onClick={startNextNow}>现在开始</button>}
                </div>
              </section>
            )}

            {day.planOptions?.length > 0 && (
              <section className="panel">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">当天方案</p>
                    <h2>🔀 动态 Plan</h2>
                  </div>
                </div>
                <div className="plan-grid">
                  {day.planOptions.map((plan) => (
                    <button
                      key={plan.id}
                      className={`plan-option ${plan.id === planId ? 'active' : ''}`}
                      onClick={() => setPlan(plan.id)}
                    >
                      <strong>{plan.label}</strong>
                      <span>{plan.description}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">动态时间轴</p>
                  <h2>⏱️ 当天时间调整</h2>
                </div>
                <span className={`shift-badge ${shiftMinutes >= 60 ? 'risk' : ''}`}>
                  {shiftMinutes === 0 ? '原计划' : `${shiftMinutes > 0 ? '+' : ''}${shiftMinutes} 分钟`}
                </span>
              </div>
              <div className="shift-controls">
                <button onClick={() => setShiftMinutes((value) => value - 10)}>−10</button>
                <button onClick={() => setShiftMinutes((value) => value + 10)}>+10</button>
                <button onClick={() => setShiftMinutes((value) => value + 20)}>+20</button>
                <button onClick={() => setShiftMinutes((value) => value + 30)}>+30</button>
                <button className="reset-button" onClick={() => setShiftMinutes(0)}>恢复原计划</button>
              </div>
              <div className={`advice-box ${shiftMinutes >= 60 ? 'risk-box' : ''}`}>
                <strong>{shiftMinutes >= 60 ? '⚠️ 时间风险' : '💡 当前建议'}</strong>
                <p>{advice}</p>
              </div>
            </section>

            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">执行顺序</p>
                  <h2>今日时间轴</h2>
                </div>
              </div>
              <div className="timeline">
                {timeline.map((node, index) => {
                  const isDone = completed.includes(node.id)
                  const isCurrent = node.id === currentNode?.id
                  return (
                    <article key={node.id} className={`timeline-node ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                      <div className="timeline-time">{node.displayTime}</div>
                      <div className="timeline-body">
                        <div className="timeline-title-row">
                          <h3>{node.icon} {node.title}</h3>
                          {node.fixed && <span className="anchor-pill">固定</span>}
                        </div>
                        <p>{node.description}</p>
                        {node.transportToNext && <p className="transport-line">下一段：{node.transportToNext}</p>}
                        <button className="mini-button" onClick={() => toggleComplete(node.id)}>{isDone ? '↩ 取消完成' : '✓ 完成'}</button>
                      </div>
                      {index < timeline.length - 1 && <div className="timeline-connector" />}
                    </article>
                  )
                })}
              </div>
            </section>

            <section className="panel reminder-panel">
              <p className="eyebrow">今日提醒</p>
              <h2>🔔 执行前检查</h2>
              <p>{day.reminder}</p>
            </section>
          </>
        )}

        {activeTab === 'map' && (
          <>
            <DailyMap places={day.places} userPosition={userPosition} onLocate={locateMe} locating={locating} />
            {locationError && <div className="panel error-panel">{locationError}</div>}
            <section className="panel">
              <p className="eyebrow">地图内全部地点</p>
              <h2>固定 + 候选</h2>
              <div className="compact-place-list">
                {day.places.map((place) => <PlaceCard key={place.id} place={place} />)}
              </div>
            </section>
          </>
        )}

        {activeTab === 'food' && (
          <>
            <section className="panel">
              <p className="eyebrow">Day {day.dayNumber || activeDayIndex + 1} 餐饮池</p>
              <h2>🍴 当天吃什么</h2>
              <p>按路线适配、当前位置、营业状态、排队和体力动态选择，不为了“打卡”大幅绕路。</p>
            </section>
            {foodPlaces.length > 0 ? foodPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                selected={selectedRestaurant === place.id}
                onSelect={selectRestaurant}
              />
            )) : (
              <section className="panel verification-panel">当前没有已录入的餐饮候选。</section>
            )}
            {day.restaurantNotes?.length > 0 && (
              <section className="panel verification-panel">
                <p className="eyebrow">待核验候选</p>
                <h2>不为凑地图而编坐标</h2>
                {day.restaurantNotes.map((note) => <p key={note}>{note}</p>)}
              </section>
            )}
          </>
        )}

        {activeTab === 'settings' && (
          <>
            <section className="panel settings-panel">
              <p className="eyebrow">旅行设置</p>
              <h2>⚙️ Day {day.dayNumber || activeDayIndex + 1} 基础信息</h2>
              <dl>
                <div><dt>日期</dt><dd>{day.date}</dd></div>
                <div><dt>主题</dt><dd>{day.theme || '-'}</dd></div>
                {day.flight && <div><dt>航班</dt><dd>{day.flight.number} · {day.flight.arrival} 抵达</dd></div>}
                <div><dt>住宿</dt><dd>{day.hotel}</dd></div>
                <div><dt>当前方案</dt><dd>{activePlan?.label || '默认'}</dd></div>
                <div><dt>时间偏移</dt><dd>{shiftMinutes > 0 ? '+' : ''}{shiftMinutes} 分钟</dd></div>
              </dl>
              <button className="danger-button" onClick={resetDay}>清空当天现场状态</button>
            </section>

            {day.verificationNotes?.length > 0 && (
              <section className="panel verification-panel">
                <p className="eyebrow">出发前核验</p>
                <h2>🧾 易变化信息</h2>
                <ul className="verification-list">
                  {day.verificationNotes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              </section>
            )}
          </>
        )}
      </main>

      <nav className="bottom-nav">
        <button className={activeTab === 'itinerary' ? 'active' : ''} onClick={() => setActiveTab('itinerary')}><span>🏠</span>行程</button>
        <button className={activeTab === 'map' ? 'active' : ''} onClick={() => setActiveTab('map')}><span>🗺️</span>地图</button>
        <button className={activeTab === 'food' ? 'active' : ''} onClick={() => setActiveTab('food')}><span>🍴</span>餐饮</button>
        <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}><span>⚙️</span>设置</button>
      </nav>
    </div>
  )
}
