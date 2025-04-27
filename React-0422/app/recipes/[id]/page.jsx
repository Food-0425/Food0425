'use client'

import React from 'react'
import Link from 'next/link'
import styles from '../../styles/RecipeDetail.module.css'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

export default function RecipeDetailPage({ props }) {
  //   這邊很重要，在Next要獲取動態參數的話需要用以下這兩行
  const params = useParams() // 使用 useParams 獲取路由參數
  const id = params.id // 獲取動態路由參數
  const fetcher = (url) => fetch(url).then((res) => res.json())

  // 使用 useSWR 來抓取資料，確保有 id 時才發送請求
  const { data, error } = useSWR(
    id ? `http://localhost:3001/recipes/api/${id}` : null,
    fetcher
  )

  // 判斷是否正在加載資料
  const isLoading = !data && !error

  const recipes = data?.data || []

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heroSection}>
          <img
            src="/images/recipes/paella.jpg"
            className={styles.heroImage}
            alt="Recipe hero image"
          />
        </div>

        <div className={styles.ingredientsSection}>
          <div className={styles.ingredientCard}>
            <div className={styles.ingredientCardBody}>
              <div className={styles.ingredientCardContent}>
                <div className={styles.ingredientTitle}>食材</div>
                <div className={styles.ingredientList}>
                  •短米 300 克<br />
                  •海鮮 500 克 (蝦、魷魚、貽貝)
                  <br />
                  •洋蔥 1 顆 (切碎)
                  <br />
                  •大蒜 3 瓣 (切碎)
                </div>
              </div>
            </div>
            <img
              src="/images/recipes/ingredients-icon.png"
              className={styles.ingredientIcon}
              alt="Ingredients icon"
            />
          </div>

          <div className={styles.seasoningCard}>
            <div className={styles.seasoningCardBody}>
              <div className={styles.seasoningCardContent}>
                <div className={styles.seasoningTitle}>調味料</div>
                <div className={styles.seasoningList}>
                  •魚高湯 600 毫升
                  <br />
                  •白酒 100 毫升 <br />
                  •奶油 40 克<br />
                  <span className={styles.seasoningHighlight}>
                    •帕馬森起司 50克 (磨碎)
                  </span>
                </div>
              </div>
            </div>
            <img
              src="/images/recipes/seasoning-icon.png"
              className={styles.seasoningIcon}
              alt="Seasoning icon"
            />
          </div>

          <img
            src="/images/recipes/decoration-icon.png"
            className={styles.decorationIcon}
            alt="Decoration"
          />
        </div>
        {/* 步驟區 */}
        <div className={styles.stepsSection}>
          <div className={styles.stepCard}>
            <div className={styles.stepCardInner}>
              <img
                src="/images/recipes/step1.jpg"
                className={styles.stepImage}
                alt="Step 1"
              />
              <div className={styles.stepContent}>
                <div className={styles.stepNumber}>步驟一</div>
                <div className={styles.stepDescription}>
                  洋蔥和大蒜切碎，海鮮洗淨備用。
                </div>
              </div>
            </div>
          </div>

          <div className={styles.stepCardReverse}>
            <div className={styles.stepCardInnerReverse}>
              <div className={styles.stepContentReverse}>
                <div className={styles.stepNumberReverse}>步驟二</div>
                <div className={styles.stepDescriptionReverse}>
                  鍋中融化奶油，炒香洋蔥和大蒜。
                </div>
              </div>
              <img
                src="/images/recipes/step2.jpg"
                className={styles.stepImage}
                alt="Step 2"
              />
            </div>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepCardInner}>
              <img
                src="/images/recipes/step3.jpg"
                className={styles.stepImage}
                alt="Step 3"
              />
              <div className={styles.stepContent}>
                <div className={styles.stepNumber}>步驟三</div>
                <div className={styles.stepDescription}>
                  加入短米翻炒約2分鐘。
                </div>
              </div>
            </div>
          </div>

          <div className={styles.stepCardReverse}>
            <div className={styles.stepCardInnerReverse}>
              <div className={styles.stepContentReverse}>
                <div className={styles.stepNumberReverse}>步驟四</div>
                <div className={styles.stepDescriptionReverse}>
                  倒入白酒，煮至酒精揮發。
                </div>
              </div>
              <img
                src="/images/recipes/step4.jpg"
                className={styles.stepImage}
                alt="Step 4"
              />
            </div>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepCardInner}>
              <img
                src="/images/recipes/step5.jpg"
                className={styles.stepImage}
                alt="Step 5"
              />
              <div className={styles.stepContent}>
                <div className={styles.stepNumber}>步驟五</div>
                <div className={styles.stepDescription}>
                  倒入白酒，煮至酒精揮發。
                </div>
              </div>
            </div>
          </div>

          <div className={styles.addToCartButton}>
            <div className={styles.addToCartText}>食材一鍵加入購物車</div>
            <div className={styles.addToCartNote}>
              （ 食材分量依商品業標示為準 ）
            </div>
          </div>
        </div>

        <div className={styles.chefSection}>
          <div className={styles.chefCard}>
            <img
              src="/images/recipes/chef-background.jpg"
              className={styles.chefBackground}
              alt="Chef background"
            />
            <div className={styles.chefContent}>
              <div className={styles.chefTitle}>美食笑尖兵</div>
              <div className={styles.chefDescription}>
                在很長的一段時間裡，孤寂像是一隻看不見的巨手，壓迫著我，很快把我壓到別人看不見的角落去了。
                <br />
                你出生的時候，你哭著，周圍的人笑著；你逝去的時候，你笑著，而周圍的人在哭！
                <br />
                <br />
                聞言，我當即清楚，這是小黑的聲音。
              </div>
            </div>
          </div>
        </div>

        <div className={styles.commentsSection}>
          <img
            src="/images/recipes/comment-arrow-left.png"
            className={styles.commentArrow}
            alt="Comment arrow"
          />

          <div className={styles.commentCard}>
            <div className={styles.commentUser}>
              <img
                src="/images/recipes/user1.png"
                className={styles.userAvatar}
                alt="User avatar"
              />
              <div className={styles.userInfo}>
                <img
                  src="/images/recipes/rating.png"
                  className={styles.userRating}
                  alt="User rating"
                />
                <div className={styles.userContent}>
                  <div className={styles.userName}>李淑芬</div>
                  <div className={styles.commentDate}>2025-02-24 10:15</div>
                </div>
              </div>
            </div>
            <div className={styles.commentContent}>
              <div className={styles.commentTitle}>
                味道不錯，但食材稍微貴了一點~
              </div>
              <div className={styles.commentText}>
                我的驕傲被爹媽看出來了，我沒在收假最後一天才寫完作業，我知道，這是我的我驕傲，也是其他小朋友的恨。
              </div>
            </div>
          </div>

          <div className={styles.commentCard}>
            <div className={styles.commentUser}>
              <img
                src="/images/recipes/user2.png"
                className={styles.userAvatar}
                alt="User avatar"
              />
              <div className={styles.userInfo}>
                <img
                  src="/images/recipes/rating.png"
                  className={styles.userRating}
                  alt="User rating"
                />
                <div className={styles.userContent}>
                  <div className={styles.userName}>陳���明</div>
                  <div className={styles.commentDate}>2025-02-17 12:45</div>
                </div>
              </div>
            </div>
            <div className={styles.commentContent}>
              <div className={styles.commentTitle}>
                覺得還可以，已加購物車買來試試
              </div>
              <div className={styles.commentText}>
                一個不成熟男子的標誌是他願意為某種事業英勇地死去，一個成熟男子的標誌是他願意為某種事業卑賤地活著。
              </div>
            </div>
          </div>

          <img
            src="/images/recipes/comment-arrow-right.png"
            className={styles.commentArrow}
            alt="Comment arrow"
          />
        </div>

        <div className={styles.relatedRecipesSection}>
          <div className={styles.relatedRecipesGrid}>
            <div className={styles.relatedRecipeCard}>
              <img
                src="/images/recipes/related1.jpg"
                className={styles.relatedRecipeImage}
                alt="Related recipe"
              />
              <div className={styles.relatedRecipeTitle}>希臘沙拉</div>
            </div>

            <div className={styles.relatedRecipeCard}>
              <img
                src="/images/recipes/related2.jpg"
                className={styles.relatedRecipeImage}
                alt="Related recipe"
              />
              <div className={styles.relatedRecipeTitle}>墨西哥玉米餅沙拉</div>
            </div>

            <div className={styles.relatedRecipeCard}>
              <img
                src="/images/recipes/related3.jpg"
                className={styles.relatedRecipeImage}
                alt="Related recipe"
              />
              <div className={styles.relatedRecipeTitle}>義式焗烤千層麵</div>
            </div>

            <div className={styles.relatedRecipeCard}>
              <img
                src="/images/recipes/related4.jpg"
                className={styles.relatedRecipeImage}
                alt="Related recipe"
              />
              <div className={styles.relatedRecipeTitle}>巧克力熔岩蛋糕</div>
            </div>

            <div className={styles.relatedRecipeCard}>
              <img
                src="/images/recipes/related5.jpg"
                className={styles.relatedRecipeImage}
                alt="Related recipe"
              />
              <div className={styles.relatedRecipeTitle}>台式滷肉飯</div>
            </div>

            <div className={styles.relatedRecipeCard}>
              <img
                src="/images/recipes/related6.jpg"
                className={styles.relatedRecipeImage}
                alt="Related recipe"
              />
              <div className={styles.relatedRecipeTitle}>泰式綠咖哩雞</div>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <div className={styles.footerThankYou}>
              謝謝您來逛逛我們的網站！有您的瀏覽，我們超���心 🎉
            </div>
            <div className={styles.footerFeedback}>
              <div className={styles.feedbackText}>
                如果您願意也歡迎留下回饋，讓我們變得更棒、更貼近您的期待！
              </div>
              <div className={styles.feedbackInput}>
                <div className={styles.feedbackPlaceholder}>
                  請留下您寶貴的意見，讓我們變得更好唷~
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
              <div className={styles.navBtn}>食材商城</div>
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
  )
}
