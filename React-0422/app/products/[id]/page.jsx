'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import styles from '../../src/styles/page-styles/RecipeDetail.module.scss'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import LoginModal from '@/app/components/LoginModal'
// import 'react-toastify/dist/ReactToastify.css'
import { FoodFeeBack } from '../../components/FoodFeeBack'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {
  IoIosArrowBack,
  IoIosArrowForward,
  BiSolidBowlRice,
  BiLike,
  MdFavorite,
  MdFavoriteBorder,
} from '../../icons/icons' //箭頭圖示
import ProductCard from '../../components/ProductCard' // 引入 ProductCard 組件
import StarRating from '../../components/StarRating' // 引入 StarRating 組件
import { useAuth } from '@/hooks/auth-context' // 引入 Auth hook
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { AiOutlineStar } from 'react-icons/ai'

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
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [recommendedLoading, setRecommendedLoading] = useState(true)
  const [recommendedError, setRecommendedError] = useState(null)
  const productId = params.id // 取得商品 ID
  const [productRating, setProductRating] = useState({
    averageRating: 0,
    totalReviews: 0,
  }) // 評分相關狀態
  // 新增評論資料的 state
  const [reviewData, setReviewData] = useState({
    reviews: [],
    isLoading: true,
    error: null,
  })
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { auth } = useAuth() || {} // 使用 useAuth 鉤子獲取用戶信息

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

    // 設置假評論資料
    // const mockReviews = [
    //   {
    //     id: 1,
    //     username: '李淑芬',
    //     userAvatar: '/images/recipes/user1.png',
    //     created_at: '2025-02-24 10:15',
    //     title: '味道不錯，但價格稍貴',
    //     context:
    //       '商品品質很好，包裝也很完整。雖然價格比一般商店貴一些，但品質確實有差。建議可以找特價時再購買。',
    //     rating: 4,
    //     review_id: 1,
    //   },
    //   {
    //     id: 2,
    //     username: '陳志明',
    //     userAvatar: '/images/recipes/user2.png',
    //     created_at: '2025-02-17 12:45',
    //     title: '超值推薦！',
    //     context:
    //       '第二次購買了，品質依然維持水準。出貨速度快，包裝完整，而且客服態度很好，有問題都會立即回覆。',
    //     rating: 5,
    //     review_id: 1,
    //   },
    //   {
    //     id: 3,
    //     username: '王小明',
    //     userAvatar: '/images/recipes/user1.png',
    //     created_at: '2025-02-15 15:30',
    //     title: '還不錯的選擇',
    //     context:
    //       '商品符合描述，食材新鮮。配送過程中有些小問題，但客服處理得很好。整體來說是不錯的購物體驗。',
    //     rating: 4,
    //   },
    //   {
    //     id: 4,
    //     username: '張美玲',
    //     userAvatar: '/images/recipes/user2.png',
    //     created_at: '2025-02-10 09:20',
    //     title: '物超所值',
    //     context:
    //       '商品新鮮度很好，包裝也很完整。價格雖然不是最便宜的，但品質真的很不錯。會再回購！',
    //     rating: 5,
    //   },
    //   {
    //     id: 5,
    //     username: '林大寶',
    //     userAvatar: '/images/recipes/user1.png',
    //     created_at: '2025-02-05 14:50',
    //     title: '好吃推薦',
    //     context:
    //       '食材品質很棒，而且份量也很實在。建議可以多進一些不同的品項，這樣選擇性會更多。',
    //     rating: 4,
    //   },
    // ]

    // setReviews(mockReviews)
    setIsLoading(false)

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setRecommendedLoading(true)
        setRecommendedError(null)

        const response = await fetch(
          `http://localhost:3001/products/api/products/${params.id}/recommendations?limit=4`
        )

        console.log('推薦商品 API 回應狀態:', response.status)

        if (!response.ok) {
          throw new Error('無法取得推薦商品')
        }

        const data = await response.json()
        console.log('推薦商品資料:', data)

        if (data.success) {
          setRecommendedProducts(data.recommendations)
        } else {
          throw new Error(data.error || '取得推薦商品失敗')
        }
      } catch (err) {
        console.error('取得推薦商品錯誤:', err)
        setRecommendedError(err.message)
        // 如果 API 失敗，使用預設推薦商品
        const fallbackProducts = [
          {
            id: 101,
            name: '有機高麗菜',
            image: '/images/products/default.jpg',
            price: 60,
            original_price: 80,
            brand: '台灣農場',
          },
          {
            id: 102,
            name: '特選豬肉',
            image: '/images/products/default.jpg',
            price: 180,
            original_price: 200,
            brand: '台灣牧場',
          },
          {
            id: 103,
            name: '新鮮海鮮',
            image: '/images/products/default.jpg',
            price: 250,
            original_price: 300,
            brand: '海洋水產',
          },
        ]
        setRecommendedProducts(fallbackProducts)
      } finally {
        setRecommendedLoading(false)
      }
    }

    if (params.id) {
      fetchRecommendedProducts()
    }
  }, [params.id])

  useEffect(() => {
    if (!productId) return

    const fetchRatingData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/products-review/api/${productId}/ratings`
        )

        console.log('評分 API 回應狀態:', res.status)

        if (!res.ok) {
          throw new Error('無法取得評分資料')
        }

        const result = await res.json()
        console.log('評分資料:', result)

        if (result.success && result.data) {
          // 確保數值轉換正確
          const avgRating = parseFloat(result.data.averageRating) || 0
          const totalReviews = parseInt(result.data.totalReviews) || 0

          setProductRating({
            averageRating: avgRating,
            totalReviews: totalReviews,
          })
        } else {
          console.warn('評分資料取得失敗', result.error)
          setProductRating({
            averageRating: 0,
            totalReviews: 0,
          })
        }
      } catch (error) {
        console.error('取得評分資料時發生錯誤:', error)
        setProductRating({
          averageRating: 0,
          totalReviews: 0,
        })
      }
    }

    fetchRatingData()
  }, [productId])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewData((prev) => ({ ...prev, isLoading: true }))

        const response = await fetch(
          `http://localhost:3001/products-review/api/${params.id}`
        )

        if (!response.ok) {
          throw new Error('無法獲取評論資料')
        }

        const data = await response.json()
        console.log('評論資料:', data) // 除錯用

        if (data.success) {
          setReviewData({
            reviews: data.data,
            isLoading: false,
            error: null,
          })
        } else {
          throw new Error(data.error || '載入評論失敗')
        }
      } catch (err) {
        console.error('獲取評論錯誤:', err)
        setReviewData({
          reviews: [],
          isLoading: false,
          error: err.message,
        })
      }
    }

    if (params.id) {
      fetchReviews()
    }
  }, [params.id])

  // const pro = redata?.data || {}

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
    if (!auth || !auth.token) {
      // toast.warning('請先登入以添加食材至購物車！')
      setShowLoginModal(true)
      return
    }

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

  // 修改收藏按鈕處理函數
  const handleAddToWishlist = async () => {
    if (!auth || !auth.token) {
      // toast.warning('請先登入才能加入收藏！')
      setShowLoginModal(true)
      return
    }

    try {
      setIsFavorite((prev) => !prev)

      if (!isFavorite) {
        toast.success('已加入收藏')
        console.log('Added to wishlist:', product.id)
      } else {
        toast.info('已取消收藏')
        console.log('Removed from wishlist:', product.id)
      }
    } catch (err) {
      console.error('收藏操作失敗:', err)
      setIsFavorite((prev) => !prev)
      toast.error('操作失敗，請稍後再試')
    }
  }

  // 修改直接購買函數
  const handleBuyNow = async () => {
    if (!auth || !auth.token) {
      // toast.warning('請先登入才能購買商品！')
      setShowLoginModal(true)
      return
    }

    try {
      if (!product || quantity < 1) return

      const cartItem = {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      }

      console.log('直接購買:', cartItem)
      router.push('/cart')
    } catch (err) {
      console.error('購買失敗:', err)
      toast.error('購買失敗，請稍後再試')
    }
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.floor(reviews.length / itemsPerPage))
    )
  }

  // 計算目前頁面應該顯示的評論，測試推送是否正確ＫＫ
  const itemsPerPage = 3
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  // const currentComments = reviews.slice(startIndex, endIndex)
  // const currentComments = review.slice(startIndex, endIndex)
  const currentComments = reviewData.reviews.slice(startIndex, endIndex)

  //讀取載入狀態
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

  const CommentStarRating = ({ rating }) => {
    const stars = []
    const totalStars = 5

    for (let i = 0; i < totalStars; i++) {
      if (rating >= i + 1) {
        // 整星
        stars.push(<FaStar key={i} className={styles.starFilled} />)
      } else if (rating >= i + 0.5) {
        // 半星
        stars.push(<FaStarHalfAlt key={i} className={styles.starHalf} />)
      } else {
        // 空星
        stars.push(<AiOutlineStar key={i} className={styles.starEmpty} />)
      }
    }

    return <div className={styles.stars}>{stars}</div>
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
          {/* 品牌資訊 */}
          {product.brand && (
            <div className={styles.brandSection}>
              <h3>{product.brand}</h3>
            </div>
          )}
          <h1 className={styles.productTitle}>{product.name}</h1>
          <div className={styles.ratingContainer}>
            <div className={styles.starsContainer}>
              <StarRating
                rating={parseFloat(productRating.averageRating) || 0}
              />
            </div>
            <p className={styles.ratingScore}>
              ({(parseFloat(productRating.averageRating) || 0).toFixed(1)})
            </p>
            <p className={styles.reviewCount}>
              {productRating.totalReviews || 0} 則評價
            </p>
          </div>
          {/* 把price更改成整數 */}
          {product && (
            <div className={styles.productPrice}>
              <p>NT$ {Math.floor(product.original_price).toLocaleString()}</p>
              <h2>NT$ {Math.floor(product.price).toLocaleString()}</h2>
            </div>
          )}

          {/* 新增數量控制區塊 */}
          <div className={styles.quantityContainer}>
            <h2>數量</h2>
            <div className={styles.quantityControls}>
              <button
                onClick={() => handleQuantityChange('decrease')}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button onClick={() => handleQuantityChange('increase')}>
                +
              </button>
            </div>
          </div>
        </div>
        {/* 新增直接購買按鈕 */}
        <div className={styles.actionButtons}>
          <button onClick={handleBuyNow} className={styles.buyNowButton}>
            立即購買
          </button>
          <button onClick={handleAddToCart} className={styles.addToCartButton}>
            加入購物車 ({quantity})
          </button>
          <button
            onClick={handleAddToWishlist}
            className={`${styles.wishlistButton} ${isFavorite ? styles.active : ''}`}
          >
            {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
          </button>
        </div>
      </div>

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        message="需要登入才能收藏食譜喔！"
        onNavigateToLogin={() => {
          setShowLoginModal(false)
          router.push('/login')
        }}
      />
      {/* </div> */}

      {/* 商品詳細資訊區塊 */}
      <div className={styles.productDetailSection}>
        {/* 商品介紹 */}
        <div className={styles.descriptionBlock}>
          <h2 className={styles.blockTitle}>商品介紹</h2>
          <div className={styles.blockContent}>
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <p>暫無商品介紹</p>
            )}
          </div>
        </div>

        {/* 商品規格 */}
        <div className={styles.descriptionBlock}>
          <h2 className={styles.blockTitle}>商品規格</h2>
          <div className={styles.blockContent}>
            {product.specifications ? (
              <p>{product.specifications}</p>
            ) : (
              <p>暫無規格資訊</p>
            )}
          </div>
        </div>
      </div>

      {/* 評論區塊 */}
      <div className={styles.commentsSection}>
        <div className={styles.reviewsSection}>
          <h2 className={styles.reviewsTitle}>商品評價</h2>
        </div>
        <div className={styles.commentsContainer}>
          <div>
            <div className={styles.commentsList01}>
              <button
                className={styles.arrowButton}
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                <IoIosArrowBack />
              </button>

              <div className={styles.commentsList}>
                {reviewData.isLoading ? (
                  <div>正在載入評論...</div>
                ) : reviewData.error ? (
                  <div>載入評論時發生錯誤: {reviewData.error}</div>
                ) : reviewData.reviews.length > 0 ? (
                  currentComments.map((comment) => (
                    <div className={styles.commentCard} key={comment.review_id}>
                      <div>
                        <img
                          src={comment.img || `/images/user/default.jpg`}
                          alt={`${comment.full_name} 的頭像`}
                          onError={(e) => {
                            if (!e.target.dataset.fallback) {
                              e.target.dataset.fallback = true
                              e.target.src = '/images/recipes/user1.png'
                            }
                          }}
                        />
                        <div className={styles.userInfo}>
                          <h3>{comment.full_name || '匿名用戶'}</h3>
                          <p>
                            {new Date(comment.review_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className={styles.commentContent}>
                        <div className={styles.ratingContainer}>
                          <CommentStarRating rating={comment.rating} />
                          <span className={styles.ratingScore}>
                            ({comment.rating?.toFixed(1)})
                          </span>
                        </div>
                        <p>{comment.review_text || '無評論內容'}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.commentCard}>
                    <div className={styles.commentUser}>
                      <div className={styles.userInfo}>
                        <div className={styles.userContent}>
                          <div className={styles.userName}>
                            <h2>{'目前這個商品尚未有人留言'}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.commentContent}>
                      <div className={styles.commentText}>
                        {'目前這個商品尚未有人留言'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                className={styles.arrowButton}
                onClick={handleNextPage}
                disabled={endIndex >= reviews.length}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 你可能會喜歡 */}
      <div className={styles.recommendedSection}>
        <div>
          <h2 className={styles.recommendedTitle}>你可能會喜歡</h2>
          <div className={styles.recommendedGrid}>
            {recommendedLoading ? (
              <div>正在載入推薦商品...</div>
            ) : recommendedError ? (
              <div>載入推薦商品時發生錯誤</div>
            ) : (
              recommendedProducts.map((product) => (
                <div className={styles.recommendedProductCard}>
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    brand={product.brand}
                    price={product.price}
                    original_price={product.original_price}
                    description={product.description}
                    initialFavorite={false}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
