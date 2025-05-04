'use client'

import React from 'react'
import Link from 'next/link'
import styles from '../../styles/RecipeDetail.module.css'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

export default function RecipeDetailPage() {
  const params = useParams()
  const id = params.id
  const fetcher = (url) => fetch(url).then((res) => res.json())

  const { data, error } = useSWR(
    id ? `http://localhost:3001/recipes/api/${id}` : null,
    fetcher
  )

  const isLoading = !data && !error
  const recipes = data?.data || []

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <img
          src="/images/recipes/paella.jpg"
          className={styles.heroImage}
          alt="Recipe hero image"
        />
      </div>

      {/* Ingredients Section */}
      <div className={styles.ingredientsSection}>
        <div className={styles.ingredientCard}>
          <div className={styles.cardBody}>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>食材</div>
              <div className={styles.cardList}>
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
            className={styles.cardIcon}
            alt="Ingredients icon"
          />
        </div>

        <div className={styles.seasoningCard}>
          <div className={styles.cardBody}>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>調味料</div>
              <div className={styles.cardList}>
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
            className={styles.cardIcon}
            alt="Seasoning icon"
          />
        </div>
      </div>

      {/* Steps Section */}
      <div className={styles.stepsSection}>
        <img
          src="/images/recipes/steps-header.png"
          className={styles.stepsHeader}
          alt="Steps header"
        />
        <div className={styles.stepsContainer}>
          <div className={styles.stepsList}>
            <div className={styles.stepItem}>
              <div className={styles.stepNumberDark}>
                <div className={styles.stepNumberText}>
                  <div>步</div>
                  <div>驟</div>
                </div>
                <div className={styles.stepNumberValue}>1</div>
              </div>
              <div className={styles.stepDescription}>
                蘑菇和洋蔥切碎，準備好所有材料。
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumberLight}>
                <div className={styles.stepNumberText}>
                  <div>步</div>
                  <div>驟</div>
                </div>
                <div className={styles.stepNumberValue}>2</div>
              </div>
              <div className={styles.stepDescription}>
                在鍋中融化奶油，加入洋蔥炒至透明。
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumberDark}>
                <div className={styles.stepNumberText}>
                  <div>步</div>
                  <div>驟</div>
                </div>
                <div className={styles.stepNumberValue}>3</div>
              </div>
              <div className={styles.stepDescription}>
                加入蘑菇繼續炒至水分蒸發，香氣四溢。
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumberLight}>
                <div className={styles.stepNumberText}>
                  <div>步</div>
                  <div>驟</div>
                </div>
                <div className={styles.stepNumberValue}>4</div>
              </div>
              <div className={styles.stepDescription}>撒入麵粉炒至無粉味。</div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumberDark}>
                <div className={styles.stepNumberText}>
                  <div>步</div>
                  <div>驟</div>
                </div>
                <div className={styles.stepNumberValue}>5</div>
              </div>
              <div className={styles.stepDescription}>
                慢慢加入雞高湯，不斷攪拌至湯變得濃稠。
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumberLight}>
                <div className={styles.stepNumberText}>
                  <div>步</div>
                  <div>驟</div>
                </div>
                <div className={styles.stepNumberValue}>6</div>
              </div>
              <div className={styles.stepDescription}>
                小火煮15分鐘後加入鮮奶油。
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumberDark}>
                <div className={styles.stepNumberText}>
                  <div>步</div>
                  <div>驟</div>
                </div>
                <div className={styles.stepNumberValue}>7</div>
              </div>
              <div className={styles.stepDescription}>
                用攪拌機打成細滑濃湯，最後加入松露油調味。
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumberLight}>
                <div className={styles.stepNumberText}>
                  <div>步</div>
                  <div>驟</div>
                </div>
                <div className={styles.stepNumberValue}>8</div>
              </div>
              <div className={styles.stepDescription}>
                上桌前在每碗湯上放上切片松露裝飾。
              </div>
            </div>
          </div>

          <div className={styles.addToCartButton}>
            <img
              src="/images/recipes/cart-icon-large.png"
              className={styles.cartIconLarge}
              alt="Cart icon"
            />
            <div className={styles.addToCartContent}>
              <div className={styles.addToCartTitle}>添加食材至購物車</div>
              <div className={styles.addToCartNote}>
                （ 食材分量依商品標示為準 ）
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chef Section */}
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
              在很長的一段時間裡，孤寂像是一隻看不見的巨手，壓迫著我，很快把我壓到別人看不見的���落去了。
              <br />
              你出生的時候，你哭著，周圍的人笑著；你逝去的時候，你笑著，而周圍的人在哭！
              <br />
              <br />
              聞言，我當即清楚，這是小黑的聲音。
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className={styles.commentsSection}>
        <div className={styles.addCommentButton}>
          <img
            src="/images/recipes/comment-icon.png"
            className={styles.commentIcon}
            alt="Comment icon"
          />
          <div className={styles.addCommentText}>添加留言</div>
        </div>

        <div className={styles.commentsList}>
          <img
            src="/images/recipes/user-avatar-left.png"
            className={styles.userAvatarLeft}
            alt="User avatar"
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
                我的驕傲被爹媽看出來了，我沒在收假最後一天才寫完作業，我知道，這是我的我驕傲，也是其他小���友的恨。
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
                  <div className={styles.userName}>陳志明</div>
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
            src="/images/recipes/user-avatar-right.png"
            className={styles.userAvatarRight}
            alt="User avatar"
          />
        </div>
      </div>

      {/* Related Recipes Section */}
      <div className={styles.relatedRecipesSection}>
        <div className={styles.relatedRecipesTitle}>相關食譜推薦</div>
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

      {/* Footer */}
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

      {/* Decorative Elements */}
      <img
        src="/images/recipes/decoration-left.png"
        className={styles.decorationLeft}
        alt="Decoration"
      />
      <img
        src="/images/recipes/decoration-right.png"
        className={styles.decorationRight}
        alt="Decoration"
      />
      <img
        src="/images/recipes/decoration-sticker.png"
        className={styles.decorationSticker}
        alt="Decoration"
      />
    </div>
  )
}
