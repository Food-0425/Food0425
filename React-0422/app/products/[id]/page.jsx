"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHeart,
  FaRegHeart,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ProductDescription from "../../components/ProductDescription";
import styles from "../../styles/ProductDetail.module.css";
import { getProductById, getRelatedProducts } from "../../lib/products";
import { useCart } from "../../../hooks/use-cart";

const MySwal = withReactContent(Swal);

export default function ProductDetailPage({ params }) {
  const productId = params.id;
  const { onAdd } = useCart();

  // State for product details
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Get product data
    const productData = getProductById(productId);

    if (productData) {
      // Format product data to match component expectations
      const formattedProduct = {
        id: productData.id,
        name: productData.title,
        price: productData.price,
        originalPrice: productData.originalPrice,
        discount: productData.discount,
        description: productData.description,
        longDescription:
          productData.description + " " + productData.description,
        images: [
          productData.image,
          "/images/products/steak2.jpg",
          "/images/products/steak3.jpg",
          "/images/products/steak4.jpg",
        ],
        specifications: [
          { label: "產品規格", value: "300g±10g/包" },
          { label: "產地", value: "台灣" },
          { label: "保存方式", value: "-18°C以下冷凍保存" },
          { label: "保存期限", value: "冷凍保存1年，解凍後建議當天食用完畢" },
          { label: "包裝方式", value: "真空包裝" },
        ],
        reviews: [
          {
            id: 1,
            name: "李淑芬",
            avatar: "/images/products/user1.jpg",
            date: "2025-02-24",
            rating: 5,
            title: "料理非常好，味道很棒",
            text: "我很喜歡這道料理，味道很棒，已購買，小孩很愛吃",
          },
          {
            id: 2,
            name: "陳大明",
            avatar: "/images/products/user2.jpg",
            date: "2025-02-17",
            rating: 4,
            title: "很不錯的��理，但價格稍高",
            text: "味道很好，不過價格比其他家貴一些，希望能有折扣活動",
          },
        ],
      };

      setProduct(formattedProduct);

      // Get related products
      const related = getRelatedProducts(productId, 4);
      const formattedRelated = related.map((item) => ({
        id: item.id,
        name: item.title,
        image: item.image,
      }));

      setRelatedProducts(formattedRelated);
    } else {
      // Handle product not found
      toast.error("找不到產品資訊", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    // Check if product is in favorites
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      setIsFavorite(!!favorites[productId]);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">載入中...</div>
      </div>
    );
  }

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  // Handle add to cart
  const addToCart = () => {
    // Add product to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      onAdd(product);
    }

    toast.success(`已將 ${quantity} 件 ${product.name} 加入購物車`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Handle add to wishlist
  const toggleWishlist = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    // Update localStorage
    const savedFavorites = localStorage.getItem("favorites");
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : {};

    if (newFavoriteState) {
      favorites[productId] = true;
      toast.success(`已將 ${product.name} 加入收藏清單`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      delete favorites[productId];
      toast.info(`已將 ${product.name} 從收���清單移除`, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  // Handle write review
  const handleWriteReview = () => {
    MySwal.fire({
      title: "撰寫評論",
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label for="review-title" style="display: block; margin-bottom: 5px; font-weight: bold;">標題</label>
            <input id="review-title" class="swal2-input" placeholder="請輸入評論標題">
          </div>
          <div style="margin-bottom: 15px;">
            <label for="review-text" style="display: block; margin-bottom: 5px; font-weight: bold;">評論內容</label>
            <textarea id="review-text" class="swal2-textarea" placeholder="請分享您的使用體驗"></textarea>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold;">評分</label>
            <div id="rating" style="display: flex; gap: 10px;">
              <span data-rating="1" style="cursor: pointer; font-size: 24px;">★</span>
              <span data-rating="2" style="cursor: pointer; font-size: 24px;">★</span>
              <span data-rating="3" style="cursor: pointer; font-size: 24px;">★</span>
              <span data-rating="4" style="cursor: pointer; font-size: 24px;">★</span>
              <span data-rating="5" style="cursor: pointer; font-size: 24px;">★</span>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "提交評論",
      cancelButtonText: "取消",
      preConfirm: () => {
        const title = document.getElementById("review-title").value;
        const text = document.getElementById("review-text").value;

        if (!title || !text) {
          Swal.showValidationMessage("請填寫評論標題和內容");
          return false;
        }

        return { title, text };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("感謝您的評論！", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heroSection}>
          <img
            src="/images/products/hero-banner.jpg"
            className={styles.heroImage}
            alt="Product category banner"
          />
        </div>

        <div className={styles.productInfoSection}>
          <div className={styles.productGallery}>
            <img
              src={product.images[selectedImage]}
              className={styles.mainImage}
              alt={product.name}
            />
            <div className={styles.thumbnailContainer}>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.thumbnailActive : ""}`}
                  alt={`${product.name} - view ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className={styles.productDetails}>
            <h1 className={styles.productTitle}>{product.name}</h1>

            <div>
              <span className={styles.productPrice}>NT$ {product.price}</span>
              <span className={styles.originalPrice}>
                NT$ {product.originalPrice}
              </span>
              <span className={styles.discount}>省{product.discount}</span>
            </div>

            <ProductDescription
              text={product.description}
              className={styles.productDescription}
            />

            <div className={styles.divider}></div>

            <div className={styles.quantitySelector}>
              <div className={styles.quantityLabel}>數量</div>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityButton}
                  onClick={decreaseQuantity}
                >
                  <FaMinus />
                </button>
                <input
                  type="text"
                  className={styles.quantityInput}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button
                  className={styles.quantityButton}
                  onClick={increaseQuantity}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.addToCartButton} onClick={addToCart}>
                <FaShoppingCart /> 加入購物車
              </button>
              <button
                className={styles.wishlistButton}
                onClick={toggleWishlist}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.specificationsSection}>
          <h2 className={styles.sectionTitle}>商品說明</h2>
          <ProductDescription
            text={product.longDescription}
            className={styles.productDescription}
          />

          <h2 className={styles.sectionTitle} style={{ marginTop: "40px" }}>
            商品規格
          </h2>
          <div className={styles.specificationsList}>
            {product.specifications.map((spec, index) => (
              <div key={index} className={styles.specificationItem}>
                <div className={styles.specificationLabel}>{spec.label}</div>
                <div className={styles.specificationValue}>{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.reviewsSection}>
          <div className={styles.reviewsHeader}>
            <h2 className={styles.sectionTitle}>顧客評價</h2>
            <div className={styles.reviewsCount}>
              {product.reviews.length} 則評價
            </div>
            <button
              className={styles.writeReviewButton}
              onClick={handleWriteReview}
            >
              撰寫評價
            </button>
          </div>

          <div className={styles.reviewsList}>
            {product.reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <img
                      src={review.avatar}
                      className={styles.reviewerAvatar}
                      alt={review.name}
                    />
                    <div>
                      <div className={styles.reviewerName}>{review.name}</div>
                      <div className={styles.reviewDate}>{review.date}</div>
                    </div>
                  </div>
                  <div className={styles.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={styles.starIcon}
                        style={{
                          color: i < review.rating ? "#df6c2d" : "#e0e0e0",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.reviewTitle}>{review.title}</div>
                <div className={styles.reviewText}>{review.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.relatedProductsSection}>
          <h2 className={styles.relatedProductsTitle}>相關商品推薦</h2>
          <div className={styles.relatedProductsGrid}>
            {relatedProducts.map((relatedProduct) => (
              <Link
                href={`/products/${relatedProduct.id}`}
                key={relatedProduct.id}
              >
                <div className={styles.relatedProductCard}>
                  <img
                    src={relatedProduct.image}
                    className={styles.relatedProductImage}
                    alt={relatedProduct.name}
                  />
                  <div className={styles.relatedProductTitle}>
                    {relatedProduct.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <div className={styles.footerThankYou}>
              謝謝您來逛逛我們的網站！有您的瀏覽，我們超開心 🎉
            </div>
            <div className={styles.footerFeedback}>
              <div className={styles.feedbackText}>
                如果您願意也歡迎留下回饋，讓我們變得更棒、更貼近您的期待！
              </div>
              <div className={styles.feedbackInput}>
                <div className={styles.feedbackPlaceholder}>
                  請留下您寶貴的意見，讓我們變得更���唷~
                </div>
                <img
                  src="/images/recipes/send-icon.png"
                  className={styles.sendIcon}
                  alt="Send"
                />
              </div>
            </div>
          </div>

          <div className={styles.footerRight}>
            <div className={styles.faqButton}>常見問題</div>
            <div className={styles.socialIcons}>
              <img
                src="/images/recipes/social1.png"
                className={styles.socialIcon}
                alt="Social media"
              />
              <img
                src="/images/recipes/social2.png"
                className={styles.socialIcon}
                alt="Social media"
              />
              <div className={styles.socialIconPlaceholder}>
                <div className={styles.socialIconCircle} />
              </div>
              <img
                src="/images/recipes/social3.png"
                className={styles.socialIcon}
                alt="Social media"
              />
            </div>
          </div>
        </div>
      </footer>

      <nav className={styles.navbar}>
        <div className={styles.navbarInner}>
          <div className={styles.navLeftGroup}>
            <img
              src="/images/recipes/logo.png"
              className={styles.logoImage}
              alt="Logo"
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
            <img
              src="/images/recipes/cart-icon.png"
              className={styles.cartIcon}
              alt="Cart"
            />
            <img
              src="/images/recipes/user-icon.png"
              className={styles.userIcon}
              alt="User"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
