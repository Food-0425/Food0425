'use client'

import React, { useState } from 'react'
import styles from '../src/styles/Header.module.scss'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth-context'
import { FaCartShopping, FaUser } from '../icons/icons'

const Header = () => {
  const { auth, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className={styles.navbar}>
      <span>
        <div>
          <a href="">
            <img src="./images/logo/logo-onlyFont-02.png" alt="FOOD-logo" />
          </a>
          <div>
            <button>
              <h3>美味食譜</h3>
            </button>
            <button>
              <h3>食材商城</h3>
            </button>
            <button>
              <h3>我的收藏</h3>
            </button>
            <button>
              <h3>常見問題</h3>
            </button>
          </div>
        </div>

        <div>
          <div style={{ position: 'relative' }}>
            <button alt="User" onClick={toggleDropdown}>
              <div>
                <FaUser />
              </div>
            </button>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
               <li>
            {auth.id ? (
              <div>{auth.username}</div>
            ) : (
              <Link href="/login">
                <div>登入/註冊</div>
              </Link>
            )}
            {/* 如果已經登入，顯示會員名稱，否則顯示登入/註冊按鈕 */}
          </li>
                <li>
                  <a href="">會員中心</a>
                </li>
                {/* <li>
                  <a href="">我的收藏</a>
                </li> */}
                <li>
                  <a href="">我的訂單</a>
                </li>
<li className="nav-item">
            {/* 如果已經登入，顯示登出按鈕 */}
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
                <li>
                  <a href="">登出</a>
                </li>

              </ul>
            )}
          </div>
          <button alt="Cart">
            <div>
              <FaCartShopping />
            </div>
          </button>

        </div>
      </span>
    </div>
  )
}

export default Header
