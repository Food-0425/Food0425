'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../../styles/RecipeList.module.css'
import useSWR from 'swr'

import { API_SERVER } from '../../../config/api-path'

// 模擬菜譜數據，可以從API獲取
const RECIPES_PER_PAGE = 15

export default function RecipeListPage() {
  //   const [recipes, setRecipes] = useState([])
  //   const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1) // 從第4頁開始，與原本靜態頁面一致
  const [totalPages, setTotalPages] = useState(6)
  //   const [favorites, setFavorites] = useState({})

  const fetcher = (url) => fetch(url).then((res) => res.json())
  // 原本AI生的
  //   const { data, isLoading, error } = useSWR(
  //     `/api/recipes?page=${currentPage}&limit=${RECIPES_PER_PAGE}`,
  //     fetcher
  //   )

  const { data, isLoading, error } = useSWR(
    `${API_SERVER}/recipes/api?page=${currentPage}&limit=${RECIPES_PER_PAGE}`,
    fetcher
  )

  const recipes = data?.rows || []

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages)
    }
  }, [data])

  // 模擬從API獲取數據
  //   useEffect(() => {
  //     // 這裡可以替換為實際的API調用
  //     const fetchRecipes = async () => {
  //       setLoading(true)
  //       try {
  //         // 在實際應用中，這裡應該是API請求
  //         // const response = await fetch(`/api/recipes?page=${currentPage}&limit=${RECIPES_PER_PAGE}`);
  //         // const data = await response.json();

  //         // 使用模擬數據替代API
  //         const mockRecipes = [
  //           {
  //             id: 1,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/efc9459b3edcbb46ebec33a55ae0d897315191be?placeholderIfAbsent=true',
  //             title: '草莓蛋糕',
  //             description: '新鮮草莓與綿密蛋糕的完美結合，每一口都充滿幸福感。',
  //           },
  //           {
  //             id: 2,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/848f17b1cb0d44210a03ad544f4e2500df0d6acf?placeholderIfAbsent=true',
  //             title: '巧克力餅乾',
  //             description: '香濃巧克力與酥脆餅乾的絕妙組合，讓人無法抗拒的美味。',
  //           },
  //           {
  //             id: 3,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/36a2bc6f31141f4a2a2efe103a9591b154f30c38?placeholderIfAbsent=true',
  //             title: '法式馬卡龍',
  //             description: '色彩繽紛的法式甜點，外酥內軟，每一口都是味蕾的享受。',
  //           },
  //           {
  //             id: 4,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/34938888c4cb88dce235ce0b70e7da746952a3ea?placeholderIfAbsent=true',
  //             title: '提拉米蘇',
  //             description: '經典義式甜點，咖啡與起司的完美融合，層次豐富。',
  //           },
  //           {
  //             id: 5,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/af4b70eb8d64e9f4d8f4f30f98033f5f2699c2f8?placeholderIfAbsent=true',
  //             title: '藍莓鬆餅',
  //             description: '鬆軟可口的鬆餅配上新鮮藍莓，早餐的絕佳選擇。',
  //           },
  //           {
  //             id: 6,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/339c166141b28bdaaffdb3d8e356f66e7624b06b?placeholderIfAbsent=true',
  //             title: '檸檬塔',
  //             description: '酸甜適中的檸檬塔，清爽的口感讓人回味無窮。',
  //           },
  //           {
  //             id: 7,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/6b26bff4e985267e5412fd8c5741a1fa234127ab?placeholderIfAbsent=true',
  //             title: '紅豆麻糬',
  //             description: '傳統東方甜點，軟糯的外皮包裹著香甜紅豆餡，口感豐富。',
  //           },
  //           {
  //             id: 8,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/c7a5f65a9c05736618d7fdf18a1f538eab043690?placeholderIfAbsent=true',
  //             title: '芒果冰淇淋',
  //             description: '新鮮芒果製成的冰淇淋，清涼爽口，夏日必備甜點。',
  //           },
  //           {
  //             id: 9,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/53ccb406ab4ea9d0ee80446e47190c79a3732121?placeholderIfAbsent=true',
  //             title: '抹茶蛋糕',
  //             description: '濃郁的抹茶風味，搭配輕盈的蛋糕體，日式甜點的經典。',
  //           },
  //           {
  //             id: 10,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/396a8286aec1f403093c97bdf3979a61a26f536e?placeholderIfAbsent=true',
  //             title: '肉桂捲',
  //             description: '香氣四溢的肉桂捲，溫暖的肉桂香氣配上甜膩的糖霜。',
  //           },
  //           {
  //             id: 11,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/0824354a93d24a922ef46935f19c53d4ea11a00f?placeholderIfAbsent=true',
  //             title: '蘋果派',
  //             description: '酥脆的派皮包裹著香甜的蘋果餡，傳統美式甜點。',
  //           },
  //           {
  //             id: 12,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/9717946f7052db47a2f6a14f5ec3a9a293dc83a2?placeholderIfAbsent=true',
  //             title: '奶油泡芙',
  //             description: '外酥內軟的泡芙，填滿香濃的奶油，法式經典甜點。',
  //           },
  //           {
  //             id: 13,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/1a9d40b9c295f814f3c8d2333726dbd245130e8b?placeholderIfAbsent=true',
  //             title: '巧克力慕斯',
  //             description: '絲滑的巧克力慕斯，入口即化，濃郁的巧克力風味。',
  //           },
  //           {
  //             id: 14,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/08a6553761ea55ff77eeba7fb6fb616b54aced7b?placeholderIfAbsent=true',
  //             title: '焦糖布丁',
  //             description: '滑嫩的布丁配上香甜的焦糖，簡單卻美味的甜點。',
  //           },
  //           {
  //             id: 15,
  //             image:
  //               'https://cdn.builder.io/api/v1/image/assets/TEMP/37b67b17a92a6743f67d5ec75f2c1a4083793fbc?placeholderIfAbsent=true',
  //             title: '紅絲絨蛋糕',
  //             description:
  //               '鮮豔的紅色蛋糕配上奶油起司糖霜，視覺與味覺的雙重享受。',
  //           },
  //         ]

  //         setRecipes(mockRecipes)
  //         setTotalPages(6) // 假設總共有6頁
  //       } catch (error) {
  //         console.error('獲取菜譜失敗:', error)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }

  //     fetchRecipes()
  //   }, [currentPage])

  // 處理換頁
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      // 在實際應用中，這裡會觸發新的API調用
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
        <div className={styles.categorySection}>
          <div className={styles.categoryContainer}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd1f919d0b6158366db45eb8a8bc08cc3b71c099?placeholderIfAbsent=true"
              className={styles.arrowIcon}
              alt="Left arrow"
              onClick={() => {
                /* 處理類別左滑 */
              }}
            />
            <div className={styles.categoryItems}>
              <div className={styles.categoryItem}>餅乾</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b9131227f9841bbf4a23d000701625fd0d7ce54?placeholderIfAbsent=true"
                className={styles.categoryImage}
                alt="Category"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cbdacfbfb4caa61ebe1173ba6e56d1094371f75e?placeholderIfAbsent=true"
                className={styles.categoryImage}
                alt="Category"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9393c58fd1403ef3204d730145da06b044bddfd?placeholderIfAbsent=true"
                className={styles.categoryImage}
                alt="Category"
              />
              <div className={styles.categoryItem}>中式糕點</div>
              <div className={styles.categoryItem}>零嘴小飴</div>
              <div className={styles.categoryItem}>雪糕</div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/aff87650c37f3c885c3a4d4827c325d78272ad96?placeholderIfAbsent=true"
              className={styles.arrowIcon}
              alt="Right arrow"
              onClick={() => {
                /* 處理類別右滑 */
              }}
            />
          </div>
        </div>

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
