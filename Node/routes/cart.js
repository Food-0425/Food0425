import express from "express";
import db from "../utils/connect-mysql.js"; // 連接資料庫
import fs from "node:fs/promises";
import { z } from "zod";
import moment from "moment-timezone";
import upload from "../utils/upload-imgs.js";

const router = express.Router();



// 下面這個get/api， 在目前購物車當中好像沒有用到(我不太確定)
// 因為購物車查詢的都是某個會員的車。應該不太會有需要查所有會員的所有購物車內容的情況
router.get('/api', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
    //   這邊的5 就是指一頁幾筆
      const limit = parseInt(req.query.limit) || 5
      const offset = (page - 1) * limit
  
      // 取得總筆數
      const [countResult] = await db.query('SELECT COUNT(*) AS total FROM restaurants')
      const totalItems = countResult[0].total
      const totalPages = Math.ceil(totalItems / limit)
  
      // 取得分頁資料
      const [rows] = await db.query(
        'SELECT * FROM restaurants ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [limit, offset]
      )
  
      res.json({
        success: true,
        rows,
        totalPages,
        currentPage: page,
      })
    } catch (err) {
      console.error('取得食譜列表失敗:', err)
      res.status(500).json({ success: false, error: err.message })
    }
  })
  

  

// 取得某個會員的購物車資料
router.get('/api/:id', async (req, res) => {
    try {
      const productId = req.params.id; // 使用 product_id 作為查詢條件
  
      // 查看購物車資料
      const [productReviewRows] = await db.query(
        `SELECT
  u.user_id,
  u.username,
  u.full_name,
  p.id AS product_id,
  p.name AS product_name,
  c.quantity
FROM carts c
JOIN users u ON c.user_id = u.user_id
JOIN food_products p ON c.product_id = p.id
WHERE u.user_id = ?;`,
        [productId]
      );
  
      if (!productReviewRows.length) {
        return res.status(404).json({ success: false, error: "找不到產品評論" });
      }
  
      res.json({ success: true, data: productReviewRows });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });





// 新增食譜
router.post('/api',async(req,res)=>{
    const { title, description, cook_time, servings, user_id } = req.body;

    try{
        const [result] = await db.query('INSERT INTO recipes SET ?', [title, description, cook_time, servings, user_id]);
        res.json({ success: true, insertedId: result.insertId });
    }catch(error){
        res.status(500).json({ success: false, error:error.message });
    }
});

// 更新食譜
router.put('/api/:id',async(req,res)=>{
    const { title, description, cook_time, servings, user_id } = req.body;

    try{
        const [result] = await db.query('UPDATE recipes SET title=?, description=?, cook_time=?, servings=?, user_id=?, updated_at=NOW() WHERE id=?', [{ title, description, cook_time, servings, user_id }, req.params.id]);
        res.json({ success: !!result.affectedRows });
    }catch(error){
        res.status(500).json({ success: false, error:error.message });
    }
});

//刪除食譜
router.delete('/api/:id',async(req,res)=>{
    try{
        const [result] = await db.query('DELETE FROM recipes WHERE id=?', [req.params.id]);
        res.json({ success: !!result.affectedRows });
    }catch(error){
        res.status(500).json({ success: false, error:error.message });
    }
});

export default router;