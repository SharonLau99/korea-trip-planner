import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useMemo } from 'react'

function validPlace(place) {
  return Number.isFinite(place.lat) && Number.isFinite(place.lng)
}

function FitMap({ places, userPosition, hikingPath }) {
  const map = useMap()

  useEffect(() => {
    const points = places.filter(validPlace).map((place) => [place.lat, place.lng])
    hikingPath?.forEach((point) => points.push(point))
    if (userPosition) points.push(userPosition)
    if (points.length) map.fitBounds(points, { padding: [36, 36] })
  }, [map, places, userPosition, hikingPath])

  return null
}

function inferredRole(place) {
  if (place.keyRole) return place.keyRole
  const roles = {
    udoPort: 'start',
    udobong: 'highlight',
    geommeolle: 'highlight',
    hagosudong: 'highlight',
    seobin: 'highlight',
    route7Start: 'start',
    beophwan: 'supply',
    route7Finish: 'finish',
    hwasun: 'start',
    sagye: 'supply',
    songaksan: 'highlight',
    seotal: 'stamp',
    altteureu: 'highlight',
    hamo: 'finish',
  }
  return roles[place.id] || null
}

function markerColor(place) {
  const role = inferredRole(place)
  if (role === 'start') return '#1f7a4f'
  if (role === 'finish') return '#8b2f2f'
  if (role === 'stamp') return '#4f46e5'
  if (role === 'supply' || role === 'lunch') return '#b7791f'
  if (place.status === 'fixed') return '#1f7a4f'
  if (place.category === 'restaurant' || place.category === 'food') return '#b7791f'
  return '#8a6b20'
}

function navLinks(place) {
  const label = encodeURIComponent(place.koreanName || place.name)
  return {
    google: validPlace(place)
      ? `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${label}`,
    naver: `https://map.naver.com/p/search/${label}`,
  }
}

function roleLabel(place) {
  const role = inferredRole(place)
  if (role === 'start') return '🥾 徒步起点'
  if (role === 'finish') return '🏁 徒步终点'
  if (role === 'stamp') return '🔵 中间章 / 状态检查'
  if (role === 'supply') return '💧 补给候选'
  if (role === 'lunch') return '🍜 午饭候选'
  if (role === 'branch') return '🔀 A/B 方案节点'
  if (role === 'highlight') return '✨ 沿途重点'
  return null
}

function inferHikingRoute(places) {
  const ids = new Set(places.map((place) => place.id))

  if (ids.has('wolpyeong') && ids.has('daepyeong')) return null // Route 8 is derived from explicit key roles in day data.

  if (ids.has('route7Start') && ids.has('route7Finish')) {
    return {
      name: 'Jeju Olle Route 7',
      distanceKm: 12.9,
      note: 'Route 7 关键点路线示意；用于理解沿海方向与补给位置，出发前按 Jeju Olle / Olle Pass 最新路线复核。',
      full: [
        [33.2440, 126.5650],
        [33.2394, 126.5585],
        [33.2375, 126.5480],
        [33.2350, 126.5350],
        [33.2340, 126.5150],
        [33.2360, 126.4960],
        [33.2388, 126.4800],
        [33.2410, 126.4640],
      ],
    }
  }

  if (ids.has('hwasun') && ids.has('hamo')) {
    return {
      name: 'Jeju Olle Route 10',
      distanceKm: 15.6,
      note: 'Route 10 关键点路线示意：华顺—沙溪—松岳山—摹瑟浦方向；真正行走以 Jeju Olle 最新标识与 Naver 为准。',
      full: [
        [33.2407, 126.3338],
        [33.2425, 126.3220],
        [33.2468, 126.3130],
        [33.2295, 126.3070],
        [33.2180, 126.3000],
        [33.1990, 126.2900],
        [33.2050, 126.2720],
        [33.2040, 126.2660],
        [33.2110, 126.2580],
        [33.2180, 126.2530],
      ],
    }
  }

  if (ids.has('udoPort') && ids.has('udobong') && ids.has('seobin')) {
    return {
      name: 'Jeju Olle Route 1-1 · Udo',
      distanceKm: 11.3,
      note: '牛岛 Route 1-1 为环岛型关键点示意；当天会受实际到港码头、徒步/电助力方案与船班影响，导航仍以 Olle Pass / Naver 为准。',
      full: [
        [33.5050, 126.9520],
        [33.4933, 126.9570],
        [33.4937, 126.9660],
        [33.5050, 126.9680],
        [33.5156, 126.9582],
        [33.5200, 126.9495],
        [33.5108, 126.9446],
        [33.5050, 126.9520],
      ],
    }
  }

  return null
}

export default function DailyMap({ places, userPosition, onLocate, locating, hikingRoute, planId }) {
  const mappedPlaces = useMemo(() => places.filter(validPlace), [places])
  const pendingCount = places.length - mappedPlaces.length

  const orderedRoutePlaces = useMemo(
    () => mappedPlaces
      .filter((place) => Number.isFinite(place.routeOrder))
      .sort((a, b) => a.routeOrder - b.routeOrder),
    [mappedPlaces],
  )

  const fixedRoute = useMemo(
    () => orderedRoutePlaces.map((place) => [place.lat, place.lng]),
    [orderedRoutePlaces],
  )

  const derivedHikingPath = useMemo(() => {
    const startIndex = orderedRoutePlaces.findIndex((place) => inferredRole(place) === 'start')
    const finishIndex = orderedRoutePlaces.findIndex((place) => inferredRole(place) === 'finish')
    if (startIndex < 0 || finishIndex < 0 || finishIndex <= startIndex) return null
    return orderedRoutePlaces.slice(startIndex, finishIndex + 1).map((place) => [place.lat, place.lng])
  }, [orderedRoutePlaces])

  const inferredRoute = useMemo(() => inferHikingRoute(mappedPlaces), [mappedPlaces])
  const activeHikingRoute = hikingRoute || inferredRoute

  const hikingPath = useMemo(() => {
    if (activeHikingRoute) {
      if (planId && Array.isArray(activeHikingRoute[planId])) return activeHikingRoute[planId]
      if (Array.isArray(activeHikingRoute.full)) return activeHikingRoute.full
    }
    return derivedHikingPath
  }, [activeHikingRoute, planId, derivedHikingPath])

  const hasHikingRoute = Array.isArray(hikingPath) && hikingPath.length >= 2
  const routeName = activeHikingRoute?.name || (hasHikingRoute ? '今日 Olle 徒步路线' : null)
  const routeDistance = activeHikingRoute?.distanceKm
  const routeNote = activeHikingRoute?.note || '关键点路线示意：用于理解方向、景点和补给位置，真正导航请打开 Naver。'

  const fallbackCenter = mappedPlaces.length
    ? [mappedPlaces[0].lat, mappedPlaces[0].lng]
    : [33.38, 126.55]

  return (
    <section className="panel map-panel">
      <div className="section-heading map-heading">
        <div>
          <p className="eyebrow">今日空间视图</p>
          <h2>🗺️ 今日地图</h2>
        </div>
        <button className="secondary-button" onClick={onLocate} disabled={locating}>
          {locating ? '定位中…' : '📍 更新位置'}
        </button>
      </div>

      <div className="legend">
        {hasHikingRoute && <span><i className="legend-line hiking-line" />徒步主线</span>}
        <span><i className="legend-dot fixed-dot" />固定地点</span>
        <span><i className="legend-dot candidate-dot" />候选地点</span>
        <span><i className="legend-dot user-dot" />我的位置</span>
      </div>

      {hasHikingRoute && (
        <div className="route-summary">
          <div>
            <strong>🥾 {routeName}</strong>
            {routeDistance && <span>约 {routeDistance} km</span>}
          </div>
          <p>{routeNote}</p>
        </div>
      )}

      <MapContainer center={fallbackCenter} zoom={12} scrollWheelZoom className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitMap places={mappedPlaces} userPosition={userPosition} hikingPath={hikingPath} />

        {hasHikingRoute ? (
          <Polyline positions={hikingPath} pathOptions={{ color: '#2563eb', weight: 6, opacity: 0.82, lineCap: 'round' }} />
        ) : fixedRoute.length >= 2 ? (
          <Polyline positions={fixedRoute} pathOptions={{ color: '#1f7a4f', weight: 4, opacity: 0.72 }} />
        ) : null}

        {mappedPlaces.map((place) => {
          const links = navLinks(place)
          const role = roleLabel(place)
          const inferred = inferredRole(place)
          return (
            <CircleMarker
              key={place.id}
              center={[place.lat, place.lng]}
              radius={inferred === 'start' || inferred === 'finish' ? 10 : place.status === 'fixed' ? 9 : 7}
              pathOptions={{
                color: '#ffffff',
                weight: 2,
                fillColor: markerColor(place),
                fillOpacity: 1,
              }}
            >
              <Popup>
                <div className="map-popup">
                  {role && <div className="popup-role">{role}</div>}
                  <strong>{place.name}</strong>
                  {place.approximate && <div className="popup-warning">约略点位 · 正式导航前复核</div>}
                  {place.address && <p>{place.address}</p>}
                  {place.note && <p>{place.note}</p>}
                  <div className="popup-actions">
                    <a href={links.naver} target="_blank" rel="noreferrer">Naver 导航</a>
                    <a href={links.google} target="_blank" rel="noreferrer">Google</a>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}

        {userPosition && (
          <CircleMarker
            center={userPosition}
            radius={10}
            pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#2563eb', fillOpacity: 1 }}
          >
            <Popup>📍 你当前的位置</Popup>
          </CircleMarker>
        )}
      </MapContainer>
      <p className="map-note">
        地图用于理解当天空间关系和关键节点；真正的逐步导航继续交给 Naver。
        {hasHikingRoute ? ' 徒步线为关键点路线示意，不替代 Jeju Olle 官方最新路径。' : ''}
        {pendingCount > 0 ? ` 另有 ${pendingCount} 个候选点因精确坐标待核验，暂不强行落点。` : ''}
      </p>
    </section>
  )
}
