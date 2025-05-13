'use client'

import React, { useState, useEffect } from 'react'
import styles from '../styles/ProductList.module.css'
import { ProductCard } from '../components/ProductCard'

//  每頁顯示商品數量
const PRODUCTS_PER_PAGE = 15

export default function ProductListPage() {
  //  State 狀態管理
  const [products, setProducts] = useState([]) // 顯示中的產品資料
  const [loading, setLoading] = useState(true) // 是否在載入中
  const [currentPage, setCurrentPage] = useState(4) // 目前頁碼
  const [totalPages, setTotalPages] = useState(6) // 總頁數（預設）
  const [activeCategory, setActiveCategory] = useState('本周熱銷') // 目前分類
  const [sortByPrice, setSortByPrice] = useState(false) // 是否以價格排序

  //  當頁碼、分類、排序條件改變時，重新取得產品資料
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          category: activeCategory,
          sort: sortByPrice ? 'price' : '',
        })

        const response = await fetch(
          `http://localhost:3001/prouduct?${queryParams.toString()}`
        )
        if (!response.ok) {
          throw new Error('後端 API 回傳錯誤')
        }

        const data = await response.json()
        setProducts(data.rows)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, activeCategory, sortByPrice])

  //  點選分類按鈕
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  //  切換價格排序
  const togglePriceSorting = () => {
    setSortByPrice(!sortByPrice)
  }

  //  分頁控制：前後頁或指定頁碼
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className={styles.container}>
      {/*  篩選區塊：分類 + 價格排序 */}
      <div className={styles.filterSection}>
        {/* 分類篩選按鈕（動態 active 樣式） */}
        <button
          className={`${styles.filterItem} ${activeCategory === '本周熱銷' ? styles.active : ''}`}
          onClick={() => handleCategoryChange('本周熱銷')}
        >
          本周熱銷
        </button>
        <button
          className={`${styles.filterItem} ${styles.filterCategory} ${activeCategory === '蔬菜' ? styles.active : ''}`}
          onClick={() => handleCategoryChange('蔬菜')}
        >
          蔬菜
        </button>
        <button
          className={`${styles.filterItem} ${styles.filterCategory} ${activeCategory === '肉品' ? styles.active : ''}`}
          onClick={() => handleCategoryChange('肉品')}
        >
          肉品
        </button>
        <button
          className={`${styles.filterItem} ${styles.filterCategory} ${activeCategory === '乾貨' ? styles.active : ''}`}
          onClick={() => handleCategoryChange('乾貨')}
        >
          乾貨
        </button>
        <button
          className={`${styles.filterItem} ${activeCategory === '調味品' ? styles.active : ''}`}
          onClick={() => handleCategoryChange('調味品')}
        >
          調味品
        </button>

        {/* 價格排序按鈕 */}
        <button className={styles.priceFilter} onClick={togglePriceSorting}>
          <div className={styles.sortIcon}>
            <img
              src="https://via.placeholder.com/37x34"
              className={styles.sortIconImage}
              alt="Sort by price"
            />
          </div>
          <div className={styles.priceText}>價格</div>
        </button>
      </div>

      {/*  商品區塊 */}
      <div className={styles.productSection}>
        <div className={styles.productGrid}>
          {loading ? (
            <div>載入中...</div> //  載入狀態
          ) : (
            products?.map((product) => (
              <ProductCard key={product.id} product={product} /> //  商品卡片元件
            ))
          )}
        </div>
      </div>

      {/*  分頁區塊 */}
      <div className={styles.paginationSection}>
        <div className={styles.pagination}>
          {/* 上一頁 */}
          <button onClick={() => handlePageChange(currentPage - 1)}>
            <img
              src="https://via.placeholder.com/11x16"
              className={styles.paginationArrow}
              alt="Previous page"
            />
          </button>

          {/* 動態頁碼按鈕 */}
          {[1, 2, 3, 4, 5].map((page) => (
            <div className={styles.paginationItem} key={page}>
              <button
                className={`${styles.paginationButton} ${currentPage === page ? styles.paginationButtonActive : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </div>
          ))}

          {/* 下一頁 */}
          <button onClick={() => handlePageChange(currentPage + 1)}>
            <img
              src="https://via.placeholder.com/11x16"
              className={styles.paginationArrow}
              alt="Next page"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
