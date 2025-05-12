'use client'

import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from '../styles/RestaurantList.module.css'
import RestaurantCard from '../components/RestaurantCard'
import { API_SERVER } from '@/config/api-path'

// Mock data for restaurants
// const restaurantsData = [
//   {
//     id: 1,
//     image: '/images/restaurant/r02.jpg',
//     title: '山丘上的義式餐廳',
//     description:
//       '位於台北市郊的「山丘上的義式餐廳」，是一間充滿浪漫氛圍的義式料理餐廳。餐廳由米其林星級主廚 Marco 主理，將傳統義大利美食與在地食材完美結合，為饕客們帶來獨特的美食體驗。',
//     badge: '特選',
//   },
//   {
//     id: 2,
//     image: '/images/restaurant/r03.jpg',
//     title: '海景義式餐廳',
//     description:
//       '坐落於淡水河畔的「海景義式餐廳」，提供絕佳的河景視野和正宗的義大利美食。餐廳特別推薦海鮮義大利麵和手工披薩，每一道料理都能感受到主廚的用心和對食材的尊重。',
//     badge: '人氣',
//   },
//   {
//     id: 3,
//     image: '/images/restaurant/r04.jpg',
//     title: '小巷義大利麵',
//     description:
//       '隱身在大安區巷弄中的「小巷義大利麵」，是一間充滿溫馨氛圍的小店。店內的手工義大利麵由主廚每日新鮮製作，搭配季節性食材和特製醬汁，呈現出道地的義式風味。',
//     badge: '新開幕',
//   },
//   {
//     id: 4,
//     image: '/images/restaurant/r05.jpg',
//     title: '米其林一星義式餐廳',
//     description:
//       '位於信義區的「米其林一星義式餐廳」，是台北市最受歡迎的高級義式餐廳之一。餐廳以創新的料理手法和精緻的擺盤聞名，每一道菜品都是視覺與味覺的雙重享受。',
//     badge: '米其林',
//   },
//   {
//     id: 5,
//     image: '/images/restaurant/r06.jpg',
//     title: '隱藏的義式小館',
//     description:
//       '這是一家隱藏在巷弄中的義式小館，提供溫馨的用餐環境和地道的義大利美食，適合家庭聚餐或朋友聚會。',
//     badge: '隱藏版',
//   },
//   {
//     id: 6,
//     image: '/images/restaurant/r07.jpg',
//     title: '義式風味餐廳',
//     description:
//       '這家餐廳以其地道的義大利風味和友善的服務而聞名，是義大利美食愛好者的必訪之地。',
//     badge: '推薦',
//   },
// ]

export default function RestaurantsPage() {
  // 在 App Router 中使用 useParams 獲取路由參數
  const params = useParams()
  const id = params.id // 獲取動態路由參數

  // 如果需要獲取查詢參數，使用 useSearchParams
  const searchParams = useSearchParams()

  // 為確保客戶���渲染時能正確載入數據，添加一個加載狀態
  const [isLoading, setIsLoading] = useState(true)

  const [activePage, setActivePage] = useState(1) // 當前頁碼
  const itemsPerPage = 5 // 每頁顯示的餐廳數量
  // 使用 useEffect 確保客戶端渲染
  useEffect(() => {
    setIsLoading(false)
  }, [])
  const fetcher = (url) => fetch(url).then((res) => res.json())

  // 使用 useSWR 來抓取資料
  const { data, error } = useSWR(
    `${API_SERVER}/restaurants/api?page=${activePage}&limit=${itemsPerPage}`,
    fetcher
  )

  // 獲取數據
  const restaurants = data?.rows || []
  const totalPages = data?.totalPages || 1

  // 計算當前頁面的餐廳資料 (目前沒用到)
  // const startIndex = (activePage - 1) * itemsPerPage
  // const currentRestaurants = restaurants.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // )

  const handlePageChange = (pageNumber) => {
    // 更新頁碼狀態
    setActivePage(pageNumber)
    // 不需要手動觸發 mutate，因為 activePage 改變會導致 useSWR 的 key 改變，自動重新獲取數據
  }

  // 渲染邏輯
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>正在加載餐廳數據...</div>
  // if (!id) return <div>錯誤: 找不到餐廳ID</div>

  return (
    <div className={styles.pageContainer}>
      {/* <div>{JSON.stringify(data)}</div> */}
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
        <div className={styles.sectionTitle}>精選餐廳推薦</div>
        <div className={styles.restaurantList}>
          {restaurants.map((restaurant) => (
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
          onClick={() => handlePageChange(Math.max(activePage - 1, 1))}
        />

        {Array.from({ length: totalPages }, (_, index) => (
          <div key={index + 1} className={styles.pageNumberContainer}>
            <div
              className={`${styles.pageNumber} ${activePage === index + 1 ? styles.pageNumberActive : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </div>
          </div>
        ))}

        <img
          src="https://via.placeholder.com/11x16"
          className={styles.paginationArrow}
          alt="下一頁"
          onClick={() => handlePageChange(Math.min(activePage + 1, totalPages))}
        />
      </div>
    </div>
  )
}
