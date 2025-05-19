'use client'

import React, { useState, useEffect } from 'react'
import styles from '../styles/ProductList.module.css'
import { ProductCard } from '../components/ProductCard'
import { GrPrevious } from '../icons/icons' // 使用 react-icons 套件

//  每頁顯示商品數量
const PRODUCTS_PER_PAGE = 15 // 雖然定義了，但目前 API 回傳中已包含分頁邏輯

// 在檔案開頭加入 API 基礎網址常數
// 這個很棒
const API_BASE_URL = 'http://localhost:3001/products' // 根據實際情況修改

// 新增: API 請求函數
const fetchAllProducts = async (page, limit = 15) => {
  const response = await fetch(
    `${API_BASE_URL}/api/products?page=${page}&limit=${limit}`
  )
  if (!response.ok) throw new Error('取得商品列表失敗')
  return response.json()
}

const fetchFilteredProducts = async (params) => {
  const response = await fetch(
    `${API_BASE_URL}/api/products/filter?${params.toString()}`
  )
  if (!response.ok) throw new Error('篩選商品失敗')
  return response.json()
}

export default function ProductListPage() {
  //  State 狀態管理
  const [products, setProducts] = useState([]) // 顯示中的產品資料
  const [loading, setLoading] = useState(true) // 是否在載入中
  const [currentPage, setCurrentPage] = useState(1) // 目前頁碼 (初始值改為 1，因為有分類和搜尋時通常從第一頁開始)
  const [totalPages, setTotalPages] = useState(1) // 總頁數（預設改為 1）
  const [activeCategory, setActiveCategory] = useState('本周熱銷') // 目前分類
  const [sortByPrice, setSortByPrice] = useState(false) // 是否以價格排序
  const [searchTerm, setSearchTerm] = useState('') // 新增：搜尋關鍵字狀態
  const [searchInput, setSearchInput] = useState('') // 新增：搜尋輸入值狀態
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  //  當頁碼、分類、排序條件、搜尋關鍵字改變時，重新取得產品資料
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      try {
        // 判斷是否需要篩選
        const hasFilters =
          activeCategory !== '本周熱銷' ||
          searchTerm ||
          minPrice ||
          maxPrice ||
          sortByPrice

        let result
        if (hasFilters) {
          const params = new URLSearchParams({
            page: currentPage.toString(),
            limit: '15',
            category: activeCategory !== '本周熱銷' ? activeCategory : '',
            search: searchTerm,
            sort: sortByPrice ? 'price_desc' : 'price_asc',
            minPrice,
            maxPrice,
          })
          result = await fetchFilteredProducts(params)
        } else {
          result = await fetchAllProducts(currentPage)
        }

        if (result.success) {
          setProducts(result.rows)
          setTotalPages(result.totalPages)
        }
      } catch (error) {
        console.error('取得商品失敗:', error)
        setProducts([])
        setTotalPages(1)
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [currentPage, activeCategory, sortByPrice, searchTerm, minPrice, maxPrice]) // 新增：searchTerm 加入依賴項

  // 修改處理函數，清除其他篩選條件
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentPage(1)
    setSearchTerm('')
    setSearchInput('')
    setMinPrice('')
    setMaxPrice('')
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

  // 修改：處理搜尋輸入
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  // 新增：處理搜尋按鈕點擊
  const handleSearch = () => {
    setSearchTerm(searchInput)
    setCurrentPage(1)
    setActiveCategory('本周熱銷')
    setMinPrice('')
    setMaxPrice('')
  }

  // 新增：處理按下 Enter 鍵搜尋
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  // 新增處理價格輸入的函數
  const handlePriceInput = (type, value) => {
    // 確保輸入為數字
    const numberValue = value.replace(/[^0-9]/g, '')
    if (type === 'min') {
      setMinPrice(numberValue)
    } else {
      setMaxPrice(numberValue)
    }
  }

  // 新增價格查詢函數
  const handlePriceSearch = () => {
    setCurrentPage(1)
    setSearchTerm('')
    setSearchInput('')
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
        {/* 修改：搜尋區塊 */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="搜尋商品..."
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            className={styles.searchBar}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            搜尋
          </button>
        </div>

        {/* 新增：價格區間查詢 */}
        <div className={styles.priceFilterContainer}>
          <input
            type="text"
            placeholder="最低價格"
            value={minPrice}
            onChange={(e) => handlePriceInput('min', e.target.value)}
            className={styles.priceInput}
          />
          <input
            type="text"
            placeholder="最高價格"
            value={maxPrice}
            onChange={(e) => handlePriceInput('max', e.target.value)}
            className={styles.priceInput}
          />
          <button
            onClick={handlePriceSearch}
            className={styles.priceSearchButton}
          >
            查詢
          </button>
        </div>

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
            products.map(
              (product) => (
                console.log('Product:', product), //  偵錯用
                (<ProductCard key={product.id} product={product} />)
              )
            )
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
                <GrPrevious />
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
