'use client'

import React, { useState, useEffect } from 'react'
import styles from '../styles/ProductList.module.css'
import { ProductCard } from '../components/ProductCard'


const mockProducts = [
  {
    id: 1,
    image: 'https://via.placeholder.com/320x180',
    title: '宜蘭三星蔥',
    description: '清甜爽脆炒菜超香',
    price: 80,
    isFavorite: false,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/320x180',
    title: '高山高麗菜',
    description: '冬季鮮嫩口感好',
    price: 60,
    isFavorite: false,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/320x180',
    title: '屏東鳳梨',
    description: '酸甜多汁一口滿足',
    price: 120,
    isFavorite: false,
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/320x180',
    title: '溪頭香菇',
    description: '肉厚鮮香燉湯佳',
    price: 90,
    isFavorite: false,
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/320x180',
    title: '雲林蒜頭',
    description: '濃郁香氣提味神器',
    price: 60,
    isFavorite: false,
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/320x180',
    title: '阿里山山葵',
    description: '刺激辣香壽司好搭',
    price: 150,
    isFavorite: false,
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/320x180',
    title: '西螺米',
    description: 'Q彈飽滿煮飯超香',
    price: 200,
    isFavorite: false,
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/320x180',
    title: '桃園米苔目',
    description: '古早風味Q彈爽口',
    price: 135,
    isFavorite: false,
  },
  {
    id: 9,
    image: 'https://via.placeholder.com/320x180',
    title: '宜蘭筊白筍',
    description: '清甜爽脆快炒美味',
    price: 85,
    isFavorite: false,
  },
  {
    id: 10,
    image: 'https://via.placeholder.com/320x180',
    title: '屏東龍眼乾',
    description: '甘甜濃郁下午茶點',
    price: 95,
    isFavorite: false,
  },
  {
    id: 11,
    image: 'https://via.placeholder.com/320x180',
    title: '宜蘭金棗',
    description: '微酸果香且清新',
    price: 45,
    isFavorite: false,
  },
  {
    id: 12,
    image: 'https://via.placeholder.com/320x180',
    title: '南投百香果',
    description: '酸甜開胃可當果汁',
    price: 75,
    isFavorite: false,
  },
  {
    id: 13,
    image: 'https://via.placeholder.com/320x180',
    title: '澎湖紫菜',
    description: '海味濃郁可煮味噌湯',
    price: 115,
    isFavorite: false,
  },
  {
    id: 14,
    image: 'https://via.placeholder.com/320x180',
    title: '美濃白玉蘿蔔',
    description: '鮮脆多汁非常爽口',
    price: 70,
    isFavorite: false,
  },
  {
    id: 15,
    image: 'https://via.placeholder.com/320x180',
    title: '小農地瓜',
    description: '綿密香甜',
    price: 55,
    isFavorite: false,
  },
]
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
        // 模擬 API 延遲
        await new Promise((resolve) => setTimeout(resolve, 500))

        let filteredProducts = [...mockProducts]

        //  價格排序
        if (sortByPrice) {
          filteredProducts.sort((a, b) => a.price - b.price)
        }

        setProducts(filteredProducts)
        setTotalPages(6) // 模擬固定頁數
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
            products.map((product) => (
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
          {[2, 3, 4, 5, 6].map((page) => (
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
