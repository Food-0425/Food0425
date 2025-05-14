'use client'

import React from 'react'
import styles from './styles/member-center.module.scss'
import Sidebar from './components/Sidebar'
import ProfileContent from './components/ProfileContent'
import { useAuth } from '@/hooks/auth-context'
import { useRouter } from 'next/navigation'

export default function MemberCenter() {
  const { isAuth } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    // 如果沒有登入，導向到登入頁面
    // 這裡的 isAuth 是從 AuthContextProvider 中取得的
    if (!isAuth) {
      router.push('/login')
    }
  }, [isAuth, router])

  // 如果還在載入中
  if (!isAuth) {
    return <div>Loading...</div>
  }

  // 如果已經登入，顯示會員中心的內容
  return (
    <>
      <div className={styles.pageContent}>
        <Sidebar />
        <ProfileContent />
      </div>
    </>
  )
}
