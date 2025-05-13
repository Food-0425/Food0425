'use client'

import React, { useState, useEffect } from 'react'
import styles from '../styles/ProductList.module.css'
import { ProductCard } from '../components/ProductCard'

//  每頁顯示商品數量
const PRODUCTS_PER_PAGE = 15 // 雖然定義了，但目前 API 回傳中已包含分頁邏輯

export default function ProductListPage() {
  //  State 狀態管理
  const [products, setProducts] = useState([]) // 顯示中的產品資料
  const [loading, setLoading] = useState(true) // 是否在載入中
  const [currentPage, setCurrentPage] = useState(1) // 目前頁碼 (初始值改為 1，因為有分類和搜尋時通常從第一頁開始)
  const [totalPages, setTotalPages] = useState(1) // 總頁數（預設改為 1）
  const [activeCategory, setActiveCategory] = useState('本周熱銷') // 目前分類
  const [sortByPrice, setSortByPrice] = useState(false) // 是否以價格排序
  const [searchTerm, setSearchTerm] = useState('') // 新增：搜尋關鍵字狀態

  //  當頁碼、分類、排序條件、搜尋關鍵字改變時，重新取得產品資料
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          category: activeCategory,
          sort: sortByPrice ? 'price' : '',
          search: searchTerm, // 新增：將搜尋關鍵字加入查詢參數
        })

        // 注意：原 API URL 為 http://localhost:3001/products (可能有拼寫錯誤，應為 product)
        // 這裡保持原樣，但請確認後端 API 端點是否正確
        const response = await fetch(
          `http://localhost:3001/products?${queryParams.toString()}`
        )
        if (!response.ok) {
          throw new Error('後端 API 回傳錯誤')
        }

        const data = await response.json()
        setProducts(data.rows || []) // 確保 data.rows 存在，否則給予空陣列
        setTotalPages(data.totalPages || 1) // 確保 data.totalPages 存在，否則給予 1
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([]) // 發生錯誤時，清空產品列表
        setTotalPages(1) // 發生錯誤時，重置總頁數
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, activeCategory, sortByPrice, searchTerm]) // 新增：searchTerm 加入依賴項

  //  點選分類按鈕
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentPage(1) //  切換分類時，重置到第一頁
    setSearchTerm('') // 新增：切換分類時，清空搜尋關鍵字 (可選行為)
  }

  //  切換價格排序
  const togglePriceSorting = () => {
    setSortByPrice(!sortByPrice)
    setCurrentPage(1) //  切換排序時，重置到第一頁
  }

  //  分頁控制：前後頁或指定頁碼
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // 新增：處理搜尋輸入框變化的函式
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1) //  當使用者輸入搜尋條件時，重置到第一頁
  }

  //  用於產生分頁按鈕的輔助函數 (可選，讓分頁更動態)
  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5 // 最多顯示多少個頁碼按鈕
    let startPage, endPage

    if (totalPages <= maxPagesToShow) {
      startPage = 1
      endPage = totalPages
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2)
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1

      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1
        endPage = maxPagesToShow
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1
        endPage = totalPages
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage
        endPage = currentPage + maxPagesAfterCurrentPage
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <div className={styles.paginationItem} key={i}>
          <button
            className={`${styles.paginationButton} ${currentPage === i ? styles.paginationButtonActive : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </div>
      )
    }
    return pageNumbers
  }

  return (
    <div className={styles.container}>
      {/* 篩選區塊：分類 + 價格排序 + 搜尋 */}
      <div className={styles.filterSection}>
        {/* 新增：搜尋輸入框 */}
        <input
          type="text"
          placeholder="搜尋商品名稱..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className={styles.searchInput} //  您可能需要在 ProductList.module.css 中添加此樣式
        />

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
              src="https://via.placeholder.com/37x34" // 建議替換為實際圖示路徑或 SVG
              className={styles.sortIconImage}
              alt="Sort by price"
            />
          </div>
          <div className={styles.priceText}>價格 {sortByPrice ? '↑' : '↓'}</div>{' '}
          {/* 新增：排序指示 */}
        </button>
      </div>

      {/* 商品區塊 */}
      <div className={styles.productSection}>
        <div className={styles.productGrid}>
          {loading ? (
            <div>載入中...</div> //  載入狀態
          ) : products && products.length > 0 ? ( // 修改：檢查 products 是否有內容
            products.map((product) => (
              <ProductCard key={product.id} product={product} /> //  商品卡片元件
            ))
          ) : (
            <div>沒有找到符合條件的商品。</div> // 新增：無商品時的提示
          )}
        </div>
      </div>

      {/* 分頁區塊 */}
      {totalPages > 0 &&
        products &&
        products.length > 0 && ( // 修改：只有在有商品且總頁數大於0時顯示分頁
          <div className={styles.paginationSection}>
            <div className={styles.pagination}>
              {/* 上一頁 */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1} // 新增：第一頁時禁用
              >
                <img
                  src="https://via.placeholder.com/11x16" // 建議替換為實際圖示路徑或 SVG
                  className={styles.paginationArrow}
                  alt="Previous page"
                />
              </button>

              {/* 動態頁碼按鈕 (使用輔助函數) */}
              {renderPageNumbers()}

              {/* 下一頁 */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages} // 新增：最後一頁時禁用
              >
                <img
                  src="https://via.placeholder.com/11x16" // 建議替換為實際圖示路徑或 SVG
                  className={styles.paginationArrow}
                  alt="Next page"
                />
              </button>
            </div>
          </div>
        )}
    </div>
  )
}