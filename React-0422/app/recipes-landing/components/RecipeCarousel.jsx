'use client'
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import styles from '../../styles/RecipeLanding.module.css' // 確保路徑正確
import { FaSearch } from 'react-icons/fa'

export default function RecipeCarousel() {
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
            />
            <div>
              <FaSearch className={styles.searchIcon} />
            </div>
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
