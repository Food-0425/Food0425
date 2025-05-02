"use client";

import React from "react";
import Link from "next/link";
import styles from "../../styles/RestaurantDetail.module.css";
import { useParams } from "next/navigation";

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbNav}>
            <div>美食推薦</div>
            <div>/</div>
            <div>餐廳介紹</div>
          </div>
          <div className={styles.mainContent}>
            <h1 className={styles.restaurantTitle}>
              隱身巷弄的美味秘境：山丘上的義式餐廳
            </h1>

            <div className={styles.actionButtons}>
              <div className={styles.actionButton}>
                <img
                  src="/images/restaurant/favorite-icon.png"
                  className={styles.actionIcon}
                  alt="收藏"
                />
                <div>收藏餐廳</div>
              </div>
              <div className={styles.actionButton}>
                <img
                  src="/images/restaurant/share-icon.png"
                  className={styles.actionIcon}
                  alt="分享"
                />
                <div>分享</div>
              </div>
            </div>

            <div className={styles.authorInfo}>
              <div className={styles.recommendBadge}>
                <img
                  src="/images/restaurant/recommend-icon.png"
                  className={styles.badgeIcon}
                  alt="特別推薦"
                />
                <div className={styles.badgeText}>特別推薦</div>
              </div>
              <img
                src="/images/restaurant/author-avatar.png"
                className={styles.authorAvatar}
                alt="作者頭像"
              />
              <div className={styles.authorLabel}>美食編輯</div>
              <div className={styles.publishDate}>2024.01.15</div>
            </div>

            <div className={styles.heroImage}>
              <img
                src="/images/restaurant/hero-image.jpg"
                className={styles.heroImg}
                alt="山丘上的義式餐廳"
              />
            </div>

            <div className={styles.restaurantDescription}>
              <div className={styles.descriptionText}>
                位於台北市郊的「山丘上的義式餐廳」，是一間充滿浪漫氛圍的義式料理餐廳。餐廳由米其林星級主廚
                Marco
                主理，將傳統義大利美食與在地食材完美結合，為饕客們帶來獨特的美食體驗。
              </div>

              <h2 className={styles.sectionTitle}>特色料理品味之旅</h2>

              <div className={styles.quoteBox}>
                <div className={styles.quoteText}>
                  「每一道料理，都是一場味蕾的藝術饗宴。在這裡，我們不僅提供美食，更創造難忘的餐飲體驗。」
                </div>
                <div className={styles.quoteAuthor}>— Marco Rossi 主廚</div>
              </div>

              <img
                src="/images/restaurant/dish1.jpg"
                className={styles.dishImage}
                alt="特色料理"
              />

              <h3 className={styles.dishTitle}>經典手工義大利麵：海洋的饗宴</h3>

              <div className={styles.dishDescription}>
                還記得第一次造訪這家餐廳時，Marco
                主廚特別向我推薦這道手工義大利麵。「這是我們最引以為傲的料理，」他說，眼神中透露著自信。當餐點端上桌時，光是視覺就令人驚艷：金黃色的手工麵條完美捲曲，點綴著粉紅色的鮮蝦、黑色的淡菜，以及白玉般的花蛤，最上層撒上新鮮的義大利香料，光是香氣就讓人食指大動。
              </div>

              <div className={styles.dishDescription}>
                每一口都能感受到麵條的韌性十足，充分展現出主廚對於手工製麵的堅持。海鮮的鮮甜完美融入醬汁中，白酒蒜香醬的層次豐富，卻不會搶走海鮮的主角地位。這道料理完美詮釋了義大利南部濱海地區的飲食精髓。
              </div>

              <img
                src="/images/restaurant/dish2.jpg"
                className={styles.dishImage}
                alt="小牛膝"
              />

              <h3 className={styles.dishTitle}>48小時慢熟小牛膝：經典重現</h3>

              <div className={styles.dishDescription}>
                這道料理可說是餐廳的鎮店之寶，採用特選小牛膝，經過長達48小時的低溫慢熟，讓肉質達到極致的柔嫩。端上桌時，光是輕輕用叉子碰觸，肉質就輕易地分離，散發出迷人的香氣。
              </div>

              <div className={styles.dishDescription}>
                醬汁是由紅酒、番茄及多種香料熬製而成，經過8小時以上的慢火熬煮，濃郁而不膩。搭配餐廳自製的馬鈴薯泥，綿密的口感中帶有香草奶油的清香，與主菜形成完美的和諧。Marco
                主廚特別提到，這道料理的靈感來自他祖母的私房食譜，經過現代化的演繹，保留傳統風味的同時，也加入創新的元素。
              </div>

              <img
                src="/images/restaurant/dish3.jpg"
                className={styles.dishImage}
                alt="提拉米蘇"
              />

              <h3 className={styles.dishTitle}>
                托斯卡尼風情提拉米蘇：甜蜜的完美句點
              </h3>

              <div className={styles.dishDescription}>
                餐後甜點同樣令人印象深刻。這款改良版的提拉米蘇，使用托斯卡尼產區的精品咖啡豆現磨，搭配來自義���利的馬斯卡彭起司，口感較傳統提拉米蘇更為輕盈。
              </div>

              <div className={styles.dishDescription}>
                特別之處在於，主廚在製作過程中加入了些許柑橘利口酒，為經典甜點增添了一抹清新的柑橘香氣。手指餅乾的沾潤程度恰到好處，既保持著蛋糕的溼潤口感，又不會讓人覺得太過濕軟。最上層撒上的可可粉來自南美精選莊園，帶有微微的果香，為整道甜點畫下完美的句點。
              </div>

              <div className={styles.recommendationBox}>
                <div className={styles.recommendationTitle}>主廚推薦搭配</div>
                <div className={styles.recommendationText}>
                  建議可以選擇餐廳特別引進的托斯卡尼基安地紅酒，其果香與單寧的平衡，能夠完美襯托出主菜的風味。餐後甜點則可以搭配西西里島的甜酒，其中蘊含的堅果與蜂蜜香氣，為美食之旅帶來圓滿的結束。
                </div>
              </div>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.infoCard}>
                <div className={styles.infoCardTitle}>餐廳資訊</div>
                <div className={styles.infoCardContent}>
                  <div className={styles.infoItem}>
                    <img
                      src="/images/restaurant/location-icon.png"
                      className={styles.infoIcon}
                      alt="地址"
                    />
                    <div className={styles.infoTextGroup}>
                      <div className={styles.infoText}>
                        台北市北投區泉源路123號
                      </div>
                      <div className={styles.infoLink}>在 Google 地圖開啟</div>
                    </div>
                  </div>

                  <div className={styles.infoItemSimple}>
                    <img
                      src="/images/restaurant/phone-icon.png"
                      className={styles.infoIcon}
                      alt="電話"
                    />
                    <div>02-2891-2345</div>
                  </div>

                  <div className={styles.infoItemHours}>
                    <img
                      src="/images/restaurant/time-icon.png"
                      className={styles.infoIconSmall}
                      alt="營業時間"
                    />
                    <div className={styles.infoTextFull}>
                      週二至週日 11:30-21:30（最後點餐時間 20:30）
                    </div>
                  </div>
                </div>

                <div className={styles.infoSubtitle}>消費資訊</div>
                <div className={styles.infoList}>
                  <div className={styles.infoListItem}>
                    ・最低消費：每人 NT$ 500
                  </div>
                  <div className={styles.infoListItem}>・服務費：10%</div>
                  <div className={styles.infoListItem}>
                    ・可刷卡（限帶 VISA、Master、JCB）
                  </div>
                  <div className={styles.infoListItem}>・提供免費 WiFi</div>
                  <div className={styles.infoListItem}>
                    ・可預約包場（請提前一週預約）
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoCardTitle}>相關餐廳</div>
                <div className={styles.relatedRestaurants}>
                  <div className={styles.relatedItem}>
                    <img
                      src="/images/restaurant/related1.jpg"
                      className={styles.relatedImage}
                      alt="海景義式餐廳"
                    />
                    <div className={styles.relatedInfo}>
                      <div className={styles.relatedName}>海景義式餐廳</div>
                      <div className={styles.relatedLocation}>淡水區</div>
                    </div>
                  </div>

                  <div className={styles.relatedItem}>
                    <img
                      src="/images/restaurant/related2.jpg"
                      className={styles.relatedImage}
                      alt="小巷義大利麵"
                    />
                    <div className={styles.relatedInfo}>
                      <div className={styles.relatedName}>小巷義大利麵</div>
                      <div className={styles.relatedLocation}>大安區</div>
                    </div>
                  </div>

                  <div className={styles.relatedItemWide}>
                    <img
                      src="/images/restaurant/related3.jpg"
                      className={styles.relatedImage}
                      alt="米其林一星義式餐廳"
                    />
                    <div className={styles.relatedInfoWide}>
                      <div className={styles.relatedNameWide}>
                        米其林一星義式餐廳
                      </div>
                      <div className={styles.relatedLocation}>信義區</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
