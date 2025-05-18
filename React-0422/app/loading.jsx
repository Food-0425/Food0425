// app/dashboard/loading.jsx
import React from 'react'

export default function Loading() {
  // 這裡放置您的讀取 UI，例如文字或 Spinner
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 讓它佔滿 Layout 空間
        fontSize: '24px',
      }}
    >
      <p>儀表板正在載入中...</p>
      {/* 您可以在這裡加入 CSS 類名來應用更複雜的動畫 */}
      {/* <div className="loading-spinner"></div> */}
    </div>
  )
}
