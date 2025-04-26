// RecipeCard.jsx
import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/RecipeList.module.css' // 假設你會分離CSS樣式

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
      <div className={styles.recipeImageContainer}>
        <img src={image} className={styles.recipeImage} alt={title} />
        {showViewButton && (
          <div className={styles.viewButtonOverlay}>
            <button className={styles.viewButton}>查看食譜</button>
          </div>
        )}
      </div>

      <div className={styles.recipeContent}>
        <h3 className={styles.recipeTitle}>{title}</h3>
        <p className={styles.recipeDescription}>{description}</p>
      </div>

      <img
        src={
          isFavorite
            ? 'https://cdn.builder.io/api/v1/image/assets/TEMP/8a6ddd1b69b5dee16612f13ff720cd4410d1f183?placeholderIfAbsent=true'
            : 'https://cdn.builder.io/api/v1/image/assets/TEMP/8a6ddd1b69b5dee16612f13ff720cd4410d1f183?placeholderIfAbsent=true'
        }
        className={styles.favoriteIcon}
        alt={isFavorite ? '已收藏' : '加入收藏'}
        onClick={handleFavoriteClick}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}
