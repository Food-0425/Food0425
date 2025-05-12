// RecipeCard.jsx
'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../src/styles/RecipeCard.module.scss' // 使用相對路徑

import { BsBookmarkStarFill, BsBookmarkPlus } from '../icons/icons'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/auth-context'

import { API_SERVER } from '@/config/api-path'

export default function RecipeCard({
  id,
  image,
  title,
  description,
  // isFavorite,
  initialFavorite = false,
  onFavoriteToggle,
  clickable = true,
  showViewButton = false,
  className = '',
}) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [favorites, setFavorites] = useState({})

  // useEffect(() => {
  //   console.log('Updated Favorites State:', favorites) // 確認 favorites 狀態
  // }, [favorites])

  useEffect(() => {
    console.log('Updated isFavorite:', isFavorite) // 確認 favorites 狀態
  }, [isFavorite])

  const handleCardClick = () => {
    if (clickable) {
      // 跳轉到菜譜詳情頁
      // 錯誤有可能是這個?
      // 或使用Next.js的路由: router.push(`/recipe/${id}`);
    }
  }

  useEffect(() => {
    setIsFavorite(initialFavorite) // 當父組件的收藏狀態改變時，更新本地狀態
  }, [initialFavorite])

  const handleFavoriteClick = (e) => {
    e.stopPropagation() // 防止點擊收藏圖標時觸發卡片點擊
    setIsFavorite(!isFavorite)
    if (onFavoriteToggle) {
      onFavoriteToggle(id)
    }
  }

  return (
    <div
      className={`${styles.recipeCard} ${className}`}
      onClick={handleCardClick}
      style={{ cursor: clickable ? 'pointer' : 'default' }}
    >
      <Link key={id} href={`/recipes/${id}`} passHref>
        <div>
          <img
            src={image} // 從 public 資料夾的根目錄開始
            alt={title}
          />
        </div>
        <span>
          <h3>{title}</h3>
          <p>{description}</p>
        </span>
      </Link>
      {/* 收藏按鈕 Start */}
      <button
        alt={isFavorite ? '已收藏' : '加入收藏'}
        onClick={handleFavoriteClick}
        style={{ cursor: 'pointer' }}
      >
        {isFavorite ? <BsBookmarkStarFill /> : <BsBookmarkPlus />}
        {/* <BsBookmarkStarFill />
        <BsBookmarkPlus /> */}
      </button>

      {/* 收藏按鈕 End */}
    </div>
  )
}
