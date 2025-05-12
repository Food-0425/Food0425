// RecipeCard.jsx
import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../src/styles/RecipeCard.module.scss' // 使用相對路徑

import { BsBookmarkStarFill, BsBookmarkPlus } from '../icons/icons'

export default function RecipeCard({
  id,
  image,
  title,
  description,
  initialFavorite = false,
  onFavoriteToggle,
  clickable = true,
  showViewButton = false,
  className = '',
}) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)

  const handleFavoriteClick = (e) => {
    e.stopPropagation() // 防止點擊收藏圖標時觸發卡片點擊
    setIsFavorite(!isFavorite)
    if (onFavoriteToggle) {
      onFavoriteToggle(id, !isFavorite)
    }
  }

  const handleCardClick = () => {
    if (clickable) {
      // 跳轉到菜譜詳情頁
      // 錯誤有可能是這個?
      window.location.href = `/recipe/${id}`
      // 或使用Next.js的路由: router.push(`/recipe/${id}`);
    }
  }

  return (
    <div
      className={`${styles.recipeCard} ${className}`}
      onClick={handleCardClick}
      style={{ cursor: clickable ? 'pointer' : 'default' }}
    >
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
      {/* 收藏按鈕 Start */}
      <button
        alt={isFavorite ? '已收藏' : '加入收藏'}
        onClick={handleFavoriteClick}
        style={{ cursor: 'pointer' }}
      >
        <BsBookmarkStarFill />
        {/* <BsBookmarkPlus /> */}
      </button>
      {/* 收藏按鈕 End */}
    </div>
  )
}
