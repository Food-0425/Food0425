'use client'

import React, { useState } from 'react'
import styles from '../src/styles/ShopList.module.scss'
import { MdFavorite, MdFavoriteBorder } from '../icons/icons'

export const ProductCard = ({
  id = 0,
  name = 'Product Name',
  image = '/placeholder.jpg',
  brand = '',
  price = '',
  original_price = '',
  clickable = true,
  initialFavorite = false,
  onFavoriteToggle,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    if (onFavoriteToggle) {
      onFavoriteToggle(id, !isFavorite)
    }
  }

  const handleCardClick = () => {
    if (clickable) {
      window.location.href = `/shop/${id}`
    }
  }
  console.log('ProductCard props:', {
    id,
    name,
    image,
    brand,
    price,
    original_price,
  })

  return (
    <div
      className={styles.shopCard}
      onClick={handleCardClick}
      style={{ cursor: clickable ? 'pointer' : 'default' }}
    >
      <div className={styles.shopCardImg}>
        <img src={image} alt={name} />
      </div>
      <span>
        <div>
          <p>{brand}</p>
          <h3>{name}</h3>
        </div>
        <div>
          <p>${original_price}</p>
          <h2>${price}</h2>
        </div>
      </span>
      <button
        alt={isFavorite ? '已收藏' : '加入收藏'}
        onClick={handleFavoriteClick}
        style={{ cursor: 'pointer' }}
      >
        {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
      </button>
    </div>
  )
}

export default ProductCard
// 這個組件是用來顯示商品卡片的，包含商品圖片、名稱、品牌、價格和收藏按鈕。