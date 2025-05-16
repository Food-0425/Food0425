'use client'

import { useState } from 'react'
import styles from '../styles/password-content.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

const PasswordContent = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/
    return regex.test(password)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear errors when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let hasErrors = false
    const newErrors = {}

    // Validate current password
    if (!formData.currentPassword) {
      newErrors.currentPassword = '請輸入目前的密碼'
      hasErrors = true
    }

    // Validate new password
    if (!formData.newPassword) {
      newErrors.newPassword = '請輸入新密碼'
      hasErrors = true
    } else if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = '密碼格式不符合要求'
      hasErrors = true
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '請再次輸入新密碼'
      hasErrors = true
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = '兩次輸入的密碼不相符'
      hasErrors = true
    }

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    try {
      // TODO: Implement actual password change API call
      // const response = await changePassword(formData)
      toast.success('密碼修改成功！')
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      toast.error('密碼修改失敗，請稍後再試')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.requiredText}>「*」為必填欄位</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formInput}>
            <label className={styles.label}>輸入目前的密碼 *</label>
            <div
              className={`${styles.inputWrapper} ${errors.currentPassword ? styles.error : ''}`}
            >
              <input
                type={showPasswords.currentPassword ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={styles.input}
                placeholder="請輸入目前的密碼"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => togglePasswordVisibility('currentPassword')}
              >
                <FontAwesomeIcon
                  icon={showPasswords.currentPassword ? faEye : faEyeSlash}
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            {errors.currentPassword && (
              <div className={styles.errorMessage}>
                {errors.currentPassword}
              </div>
            )}
          </div>

          <div className={styles.formInput}>
            <label className={styles.label}>輸入新的密碼 *</label>
            <div
              className={`${styles.inputWrapper} ${errors.newPassword ? styles.error : ''}`}
            >
              <input
                type={showPasswords.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={styles.input}
                placeholder="長度8-20碼，需包含大寫、小寫英文字母及數字"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => togglePasswordVisibility('newPassword')}
              >
                <FontAwesomeIcon
                  icon={showPasswords.newPassword ? faEye : faEyeSlash}
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            {errors.newPassword && (
              <div className={styles.errorMessage}>{errors.newPassword}</div>
            )}
          </div>

          <div className={styles.formInput}>
            <label className={styles.label}>再次輸入新的密碼 *</label>
            <div
              className={`${styles.inputWrapper} ${errors.confirmPassword ? styles.error : ''}`}
            >
              <input
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.input}
                placeholder="長度8-20碼，需包含大寫、小寫英文字母及數字"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                <FontAwesomeIcon
                  icon={showPasswords.confirmPassword ? faEye : faEyeSlash}
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <div className={styles.errorMessage}>
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            確認修改
          </button>
        </form>
      </div>
    </div>
  )
}

// 確保正確導出組件
export default PasswordContent
