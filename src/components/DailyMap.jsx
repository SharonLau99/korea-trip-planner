import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useMemo } from 'react'

function validPlace(place) {
  return Number.isFinite(place.lat) && Number.isFinite(place.lng)
}

function FitMap({ places, userPosition }) {
  const map = useMap()

  useEffect(() => {
    const points = places.filter(validPlace).map((place) => [place.lat, place.lng])
    if (userPosition) points.push(userPosition)
    if (points.length) map.fitBounds(points, { padding: [36, 36] })
  }, [map, places, userPosition])

  return null
}

function markerColor(place) {
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

export default function DailyMap({ places, userPosition, onLocate, locating }) {
  const mappedPlaces = useMemo(() => places.filter(validPlace), [places])
  const pendingCount = places.length - mappedPlaces.length
  const fixedRoute = useMemo(
    () => mappedPlaces
      .filter((place) => Number.isFinite(place.routeOrder))
      .sort((a, b) => a.routeOrder - b.routeOrder)
      .map((place) => [place.lat, place.lng]),
    [mappedPlaces],
  )

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
        <span><i className="legend-dot fixed-dot" />固定地点</span>
        <span><i className="legend-dot candidate-dot" />候选地点</span>
        <span><i className="legend-dot user-dot" />我的位置</span>
      </div>

      <MapContainer center={fallbackCenter} zoom={12} scrollWheelZoom className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitMap places={mappedPlaces} userPosition={userPosition} />
        {fixedRoute.length >= 2 && (
          <Polyline positions={fixedRoute} pathOptions={{ color: '#1f7a4f', weight: 4, opacity: 0.72 }} />
        )}

        {mappedPlaces.map((place) => {
          const links = navLinks(place)
          return (
            <CircleMarker
              key={place.id}
              center={[place.lat, place.lng]}
              radius={place.status === 'fixed' ? 9 : 7}
              pathOptions={{
                color: '#ffffff',
                weight: 2,
                fillColor: markerColor(place),
                fillOpacity: 1,
              }}
            >
              <Popup>
                <div className="map-popup">
                  <strong>{place.name}</strong>
                  {place.approximate && <div className="popup-warning">约略点位 · 正式导航前复核</div>}
                  {place.address && <p>{place.address}</p>}
                  {place.note && <p>{place.note}</p>}
                  <div className="popup-actions">
                    <a href={links.naver} target="_blank" rel="noreferrer">Naver</a>
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
        地图用于理解当天空间关系；实时公交、步行和打车路线仍交给 Naver / Google 导航。
        {pendingCount > 0 ? ` 另有 ${pendingCount} 个候选点因精确坐标待核验，暂不强行落点。` : ''}
      </p>
    </section>
  )
}
