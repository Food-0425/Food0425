'use client'

import React, { useState } from 'react'
import styles from '../src/styles/page-styles/Contact.module.scss'
import {
  RiCustomerService2Fill,
  FaCartShopping,
  GrArticle,
} from '../icons/icons'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // 防止表單預設提交行為

    try {
      const response = await fetch('http://localhost:3001/contact/api', {
        method: 'POST', // 使用 POST 方法
        headers: {
          'Content-Type': 'application/json', // 設定請求的內容類型
        },
        body: JSON.stringify(formData), // 將表單資料轉換為 JSON 格式
      })

      if (response.ok) {
        alert('感謝您的留言，我們會盡快回覆！')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        alert('提交失敗，請稍後再試！')
      }
    } catch (error) {
      console.error('提交表單時發生錯誤：', error)
      alert('提交失敗，請檢查您的網路連線！')
    }
  }

  return (
    <div className={styles.pageWrapper}>
      {/* 版首 */}
      <div className={styles.imageContainer}>
        <div className={styles.heroImage}>
          <h1>CONTACT US</h1>
          <h2>聯絡我們</h2>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6450f8ecb0c2b20faf4281b53a69621902c74417?placeholderIfAbsent=true"
            className={styles.rightDecoration}
            alt="Decoration"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ea0d3474bfe8fe95aff977946a5c9bb19c35fc8?placeholderIfAbsent=true"
            className={styles.leftDecoration}
            alt="Decoration"
          />
        </div>
      </div>
      {/* 常見問題 */}
      <div className={styles.faqSection}>
        <h2>常見問題</h2>
        <p>以下是一些常見問題的分類</p>

        <div className={styles.faqRow}>
          <div className={styles.faqItem}>
            <div className={styles.faqIcon}>
              <GrArticle />
            </div>
            <div className={styles.faqContent}>
              <h3 className={styles.faqItemTitle}>食譜相關</h3>
              <p className={styles.faqItemSubtitle}>步驟詳解</p>
            </div>
            <p className={styles.faqItemDescription}>
              與食譜有關的問題與解答。
            </p>
          </div>

          <div className={styles.faqItem}>
            <div className={styles.faqIcon}>
              <FaCartShopping />
            </div>
            <div className={styles.faqContent}>
              <h3 className={styles.faqItemTitle}>商城相關</h3>
              <p className={styles.faqItemSubtitle}>買賣流程</p>
            </div>
            <p className={styles.faqItemDescription}>
              與商城有關的問題與解答。
            </p>
          </div>

          <div className={styles.faqItem}>
            <div className={styles.faqIcon}>
              <RiCustomerService2Fill />
            </div>
            <div className={styles.faqContent}>
              <h3>退換貨與客服</h3>
              <p>立即聯繫</p>
            </div>
            <p>與退換貨、聯繫客服有關的問題與解答。</p>
          </div>
        </div>
      </div>
      {/* 聯繫我們 */}
      <div className={styles.form}>
        <div className={styles.formWrapper}>
          <div className={styles.formContainer}>
            <h1>聯繫我們</h1>
            <h3>有任何疑問或建議？歡迎留言給我們！</h3>
          </div>

          <form className={styles.formFields} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>姓名</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.textField}
                  placeholder="請輸入您的姓名"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>郵件</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.textField}
                  placeholder="請輸入您的郵件"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>主旨分類</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.textField}
                  required
                >
                  <option value="">請選擇主旨類型</option>
                  <option value="recipe">食譜相關</option>
                  <option value="shop">商城相關</option>
                  <option value="return">退換貨與客服</option>
                  <option value="other">其他問題</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>留言內容</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.textField} ${styles.textArea}`}
                  placeholder="請輸入留言內容"
                  rows="5"
                  required
                ></textarea>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                送出
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
