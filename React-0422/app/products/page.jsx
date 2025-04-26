"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { getProducts } from "../lib/products";
import styles from "../styles/ProductListing.module.css";

export default function ProductListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const categoryParam = searchParams.get("category");

  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam) : 1,
  );
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    // Load products based on current page and category
    const { products: productData, pagination: paginationData } = getProducts({
      page: currentPage,
      limit: 12,
      category: categoryParam || null,
    });

    setProducts(productData);
    setPagination(paginationData);

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [currentPage, categoryParam]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Update URL with new page parameter
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    if (categoryParam) {
      params.set("category", categoryParam);
    }

    router.push(`/products?${params.toString()}`);
  };

  const toggleFavorite = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    const newFavorites = { ...favorites };

    if (newFavorites[productId]) {
      delete newFavorites[productId];
      toast.info("已從收藏清單移除", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      newFavorites[productId] = true;
      toast.success("已加入���藏清單", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className={styles.container}>
      <div className={styles.productInterface}>
        <div className={styles.topIcons}>
          <Image
            src="/images/recipes/icon1.png"
            width={58}
            height={58}
            alt="Icon"
            className={styles.iconImage}
          />
          <Image
            src="/images/recipes/icon2.png"
            width={58}
            height={58}
            alt="Icon"
            className={styles.iconImage}
          />
        </div>

        <div className={styles.productGrid}>
          <div className={styles.foodCategoryBlock}>
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className={styles.foodCard}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={product.image}
                      width={320}
                      height={177}
                      alt={product.title}
                      className={styles.foodImage}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.foodTitle}>{product.title}</h3>
                    <p className={styles.foodDescription}>
                      {product.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(e, product.id)}
                    className={styles.favoriteIcon}
                    aria-label={
                      favorites[product.id]
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {favorites[product.id] ? (
                      <FaHeart size={24} className="text-[#DF6C2D]" />
                    ) : (
                      <FaRegHeart size={24} className="text-[#DF6C2D]" />
                    )}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.paginationSection}>
          <div className={styles.pageNumbers}>
            {pagination.hasPrevPage && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous page"
              >
                <Image
                  src="/images/recipes/arrow-left.png"
                  width={11}
                  height={17}
                  alt="Previous"
                  className={styles.arrowIcon}
                />
              </button>
            )}

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <div key={page} className={styles.pageNumberContainer}>
                  <button
                    className={
                      page === currentPage
                        ? styles.activePageButton
                        : styles.pageButton
                    }
                    onClick={() => handlePageChange(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                </div>
              ),
            )}

            {pagination.hasNextPage && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next page"
              >
                <Image
                  src="/images/recipes/arrow-right.png"
                  width={11}
                  height={17}
                  alt="Next"
                  className={styles.arrowIcon}
                />
              </button>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLeft}>
              <div className={styles.footerThankYou}>
                謝謝您來逛逛我們的網站！有您的瀏覽，我們超開心 🎉
              </div>
              <div className={styles.feedbackContainer}>
                <div className={styles.feedbackText}>
                  如果您願意也歡迎留下回饋，讓我們變得更棒、更貼近您的期待！
                </div>
                <div className={styles.feedbackInput}>
                  請留下您寶貴的意��，讓我們變得更好唷~
                </div>
              </div>
            </div>

            <div className={styles.footerRight}>
              <Link href="/faq">
                <div className={styles.faqButton}>常見問題</div>
              </Link>
              <div className={styles.socialIcons}>
                <Image
                  src="/images/recipes/social1.png"
                  width={79}
                  height={79}
                  alt="Social media"
                  className={styles.socialIcon}
                />
                <Image
                  src="/images/recipes/social2.png"
                  width={79}
                  height={79}
                  alt="Social media"
                  className={styles.socialIcon}
                />
                <div className={styles.socialIconPlaceholder}>
                  <div className={styles.socialIconCircle} />
                </div>
                <Image
                  src="/images/recipes/social3.png"
                  width={79}
                  height={79}
                  alt="Social media"
                  className={styles.socialIcon}
                />
              </div>
            </div>
          </div>
        </div>

        <nav className={styles.navbar}>
          <div className={styles.navbarInner}>
            <div className={styles.navContent}>
              <div className={styles.navLeftGroup}>
                <Image
                  src="/images/recipes/logo.png"
                  width={38}
                  height={57}
                  alt="Logo"
                  className={styles.logoImage}
                />
                <div className={styles.navBtnGroup}>
                  <Link href="/recipes-landing">
                    <div className={styles.navBtn}>美味食譜</div>
                  </Link>
                  <Link href="/products">
                    <div className={styles.navBtn}>食材商城</div>
                  </Link>
                  <div className={styles.navBtn}>會員中心</div>
                  <Link href="/faq">
                    <div className={styles.navBtn}>常見問題</div>
                  </Link>
                </div>
              </div>

              <div className={styles.navRightGroup}>
                <div className={styles.searchBar} />
                <Link href="/cart">
                  <Image
                    src="/images/recipes/cart-icon.png"
                    width={45}
                    height={42}
                    alt="Cart"
                    className={styles.cartIcon}
                  />
                </Link>
                <Image
                  src="/images/recipes/user-icon.png"
                  width={33}
                  height={28}
                  alt="User"
                  className={styles.userIcon}
                />
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className={styles.categoryLabels}>
        <div className={styles.categoryLabel}>美食分類</div>
        <div className={styles.menuLabel}>食譜選單</div>
        <div className={styles.recommendLabel}>推薦</div>
      </div>
    </div>
  );
}
