'use client'
// 這個頁面是拿來做動態路由的測試用的

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './../../styles/RecipeList.module.css'
import RecipeCard from '../../components/RecipeCard'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

// 顯示一頁幾筆
const RECIPES_PER_PAGE = 15

export default function DetailPage(props) {
  //   這邊很重要，在Next要獲取動態參數的話需要用以下這兩行
  const params = useParams() // 使用 useParams 獲取路由參數
  const id = params.id // 獲取動態路由參數
  const fetcher = (url) => fetch(url).then((res) => res.json())

  // 使用 useSWR 來抓取資料，確保有 id 時才發送請求
  const { data, error } = useSWR(
    id ? `http://localhost:3001/recipes/api/${id}` : null,
    fetcher
  )

  // 判斷是否正在加載資料
  const isLoading = !data && !error

  // 連到後端(商品)
  // const { data, isLoading, error } = useSWR(
  //   `http://localhost:3001/prouduct/api?page=${currentPage}&limit=${RECIPES_PER_PAGE}`,
  //   fetcher
  // )

  // 連到後端(商品評價)
  // const { data, isLoading, error } = useSWR(
  //   `http://localhost:3001/prouduct-review/api?page=${currentPage}&limit=${RECIPES_PER_PAGE}`,
  //   fetcher
  // )

  // 使用 useSWR 來抓取資料
  //   const { data, error } = useSWR(
  //     id ? `http://localhost:3001/recipes/api/${id}` : null,
  //     fetcher
  //   )

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages)
    }
  }, [data])

  const prouduct = data?.data || []

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />

      <h2>這是我的測試室</h2>
      {/* 下面這行JSON是拿來初步確認是否有拿到後端資料用的 */}
      {isLoading ? (
        <div className={styles.loading}>載入中...</div>
      ) : error ? (
        <div className={styles.error}>載入失敗: {error.message}</div>
      ) : (
        <>
          {/* 顯示資料 */}
          <div>
            {/* {JSON.stringify(prouduct)} */}
            <br />
            <br />
            {/* {JSON.stringify(data)} */}
            {/* {console.log(prouduct)} */}
          </div>

          <div className={styles.recipeSection}>
            <div className={styles.recipeGrid}>
              <h1>{prouduct.title}</h1>
              <p>{prouduct.description}</p>
              <p>
                <strong>烹調時間:</strong> {prouduct.cook_time} minutes
              </p>
              <p>
                <strong>份量:</strong> {prouduct.servings}
              </p>
              {/* <p>
                <strong>Status:</strong> {prouduct.status}
              </p> */}

              <li>
                步驟:
                <ol>
                  {prouduct.steps &&
                    prouduct.steps.map((step) => (
                      <li key={step.step_id}>{step.description}</li>
                    ))}
                </ol>
              </li>
            </div>
          </div>
        </>
      )}
    </>
  )
}
