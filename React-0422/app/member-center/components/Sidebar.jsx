'use client'

import React from 'react'
import styles from '../styles/member-center.module.scss'

// Sidebar 元件現在接收 activeContent 和 setActiveContent 作為 props
const Sidebar = ({ activeContent, setActiveContent }) => {
  // 更新 menuItems 結構，加入 key 來對應 activeContent
  // path 屬性可以保留，如果你未來可能還需要它 (例如，在某些情況下還是想提供直接連結)
  // 但在這個純客戶端內容切換的場景下，主要依賴 key
  const menuItems = [
    {
      key: 'profile', // 用於和 activeContent 比較
      // Todo: icon 要改為ReactIcon
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96c90fdb2fd7169341f851c57f561cb320cfb422?placeholderIfAbsent=true&apiKey=137a18afd6bf49c9985266999785670f',
      text: '會員資料',
      path: '/member-center/profile',
    },
    {
      key: 'password',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/353948e841845df2227924e2b292fdf6b9a8b780?placeholderIfAbsent=true&apiKey=137a18afd6bf49c9985266999785670f',
      text: '修改密碼',
      path: '/member-center/password',
    },
    {
      key: 'favorites',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/31d5363120db819d1f4786373704c09a3eb6b265?placeholderIfAbsent=true&apiKey=137a18afd6bf49c9985266999785670f',
      text: '我的收藏',
      path: '/member-center/favorites',
    },
    {
      key: 'orders',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b70e6ec339551bd239bee4827549d7554fef7b2d?placeholderIfAbsent=true&apiKey=137a18afd6bf49c9985266999785670f',
      text: '我的訂單',
      path: '/member-center/orders',
    },
  ]

  return (
    <div className={styles.sidebar}>
      {menuItems.map((item, index) => (
        // 將 <Link> 改為 <div> 或 <button>，並添加 onClick 事件
        <div
          key={item.key} // 使用 item.key 作為 React 的 key
          className={`${styles.sidebarButton} ${
            // 判斷 active 狀態的條件改為比較 item.key 和 activeContent
            activeContent === item.key ? styles.active : ''
          }`}
          onClick={() => setActiveContent(item.key)} // 點擊時呼叫 setActiveContent 並傳入 item.key
          // 為了無障礙和 SEO，可以考慮加上 role="button" 和 tabIndex="0"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            // 允許鍵盤操作
            if (e.key === 'Enter' || e.key === ' ') {
              setActiveContent(item.key)
            }
          }}
        >
          <div className={styles.buttonIcon}>
            <img src={item.icon} alt={item.text} />
          </div>
          <div className={styles.buttonText}>{item.text}</div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
