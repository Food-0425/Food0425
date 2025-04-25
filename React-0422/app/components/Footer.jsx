"use client";

import React from "react";
import styles from "../styles/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.leftSection}>
          <div className={styles.thankYouMessage}>
            謝謝您來逛逛我們的網站！有您的瀏覽，我們超開心 🎉
          </div>
          <div className={styles.formFeedback}>
            <div className={styles.feedbackText}>
              如果您願意也歡迎留下回饋，讓我們變得更棒、更貼近您的期待！
            </div>
            <div className={styles.feedbackInput}>
              請留下您寶貴的意見，讓我們變得更好唷~
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <Link href="/faq">
            <div className={styles.faqButton}>常見問題</div>
          </Link>
          <div className={styles.socialIcons}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1303a9c4f4e168d34a190c3fed2394af12d9a5c?placeholderIfAbsent=true"
              className={styles.socialIcon}
              alt="Social Icon"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6648ede77003ae902fcf0697d1af44913a4967c?placeholderIfAbsent=true"
              className={styles.socialIcon}
              alt="Social Icon"
            />
            <div className={styles.socialIconPlaceholder}>
              <div className={styles.placeholderCircle}></div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfcb2553e6b1bbf5f7f910da2ea04c0bbd6858e2?placeholderIfAbsent=true"
              className={styles.socialIcon}
              alt="Social Icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
