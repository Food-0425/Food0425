'use client'

import React, { useState, useEffect } from 'react'
import styles from '../styles/ProductList.module.css'
import { ProductCard } from '../components/ProductCard'

// Mock product data - in a real app, this would come from an API
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

const PRODUCTS_PER_PAGE = 15

export default function ProductListPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(4) // Starting at page 4 as shown in design
  const [totalPages, setTotalPages] = useState(6)
  const [activeCategory, setActiveCategory] = useState('本周熱銷')
  const [sortByPrice, setSortByPrice] = useState(false)

  // Fetch products (simulated)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/products?page=${currentPage}&category=${activeCategory}`);
        // const data = await response.json();

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Apply category filter (in a real app, this would be done on the server)
        let filteredProducts = [...mockProducts]

        // Apply price sorting if enabled
        if (sortByPrice) {
          filteredProducts.sort((a, b) => a.price - b.price)
        }

        setProducts(filteredProducts)
        setTotalPages(6) // Simulated total pages
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, activeCategory, sortByPrice])

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentPage(1) // Reset to first page when changing category
  }

  // Handle price sorting
  const togglePriceSorting = () => {
    setSortByPrice(!sortByPrice)
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className={styles.container}>
      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div
          className={`${styles.filterItem} ${activeCategory === '本周熱銷' ? styles.active : ''}`}
          onClick={() => handleCategoryChange('本周熱銷')}
        >
          本周熱銷
        </div>
        <div
          className={`${styles.filterItem} ${styles.filterCategory} ${activeCategory === '蔬菜' ? styles.active : ''}`}
          onClick={() => handleCategoryChange('蔬菜')}
        >
          蔬菜
        </div>
        <div
          className={`${styles.filterItem} ${styles.filterCategory} ${activeCategory === '���品' ? styles.active : ''}`}
          onClick={() => handleCategoryChange('肉品')}
        >
          肉品
        </div>
        <div
          className={`${styles.filterItem} ${styles.filterCategory} ${activeCategory === '乾貨' ? styles.active : ''}`}
          onClick={() => handleCategoryChange('乾貨')}
        >
          乾貨
        </div>
        <div
          className={`${styles.filterItem} ${activeCategory === '調味品' ? styles.active : ''}`}
          onClick={() => handleCategoryChange('調味品')}
        >
          調味品
        </div>
        <div className={styles.priceFilter} onClick={togglePriceSorting}>
          <div className={styles.sortIcon}>
            <img
              src="https://via.placeholder.com/37x34"
              className={styles.sortIconImage}
              alt="Sort by price"
            />
          </div>
          <div className={styles.priceText}>價格</div>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className={styles.productSection}>
        <div className={styles.productGrid}>
          {loading ? (
            <div>載入中...</div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>

      {/* Pagination Section */}
      <div className={styles.paginationSection}>
        <div className={styles.pagination}>
          <img
            src="https://via.placeholder.com/11x16"
            className={styles.paginationArrow}
            alt="Previous page"
            onClick={() => handlePageChange(currentPage - 1)}
          />

          <div className={styles.paginationItem}>
            <div
              className={`${styles.paginationButton} ${currentPage === 2 ? styles.paginationButtonActive : ''}`}
              onClick={() => handlePageChange(2)}
            >
              2
            </div>
          </div>

          <div className={styles.paginationItem}>
            <div
              className={`${styles.paginationButton} ${currentPage === 3 ? styles.paginationButtonActive : ''}`}
              onClick={() => handlePageChange(3)}
            >
              3
            </div>
          </div>

          <div className={styles.paginationItem}>
            <div
              className={`${styles.paginationButton} ${currentPage === 4 ? styles.paginationButtonActive : ''}`}
              onClick={() => handlePageChange(4)}
            >
              4
            </div>
          </div>

          <div className={styles.paginationItem}>
            <div
              className={`${styles.paginationButton} ${currentPage === 5 ? styles.paginationButtonActive : ''}`}
              onClick={() => handlePageChange(5)}
            >
              5
            </div>
          </div>

          <div className={styles.paginationItem}>
            <div
              className={`${styles.paginationButton} ${currentPage === 6 ? styles.paginationButtonActive : ''}`}
              onClick={() => handlePageChange(6)}
            >
              6
            </div>
          </div>

          <img
            src="https://via.placeholder.com/11x16"
            className={styles.paginationArrow}
            alt="Next page"
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </div>
      </div>
    </div>
  )
}
