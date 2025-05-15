'use client'

import React from 'react'
import styles from '../styles/member-center.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96c90fdb2fd7169341f851c57f561cb320cfb422?placeholderIfAbsent=true&apiKey=137a18afd6bf49c9985266999785670f',
      text: '會員資料',
      path: '/member-center',
    },
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/353948e841845df2227924e2b292fdf6b9a8b780?placeholderIfAbsent=true&apiKey=137a18afd6bf49c9985266999785670f',
      text: '修改密碼',
      path: '/member-center/password',
    },
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/31d5363120db819d1f4786373704c09a3eb6b265?placeholderIfAbsent=true&apiKey=137a18afd6bf49c9985266999785670f',
      text: '我的收藏',
      path: '/member-center/favorites',
    },
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b70e6ec339551bd239bee4827549d7554fef7b2d?placeholderIfAbsent=true&apiKey=137a18afd6bf49c9985266999785670f',
      text: '我的訂單',
      path: '/member-center/orders',
    },
  ]

  return (
    <div className={styles.sidebar}>
      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={`${styles.sidebarButton} ${
            pathname === item.path ? styles.active : ''
          }`}
        >
          <div className={styles.buttonIcon}>
            <img src={item.icon} alt={item.text} />
          </div>
          <div className={styles.buttonText}>{item.text}</div>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
