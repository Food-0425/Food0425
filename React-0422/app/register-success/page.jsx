// register-success/page.jsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles/RegisterSuccess.module.scss'
export default function RegisterSuccessPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo/logo-onlyFont-02.svg"
            alt="Logo"
            width={45}
            height={68}
            style={{ width: 'auto', height: '100%' }}
            priority
          />
        </div>
        <h1 className={styles.title}>會員註冊</h1>
        <p className={styles.message}>您已成功完成註冊！現在可以進行登入</p>
        <Link href="/login" legacyBehavior>
          <a className={styles.linkButton}>前往登入</a>
        </Link>
      </div>
    </div>
  )
}
