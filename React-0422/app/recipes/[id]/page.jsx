'use client'

import React from 'react'
import Link from 'next/link'
import styles from '../../src/styles/page-styles/RecipeDetail.module.scss'
import {
  TbBowlSpoon,
  PiJarLabelBold,
  FaCartShopping,
  FaCartPlus,
  BiLike,
} from '../../icons/icons'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useEffect } from 'react'
// 特別注意，這個useAuth的鉤子一定要選auth-context.js的
import { useAuth } from '@/hooks/auth-context'
import useSWR from 'swr'
import FoodFeeBack from '../../components/FoodFeeBack'

export default function RecipeDetailPage() {
  const [currentPage, setCurrentPage] = useState(0) // 當前頁數
  const commentsPerPage = 2 // 每頁顯示的評論數量
  const { auth } = useAuth() || {} // 使用 useAuth 鉤子獲取用戶信息

  const params = useParams()
  const id = params.id
  const fetcher = (url) => fetch(url).then((res) => res.json())

  const { data, error } = useSWR(
    id ? `http://localhost:3001/recipes/api/${id}` : null,
    fetcher
  )

  const isLoading = !data && !error
  const recipe = data?.data || {}

  // 假設API返回的步驟格式可能是這樣的
  // 步驟可能在 recipe.steps 或其他位置，這裡做一個預設值
  const steps = recipe.steps || []

  // 取得評論數據
  const comments = recipe.comments || []

  // 計算當前頁的評論
  const startIndex = currentPage * commentsPerPage
  const endIndex = startIndex + commentsPerPage
  const currentComments = comments.slice(startIndex, endIndex)

  // 處理翻頁
  const handleNextPage = () => {
    if (endIndex < comments.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  // 取得相關食譜數據
  const relatedRecipes = recipe.related_recipes || []

  // 狀態：控制 FoodFeeBack 是否顯示
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false)

  // 點擊按鈕顯示 FoodFeeBack
  const handleShowFeedback = () => {
    if (isFeedbackVisible) {
      setIsFeedbackVisible(false)
      return
    }
    // 如果已經顯示，則隱藏
    // 否則顯示 FoodFeeBack
    setIsFeedbackVisible(true)
  }

  // 點擊按鈕添加食材至購物車
  // 假設購物車資料存儲在 localStorage 或透過 API 傳送
  // 這裡的 ingredients 是從 recipe.ingredients 中取得的

  const handleAddToCart = async (ingredients) => {
    if (!ingredients || ingredients.length === 0) {
      alert('沒有可添加的食材！')
      return
    }

    if (!auth || !auth.token) {
      alert('請先登入以添加食材至購物車！')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/recipes/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`, // 假設需要用戶的 token
        },
        body: JSON.stringify({ ingredients }),
      })

      if (response.ok) {
        alert('已成功將食材添加至購物車！')
      } else {
        const errorData = await response.json()
        alert(`添加失敗：${errorData.message || '未知錯誤'}`)
      }
    } catch (error) {
      alert(`添加失敗：${error.message}`)
    }
  }

  return (
    <div className={styles.container}>
      {/* 版頭 Start */}
      <div className={styles.heroSection}>
        <div>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </div>
        <img
          src={recipe.image ? `${recipe.image}` : '讀取中...'}
          alt="Recipe hero image"
        />
      </div>
      {/* 版頭 End */}

      {/* Ingredients Section */}
      <div className={styles.ingredientsSection}>
        <div className={styles.ingredientCard}>
          <div className={styles.cardBody}>
            <h2>食材</h2>
            <div className={styles.cardList}>
              {recipe.ingredients ? (
                recipe.ingredients.map((ingredient, index) => (
                  <React.Fragment key={index}>
                    {/* •{ingredient} */}• {ingredient.name} -{' '}
                    {ingredient.quantity} {ingredient.unit}
                    <FaCartPlus />
                    <FaCartShopping />
                    <br />
                  </React.Fragment>
                ))
              ) : (
                <>
                  <li>
                    短米 300 克 <FaCartPlus />
                  </li>

                  <li>海鮮 500 克 (蝦、魷魚、貽貝)</li>
                  <li>洋蔥 1 顆 (切碎)</li>
                  <li>大蒜 3 瓣 (切碎)</li>
                </>
              )}
            </div>
          </div>
          <div className={styles.cardIcon}>
            <TbBowlSpoon />
          </div>
        </div>
        {/* 這區是調味料。 但資料庫裡面的食材和調味料寫在一起了。所以暫時註解掉 */}
        <div className={styles.ingredientCard}>
          <div className={styles.cardBody}>
            <h2>調味料</h2>
            <div className={styles.cardList}>
              {recipe.ingredients ? (
                recipe.condiments.map((seasoning, index) => (
                  <React.Fragment key={index}>
                    {/* •{seasoning} */}• {seasoning.name} -{' '}
                    {seasoning.quantity} {seasoning.unit}
                    <FaCartPlus />
                    <FaCartShopping />
                    <br />
                  </React.Fragment>
                ))
              ) : (
                <>
                  •魚高湯 600 毫升
                  <br />
                  •白酒 100 毫升 <br />
                  •奶油 40 克<br />
                  <span className={styles.seasoningHighlight}>
                    •帕馬森起司 50克 (磨碎)
                  </span>
                </>
              )}
            </div>
          </div>
          <div className={styles.cardIcon}>
            <PiJarLabelBold />
          </div>
        </div>
      </div>

      {/* Steps Section - 動態生成步驟 */}
      <div className={styles.stepsSection}>
        <img
          src="/images/recipes/steps-header.png"
          className={styles.stepsHeader}
          alt="Steps header"
        />
        <div className={styles.stepsContainer}>
          <div className={styles.stepsList}>
            {isLoading ? (
              <div>正在載入步驟...</div>
            ) : error ? (
              <div>載入步驟時發生錯誤</div>
            ) : steps && steps.length > 0 ? (
              steps.map((step, index) => (
                <div className={styles.stepItem} key={index}>
                  <div
                    className={
                      index % 2 === 0
                        ? styles.stepNumberDark
                        : styles.stepNumberLight
                    }
                  >
                    <div className={styles.stepNumberText}>
                      <div>步</div>
                      <div>驟</div>
                    </div>
                    <div className={styles.stepNumberValue}>{index + 1}</div>
                  </div>
                  <div className={styles.stepDescription}>
                    {step.description || step}
                  </div>
                </div>
              ))
            ) : (
              // 備用的靜態步驟，當API沒有返回步驟時顯示
              <>
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
                  <div className={styles.stepDescription}>
                    撒入麵粉炒至無粉味。
                  </div>
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
              </>
            )}
          </div>

          <button
            className={styles.addToCartButton}
            onClick={() => handleAddToCart(recipe.ingredients)}
          >
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
          </button>
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
              在很長的一段時間裡，孤寂像是一隻看不見的巨手，壓迫著我，很快把我壓到別人看不見的落去了。
              <br />
              你出生的時候，你哭著，周圍的人笑著；你逝去的時候，你笑著，而周圍的人在哭！
              <br />
              <br />
              聞言，我當即清楚，這是小黑的聲音。
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section - 動態生成評論 */}
      <div className={styles.commentsSection}>
        <button
          className={styles.addCommentButton} // 使用樣式
          onClick={handleShowFeedback} // 點擊事件
        >
          <img
            src="/images/recipes/comment-icon.png"
            className={styles.commentIcon}
            alt="Comment icon"
          />
          <div className={styles.addCommentText}>添加留言</div>
        </button>

        <div className={styles.commentsList}>
          {/* 左箭頭按鈕 */}
          <button
            className={`${styles.arrowButton} ${styles.left}`}
            onClick={handlePrevPage}
            disabled={currentPage === 0} // 第一頁禁用
          >
            ←
          </button>
          {/* 下面這是原本預設要放入的箭頭，先註解後用其他的替代 */}
          {/* <img
            src="/images/recipes/user-avatar-left.png"
            className={styles.userAvatarLeft}
            alt="User avatar"
          /> */}

          {isLoading ? (
            <div>正在載入評論...</div>
          ) : error ? (
            <div>載入評論時發生錯誤</div>
          ) : currentComments && currentComments.length > 0 ? (
            currentComments.map((comment, index) => (
              <div className={styles.commentCard} key={index}>
                <div className={styles.commentUser}>
                  {/* 先註解掉，不然會一直去跟後端拿資料(無限讀取) {目前已解決} */}
                  <img
                    src={comment.userAvatar || `/images/user/default.jpg`}
                    className={styles.userAvatar}
                    alt="User avatar"
                    onError={(e) => {
                      if (!e.target.dataset.fallback) {
                        e.target.dataset.fallback = true // 標記已經使用過 fallback
                        e.target.src = `/images/recipes/user${(index % 2) + 1}.png`
                      }
                    }}
                  />
                  <div className={styles.userInfo}>
                    {/* 下面這個註解掉的是用戶等級(目前暫時沒有要做) */}
                    {/* <img
                      src="/images/recipes/rating.png"
                      className={styles.userRating}
                      alt="User rating"
                    /> */}
                    <div className={styles.userLike}>
                      <BiLike size={30} />
                    </div>

                    <div className={styles.userContent}>
                      <div className={styles.userName}>
                        {comment.username || '匿名用戶'}
                      </div>
                      <div className={styles.commentDate}>
                        {comment.created_at || '未知日期'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.commentContent}>
                  {/* 這個標題我不太確定要放什麼，之後考慮拿掉或替換成別的顯示內容 */}
                  <div className={styles.commentTitle}>
                    {comment.title || '無標題'}
                  </div>
                  <div className={styles.commentText}>
                    {comment.context || comment.text || '無評論內容'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // 備用的靜態評論，當API沒有返回評論時顯示
            <>
              <div className={styles.commentCard}>
                <div className={styles.commentUser}>
                  {/* 因為這一塊是假設沒人留言的情況下，所以先註解掉 */}
                  {/* <img
                    src={`/images/user/default.jpg`}
                    className={styles.userAvatar}
                    alt="User avatar"
                    onError={(e) => {
                      if (!e.target.dataset.fallback) {
                        e.target.dataset.fallback = true // 標記已經使用過 fallback
                        e.target.src = `/images/recipes/user${(index % 2) + 1}.png`
                      }
                    }}
                  /> */}
                  <div className={styles.userInfo}>
                    {/* 下面這個註解掉的是用戶等級(目前暫時沒有要做) */}
                    {/* <img
                      src="/images/recipes/rating.png"
                      className={styles.userRating}
                      alt="User rating"
                    /> */}
                    {/* <div className={styles.userLike}>
                      <BiLike size={30} />
                    </div> */}

                    <div className={styles.userContent}>
                      <div className={styles.userName}>
                        {'目前這個食譜尚未有人留言'}
                      </div>
                      {/* <div className={styles.commentDate}>{'日期'}</div> */}
                    </div>
                  </div>
                </div>
                <div className={styles.commentContent}>
                  {/* 這個標題我不太確定要放什麼，之後考慮拿掉或替換成別的顯示內容 */}
                  {/* <div className={styles.commentTitle}>{'無標題'}</div> */}
                  <div className={styles.commentText}>{'無評論內容'}</div>
                </div>
              </div>
              {/* 下面是原本的預設食譜評論卡片樣式 */}
              {/* <div className={styles.commentCard}>
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
                    我的驕傲被爹媽看出來了，我沒在收假最後一天才寫完作業，我知道，這是我的我驕傲，也是其他小友的恨。
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
              </div> */}
            </>
          )}

          {/* 右箭頭按鈕 */}
          <button
            className={`${styles.arrowButton} ${styles.right}`}
            onClick={handleNextPage}
            disabled={endIndex >= comments.length} // 最後一頁禁用
          >
            →
          </button>
          {/* 這邊是原本預計要放的右箭頭，也先註解掉用別的替代 */}
          {/* <img
            src="/images/recipes/user-avatar-right.png"
            className={styles.userAvatarRight}
            alt="User avatar"
          /> */}
        </div>
      </div>
      {/* FoodFeeBack 區塊 */}
      {isFeedbackVisible && <FoodFeeBack />}

      {/* Related Recipes Section - 動態生成相關食譜 */}
      <div className={styles.relatedRecipesSection}>
        <div className={styles.relatedRecipesTitle}>相關食譜推薦</div>
        <div className={styles.relatedRecipesGrid}>
          {isLoading ? (
            <div>正在載入相關食譜...</div>
          ) : error ? (
            <div>載入相關食譜時發生錯誤</div>
          ) : relatedRecipes && relatedRecipes.length > 0 ? (
            relatedRecipes.map((relatedRecipe, index) => (
              <Link
                href={`/recipes/${relatedRecipe.related_recipe_id}`}
                key={relatedRecipe.related_recipe_id || index}
                className={styles.relatedRecipeCard}
              >
                {/* img先註解掉，不然會一直無限跟後端發API請求 */}
                <img
                  src={
                    relatedRecipe.image ||
                    `/images/recipes/related${(index % 6) + 1}.jpg`
                  }
                  className={styles.relatedRecipeImage}
                  alt={relatedRecipe.title || '相關食譜'}
                  onError={(e) => {
                    if (!e.target.dataset.fallback) {
                      e.target.dataset.fallback = true // 標記已經使用過 fallback
                      e.target.src = `/images/recipes/related${(index % 6) + 1}.jpg`
                    }
                  }}
                />
                <div className={styles.relatedRecipeTitle}>
                  {relatedRecipe.title || '未命名食譜'}
                </div>
              </Link>
            ))
          ) : (
            // 備用的靜態相關食譜，當API沒有返回數據時顯示
            <>
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
                <div className={styles.relatedRecipeTitle}>
                  墨西哥玉米餅沙拉
                </div>
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
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      {/* <footer className={styles.footer}>
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
      </footer> */}

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
