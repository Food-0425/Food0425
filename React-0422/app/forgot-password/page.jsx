'use client'

import { useState } from 'react'
import styles from './styles/ForgotPassword.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    try {
      // TODO: Implement actual password reset logic
      // For now, just simulate success
      setSuccess(true)
    } catch (err) {
      setError('發送重設密碼郵件時發生錯誤，請稍後再試')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo/logo-onlyFont-02.png"
            alt="Logo"
            width={45}
            height={68}
            priority
          />
        </div>

        <h1 className={styles.title}>忘記密碼</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              請填寫註冊時使用的電子信箱
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {success && (
            <div className={styles.success}>
              重設密碼連結已發送到您的信箱，請查收並按照指示重設密碼
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            發送
          </button>

          <Link href="/login" className={styles.backToLogin}>
            返回登入頁面
          </Link>
        </form>
      </div>
    </div>
  )
}
