'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './../styles/RecipeList.module.css'
import RecipeCard from '../components/RecipeCard'
import useSWR from 'swr'

// 顯示一頁幾筆
const RECIPES_PER_PAGE = 15

export default function MyTestRoomPage(props) {
  const [currentPage, setCurrentPage] = useState(1) // 從第1頁開始，與原本靜態頁面一致
  const [totalPages, setTotalPages] = useState(6)
  const fetcher = (url) => fetch(url).then((res) => res.json())

  // 連到後端(商品)
  // const { data, isLoading, error } = useSWR(
  //   `http://localhost:3001/prouduct/api?page=${currentPage}&limit=${RECIPES_PER_PAGE}`,
  //   fetcher
  // )

  // 連到後端(商品評價)
  const { data, isLoading, error } = useSWR(
    `http://localhost:3001/prouduct-review/api?page=${currentPage}&limit=${RECIPES_PER_PAGE}`,
    fetcher
  )

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages)
    }
  }, [data])

  const prouduct = data?.rows || []

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>這是我的測試室</h2>
      {/* 下面這行JSON是拿來初步確認是否有拿到後端資料用的 */}
      <div>{JSON.stringify(prouduct)}</div>
      {/* <div className={styles.recipeSection}>
        {isLoading ? (
          <div className={styles.loading}>載入中...</div>
        ) : (
          <div className={styles.recipeGrid}>
            {prouduct.map((prouduct) => (
              <RecipeCard
                key={prouduct.id}
                id={prouduct.id}
                image={prouduct.image}
                title={prouduct.title}
                description={prouduct.description}
                // isFavorite={favorites[prouduct.id] || false}
                // onFavoriteToggle={() => toggleFavorite(prouduct.id)}
              />
            ))}
          </div>
        )}
      </div> */}

      <div className={styles.recipeSection}>
        {isLoading ? (
          <div className={styles.loading}>載入中...</div>
        ) : (
          <div className={styles.recipeGrid}>
            {prouduct.map((prouduct) => (
              <div key={prouduct.review_id}>
                <RecipeCard
                  key={prouduct.review_id}
                  id={prouduct.name}
                  image={prouduct.user_id}
                  title={prouduct.name}
                  description={prouduct.review_text}
                  // isFavorite={favorites[prouduct.id] || false}
                  // onFavoriteToggle={() => toggleFavorite(prouduct.id)}
                />
                <div className={styles.extraContent}>
                  {/* 這裡是額外的內容 */}
                  <p>{prouduct.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
