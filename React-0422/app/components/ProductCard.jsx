'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../src/styles/ShopList.module.scss' // 使用相對路徑
import { MdFavorite, MdFavoriteBorder } from '../icons/icons'

export const ProductCard = ({
  product = {
    id: 1,
    name: 'Product Name',
    image: '/placeholder.jpg',
    title: 'Product Title',
    description: 'Product Description',
    price: 'price',
    isFavorite: false,
    brand,
    original_price,
    initialFavorite: false,
    clickable: true,
    showViewButton: false,
  },
}) => {
  // temp props
  const id = 0
  const className = ''
  const image = ''
  const name = ''
  const brand = ''
  const price = 0
  const original_price = 0
  const onFavoriteToggle = () => {}
  const clickable = true,
    constshowViewButton = false

  const handleFavoriteClick = (e) => {
    e.stopPropagation() // 防止點擊收藏圖標時觸發卡片點擊
    setIsFavorite(!isFavorite)
    if (onFavoriteToggle) {
      onFavoriteToggle(id, !isFavorite)
    }
  }

  const handleCardClick = () => {
    if (clickable) {
      // 跳轉到菜譜詳情頁
      window.location.href = `/shop/${id}`
      // 或使用Next.js的路由: router.push(`/shop/${id}`);
    }
  }
  // temp props

  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false)
  console.log('product:', product)

  const handleFavoriteToggle = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <>
      {/* ShopCard */}
      <div>
        <div
          className={`${styles.shopCard} ${className}`}
          onClick={handleCardClick}
          style={{ cursor: clickable ? 'pointer' : 'default' }}
        >
          <div className={styles.shopCardImg}>
            <img
              src={image} // 從 public 資料夾的根目錄開始
              alt={name}
            />
          </div>
          <span>
            <div>
              <p> {product.brand}</p>
              <h3>{product.name}</h3>
            </div>
            <div>
              <p>${product.original_price}</p>
              <h2>${product.price}</h2>
            </div>
          </span>

          {/* 收藏按鈕 Start */}
          <button
            alt={isFavorite ? '已收藏' : '加入收藏'}
            onClick={handleFavoriteClick}
            style={{ cursor: 'pointer' }}
          >
            {/* <MdFavorite /> */}
            <MdFavoriteBorder />
          </button>
          {/* 收藏按鈕 End */}
        </div>
      </div>
    </>
  )
}

export default ProductCard
