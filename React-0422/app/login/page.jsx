'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/auth-context'
import { useRouter } from 'next/navigation'
import styles from './styles/Login.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function LoginPage() {
  const { login, auth } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const success = await login(email, password)
      if (success) {
        router.push('/member-center')
      } else {
        setError('登入失敗，請檢查帳號密碼是否正確')
      }
    } catch (err) {
      setError('登入時發生錯誤，請稍後再試')
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo/logo-onlyFont-02.png"
            alt="Logo"
            width={45}
            height={68}
            priority
          />
        </div>

        <h1 className={styles.title}>會員登入</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              帳號 (電子信箱)
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

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              密碼
            </label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={styles.input}
                placeholder="*************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <Link href="/forgot-password" className={styles.forgotPassword}>
            忘記密碼
          </Link>

          <button type="submit" className={styles.loginButton}>
            登入
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>以其他帳號登入</span>
          <span className={styles.dividerLine}></span>
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.socialButton}>
            <Image
              src="/images/icons/google.svg"
              alt="Google"
              width={24}
              height={24}
            />
            <span>Google</span>
          </button>
          <button className={styles.socialButton}>
            <Image
              src="/images/icons/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
            />
            <span>Facebook</span>
          </button>
        </div>

        <div className={styles.register}>
          <span>還沒有任何帳號?</span>
          <Link href="/register" className={styles.registerLink}>
            立即註冊
          </Link>
        </div>
      </div>
    </div>
  )
}
