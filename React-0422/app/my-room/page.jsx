'use client'

import React, { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'
import ShopCard from '../components/ShopCard'
import FoodCard from '../components/FoodCard'
import styles from '../styles/RecipeLanding.module.css'

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
