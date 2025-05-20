'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import styles from '../../src/styles/page-styles/RecipeDetail.module.scss'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//使用API
export default function ProductDetailPage() {
  const params = useParams() // 取得路由參數
  const router = useRouter() //  初始化 Router
  const [cart, setCart] = useState([]) //購物車
  const [wishlist, setWishlist] = useState([]) //收藏清單
  const [quantity, setQuantity] = useState(1) //數量
  const [product, setProduct] = useState(null) //商品資料
  const [loading, setLoading] = useState(true) //是否在載入
  const [error, setError] = useState(null) //錯誤訊息
  const [recommendedProducts, setRecommendedProducts] = useState([]) //推薦商品
  const [reviews, setReviews] = useState([]) //評論
  const [isFavorite, setIsFavorite] = useState(false) //是否收藏

  // 取得商品資料
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `http://localhost:3001/products/api/products/${params.id}`
        )

        console.log('API 回應狀態:', response.status)

        if (!response.ok) {
          throw new Error('商品資料載入失敗')
        }

        const data = await response.json()
        console.log('接收到的資料:', data)

        if (data.success) {
          setProduct(data.data)
        } else {
          throw new Error(data.error || '無法載入商品資料')
        }
      } catch (err) {
        console.error('錯誤詳情:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  // 新增數量控制函數
  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity((prev) => prev + 1)
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // 處理購物車
  const handleAddToCart = async () => {
    try {
      if (!product || quantity < 1) return

      // 準備要傳送的資料
      const cartItem = {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      }

      console.log('加入購物車:', cartItem)
      toast.success(`成功加入 ${quantity} 件商品`)
    } catch (err) {
      console.error('加入購物車失敗:', err)
      toast.error('加入購物車失敗')
    }
  }

  // 處理收藏
  const handleAddToWishlist = async () => {
    try {
      setIsFavorite((prev) => !prev)

      if (!isFavorite) {
        // 加入收藏
        toast.success('已加入收藏')
        console.log('Added to wishlist:', product.id)
      } else {
        // 取消收藏
        toast.info('已取消收藏')
        console.log('Removed from wishlist:', product.id)
      }
    } catch (err) {
      console.error('收藏操作失敗:', err)
      setIsFavorite((prev) => !prev) // 發生錯誤時恢復原狀態
      toast.error('操作失敗，請稍後再試')
    }
  }

  // 新增直接購買函數
  const handleBuyNow = async () => {
    try {
      if (!product || quantity < 1) return

      // 準備購物車項目
      const cartItem = {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      }

      // 這裡可以加入儲存購物車項目的邏輯
      console.log('直接購買:', cartItem)

      // 導向購物車頁面
      router.push('/cart')
    } catch (err) {
      console.error('購買失敗:', err)
      toast.error('購買失敗，請稍後再試')
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>載入商品資料中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>重新整理</button>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <p>找不到該商品</p>
        <Link href="/products">返回商品列表</Link>
      </div>
    )
  }

  return (
    <div className={styles.productContainer}>
      {/* Toast 通知，放在頂層比較不會出錯 */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }} // 確保 Toast 在最上層
      />

      {/* 主要商品資訊 */}
      <div className={styles.productWrapper}>
        <img
          src={product.image}
          className={styles.productImage}
          alt={product.title}
        />
        <div className={styles.productInfoContainer}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <div className={styles.ratingContainer}>
            <div className={styles.starsContainer}>
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src="/images/star.png"
                  className={styles.starIcon}
                  alt={`${i + 1} star`}
                />
              ))}
            </div>
            <p className={styles.reviewCount}>{product.reviewCount} 則評價</p>
          </div>
          <div className={styles.productPrice}>
            NT$ {product.price.toLocaleString()}
          </div>

          {/* 新增數量控制區塊 */}
          <div className={styles.quantityContainer}>
            <span className={styles.quantityLabel}>數量</span>
            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                onClick={() => handleQuantityChange('decrease')}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() => handleQuantityChange('increase')}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button onClick={handleBuyNow} className={styles.buyNowButton}>
              立即購買
            </button>
            <button
              onClick={handleAddToCart}
              className={styles.addToCartButton}
            >
              加入購物車 ({quantity})
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`${styles.wishlistButton} ${isFavorite ? styles.active : ''}`}
            >
              {isFavorite ? '取消收藏' : '加入收藏'}
            </button>
          </div>
        </div>
      </div>

      {/* 商品描述 */}
      <section className={styles.descriptionSection}>
        <h2 className={styles.sectionTitle}>商品介紹</h2>
        <p className={styles.descriptionText}>{product.description}</p>
      </section>

      {/* 推薦商品區塊 */}
      <div className={styles.recommendedSection}>
        <div className={styles.recommendedTitle}>推薦商品</div>
        <div className={styles.recommendedGrid}>
          {recommendedProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className={styles.productCard}>
                <div className={styles.cardImageContainer}>
                  <div className={styles.cardImagePlaceholder}></div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>
                    {product.title}
                    <br />
                    <span className={styles.cardDescription}>
                      {product.description}
                    </span>
                  </div>
                  <div className={styles.cardPrice}>${product.price}</div>
                </div>
                <img
                  src="/images/favorite-outline.png"
                  className={styles.favoriteIcon}
                  alt="Add to favorites"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 評論區 */}
      <div className={styles.reviewsSection}>
        <div className={styles.reviewsTitle}>精選留言</div>
        <div className={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div className={styles.reviewCard} key={review.id}>
              <div className={styles.reviewUser}>
                <div className={styles.userImageContainer}>
                  <img
                    src={review.userImage}
                    className={styles.userImage}
                    alt={review.userName}
                  />
                </div>
                <div className={styles.userInfo}>
                  <img
                    src="/images/five-stars.png"
                    className={styles.userRating}
                    alt="5 star rating"
                  />
                  <div className={styles.userDetails}>
                    <div className={styles.userName}>{review.userName}</div>
                    <div className={styles.reviewDate}>{review.date}</div>
                  </div>
                </div>
              </div>
              <div className={styles.reviewContent}>
                <div className={styles.reviewTitle}>{review.title}</div>
                <div className={styles.reviewText}>{review.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
