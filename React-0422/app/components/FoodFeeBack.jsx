'use client'

import React, { useState } from 'react'

const styles = {
  title: {
    color: '#423C3A',
    fontSize: 48,
    fontFamily: 'Noto Sans TC',
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  subtitle: {
    color: '#423C3A',
    fontSize: 20,
    fontFamily: 'Noto Sans TC',
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  placeholder: {
    color: '#C7C7C7',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '400',
    letterSpacing: 0.6,
    wordWrap: 'break-word',
  },
  buttonText: {
    color: '#FAF8F9',
    fontSize: 36,
    fontFamily: 'Noto Sans TC',
    fontWeight: '700',
    wordWrap: 'break-word',
  },
}

export default function FoodFeeBack() {
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() === '' || comment.trim() === '') {
      alert('請填寫完整的標題和評論！')
      return
    }
    console.log('提交的資料:', { title, comment })
    alert('感謝您的評論！')
    setTitle('')
    setComment('')
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // 改為 minHeight
        backgroundColor: '#F5F5F5',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 800,
          paddingTop: 35,
          paddingBottom: 50,
          background: 'white',
          boxShadow: '2px 3px 8px rgba(0, 0, 0, 0.25)',
          borderRadius: 30,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 22,
          display: 'inline-flex',
        }}
      >
        <div style={styles.title}>撰寫評論</div>
        <div
          style={{
            alignSelf: 'stretch',
            paddingBottom: 20,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 30,
            display: 'flex',
          }}
        >
          <div
            style={{
              alignSelf: 'stretch',
              paddingTop: 20,
              paddingLeft: 40,
              paddingRight: 40,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 15,
              display: 'flex',
            }}
          >
            <div style={styles.subtitle}>標題</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="標題請於20字內唷！"
              maxLength={20}
              style={{
                alignSelf: 'stretch',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 17,
                background: '#FAF8F9',
                borderRadius: 15,
                outline: '2px #ECECEC solid',
                outlineOffset: '-2px',
                fontSize: 16,
                fontFamily: 'Inter',
              }}
            />
          </div>
          <div
            style={{
              alignSelf: 'stretch',
              paddingLeft: 40,
              paddingRight: 40,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 15,
              display: 'flex',
            }}
          >
            <div style={styles.subtitle}>評論</div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="嘿~和大家說說您的感想吧~"
              style={{
                alignSelf: 'stretch',
                height: 113,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 17,
                background: '#FAF8F9',
                borderRadius: 15,
                outline: '2px #ECECEC solid',
                outlineOffset: '-2px',
                fontSize: 16,
                fontFamily: 'Inter',
                resize: 'none',
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          style={{
            paddingLeft: 60,
            paddingRight: 60,
            paddingTop: 25,
            paddingBottom: 25,
            background: '#DF6C2D',
            boxShadow: '0px 0px 0px 15px rgba(0, 0, 0, 0.05)',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'inline-flex',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div style={styles.buttonText}>送出</div>
        </button>
      </form>
    </div>
  )
}
