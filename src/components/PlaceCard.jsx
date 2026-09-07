function navLinks(place) {
  const label = encodeURIComponent(place.koreanName || place.name)
  return {
    google: Number.isFinite(place.lat) && Number.isFinite(place.lng)
      ? `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${label}`,
    naver: `https://map.naver.com/p/search/${label}`,
  }
}

export default function PlaceCard({ place, selected, onSelect }) {
  const links = navLinks(place)
  return (
    <article className={`place-card ${selected ? 'selected-place' : ''}`}>
      <div className="place-card-top">
        <div>
          <span className="place-type">{place.category === 'restaurant' ? '🍴 餐厅' : '📍 地点'}</span>
          <h3>{place.name}</h3>
          {place.koreanName && <p className="korean-name">{place.koreanName}</p>}
        </div>
        <span className={`status-pill ${place.status}`}>{place.status === 'fixed' ? '固定' : '候选'}</span>
      </div>
      <p className="place-address">{place.address}</p>
      <p className="place-note">{place.note}</p>
      {place.approximate && <p className="warning-text">⚠️ 地图点位为门牌附近约略位置，正式导航以 Naver 搜索结果为准。</p>}
      <div className="place-actions">
        <a className="nav-button" href={links.naver} target="_blank" rel="noreferrer">🧭 Naver</a>
        <a className="nav-button ghost" href={links.google} target="_blank" rel="noreferrer">🗺 Google</a>
        {onSelect && (
          <button className="choose-button" onClick={() => onSelect(place.id)}>
            {selected ? '✓ 已选择' : '设为今晚选择'}
          </button>
        )}
      </div>
    </article>
  )
}
