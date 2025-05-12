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
//dynamic import
// 這邊是為了讓RecipeCarousel這個元件不會在伺服器端渲染，因為它裡面有使用useState和useEffect等hook
import dynamic from 'next/dynamic'
const RecipeCarousel = dynamic(() => import('./components/RecipeCarousel'), {
  ssr: false, // 這樣就不會在伺服器端渲染了
})
// import RecipeCarousel from './components/RecipeCarousel'

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

            <button className={styles.categoryIcon}>
              <FaCakeCandles
                className={styles.categoryIconImg}
                onClick={() => handleCategory('麵食')}
              />
              麵食
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
                    <Link
                      key={recipe.id}
                      href={`/recipes/${recipe.id}`}
                      passHref
                    >
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
                    </Link>
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
                    <Link
                      key={recipe.id}
                      href={`/recipes/${recipe.id}`}
                      passHref
                    >
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
                    </Link>
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
                      <Link
                        key={recipe.id}
                        href={`/recipes/${recipe.id}`}
                        passHref
                      >
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
                      </Link>
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
                      <Link
                        key={recipe.id}
                        href={`/recipes/${recipe.id}`}
                        passHref
                      >
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
                      </Link>
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
                      <Link
                        key={recipe.id}
                        href={`/recipes/${recipe.id}`}
                        passHref
                      >
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
                      </Link>
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
                      <Link
                        key={recipe.id}
                        href={`/recipes/${recipe.id}`}
                        passHref
                      >
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
                      </Link>
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
                      <Link
                        key={recipe.id}
                        href={`/recipes/${recipe.id}`}
                        passHref
                      >
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
                      </Link>
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
                      <Link
                        key={recipe.id}
                        href={`/recipes/${recipe.id}`}
                        passHref
                      >
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
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 你可能會喜歡 Start */}
      <div className={styles.featuredSection}>
        <h3>你可能會喜歡</h3>
        <div className={styles.featuredContainer}>
          {data?.rows
            /* 減去 0.5，就會得到一個介於 -0.5 到 0.5 之間的值。
          這個值正負隨機，所以 .sort() 的比較結果也就隨機，從而讓陣列被隨機打亂。 */
            .sort(() => Math.random() - 0.5) // 隨機打亂陣列
            .slice(0, 4) // 取出前 6 筆資料
            .map((recipe) => (
              <div key={recipe.id} className={styles.featuredCard}>
                <Link key={recipe.id} href={`/recipes/${recipe.id}`} passHref>
                  <img
                    src={recipe.image}
                    className={styles.featuredCardImage}
                    alt="Featured recipe"
                  />

                  <div className={styles.featuredCardTitle}>
                    {recipe.recipe_title}
                  </div>
                </Link>
              </div>
            ))}
          {/* <div className={styles.featuredCard}>
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
          </div> */}
        </div>
      </div>
      {/* 你可能會喜歡 End */}
    </div>
  )
}
