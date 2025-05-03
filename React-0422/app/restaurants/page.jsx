'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/RestaurantList.module.css'
import RestaurantCard from '../components/RestaurantCard'

// Mock data for restaurants
const restaurantsData = [
  {
    id: 1,
    image: '/images/restaurant/r02.jpg',
    title: '山丘上的義式餐廳',
    description:
      '位於台北市郊的「山丘上的義式餐廳」，是一間充滿浪漫氛圍的義式料理餐廳。餐廳由米其林星級主廚 Marco 主理，將傳統義大利美食與在地食材完美結合，為饕客們帶來獨特的美食體驗。',
    badge: '特選',
  },
  {
    id: 2,
    image: '/images/restaurant/r03.jpg',
    title: '海景義式餐廳',
    description:
      '坐落於淡水河畔的「海景義式餐廳」，提供絕佳的河景視野和正宗的義大利美食。餐廳特別推薦海鮮義大利麵和手工披薩，每一道料理都能感受到主廚的用心和對食材的尊重。',
    badge: '人氣',
  },
  {
    id: 3,
    image: '/images/restaurant/r04.jpg',
    title: '小巷義大利麵',
    description:
      '隱身在大安區巷弄中的「小巷義大利麵」，是一間充滿溫馨氛圍的小店。店內的手工義大利麵由主廚每日新鮮製作，搭��季節性食材和特製醬汁，呈現出道地的義式風味。',
    badge: '新開幕',
  },
  {
    id: 4,
    image: '/images/restaurant/r05.jpg',
    title: '米其林一星義式餐廳',
    description:
      '位於信義區的「米其林一星義式餐廳」，是台北市最受歡迎的高級義式餐廳之一。餐廳以創新的料理手法和精緻的擺盤聞名，每一道菜品都是視覺與味覺的雙重享受。',
    badge: '米其林',
  },
]

export default function RestaurantsPage() {
  const [activePage, setActivePage] = useState(3)

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    // In a real application, you would fetch data for the selected page here
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroTitle}>精選餐廳推薦</div>
          <div className={styles.heroDescription}>
            探索台北最具特色的美食餐廳，從傳統小吃到高級料理，滿足您的味蕾享受
          </div>
          <div className={styles.searchBar} />
        </div>
        <div className={styles.heroImageContainer}>
          <img
            src="/images/restaurant/r01.jpg"
            className={styles.heroImage}
            alt="餐廳美食"
          />
        </div>
        <img
          src="https://via.placeholder.com/1280x10"
          className={styles.decorativeImage}
          alt="裝飾圖案"
        />
      </div>

      <div className={styles.restaurantListSection}>
        <div className={styles.sectionTitle}>熱門餐廳</div>
        <div className={styles.restaurantList}>
          {restaurantsData.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              image={restaurant.image}
              title={restaurant.title}
              description={restaurant.description}
              badge={restaurant.badge}
            />
          ))}
        </div>
      </div>

      <div className={styles.pagination}>
        <img
          src="https://via.placeholder.com/11x16"
          className={styles.paginationArrow}
          alt="上一頁"
        />

        {[1, 2, 3, 4, 5].map((number) => (
          <div key={number} className={styles.pageNumberContainer}>
            <div
              className={`${styles.pageNumber} ${activePage === number ? styles.pageNumberActive : ''}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </div>
          </div>
        ))}

        <img
          src="https://via.placeholder.com/11x16"
          className={styles.paginationArrow}
          alt="下一頁"
        />
      </div>
    </div>
  )
}
