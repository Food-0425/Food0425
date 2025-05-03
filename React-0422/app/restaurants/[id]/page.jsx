"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "../../styles/RestaurantDetail.module.css";

// Mock data for restaurant details
const getRestaurantData = (id) => {
  // In a real application, you would fetch this data from an API
  return {
    id,
    title: "隱身巷弄的美味秘境：山丘上的義式餐廳",
    author: "美食編輯",
    publishDate: "2024.01.15",
    heroImage: "/images/restaurant/hero-image.jpg",
    description: "位於台北市郊的「山丘上的義式餐廳」，是一間充滿浪漫氛圍的義式料理餐廳。餐廳由米其林星級主廚 Marco 主理，將傳統義大利美食與在地食材完美結合，為饕客們帶來獨特的美食體驗。",
    dishes: [
      {
        title: "經典手工義大利麵：海洋的饗宴",
        image: "/images/restaurant/dish1.jpg",
        description: "還記得第一次造訪這家餐廳時，Marco 主廚特別向我推薦這道手工義大利麵。「這是我們最引以為傲的料理，」他說，眼神中透露著自信。當餐點端上桌時，光是視覺就令人驚艷：金黃色的手工麵條完美捲曲，點綴著粉紅色的鮮蝦、黑色的淡菜，以及白玉般的花蛤，最上層撒上新鮮的義大利香料，光是香氣就讓人食指大動。"
      },
      {
        title: "48小時慢熟小牛膝：經典重現",
        image: "/images/restaurant/dish2.jpg",
        description: "這道料理可說是餐廳的鎮店之寶，採用特選小牛膝，經過長達48小時的低溫慢熟，讓肉質達��極致的柔嫩。端上桌時，光是輕輕用叉子碰觸，肉質就輕易地分離，散發出迷人的香氣。"
      },
      {
        title: "托斯卡尼風情提拉米蘇：甜蜜的完美句點",
        image: "/images/restaurant/dish3.jpg",
        description: "餐後甜點同樣令人印象深刻。這款改良版的提拉米蘇，使用托斯卡尼產區的精品咖啡豆現磨，搭配來自義大利的馬斯卡彭起司，口感較傳統提拉米蘇更為輕盈。"
      }
    ],
    info: {
      address: "台北市北投區泉源路123號",
      phone: "02-2891-2345",
      hours: "週二至週日 11:30-21:30（最後點餐時間 20:30）",
      consumption: [
        "最低消費：每人 NT$ 500",
        "服務費：10%",
        "可刷卡（限帶 VISA、Master、JCB）",
        "提供免費 WiFi",
        "可預約包場（請提前一週預約）"
      ]
    },
    relatedRestaurants: [
      {
        name: "海景義式餐廳",
        location: "淡水區",
        image: "/images/restaurant/related1.jpg"
      },
      {
        name: "小巷義大利麵",
        location: "大安區",
        image: "/images/restaurant/related2.jpg"
      },
      {
        name: "米其林一星義式餐廳",
        location: "信義區",
        image: "/images/restaurant/related3.jpg"
      }
    ]
  };
};

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = params.id;
  const restaurant = getRestaurantData(id);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbNav}>
            <div>美食推薦</div>
            <div>/</div>
            <Link href="/restaurants">餐廳列表</Link>
            <div>/</div>
            <div>餐廳介紹</div>
          </div>
          <div className={styles.mainContent}>
            <h1 className={styles.restaurantTitle}>
              {restaurant.title}
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
              <div className={styles.authorLabel}>{restaurant.author}</div>
              <div className={styles.publishDate}>{restaurant.publishDate}</div>
            </div>

            <div className={styles.heroImage}>
              <img
                src={restaurant.heroImage}
                className={styles.heroImg}
                alt={restaurant.title}
              />
            </div>

            <div className={styles.restaurantDescription}>
              <div className={styles.descriptionText}>
                {restaurant.description}
              </div>

              <h2 className={styles.sectionTitle}>特色料理品味之旅</h2>

              <div className={styles.quoteBox}>
                <div className={styles.quoteText}>
                  「每一道料理，都是一場味蕾的藝術饗宴。在這裡，我們不僅提供美食，更創造難忘的餐飲體驗。」
                </div>
                <div className={styles.quoteAuthor}>— Marco Rossi 主廚</div>
              </div>

              {restaurant.dishes.map((dish, index) => (
                <React.Fragment key={index}>
                  <img
                    src={dish.image}
                    className={styles.dishImage}
                    alt={dish.title}
                  />
                  <h3 className={styles.dishTitle}>{dish.title}</h3>
                  <div className={styles.dishDescription}>{dish.description}</div>
                </React.Fragment>
              ))}

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
                        {restaurant.info.address}
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
                    <div>{restaurant.info.phone}</div>
                  </div>

                  <div className={styles.infoItemHours}>
                    <img
                      src="/images/restaurant/time-icon.png"
                      className={styles.infoIconSmall}
                      alt="營業時間"
                    />
                    <div className={styles.infoTextFull}>
                      {restaurant.info.hours}
                    </div>
                  </div>
                </div>

                <div className={styles.infoSubtitle}>消費資訊</div>
                <div className={styles.infoList}>
                  {restaurant.info.consumption.map((item, index) => (
                    <div key={index} className={styles.infoListItem}>
                      ・{item}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoCardTitle}>相關餐廳</div>
                <div className={styles.relatedRestaurants}>
                  {restaurant.relatedRestaurants.map((related, index) => (
                    <div 
                      key={index} 
                      className={index === 2 ? styles.relatedItemWide : styles.relatedItem}
                    >
                      <img
                        src={related.image}
                        className={styles.relatedImage}
                        alt={related.name}
                      />
                      <div className={index === 2 ? styles.relatedInfoWide : styles.relatedInfo}>
                        <div className={index === 2 ? styles.relatedNameWide : styles.relatedName}>
                          {related.name}
                        </div>
                        <div className={styles.relatedLocation}>{related.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}