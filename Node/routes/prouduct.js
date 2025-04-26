import express from "express";
import db from "../utils/connect-mysql.js"; // 連接資料庫
import fs from "node:fs/promises";
import { z } from "zod";
import moment from "moment-timezone";
import upload from "../utils/upload-imgs.js";

const router = express.Router();

// 取得所有商品（但會依照分頁來分別顯示不同的資料)
router.get('/api', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
    //   這邊的15 就是指一頁幾筆
      const limit = parseInt(req.query.limit) || 15
      const offset = (page - 1) * limit
  
      // 取得總筆數
      const [countResult] = await db.query('SELECT COUNT(*) AS total FROM food_products')
      const totalItems = countResult[0].total
      const totalPages = Math.ceil(totalItems / limit)
  
      // 取得分頁資料
      const [rows] = await db.query(
        'SELECT * FROM food_products ORDER BY id DESC LIMIT ? OFFSET ?',
        [limit, offset]
      )
  
      res.json({
        success: true,
        rows,
        totalPages,
        currentPage: page,
      })
    } catch (err) {
      console.error('取得商品列表失敗:', err)
      res.status(500).json({ success: false, error: err.message })
    }
  })

  export default router