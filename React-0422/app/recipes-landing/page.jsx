'use client'

import React from 'react'
import styles from '../styles/RecipeLanding.module.css'
import Link from 'next/link'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { API_SERVER } from '@/config/api-path'
import { useRouter } from 'next/navigation'

import {
  FaSearch,
  FaCakeCandles,
  FaFishFins,
  FaEarthAmericas,
  BiSolidBowlRice,
  LuDessert,
  LuSalad,
  TbMeat,
  CiBowlNoodles,
} from '../icons/icons'
import RecipeCarousel from './components/RecipeCarousel'

export default function RecipesLandingPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('肉食') // 用於追蹤當前選中的分類

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
  const { data, error } = useSWR(`${API_SERVER}/recipes/api/category`, fetcher)

  // 獲取數據
  const restaurants = data?.rows || []
  const totalPages = data?.totalPages || 10

  const handleCategory = (category) => {
    setActiveCategory(category) // 設定當前選中的分類
  }

  const handleSearch = (category) => {
    router.push(`/recipes-landing/list?page=1&keyword=${category}`)
  }

  return (
    <div>
      {/* 版首輪播 Start */}
      <RecipeCarousel />
      {/* 版首輪播 END */}

      <div className={styles.container}>
        {/* 食譜ICON選單 Start */}
        <div className={styles.categoriesContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/53f72b1cdd510a8160b76260d08cccc39de9e6a2?placeholderIfAbsent=true"
            className={styles.arrowIcon}
            alt="Left arrow"
          />
          <div className={styles.categoriesWrapper}>
            <button className={styles.categoryIcon}>
              <TbMeat
                className={styles.categoryIconImg}
                onClick={() => handleCategory('肉食')}
              />
              肉食
            </button>

            <button className={styles.categoryIcon}>
              <LuSalad
                className={styles.categoryIconImg}
                onClick={() => handleCategory('蔬食')}
              />
              蔬食
            </button>
            <button className={styles.categoryIcon}>
              <LuDessert
                className={styles.categoryIconImg}
                onClick={() => handleCategory('甜點')}
              />
              甜點
            </button>
            <button className={styles.categoryIcon}>
              <BiSolidBowlRice
                className={styles.categoryIconImg}
                onClick={() => handleCategory('飯食')}
              />
              飯食
            </button>
            <button className={styles.categoryIcon}>
              <FaEarthAmericas
                className={styles.categoryIconImg}
                onClick={() => handleCategory('異國')}
              />
              異國
            </button>
            <button className={styles.categoryIcon}>
              <FaFishFins
                className={styles.categoryIconImg}
                onClick={() => handleCategory('生鮮')}
              />
              生鮮
            </button>
            <button className={styles.categoryIcon}>
              <FaCakeCandles
                className={styles.categoryIconImg}
                onClick={() => handleCategory('糕點')}
              />
              糕點
            </button>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/48cafdb4ef4bb734d63a486bf58abbe94c28b5d3?placeholderIfAbsent=true"
            className={styles.arrowIcon}
            alt="Right arrow"
          />
        </div>
        {/* 食譜ICON選單 END */}
        {/* 確認資料有沒有拉對用的 */}
        {/* <div>{JSON.stringify(data)}</div> */}
        {/* 食譜菜單 Start */}
        {/* 麵食 */}
        {activeCategory === '麵食' && (
          <div className={styles.recipeSection}>
            <div className={styles.recipeBlock}>
              <div className={styles.recipeCategory}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/342df7d551f513a8966757cc07c7a877c1abf5eb?placeholderIfAbsent=true"
                  className={styles.categoryBackground}
                  alt="Desserts background"
                />
                <div className={styles.categoryTitle}>麵食</div>
                <button
                  onClick={() => handleSearch('麵食')}
                  className={styles.viewMoreButton}
                >
                  <h3 className={styles.viewMoreText}>看更多</h3>
                </button>
              </div>
              <div className={styles.recipeCardsContainer}>
                {data?.rows
                  .filter((recipe) => recipe.categories?.includes('麵食')) // 過濾出分類為「麵食」的資料
                  .map((recipe) => (
                    <div key={recipe.id} className={styles.recipeCard}>
                      <div>
                        <img
                          src={recipe.image}
                          className={styles.recipeCardImage}
                          alt={recipe.recipe_title}
                        />
                      </div>
                      <div className={styles.recipeCardContent}>
                        <div className={styles.recipeCardTitle}>
                          {recipe.recipe_title}
                        </div>
                        <div className={styles.recipeCardDescription}>
                          {recipe.recipe_description}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* 肉食 */}
        {activeCategory === '肉食' && (
          <div className={styles.recipeSection}>
            <div className={styles.recipeBlock}>
              <div className={styles.recipeCategory}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/342df7d551f513a8966757cc07c7a877c1abf5eb?placeholderIfAbsent=true"
                  className={styles.categoryBackground}
                  alt="Desserts background"
                />
                <div className={styles.categoryTitle}>肉食</div>
                <button
                  onClick={() => handleSearch('肉食')}
                  className={styles.viewMoreButton}
                >
                  <h3 className={styles.viewMoreText}>看更多</h3>
                </button>
              </div>
              <div className={styles.recipeCardsContainer}>
                {data?.rows
                  .filter((recipe) => recipe.categories?.includes('肉食'))
                  .slice(0, 6) // 過濾出分類為「肉食」的資料，取前6筆
                  .map((recipe) => (
                    <div key={recipe.id} className={styles.recipeCard}>
                      <div>
                        <img
                          src={recipe.image}
                          className={styles.recipeCardImage}
                          alt={recipe.recipe_title}
                        />
                      </div>
                      <div className={styles.recipeCardContent}>
                        <div className={styles.recipeCardTitle}>
                          {recipe.recipe_title}
                        </div>
                        <div className={styles.recipeCardDescription}>
                          {recipe.recipe_description}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* 蔬食 */}
        {activeCategory === '蔬食' && (
          <div className={styles.recipeSection}>
            <div className={styles.recipeBlock}>
              <div className={styles.recipeCategory}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/342df7d551f513a8966757cc07c7a877c1abf5eb?placeholderIfAbsent=true"
                  className={styles.categoryBackground}
                  alt="Desserts background"
                />
                <div className={styles.categoryTitle}>蔬食</div>
                <button
                  onClick={() => handleSearch('蔬食')}
                  className={styles.viewMoreButton}
                >
                  <h3 className={styles.viewMoreText}>看更多</h3>
                </button>
              </div>
              <div className={styles.recipeCardsContainer}>
                {data?.rows
                  .filter((recipe) => recipe.categories?.includes('蔬食'))
                  .slice(0, 6) // 過濾出分類為「肉食」的資料，取前6筆
                  .map((recipe) => (
                    <div key={recipe.id} className={styles.recipeCard}>
                      <div>
                        <img
                          src={recipe.image}
                          className={styles.recipeCardImage}
                          alt={recipe.recipe_title}
                        />
                      </div>
                      <div className={styles.recipeCardContent}>
                        <div className={styles.recipeCardTitle}>
                          {recipe.recipe_title}
                        </div>
                        <div className={styles.recipeCardDescription}>
                          {recipe.recipe_description}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 甜點 */}
        {activeCategory === '甜點' && (
          <div className={styles.recipeSection}>
            <div className={styles.recipeBlock}>
              <div className={styles.recipeCategory}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/342df7d551f513a8966757cc07c7a877c1abf5eb?placeholderIfAbsent=true"
                  className={styles.categoryBackground}
                  alt="Desserts background"
                />
                <div className={styles.categoryTitle}>甜點</div>
                <button
                  onClick={() => handleSearch('甜點')}
                  className={styles.viewMoreButton}
                >
                  <h3 className={styles.viewMoreText}>看更多</h3>
                </button>
              </div>
              <div className={styles.recipeCardsContainer}>
                {data?.rows
                  .filter((recipe) => recipe.categories?.includes('甜點'))
                  .slice(0, 6) // 過濾出分類為「肉食」的資料，取前6筆
                  .map((recipe) => (
                    <div key={recipe.id} className={styles.recipeCard}>
                      <div>
                        <img
                          src={recipe.image}
                          className={styles.recipeCardImage}
                          alt={recipe.recipe_title}
                        />
                      </div>
                      <div className={styles.recipeCardContent}>
                        <div className={styles.recipeCardTitle}>
                          {recipe.recipe_title}
                        </div>
                        <div className={styles.recipeCardDescription}>
                          {recipe.recipe_description}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* 飯食 */}
        {activeCategory === '飯食' && (
          <div className={styles.recipeSection}>
            <div className={styles.recipeBlock}>
              <div className={styles.recipeCategory}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/342df7d551f513a8966757cc07c7a877c1abf5eb?placeholderIfAbsent=true"
                  className={styles.categoryBackground}
                  alt="Desserts background"
                />
                <div className={styles.categoryTitle}>飯食</div>
                <button
                  onClick={() => handleSearch('飯食')}
                  className={styles.viewMoreButton}
                >
                  <h3 className={styles.viewMoreText}>看更多</h3>
                </button>
              </div>
              <div className={styles.recipeCardsContainer}>
                {data?.rows
                  .filter((recipe) => recipe.categories?.includes('飯食'))
                  .slice(0, 6) // 過濾出分類為「肉食」的資料，取前6筆
                  .map((recipe) => (
                    <div key={recipe.id} className={styles.recipeCard}>
                      <div>
                        <img
                          src={recipe.image}
                          className={styles.recipeCardImage}
                          alt={recipe.recipe_title}
                        />
                      </div>
                      <div className={styles.recipeCardContent}>
                        <div className={styles.recipeCardTitle}>
                          {recipe.recipe_title}
                        </div>
                        <div className={styles.recipeCardDescription}>
                          {recipe.recipe_description}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* 異國 */}
        {activeCategory === '異國' && (
          <div className={styles.recipeSection}>
            <div className={styles.recipeBlock}>
              <div className={styles.recipeCategory}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/342df7d551f513a8966757cc07c7a877c1abf5eb?placeholderIfAbsent=true"
                  className={styles.categoryBackground}
                  alt="Desserts background"
                />
                <div className={styles.categoryTitle}>異國</div>
                <button
                  onClick={() => handleSearch('異國')}
                  className={styles.viewMoreButton}
                >
                  <h3 className={styles.viewMoreText}>看更多</h3>
                </button>
              </div>
              <div className={styles.recipeCardsContainer}>
                {data?.rows
                  .filter((recipe) => recipe.categories?.includes('異國'))
                  .slice(0, 6) // 過濾出分類為「肉食」的資料，取前6筆
                  .map((recipe) => (
                    <div key={recipe.id} className={styles.recipeCard}>
                      <div>
                        <img
                          src={recipe.image}
                          className={styles.recipeCardImage}
                          alt={recipe.recipe_title}
                        />
                      </div>
                      <div className={styles.recipeCardContent}>
                        <div className={styles.recipeCardTitle}>
                          {recipe.recipe_title}
                        </div>
                        <div className={styles.recipeCardDescription}>
                          {recipe.recipe_description}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* 生鮮 */}
        {activeCategory === '生鮮' && (
          <div className={styles.recipeSection}>
            <div className={styles.recipeBlock}>
              <div className={styles.recipeCategory}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/342df7d551f513a8966757cc07c7a877c1abf5eb?placeholderIfAbsent=true"
                  className={styles.categoryBackground}
                  alt="Desserts background"
                />
                <div className={styles.categoryTitle}>生鮮</div>
                <button
                  onClick={() => handleSearch('生鮮')}
                  className={styles.viewMoreButton}
                >
                  <h3 className={styles.viewMoreText}>看更多</h3>
                </button>
              </div>
              <div className={styles.recipeCardsContainer}>
                {data?.rows
                  .filter((recipe) => recipe.categories?.includes('生鮮'))
                  .slice(0, 6) // 過濾出分類為「肉食」的資料，取前6筆
                  .map((recipe) => (
                    <div key={recipe.id} className={styles.recipeCard}>
                      <div>
                        <img
                          src={recipe.image}
                          className={styles.recipeCardImage}
                          alt={recipe.recipe_title}
                        />
                      </div>
                      <div className={styles.recipeCardContent}>
                        <div className={styles.recipeCardTitle}>
                          {recipe.recipe_title}
                        </div>
                        <div className={styles.recipeCardDescription}>
                          {recipe.recipe_description}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* 糕點 */}
        {activeCategory === '糕點' && (
          <div className={styles.recipeSection}>
            <div className={styles.recipeBlock}>
              <div className={styles.recipeCategory}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/342df7d551f513a8966757cc07c7a877c1abf5eb?placeholderIfAbsent=true"
                  className={styles.categoryBackground}
                  alt="Desserts background"
                />
                <div className={styles.categoryTitle}>糕點</div>
                <button
                  onClick={() => handleSearch('糕點')}
                  className={styles.viewMoreButton}
                >
                  <h3 className={styles.viewMoreText}>看更多</h3>
                </button>
              </div>
              <div className={styles.recipeCardsContainer}>
                {data?.rows
                  .filter((recipe) => recipe.categories?.includes('糕點'))
                  .slice(0, 6) // 過濾出分類為「肉食」的資料，取前6筆
                  .map((recipe) => (
                    <div key={recipe.id} className={styles.recipeCard}>
                      <div>
                        <img
                          src={recipe.image}
                          className={styles.recipeCardImage}
                          alt={recipe.recipe_title}
                        />
                      </div>
                      <div className={styles.recipeCardContent}>
                        <div className={styles.recipeCardTitle}>
                          {recipe.recipe_title}
                        </div>
                        <div className={styles.recipeCardDescription}>
                          {recipe.recipe_description}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* 糕點測試 */}

        {/* <div className={styles.recipeSection}>
          <div className={styles.recipeBlock}>
            <div className={styles.recipeCategory}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/342df7d551f513a8966757cc07c7a877c1abf5eb?placeholderIfAbsent=true"
                className={styles.categoryBackground}
                alt="Desserts background"
              />
              <div className={styles.categoryTitle}>
                糕點
                <br />
                甜食
              </div>
              <button className={styles.viewMoreButton}>
                <h3 className={styles.viewMoreText}>看更多</h3>
              </button>
            </div>
            <div className={styles.recipeCardsContainer}>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/83e124d78dc7d8eb48837262ff05b46cb3b6def4?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>草莓蛋糕</div>
                  <div className={styles.recipeCardDescription}>
                    新鮮草莓與綿密蛋糕的完美結合，每一口都充滿幸福感。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1030dc196c7226269cf6586ffbe3ddd56e706b1f?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>巧克力餅乾</div>
                  <div className={styles.recipeCardDescription}>
                    香濃巧克力與酥脆餅乾的絕妙組合，讓人無法抗拒的美味。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/156fcf8d78659939ad661538b9dfd2b70cfe1c03?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>法式馬卡龍</div>
                  <div className={styles.recipeCardDescription}>
                    色彩繽紛的法式甜點，外酥內軟，每一口都是味蕾的享受。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/65a2c4e94c7538b0c96d6459589ad74b6cce188b?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>提拉米蘇</div>
                  <div className={styles.recipeCardDescription}>
                    經典義式甜點，咖啡與起司的完美融合，層次豐富。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/77902dabad9716197a59e619fa89abc8a634dcb0?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>藍莓鬆餅</div>
                  <div className={styles.recipeCardDescription}>
                    鬆軟可口的鬆餅配上新鮮藍莓，早餐的絕佳選擇。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/133958c6aac0d74c79537a1f8fcf328c0c77e3bf?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>檸檬塔</div>
                  <div className={styles.recipeCardDescription}>
                    酸甜適中的檸檬塔，清爽的口感讓人回味無窮。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* 生鮮測試 */}
        {/* <div className={styles.recipeSection}>
          <div className={styles.recipeBlock}>
            <div className={styles.recipeCategory}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/24e3686909c1b53ea8a37238c90535bf7c7eca58?placeholderIfAbsent=true"
                className={styles.categoryBackground}
                alt="Seafood background"
              />
              <div className={styles.categoryTitle}>
                生鮮
                <br />
                魚肉
              </div>
              <button className={styles.viewMoreButton}>
                <h3 className={styles.viewMoreText}>看更多</h3>
              </button>
            </div>
            <div className={styles.recipeCardsContainer}>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/30734114f4e86d79151e86f544df7654c43be9d6?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>清蒸鱸魚</div>
                  <div className={styles.recipeCardDescription}>
                    鮮美的鱸魚搭配簡單調味，保留魚肉的原���鮮甜。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/27f1865caf29a2c7d646d50599eee03aeed3704f?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>香煎鮭魚</div>
                  <div className={styles.recipeCardDescription}>
                    外酥內嫩的鮭魚，富含營養且美味可口。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ce51feee33522d3b5200af9f3cf8208e16edd48?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>蒜蓉蝦</div>
                  <div className={styles.recipeCardDescription}>
                    鮮甜的蝦肉配上香氣四溢的蒜蓉，簡單又美味。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/710be78fabdc0c441486e3771049cbe3c3cc6409?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>紅燒牛肉</div>
                  <div className={styles.recipeCardDescription}>
                    慢燉入味的牛肉，軟嫩多汁，香氣四溢。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6144db7037b4ec6bcf74064ab838170b50ef0b4f?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>蔥爆羊肉</div>
                  <div className={styles.recipeCardDescription}>
                    鮮嫩的羊肉配上蔥段爆炒，香氣四溢，風味獨特。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/90c4a042dc7685747f1b4720d768c8333f25bddb?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>椒鹽排骨</div>
                  <div className={styles.recipeCardDescription}>
                    外酥內嫩的排骨，椒鹽調味簡單卻美味。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.recipeSection}>
          <div className={styles.recipeBlock}>
            <div className={styles.recipeCategory}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/01cf9537a09e310a773990298aa40e1d8a5b8678?placeholderIfAbsent=true"
                className={styles.categoryBackground}
                alt="Japanese cuisine background"
              />
              <div className={styles.categoryTitle}>
                日式
                <br />
                料理
              </div>
              <button className={styles.viewMoreButton}>
                <h3 className={styles.viewMoreText}>看更多</h3>
              </button>
            </div>
            <div className={styles.recipeCardsContainer}>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/afb606b98d9c8e43f5783bfd90bde53054942e77?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>壽司拼盤</div>
                  <div className={styles.recipeCardDescription}>
                    新鮮的海鮮配上醋飯，經典日式料理。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ae9725e65e24988decf142c03ddb8681effcd74?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>拉麵</div>
                  <div className={styles.recipeCardDescription}>
                    濃郁的湯頭配上彈牙的麵條，日式拉麵的經典風味。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c426623ffc971834ae7aa12747ee81d40f2c4834?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>天婦羅</div>
                  <div className={styles.recipeCardDescription}>
                    酥脆的外皮包裹著新鮮食材，搭配特製醬汁。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/dfb84559b545c8965dfef75e5f9e1bdd66dc1ec6?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>烤鰻魚飯</div>
                  <div className={styles.recipeCardDescription}>
                    香甜的醬汁搭配鮮嫩的鰻魚，經典日式美食。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd7e8decc8129e35d61a86dd0672bacbce47e18c?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>親子丼</div>
                  <div className={styles.recipeCardDescription}>
                    雞肉與雞蛋的完美結合，簡單又美味的日式料理。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9fbafe49780012f08fce79d01c930632126395da?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>壽喜燒</div>
                  <div className={styles.recipeCardDescription}>
                    甜鹹醬汁中煮熟的牛肉與蔬菜，溫暖人心的料理。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.recipeSection}>
          <div className={styles.recipeBlock}>
            <div className={styles.recipeCategory}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/30aa26a3a2dc823143e87fb1319638355d293cfe?placeholderIfAbsent=true"
                className={styles.categoryBackground}
                alt="Western cuisine background"
              />
              <div className={styles.categoryTitle}>
                西洋
                <br />
                風味
              </div>
              <button className={styles.viewMoreButton}>
                <h3 className={styles.viewMoreText}>看更多</h3>
              </button>
            </div>
            <div className={styles.recipeCardsContainer}>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e040c530583e75cc8166426921242b1e8615377?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>牛排</div>
                  <div className={styles.recipeCardDescription}>
                    完美煎製的牛排，外酥內嫩，搭配特製醬汁。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/dcaa6dd9ce18e466f1bc6ebbad8afa2ad4030ead?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>義大利麵</div>
                  <div className={styles.recipeCardDescription}>
                    彈牙的麵條搭配濃郁的醬汁，經典義式料理。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a58a472d16e2e3bf1e30b4aebdbf2ba8531c6717?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>披薩</div>
                  <div className={styles.recipeCardDescription}>
                    酥脆的餅皮上鋪滿各種配料，香氣四溢的義式美食。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/82d8f6e5dcebe4eb70106b672c44d01be0365505?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>漢堡</div>
                  <div className={styles.recipeCardDescription}>
                    多汁的肉餅搭配新鮮蔬菜，經典美式快餐。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7a44bffb25d8fe6acaca559659c17f5b2f8e23b?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>法式焗烤</div>
                  <div className={styles.recipeCardDescription}>
                    香濃的起司與新鮮食材的完美結合��法式經典。
                  </div>
                </div>
              </div>
              <div className={styles.recipeCard}>
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5837bf826aab73f8149f96cad1516fde5cfa15ea?placeholderIfAbsent=true"
                    className={styles.recipeCardImage}
                    alt="Recipe"
                  />
                </div>
                <div className={styles.recipeCardContent}>
                  <div className={styles.recipeCardTitle}>希臘沙拉</div>
                  <div className={styles.recipeCardDescription}>
                    新鮮蔬菜與起司的組合，健康又美味的地中海料理。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* 食譜菜單 End */}
      </div>
      {/* 你可能會喜歡 Start */}
      <div className={styles.featuredSection}>
        <h3>你可能會喜歡</h3>
        <div className={styles.featuredContainer}>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d1dcaf58bd677b48b45cc3cdf88969626ba1b3e?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>希臘沙拉</div>
          </div>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/524bb2f7a404cb7f14d3391152a06164ca585549?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>墨西哥玉米餅沙拉</div>
          </div>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/66805a412f7bde992b6608585e95af8e97e2ba55?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>義式焗烤千層麵</div>
          </div>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f1f50e3bc5ae6d3da77423eb0478c9ef1c7c5bb?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>巧克力熔岩蛋糕</div>
          </div>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d55d204accc4206d3ac81a9ee095171dc343a70?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>台式滷肉飯</div>
          </div>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/38be65be6bdd471bd2341befa9825ccb01cfa1a5?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>泰式綠咖哩雞</div>
          </div>
        </div>
      </div>
      {/* 你可能會喜歡 End */}
    </div>
  )
}
