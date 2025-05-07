'use client'

import React from 'react'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth-context'

const Header = () => {
  const { auth, logout } = useAuth()

  return (
    <div className={styles.navbar}>
      <div className={styles.navInner}>
        <div className={styles.navLeftGroup}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/147ffededb40ea0e14bf97b005d572350cf667e7?placeholderIfAbsent=true"
            className={styles.logo}
            alt="Logo"
          />
          <div className={styles.navBtnGroup}>
            <Link href="/recipes-landing">
              <div className={styles.navBtn}>美味食譜</div>
            </Link>
            <div className={styles.navBtn}>食材商城</div>
            <div className={styles.navBtn}>我的收藏</div>
            <Link href="/contact">
              <div className={styles.navBtn}>客服中心</div>
            </Link>
          </div>
        </div>
        <div className={styles.navRightGroup}>
          <div className={styles.searchBar}></div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b4106d2d7a7ff195be9319db4cefb439b3a1618?placeholderIfAbsent=true"
            className={styles.navIcon}
            alt="Cart"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4c69ecdb397ef30ee07fb46eb98010b30a24aa1?placeholderIfAbsent=true"
            className={styles.navIconSmall}
            alt="User"
          />
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                logout()
              }}
            >
              登出
            </a>
          </li>
        </div>
      </div>
    </div>
  )
}

export default Header
