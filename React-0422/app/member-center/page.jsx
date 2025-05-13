'use client'

import React from 'react'
import styles from './styles/member-center.module.scss'
import Sidebar from './components/Sidebar'
import ProfileContent from './components/ProfileContent'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'

export default function MemberCenter() {
  const { isAuth } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [isAuth, router])

  if (!isAuth) {
    return <div>Loading...</div>
  }

  // isAuth 為 true 時
  return (
    <>
      <div className={styles.pageContent}>
        <Sidebar />
        <ProfileContent />
      </div>
    </>
  )
}
