'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import styles from '../../styles/ProductDetail.module.css'
import Link from 'next/link'

// Mock product data - in a real app, this would come from an API
const mockProduct = {
  id: 1,
  image: 'https://via.placeholder.com/620x516',
  title: '嚴選推薦 | 中國M9骰子牛(200g)',
  description:
    '來自日本宮崎縣的 A5 等級頂級和牛，以油花細緻、肉質鮮嫩著稱。每片皆具備均勻霜降，入口即化，堪稱極致饗宴。適合煎、烤、火鍋等多樣料理方式，解凍後輕鬆料理即可享受日式高級肉品風味。150g 精緻份量，適合個人獨享或搭配其他食材組合。全程-18°C冷凍保鮮，品質穩定。數量有限，為高端饕客首選。來自日本宮崎縣的 A5 等級頂級和牛，以油花細��、肉質鮮嫩著稱。每片皆具備均勻霜降，入口即化，堪稱極致饗宴。適合煎、烤、火鍋等多樣料理方式，解凍後輕鬆料理即可享受日式高級肉品風味。150g 精緻份量，適合個人獨享或搭配其他食材組合。全程-18°C冷凍保鮮，品質穩定。數量有限，為高端饕客首選。來自日本宮崎縣的 A5 等級頂級和牛，以油花細緻、肉質鮮嫩著稱。每片皆具備均勻霜降，入口即化，堪稱極致饗宴。適合煎、烤、火鍋等多樣料理方式，解凍後輕鬆料理即可享受日式高級肉品風味。150g 精緻份量，適合個人獨享或搭配其他食材組合。全程-18°C冷凍保鮮，品質穩定。數量有限，為高端饕客首選。來自日本宮崎縣的 A5 等級頂級和牛，以油花細緻、肉質鮮嫩著稱。每片皆具備均勻霜降，入口即化，堪稱極致饗宴。適合煎、烤、火鍋等多樣料理方式，解凍後輕鬆料理即可享受日式高級肉品風味。150g 精緻份量，適合個人獨享或搭配其他食材組合。全程-18°C冷凍保鮮，品質穩定。數量有限，為高端饕客首選。來自日本宮崎縣的 A5 等級頂級和牛，以油花細緻、肉質鮮嫩著稱。每片皆具備均勻霜降，入口即化，堪稱極致饗宴。適合煎、烤、火鍋等多樣料理方式，解凍後輕鬆料理即可享受日式高級肉品風味。150g 精緻份量，適合個人獨享或搭配其他食材組合。全程-18°C冷凍保鮮，品質穩定。數量有限，為高端饕客首選。',
  price: 120,
  rating: 5,
  reviewCount: 24,
  isFavorite: false,
}

// Mock recommended products
const recommendedProducts = [
  {
    id: 2,
    image: 'https://via.placeholder.com/320x180',
    title: '香蕉',
    description: '好吃甜膩膩',
    price: 85,
    isFavorite: false,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/320x180',
    title: '菲力牛排',
    description: '肉滑滑嫩嫩',
    price: 150,
    isFavorite: false,
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/320x180',
    title: '板腱牛排',
    description: '超級香噴噴',
    price: 115,
    isFavorite: false,
  },
]

// Mock reviews
const reviews = [
  {
    id: 1,
    userName: '李淑芬',
    userImage: 'https://via.placeholder.com/163x137',
    rating: 5,
    date: '2025-02-24 10:15',
    title: '味道不錯，但食材稍微貴了一點~',
    text: '我喜歡1分熟的，裡面油花分布很漂亮，已購買，小孩很愛吃',
  },
  {
    id: 2,
    userName: '陳志明',
    userImage: 'https://via.placeholder.com/163x137',
    rating: 5,
    date: '2025-02-17 12:45',
    title: '覺得還可以，已加購物車買來試試',
    text: '全熟肉很好吃，好吃到說不出話，因為我還在咬',
  },
  {
    id: 3,
    userName: '陳春嬌',
    userImage: 'https://via.placeholder.com/163x137',
    rating: 5,
    date: '2025-02-19 21:44',
    title: '覺得還不錯，買回家自己煮煮看',
    text: '料理完肉香超濃！外酥內嫩超下飯，回購100次都願意！',
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id
  const [product, setProduct] = useState(mockProduct)

  // In a real app, you would fetch the product data based on the ID
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await fetch(`/api/products/${productId}`);
  //       const data = await response.json();
  //       setProduct(data);
  //     } catch (error) {
  //       console.error('Error fetching product:', error);
  //     }
  //   };
  //
  //   fetchProduct();
  // }, [productId]);

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log('Added to cart:', product.id)
  }

  const handleAddToWishlist = () => {
    // Add to wishlist logic would go here
    console.log('Added to wishlist:', product.id)
  }

  return (
    <div className={styles.productContainer}>
      {/* Product Main Section */}
      <div className={styles.productWrapper}>
        <img
          src={product.image}
          className={styles.productImage}
          alt={product.title}
        />
        <div className={styles.productInfoContainer}>
          <div className={styles.productTitle}>{product.title}</div>
          <div className={styles.ratingContainer}>
            <div className={styles.starsContainer}>
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src="/images/star.png"
                  className={styles.starIcon}
                  alt="Star rating"
                />
              ))}
            </div>
            <div className={styles.reviewCount}>
              <p>{product.reviewCount} 則評價</p>
            </div>
          </div>
          <div className={styles.productPrice}>${product.price}</div>
          <img
            src="/images/add-to-cart-button.png"
            className={styles.actionButton}
            alt="Add to cart"
            onClick={handleAddToCart}
          />
          <img
            src="/images/add-to-wishlist-button.png"
            className={styles.actionButton}
            alt="Add to wishlist"
            onClick={handleAddToWishlist}
          />
        </div>
      </div>

      {/* Product Description Section */}
      <div className={styles.descriptionSection}>
        <div className={styles.sectionTitle}>產品介紹</div>
        <div className={styles.descriptionText}>{product.description}</div>
      </div>

      {/* Recommended Products Section */}
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

      {/* Reviews Section */}
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
