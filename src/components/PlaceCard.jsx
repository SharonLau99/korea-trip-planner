function hasCoordinates(place) {
  return Number.isFinite(place.lat) && Number.isFinite(place.lng)
}

function navLinks(place) {
  const label = encodeURIComponent(place.koreanName || place.name)
  return {
    google: hasCoordinates(place)
      ? `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${label}`,
    naver: `https://map.naver.com/p/search/${label}`,
  }
}

function typeLabel(place) {
  if (place.category === 'restaurant' || place.category === 'food') return '🍴 餐饮'
  if (place.category === 'hotel') return '🏨 酒店'
  if (place.category === 'hike') return '🥾 徒步'
  if (place.category === 'transport') return '🚏 交通'
  return '📍 地点'
}

export default function PlaceCard({ place, selected, onSelect }) {
  const links = navLinks(place)
  return (
    <article className={`place-card ${selected ? 'selected-place' : ''}`}>
      <div className="place-card-top">
        <div>
          <span className="place-type">{typeLabel(place)}</span>
          <h3>{place.name}</h3>
          {place.koreanName && <p className="korean-name">{place.koreanName}</p>}
        </div>
        <span className={`status-pill ${place.status}`}>{place.status === 'fixed' ? '固定' : '候选'}</span>
      </div>
      {place.address && <p className="place-address">{place.address}</p>}
      {place.note && <p className="place-note">{place.note}</p>}
      {place.approximate && <p className="warning-text">⚠️ 当前地图点位为约略位置，正式导航前以 Naver 搜索结果复核。</p>}
      {!hasCoordinates(place) && <p className="warning-text">🧭 精确坐标待核验；仍可直接用店名打开 Naver / Google 搜索。</p>}
      <div className="place-actions">
        <a className="nav-button" href={links.naver} target="_blank" rel="noreferrer">🧭 Naver</a>
        <a className="nav-button ghost" href={links.google} target="_blank" rel="noreferrer">🗺 Google</a>
        {onSelect && (
          <button className="choose-button" onClick={() => onSelect(place.id)}>
            {selected ? '✓ 已设为优先' : '设为优先选择'}
          </button>
        )}
      </div>
    </article>
  )
}
