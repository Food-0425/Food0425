'use client'

import React from 'react'
import styles from '../styles/member-center.module.scss'
import useSWR from 'swr'
import { useParams } from 'next/navigation'

const ProfileContent = () => {
  const params = useParams()
  const id = params.id

  const fetcher = (url) => fetch(url).then((res) => res.json())

  const { data, error } = useSWR(
    id ? `http://localhost:3001/users/api/${id}` : null,
    fetcher
  )

  const isLoading = !data && !error
  const user = data?.rows || {}

  const profileFields = [
    { label: '電子信箱', value: user.email },
    { label: '手機號碼', value: user.phone_number },
    { label: '姓名', value: user.full_name },
    { label: '使用者名稱', value: user.username },
    { label: '生日', value: user.birthday },
    { label: '性別', value: user.gender },
    { label: '地址', value: user.address },
  ]

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.userPhoto}>
          <img
            src={
              user.avatar ||
              'https://cdn.builder.io/api/v1/image/assets/TEMP/f52afbad8d5e8417cf84bbdcbf5840a0d135146c?placeholderIfAbsent=true&apiKey=137a18afd6bf49c9985266999785670f'
            }
            alt="User profile"
          />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.profileText}>
            <div className={styles.username}>{user.username}</div>
            <div className={styles.email}>{user.email}</div>
          </div>
          <div className={styles.profileButtons}>
            <button className={styles.editButton}>修改頭貼</button>
            <button className={styles.editButton}>編輯會員資料</button>
          </div>
        </div>
      </div>

      <div className={styles.profileDetails}>
        {profileFields.map((field, index) => (
          <div key={index} className={styles.detailRow}>
            <div className={styles.detailTitle}>{field.label}</div>
            <div className={styles.detailContent}>{field.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileContent
