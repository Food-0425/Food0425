'use client'

import React, { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'

import ShopCard from '../components/ShopCard'
import FoodCard from '../components/FoodCard'
import styles from '../styles/RecipeLanding.module.css'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

// 顯示一頁幾筆
const RECIPES_PER_PAGE = 15

export default function MyRoomPage() {
  // 下為測試用假資料，都已改成資料庫欄位名稱了
  const mockRecipe = {
    // 資料庫名稱：recipes
    id: '1',
    title: '麻婆豆腐',
    description:
      '濃郁奶油醬汁搭配大蒜香氣的經典義大利麵料理，簡單又美味。典義大利麵料理，簡單又美味。',
    image: '',
  }
  const mockShop = {
    // 資料庫名稱：food_products
    id: '1014',
    name: '深海之味',
    brand: '冷凍海鮮什錦',
    image: '/images/recipes-img/recipes-15.jpg',
    price: 350,
    original_price: 390,
  }
  
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

  // 測試取得單筆網頁內容
  const router = useRouter()

  // 檢查路由是否已經準備好
  if (!router.isReady) {
    return <div>Loading...</div> // 在路由還沒準備好時顯示 Loading
  }

  // 確保在路由準備好後再獲取 id
  const { id } = router.query

  // 使用 useSWR 來抓取資料
  // const { data, error } = useSWR(id ? `/api/posts/${id}` : null, fetcher)

  // 判斷是否正在加載資料
  // const isLoading = !post && !error

  // 如果正在加載資料
  if (isLoading) return <div>Loading...</div>

  // 如果發生錯誤
  if (error) return <div>Failed to load post</div>

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

      {/* <div className={styles.container}> */}
      <RecipeCard
        id={mockRecipe.id}
        image={mockRecipe.image}
        title={mockRecipe.title}
        description={mockRecipe.description}
        initialFavorite={false}
        showViewButton={true}
      />
      <ShopCard
        id={mockShop.id}
        image={mockShop.image}
        name={mockShop.name}
        brand={mockShop.brand}
        price={mockShop.price}
        original_price={mockShop.original_price}
        initialFavorite={false}
        showViewButton={true}
      />

      {/* 不要用 FoodCard 可參考她的收藏功能就好!!! */}
      {/* <FoodCard
        food={mockRecipe} // 傳遞整個 food 物件
      /> */}
      {/* </div> */}

    </>
  )
}
