'use client'

import React, { useState } from 'react'
import styles from '../styles/ProductList.module.css'

export const ProductCard = ({
  product = {
    id: 1,
    image: '/placeholder.jpg',
    title: 'Product Title',
    description: 'Product Description',
    price: 100,
    isFavorite: false,
  },
}) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false)

  const handleFavoriteToggle = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img
          src={product.image}
          className={styles.productImage}
          alt={product.title}
        />
      </div>
      <div className={styles.productContent}>
        <h3 className={styles.productTitle}>
          {product.title}
          <br />
          <span className={styles.productDescription}>
            {product.description}
          </span>
        </h3>
        <div className={styles.productPrice}>${product.price}</div>
      </div>
      <img
        src={
          isFavorite
            ? '/images/favorite-filled.png'
            : '/images/favorite-outline.png'
        }
        className={styles.favoriteIcon}
        alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={handleFavoriteToggle}
      />
    </div>
  )
}

export default ProductCard
