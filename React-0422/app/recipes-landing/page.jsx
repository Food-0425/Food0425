"use client";

import React from "react";
import styles from "../styles/RecipeLanding.module.css";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function RecipesLandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.heroInner}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8329b83009090fb78b53cefb3b8b6060f9a1865a?placeholderIfAbsent=true"
            className={styles.heroImage}
            alt="Hero background"
          />
          <div className={styles.heroContent}>
            <div className={styles.heroTitle}>移動盛宴 美味旅程</div>
            <div className={styles.heroSubtitle}>
              當食材遇上有趣的靈魂，讓我們用美食對話吧！
            </div>
          </div>
          <div className={styles.searchBar}>
            <div className={styles.searchBarInner}>
              <div className={styles.searchText}>HI~今天您想吃什麼？</div>
              <div className={styles.searchIcon}>
                <FaSearch size={24} color="#FAF8F9" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.categoriesSection}>
        <div className={styles.categoriesContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/53f72b1cdd510a8160b76260d08cccc39de9e6a2?placeholderIfAbsent=true"
            className={styles.arrowIcon}
            alt="Left arrow"
          />
          <div className={styles.categoriesWrapper}>
            <div className={styles.categoryIcon}>燒烤</div>
            <div className={styles.categoryIcon}>蔬食</div>
            <div className={styles.categoryIconSpecial}>甜點</div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0a970600a250a6ddc5de925308057cf7220dacd?placeholderIfAbsent=true"
              className={styles.categoryImage}
              alt="Category"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0897aee0f42e4f5c1878ed32b56f83e1d72dafc?placeholderIfAbsent=true"
              className={styles.categoryImage}
              alt="Category"
            />
            <div className={styles.categoryIcon}>生鮮</div>
            <div className={styles.categoryIcon}>糕點</div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/48cafdb4ef4bb734d63a486bf58abbe94c28b5d3?placeholderIfAbsent=true"
            className={styles.arrowIcon}
            alt="Right arrow"
          />
        </div>
      </div>

      <div className={styles.recipeSection}>
        <div className={styles.recipeBlock}>
          <div className={styles.recipeCategory}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/342df7d551f513a8966757cc07c7a877c1abf5eb?placeholderIfAbsent=true"
              className={styles.categoryBackground}
              alt="Desserts background"
            />
            <div className={styles.categoryTitle}>
              糕點
              <br />
              甜食
            </div>
            <div className={styles.viewMoreButton}>看更多</div>
          </div>
          <div className={styles.recipeCardsContainer}>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/83e124d78dc7d8eb48837262ff05b46cb3b6def4?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>草莓蛋糕</div>
                <div className={styles.recipeCardDescription}>
                  新鮮草莓與綿密蛋糕的完美結合，每一口都充滿幸福感。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1030dc196c7226269cf6586ffbe3ddd56e706b1f?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>巧克力餅乾</div>
                <div className={styles.recipeCardDescription}>
                  香濃巧克力與酥脆餅乾的絕妙組合，讓人無法抗拒的美味。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/156fcf8d78659939ad661538b9dfd2b70cfe1c03?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>法式馬卡龍</div>
                <div className={styles.recipeCardDescription}>
                  色彩繽紛的法式甜點，外酥內軟，每一口都是味蕾的享受。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/65a2c4e94c7538b0c96d6459589ad74b6cce188b?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>提拉米蘇</div>
                <div className={styles.recipeCardDescription}>
                  經典義式甜點，咖啡與起司的完美融合，層次豐富。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/77902dabad9716197a59e619fa89abc8a634dcb0?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>藍莓鬆餅</div>
                <div className={styles.recipeCardDescription}>
                  鬆軟可口的鬆餅配上新鮮藍莓，早餐的絕佳選擇。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/133958c6aac0d74c79537a1f8fcf328c0c77e3bf?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>檸檬塔</div>
                <div className={styles.recipeCardDescription}>
                  酸甜適中的檸檬塔，清爽的口感讓人回味無窮。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.recipeSection}>
        <div className={styles.recipeBlock}>
          <div className={styles.recipeCategory}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/24e3686909c1b53ea8a37238c90535bf7c7eca58?placeholderIfAbsent=true"
              className={styles.categoryBackground}
              alt="Seafood background"
            />
            <div className={styles.categoryTitle}>
              生鮮
              <br />
              魚肉
            </div>
            <div className={styles.viewMoreButton}>看更多</div>
          </div>
          <div className={styles.recipeCardsContainer}>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/30734114f4e86d79151e86f544df7654c43be9d6?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>清蒸鱸魚</div>
                <div className={styles.recipeCardDescription}>
                  鮮美的鱸魚搭配簡單調味，保留魚肉的原���鮮甜。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/27f1865caf29a2c7d646d50599eee03aeed3704f?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>香煎鮭魚</div>
                <div className={styles.recipeCardDescription}>
                  外酥內嫩的鮭魚，富含營養且美味可口。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ce51feee33522d3b5200af9f3cf8208e16edd48?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>蒜蓉蝦</div>
                <div className={styles.recipeCardDescription}>
                  鮮甜的蝦肉配上香氣四溢的蒜蓉，簡單又美味。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/710be78fabdc0c441486e3771049cbe3c3cc6409?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>紅燒牛肉</div>
                <div className={styles.recipeCardDescription}>
                  慢燉入味的牛肉，軟嫩多汁，香氣四溢。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6144db7037b4ec6bcf74064ab838170b50ef0b4f?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>蔥爆羊肉</div>
                <div className={styles.recipeCardDescription}>
                  鮮嫩的羊肉配上蔥段爆炒，香氣四溢，風味獨特。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/90c4a042dc7685747f1b4720d768c8333f25bddb?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>椒鹽排骨</div>
                <div className={styles.recipeCardDescription}>
                  外酥內嫩的排骨，椒鹽調味簡單卻美味。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.recipeSection}>
        <div className={styles.recipeBlock}>
          <div className={styles.recipeCategory}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/01cf9537a09e310a773990298aa40e1d8a5b8678?placeholderIfAbsent=true"
              className={styles.categoryBackground}
              alt="Japanese cuisine background"
            />
            <div className={styles.categoryTitle}>
              日式
              <br />
              料理
            </div>
            <div className={styles.viewMoreButtonSpecial}>看更多</div>
          </div>
          <div className={styles.recipeCardsContainer}>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/afb606b98d9c8e43f5783bfd90bde53054942e77?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>壽司拼盤</div>
                <div className={styles.recipeCardDescription}>
                  新鮮的海鮮配上醋飯，經典日式料理。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ae9725e65e24988decf142c03ddb8681effcd74?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>拉麵</div>
                <div className={styles.recipeCardDescription}>
                  濃郁的湯頭配上彈牙的麵條，日式拉麵的經典風味。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c426623ffc971834ae7aa12747ee81d40f2c4834?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>天婦羅</div>
                <div className={styles.recipeCardDescription}>
                  酥脆的外皮包裹著新鮮食材，搭配特製醬汁。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/dfb84559b545c8965dfef75e5f9e1bdd66dc1ec6?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>烤鰻魚飯</div>
                <div className={styles.recipeCardDescription}>
                  香甜的醬汁搭配鮮嫩的鰻魚，經典日式美食。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd7e8decc8129e35d61a86dd0672bacbce47e18c?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>親子丼</div>
                <div className={styles.recipeCardDescription}>
                  雞肉與雞蛋的完美結合，簡單又美味的日式料理。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9fbafe49780012f08fce79d01c930632126395da?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>壽喜燒</div>
                <div className={styles.recipeCardDescription}>
                  甜鹹醬汁中煮熟的牛肉與蔬菜，溫暖人心的料理。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.recipeSection}>
        <div className={styles.recipeBlock}>
          <div className={styles.recipeCategory}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/30aa26a3a2dc823143e87fb1319638355d293cfe?placeholderIfAbsent=true"
              className={styles.categoryBackground}
              alt="Western cuisine background"
            />
            <div className={styles.categoryTitle}>
              西洋
              <br />
              風味
            </div>
            <div className={styles.viewMoreButton}>看更多</div>
          </div>
          <div className={styles.recipeCardsContainer}>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e040c530583e75cc8166426921242b1e8615377?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>牛排</div>
                <div className={styles.recipeCardDescription}>
                  完美煎製的牛排，外酥內嫩，搭配特製醬汁。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/dcaa6dd9ce18e466f1bc6ebbad8afa2ad4030ead?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>義大利麵</div>
                <div className={styles.recipeCardDescription}>
                  彈牙的麵條搭配濃郁的醬汁，經典義式料理。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a58a472d16e2e3bf1e30b4aebdbf2ba8531c6717?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>披薩</div>
                <div className={styles.recipeCardDescription}>
                  酥脆的餅皮上鋪滿各種配料，香氣四溢的義式美食。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/82d8f6e5dcebe4eb70106b672c44d01be0365505?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>漢堡</div>
                <div className={styles.recipeCardDescription}>
                  多汁的肉餅搭配新鮮蔬菜，經典美式快餐。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7a44bffb25d8fe6acaca559659c17f5b2f8e23b?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>法式焗烤</div>
                <div className={styles.recipeCardDescription}>
                  香濃的起司與新鮮食材的完美結合��法式經典。
                </div>
              </div>
            </div>
            <div className={styles.recipeCard}>
              <div className={styles.recipeCardImageWrapper}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5837bf826aab73f8149f96cad1516fde5cfa15ea?placeholderIfAbsent=true"
                  className={styles.recipeCardImage}
                  alt="Recipe"
                />
              </div>
              <div className={styles.recipeCardContent}>
                <div className={styles.recipeCardTitle}>希臘沙拉</div>
                <div className={styles.recipeCardDescription}>
                  新鮮蔬菜與起司的組合，健康又美味的地中海料理。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.featuredSection}>
        <div className={styles.featuredContainer}>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d1dcaf58bd677b48b45cc3cdf88969626ba1b3e?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>希臘沙拉</div>
          </div>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/524bb2f7a404cb7f14d3391152a06164ca585549?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>墨西哥玉米餅沙拉</div>
          </div>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/66805a412f7bde992b6608585e95af8e97e2ba55?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>義式焗烤千層麵</div>
          </div>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f1f50e3bc5ae6d3da77423eb0478c9ef1c7c5bb?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>巧克力熔岩蛋糕</div>
          </div>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d55d204accc4206d3ac81a9ee095171dc343a70?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>台式滷肉飯</div>
          </div>
          <div className={styles.featuredCard}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/38be65be6bdd471bd2341befa9825ccb01cfa1a5?placeholderIfAbsent=true"
              className={styles.featuredCardImage}
              alt="Featured recipe"
            />
            <div className={styles.featuredCardTitle}>泰式綠咖哩雞</div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <div className={styles.footerThankYou}>
              謝謝您來逛逛我們的網站！有您的瀏覽，我們超開心 🎉
            </div>
            <div className={styles.footerFeedback}>
              <div className={styles.footerFeedbackText}>
                如果您願意也歡迎留下回饋，讓我們變得更棒、更貼近您的期待！
              </div>
              <div className={styles.feedbackInput}>
                請留下您寶貴的意見，讓我們變得更好唷~
              </div>
            </div>
          </div>
          <div className={styles.footerRight}>
            <Link href="/faq">
              <div className={styles.faqButton}>常見問題</div>
            </Link>
            <div className={styles.socialIcons}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fda5283f737b9d45281657af0b26f187e5a0fbce?placeholderIfAbsent=true"
                className={styles.socialIcon}
                alt="Social media"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/430184787ac11f2db3a8e60146f8d92be06b25e6?placeholderIfAbsent=true"
                className={styles.socialIcon}
                alt="Social media"
              />
              <div className={styles.socialIconPlaceholder}>
                <div className={styles.socialIconCircle} />
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5955c7f761af237ca5c8bebf25139ef8cfa68ee7?placeholderIfAbsent=true"
                className={styles.socialIcon}
                alt="Social media"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.navbar}>
        <div className={styles.listBar}>
          <div className={styles.listBarItem}>美食分類</div>
          <div className={styles.listBarItem}>食譜選單</div>
          <div className={styles.listBarItem}>推薦</div>
        </div>
        <div className={styles.navbarMain}>
          <div className={styles.navInner}>
            <div className={styles.navLeftGroup}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8dc56a93f47842ef55792eda967e805e598ed29?placeholderIfAbsent=true"
                className={styles.logoImage}
                alt="Logo"
              />
              <div className={styles.navBtnGroup}>
                <Link href="/recipes-landing">
                  <div className={styles.navBtn}>���味食譜</div>
                </Link>
                <div className={styles.navBtn}>食材商城</div>
                <div className={styles.navBtn}>會員中心</div>
                <Link href="/faq">
                  <div className={styles.navBtn}>常見問題</div>
                </Link>
              </div>
            </div>
            <div className={styles.navRightGroup}>
              <div className={styles.searchBarNav} />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b4106d2d7a7ff195be9319db4cefb439b3a1618?placeholderIfAbsent=true"
                className={styles.cartIcon}
                alt="Cart"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/22d85d44bfbaeb077117d30351f45e766ce53dfc?placeholderIfAbsent=true"
                className={styles.userIcon}
                alt="User"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
