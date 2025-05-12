'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/RecipeLanding.module.css'
import { FaSearch } from 'react-icons/fa'

export default function RecipeCarousel() {
  const [searchQuery, setSearchQuery] = useState('') // 管理輸入的關鍵字
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(
        `/recipes-landing/list?page=1&keyword=${encodeURIComponent(searchQuery)}`
      )
    }
  }

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade position-relative"
      data-bs-ride="carousel"
    >
      <div className={styles.carouselOverlay}>
        <div className={styles.heroContent}>
          <h2>移動盛宴 美味旅程</h2>
          <h3>當食材遇上有趣的靈魂，讓我們用美食對話吧！</h3>
        </div>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBarInner}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="HI~今天您想吃什麼？"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // 更新關鍵字
            />
            <button className={styles.searchButton} onClick={handleSearch}>
              <FaSearch className={styles.searchIcon} />
            </button>
          </div>
        </div>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/images/carousel/carousel-01.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="/images/carousel/carousel-02.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="/images/carousel/carousel-03.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">上</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">下</span>
      </button>
    </div>
  )
}
