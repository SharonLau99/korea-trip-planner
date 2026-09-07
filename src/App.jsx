import { useEffect, useMemo, useState } from 'react'
import DailyMap from './components/DailyMap'
import PlaceCard from './components/PlaceCard'
import { day1 } from './data/day1'

const STORAGE_KEY = 'korea-trip-day1-state-v1'

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

export default function App() {
  const saved = loadState()
  const [activeTab, setActiveTab] = useState('itinerary')
  const [completed, setCompleted] = useState(saved?.completed || [])
  const [shiftMinutes, setShiftMinutes] = useState(saved?.shiftMinutes || 0)
  const [mode, setMode] = useState(saved?.mode || 'shopping')
  const [selectedDinner, setSelectedDinner] = useState(saved?.selectedDinner || null)
  const [userPosition, setUserPosition] = useState(null)
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completed, shiftMinutes, mode, selectedDinner }),
    )
  }, [completed, shiftMinutes, mode, selectedDinner])

  const timeline = useMemo(
    () => day1.timeline.map((node) => ({ ...node, displayTime: shiftedTime(node, shiftMinutes) })),
    [shiftMinutes],
  )

  const currentNode = timeline.find((node) => !completed.includes(node.id)) || timeline[timeline.length - 1]
  const currentIndex = timeline.findIndex((node) => node.id === currentNode.id)
  const nextNode = timeline[currentIndex + 1]

  const restaurants = day1.places.filter((place) => place.category === 'restaurant')
  const shops = day1.places.filter((place) => place.category === 'shop')

  const delayAdvice = shiftMinutes >= 120
    ? '延迟较大：建议免税店后直接吃晚饭，小店改为候选。'
    : shiftMinutes >= 60
      ? '当前延迟较明显：旧济州建议只选一家小店。'
      : shiftMinutes >= 30
        ? '有一些延迟，但当前行程仍可完整执行。'
        : '节奏正常，可以按完整 Shopping 方案执行。'

  const shillaEndMinutes = timeToMinutes('16:00') + shiftMinutes + 90
  const shillaRisk = shillaEndMinutes >= timeToMinutes('19:00')

  function toggleComplete(id) {
    setCompleted((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
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
    const tripDate = new Date(`${day1.date}T00:00:00`)
    const now = new Date()
    const sameDay = now.getFullYear() === tripDate.getFullYear()
      && now.getMonth() === tripDate.getMonth()
      && now.getDate() === tripDate.getDate()

    if (!sameDay || currentNode.fixed) return
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    setShiftMinutes(nowMinutes - timeToMinutes(currentNode.time))
  }

  function resetDay() {
    setCompleted([])
    setShiftMinutes(0)
    setMode('shopping')
    setSelectedDinner(null)
  }

  const pageTitle = `${day1.date.slice(5).replace('-', '/')} · ${day1.title}`

  return (
    <div className="app-shell">
      <main className="content">
        <header className="hero-card">
          <div>
            <p className="eyebrow">KOREA TRIP · JEJU</p>
            <h1>{pageTitle}</h1>
            <p className="hero-subtitle">{day1.subtitle}</p>
          </div>
          <div className="hero-tags">
            <span>Day 1</span>
            <span>轻松适应</span>
          </div>
        </header>

        {activeTab === 'itinerary' && (
          <>
            <section className="panel flight-card">
              <div>
                <p className="eyebrow">航班锚点</p>
                <h2>✈️ {day1.flight.number}</h2>
                <p>{day1.flight.from} → {day1.flight.to}</p>
              </div>
              <div className="flight-times">
                <strong>{day1.flight.departure}</strong>
                <span>→</span>
                <strong>{day1.flight.arrival}</strong>
              </div>
            </section>

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
              <div className={`advice-box ${shillaRisk ? 'risk-box' : ''}`}>
                <strong>{shillaRisk ? '⚠️ 时间风险' : '💡 当前建议'}</strong>
                <p>{shillaRisk ? '按当前延迟，新罗免税店会逼近营业结束时间，建议压缩酒店休息或旧济州小店。' : delayAdvice}</p>
              </div>
            </section>

            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">今日模式</p>
                  <h2>🛍️ Shopping / ☕ Relax</h2>
                </div>
              </div>
              <div className="segmented">
                <button className={mode === 'shopping' ? 'active' : ''} onClick={() => setMode('shopping')}>Shopping</button>
                <button className={mode === 'relax' ? 'active' : ''} onClick={() => setMode('relax')}>Relax</button>
              </div>
              <p className="mode-note">{mode === 'shopping' ? '保留新罗 + 旧济州小店；根据时间决定逛一到两家。' : '保留新罗，旧济州小店降级为候选，优先早点吃饭和休息。'}</p>
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
                  const isCurrent = node.id === currentNode.id
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
              <p className="eyebrow">明日提醒</p>
              <h2>🔔 9/27 咸德 + 牛岛</h2>
              <p>{day1.reminder}</p>
            </section>
          </>
        )}

        {activeTab === 'map' && (
          <>
            <DailyMap places={day1.places} userPosition={userPosition} onLocate={locateMe} locating={locating} />
            {locationError && <div className="panel error-panel">{locationError}</div>}
            <section className="panel">
              <p className="eyebrow">地图内全部地点</p>
              <h2>固定 + 候选</h2>
              <div className="compact-place-list">
                {day1.places.map((place) => <PlaceCard key={place.id} place={place} />)}
              </div>
            </section>
          </>
        )}

        {activeTab === 'food' && (
          <>
            <section className="panel">
              <p className="eyebrow">Day 1 餐饮池</p>
              <h2>🍴 今晚吃什么</h2>
              <p>不锁死餐厅。当天根据时间、体力、排队和最终位置选择。</p>
            </section>
            {restaurants.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                selected={selectedDinner === place.id}
                onSelect={setSelectedDinner}
              />
            ))}
            <section className="panel verification-panel">
              <p className="eyebrow">待核验候选</p>
              <h2>不为凑地图而编坐标</h2>
              {day1.restaurantNotes.map((note) => <p key={note}>{note}</p>)}
            </section>
          </>
        )}

        {activeTab === 'settings' && (
          <section className="panel settings-panel">
            <p className="eyebrow">旅行设置</p>
            <h2>⚙️ Day 1 基础信息</h2>
            <dl>
              <div><dt>日期</dt><dd>{day1.date}</dd></div>
              <div><dt>航班</dt><dd>{day1.flight.number} · {day1.flight.arrival} 抵达</dd></div>
              <div><dt>酒店</dt><dd>{day1.hotel}</dd></div>
              <div><dt>当前时间偏移</dt><dd>{shiftMinutes > 0 ? '+' : ''}{shiftMinutes} 分钟</dd></div>
            </dl>
            <button className="danger-button" onClick={resetDay}>清空 Day 1 现场状态</button>
          </section>
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
