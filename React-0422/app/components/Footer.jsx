'use client'

import React from 'react'
import styles from '../src/styles/Footer.module.scss'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from '../icons/icons'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.leftSection}>
          <h3>謝謝您來逛逛我們的網站！有您的瀏覽，我們超開心 🎉</h3>
          <h3>如果您願意也歡迎留下回饋，讓我們變得更棒、更貼近您的期待！</h3>
          <div className={styles.formFeedback}>
            <input
              type="text"
              className={styles.feedbackInput}
              placeholder="請留下您寶貴的意見，讓我們變得更好唷~"
            />
          </div>
        </div>
        <div className={styles.rightSection}>
          <Link href="/faq">
            <div className={styles.faqButton}>常見問題</div>
          </Link>
          <div className={styles.socialIcons}>
            <button>
              <FaFacebook />
            </button>
            <button>
              <FaInstagram />
            </button>
            <button>
              <FaXTwitter />
            </button>
            <button>
              <FaYoutube />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
