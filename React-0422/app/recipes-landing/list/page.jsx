'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../../styles/RecipeList.module.css'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'

import { API_SERVER } from '../../../config/api-path'

const RECIPES_PER_PAGE = 15

export default function RecipeListPage() {
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || 1, 10) // 確保是數字
  const keyword = searchParams.get('keyword') || ''

  const fetcher = (url) => fetch(url).then((res) => res.json())

  const { data, isLoading, error } = useSWR(
    `${API_SERVER}/recipes/api?page=${currentPage}&limit=${RECIPES_PER_PAGE}&keyword=${encodeURIComponent(keyword)}`,
    fetcher
  )

  const recipes = data?.rows || []
  const [totalPages, setTotalPages] = useState(1) // 初始化 totalPages 為 1

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages) // 從 API 響應中設置 totalPages
    }
  }, [data])

  // 處理換頁
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // 更新 URL 的查詢參數
      const params = new URLSearchParams(searchParams)
      params.set('page', newPage)
      window.history.pushState({}, '', `?${params.toString()}`)
    }
  }

  // 生成分頁按鈕
  const renderPaginationButtons = () => {
    let buttons = []
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          number={i.toString()}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        />
      )
    }
    return buttons
  }

  // 收藏功能
  const [favorites, setFavorites] = useState({})

  const toggleFavorite = (recipeId) => {
    setFavorites((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.heroBackground}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/25474f8c77fa37bdec47687719cc06595f43d1ba?placeholderIfAbsent=true"
                className={styles.heroImage}
                alt="Desserts and sweets background"
              />
            </div>
            <div className={styles.heroTextContainer}>
              <h1 className={styles.heroTitle}>糕點甜食</h1>
              <p className={styles.heroSubtitle}>
                每一口都是甜蜜的優雅相遇，讓我們邂逅彼此吧！
              </p>
            </div>
          </div>
        </div>

        {/* Category Section */}

        {/* Recipe Cards Section 列表頁的食物卡片區塊 */}
        <div className={styles.recipeSection}>
          {isLoading ? (
            <div className={styles.loading}>載入中...</div>
          ) : (
            <div className={styles.recipeGrid}>
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  image={recipe.image}
                  title={recipe.title}
                  description={recipe.description}
                  isFavorite={favorites[recipe.id] || false}
                  onFavoriteToggle={() => toggleFavorite(recipe.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className={styles.paginationSection}>
          <div className={styles.pagination}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7621e318296d252a3602f5e493219e1ec6743cf?placeholderIfAbsent=true"
              className={styles.paginationArrow}
              alt="Previous"
              onClick={() => handlePageChange(currentPage - 1)}
              style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}
            />
            {renderPaginationButtons()}
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f4fa8097701997cdf6e061da95678103b1c9705?placeholderIfAbsent=true"
              className={styles.paginationArrow}
              alt="Next"
              onClick={() => handlePageChange(currentPage + 1)}
              style={{
                cursor: currentPage < totalPages ? 'pointer' : 'not-allowed',
              }}
            />
          </div>
        </div>

        {/* Featured Recipes */}
        <FeaturedRecipes />
      </div>
    </div>
  )
}

// 改進的Recipe Card組件，添加了可交互功能
function RecipeCard({
  id,
  image,
  title,
  description,
  isFavorite,
  onFavoriteToggle,
}) {
  return (
    <div className={styles.recipeCard}>
      <div className={styles.recipeImageContainer}>
        <img src={`/${image}`} className={styles.recipeImage} alt={title} />
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
        alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={onFavoriteToggle}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}

// 改進的分頁按鈕，添加了點擊事件
function PaginationButton({ number, active, onClick }) {
  return (
    <div className={styles.paginationItem} onClick={onClick}>
      <div
        className={`${styles.paginationButton} ${active ? styles.paginationButtonActive : ''}`}
        style={{ cursor: 'pointer' }}
      >
        {number}
      </div>
    </div>
  )
}

// 特色菜譜組件，作為獨立組件抽出
function FeaturedRecipes() {
  const featuredItems = [
    {
      id: 1,
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/03ec9c50f4f087542c0afe378af3f1fcbfde20d4?placeholderIfAbsent=true',
      title: '希臘沙拉',
    },
    {
      id: 2,
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/7a43f4bfcd99333bfe6fba9d9d033a14bb4180e3?placeholderIfAbsent=true',
      title: '墨西哥玉米餅沙拉',
    },
    {
      id: 3,
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/50eea6438055fc117cb27e7139e9cfb30c596175?placeholderIfAbsent=true',
      title: '義式焗烤千層麵',
    },
    {
      id: 4,
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/9daf85a30c6cfdd8696f78da6f9d2c8b124c58de?placeholderIfAbsent=true',
      title: '巧克力熔岩蛋糕',
    },
    {
      id: 5,
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/6a641c0d98cb11a184268cea2ac7347ed8729889?placeholderIfAbsent=true',
      title: '台式滷肉飯',
    },
    {
      id: 6,
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/d8956660deb885f91af0a46651bf496bfe4f5de1?placeholderIfAbsent=true',
      title: '泰式綠咖哩雞',
    },
  ]

  return (
    <div className={styles.featuredSection}>
      <div className={styles.featuredGrid}>
        {featuredItems.map((item) => (
          <FeaturedRecipe key={item.id} image={item.image} title={item.title} />
        ))}
      </div>
    </div>
  )
}

// Featured Recipe Component
function FeaturedRecipe({ image, title }) {
  return (
    <div className={styles.featuredCard}>
      <img src={image} className={styles.featuredImage} alt={title} />
      <div className={styles.featuredTitle}>{title}</div>
    </div>
  )
}
