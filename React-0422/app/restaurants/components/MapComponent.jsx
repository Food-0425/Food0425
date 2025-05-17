'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MapComponent = ({ latitude, longitude, name, address }) => {
  useEffect(() => {
    // 確保地圖容器存在
    const container = L.DomUtil.get('map')
    if (container != null) {
      container._leaflet_id = null
    }

    // 初始化地圖
    const map = L.map('map').setView([latitude, longitude], 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    // 添加標記
    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(
        `
        <strong>${name}</strong><br>
        ${address}
      `
      )
      .openPopup()

    // 清理函數
    return () => {
      map.remove()
    }
  }, [latitude, longitude, name, address])

  return <div id="map" style={{ height: '400px', width: '400px' }} />
}

export default MapComponent
