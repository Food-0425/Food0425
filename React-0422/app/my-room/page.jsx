'use client'

import React, { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'
import FoodCard from '../components/FoodCard'
import styles from '../styles/RecipeLanding.module.css'

export default function MyRoomPage() {
  const mockRecipe = {
    id: '1',
    title: '麻婆豆腐',
    description:
      '濃郁奶油醬汁搭配大蒜香氣的經典義大利麵料理，簡單又美味。典義大利麵料理，簡單又美味。',
    image: '/images/recipes-img/recipes-01.jpg', // 請放在 public/images/ 裡
  }

  return (
    <>
      <br />
      <br />
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

      {/* 不要用 FoodCard 可參考她的收藏功能就好!!! */}
      {/* <FoodCard
        food={mockRecipe} // 傳遞整個 food 物件
      /> */}
      {/* </div> */}
    </>
  )
}
