import express from "express";
import db from "../utils/connect-mysql.js"; // 連接資料庫
import fs from "node:fs/promises";
import { z } from "zod";
import moment from "moment-timezone";
import upload from "../utils/upload-imgs.js";

const router = express.Router();



// 下面這個get/api， 在目前購物車當中好像沒有用到(我不太確定)
// 因為購物車查詢的都是某個會員的車。應該不太會有需要查所有會員的所有購物車內容的情況

// --- Helper Function (示意): 取得商品詳細資訊 ---
// 這個函式在 POST /api/:userId/items 裡面有用到，所以要定義它
async function getProductDetails(productId) {
  // 這裡的 SQL 查詢可以根據你的需求調整，例如是否需要檢查庫存等
  const [productRows] = await db.query(
    "SELECT id, name, price FROM food_products WHERE id = ?",
    [productId]
  );
  return productRows.length > 0 ? productRows[0] : null;
}

// --- 購物車 API 路由 ---

// ------------------------------------------------------------------------------------
// GET - 讀取指定使用者的購物車內容
// API 路徑: /cart/api/:userId (假設你在主 app.js 會用 app.use('/cart', cartRoutes))
// ------------------------------------------------------------------------------------
router.get('/api/:userId', async (req, res) => {
    try {
      const userIdString = req.params.userId;
      const userId = parseInt(userIdString, 10);

      if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({
          success: false,
          message: '使用者 ID 請給個正常的正整數啦～ 🙏 (小提示：數字喔！)',
        });
      }

      const [cartProductRows] = await db.query(
        `SELECT
          c.cart_id AS cart_item_id,   -- 購物車項目本身的 ID (假設 carts 表主鍵是 id)
          u.user_id,
          p.id AS product_id,
          p.name AS product_name,
          p.price AS product_price,
          p.image_url AS product_image_url, -- 假設 food_products 表有 image_url
          c.quantity
        FROM carts c
        JOIN users u ON c.user_id = u.user_id
        JOIN food_products p ON c.product_id = p.id
        WHERE u.user_id = ?
        ORDER BY c.added_time DESC;`, // 假設 carts 表有 added_time 用來排序
        [userId]
      );

      if (!cartProductRows.length) {
        return res.json([]); // 購物車是空的，回傳空陣列，前端好處理！
      }

      const cartItems = cartProductRows.map(item => ({
        cartItemId: item.cart_item_id,
        productId: item.product_id,
        name: item.product_name,
        price: parseFloat(item.product_price) || 0, // 轉成數字，並給預設值
        imageUrl: item.product_image_url || '/images/default_product.png', // 預設圖片
        quantity: item.quantity,
      }));
      res.json(cartItems); // 回傳購物車商品陣列

    } catch (error) {
      console.error(`🔴 撈取使用者 ${req.params.userId} 購物車資料時發生錯誤：`, error);
      res.status(500).json({
        success: false,
        error: '糟糕！我們的購物車系統好像睡著了，叫不醒～😴',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

// ------------------------------------------------------------------------------------
// GET - API 基本路徑提醒 (如果使用者直接訪問 /cart/api)
// API 路徑: /cart/api
// ------------------------------------------------------------------------------------
router.get('/api', async (req, res) => {
  console.log("ℹ️ 有人直接訪問了 /cart/api (沒有指定 userId)，給予提示。");
  res.status(400).json({
    success: false,
    message: '哈囉～這裡是購物車 API 的家🏠！想看購物車請在網址後面加上 /你的使用者ID 喔！',
    exampleToGetCart: '/cart/api/123 (把123換成真正的使用者ID)',
    exampleToAddItem: 'POST /cart/api/123/items (並在 request body 提供 productId 和 quantity)',
  });
});

// ------------------------------------------------------------------------------------
// POST - 新增商品到指定使用者的購物車
// API 路徑: /cart/api/:userId/items
// ------------------------------------------------------------------------------------
router.post('/api/:userId/items', async (req, res) => {
    try {
      const userIdString = req.params.userId;
      const userId = parseInt(userIdString, 10);
      const { productId, quantity } = req.body; // 從 request body 獲取 productId 和 quantity

      // --- 基本輸入驗證 ---
      if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ success: false, message: '使用者 ID 請給個正常的正整數啦～ 🙏' });
      }
      if (!productId || isNaN(parseInt(productId, 10)) || parseInt(productId, 10) <= 0) {
        return res.status(400).json({ success: false, message: '商品 ID (productId) 要給喔，而且要是正整數！😉' });
      }
      const validProductId = parseInt(productId, 10);
      if (!quantity || isNaN(parseInt(quantity, 10)) || parseInt(quantity, 10) <= 0) {
        return res.status(400).json({ success: false, message: '數量 (quantity) 至少要1個啦，不然是要買幽靈商品喔～👻' });
      }
      const validQuantity = parseInt(quantity, 10);

      // --- 檢查商品是否存在 (使用 helper function) ---
      const product = await getProductDetails(validProductId);
      if (!product) {
        return res.status(404).json({ success: false, message: `商品編號 ${validProductId} 好像在宇宙中迷路了，找不到捏～🚀` });
      }

      // --- 檢查購物車是否已存在此商品，若有則更新數量，若無則新增 ---
      const [existingItemRows] = await db.query(
        "SELECT id, quantity FROM carts WHERE user_id = ? AND product_id = ?",
        [userId, validProductId]
      );

      let cartItemId;
      let successMessage;

      if (existingItemRows.length > 0) {
        // 商品已在購物車中，更新其數量 (疊加)
        const existingItem = existingItemRows[0];
        const newQuantity = existingItem.quantity + validQuantity;
        await db.query(
          "UPDATE carts SET quantity = ?, expiration_time = NOW() WHERE id = ?", // 假設 carts 表有 expiration_time
          [newQuantity, existingItem.id]
        );
        cartItemId = existingItem.id;
        successMessage = `太棒了！購物車裡的【${product.name}】數量已更新為 ${newQuantity} 個！🛒💨 買買買！`;
        console.log(`ℹ️ 使用者 ${userId}: 更新購物車商品 ${validProductId} 數量 -> ${newQuantity}`);
      } else {
        // 商品不在購物車中，新增一筆新的項目
        const [result] = await db.query(
          "INSERT INTO carts (user_id, product_id, quantity, added_time, expiration_time) VALUES (?, ?, ?, NOW(), NOW())", // 假設 carts 表有 added_time, expiration_time
          [userId, validProductId, validQuantity]
        );
        cartItemId = result.insertId; // 取得新增項目的 ID
        successMessage = `灑花！【${product.name}】已成功加入你的購物車！🎉 準備好剁手了嗎？`;
        console.log(`ℹ️ 使用者 ${userId}: 新增商品 ${validProductId} (數量 ${validQuantity}) 到購物車，新項目ID ${cartItemId}`);
      }

      // 實際應用中，這裡可能還需要處理庫存扣減等邏輯

      res.status(201).json({ success: true, message: successMessage, cartItemId });

    } catch (error) {
      console.error(`🔴 新增商品到購物車 (使用者 ${req.params.userId}) 時發生錯誤：`, error);
      res.status(500).json({
        success: false,
        error: '哎呀！我們的購物車加載系統好像卡住了，商品放不進去～😫',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

// ------------------------------------------------------------------------------------
// PUT - 更新購物車中特定商品的數量
// API 路徑: /cart/api/items/:cartItemId
// ------------------------------------------------------------------------------------
router.put('/api/items/:cartItemId', async (req, res) => {
    try {
      const cartItemIdString = req.params.cartItemId;
      const cartItemId = parseInt(cartItemIdString, 10);
      const { quantity } = req.body; // 從 request body 獲取新的 quantity

      // --- 基本輸入驗證 ---
      if (isNaN(cartItemId) || cartItemId <= 0) {
        return res.status(400).json({ success: false, message: '購物車項目 ID (cartItemId) 請給個正常的正整數啦～ 🙏' });
      }
      if (!quantity || isNaN(parseInt(quantity, 10)) || parseInt(quantity, 10) <= 0) {
        // 如果允許數量為0來刪除項目，這裡邏輯要調整，但通常建議用 DELETE API
        return res.status(400).json({ success: false, message: '新的數量 (quantity) 至少要1個啦，不然是要讓它憑空消失嗎～👻' });
      }
      const newQuantity = parseInt(quantity, 10);

      // --- 檢查購物車項目是否存在，並取得商品名稱方便回傳訊息 ---
      const [cartItemRows] = await db.query(
        "SELECT c.cart_id, p.name AS product_name FROM carts c JOIN food_products p ON c.product_id = p.id WHERE c.cart_id = ?",
        [cartItemId]
      );
      if (cartItemRows.length === 0) {
        return res.status(404).json({ success: false, message: `購物車項目 ${cartItemId} 好像去火星旅遊了，找不到它～🚀` });
      }
      const cartItem = cartItemRows[0];

      // --- 更新購物車項目的數量 ---
      const [result] = await db.query(
        "UPDATE carts SET quantity = ?, expiration_time = NOW() WHERE cart_id = ?",
        [newQuantity, cartItemId]
      );

      if (result.affectedRows === 0) {
        // 理論上前面已檢查過 item 存在，此處應不會發生，但多一層防護總是好的
        return res.status(404).json({ success: false, message: `購物車項目 ${cartItemId} 更新失敗，是不是在你眨眼的時候它不見了？🤔` });
      }

      console.log(`ℹ️ 購物車項目 ${cartItemId} (${cartItem.product_name}) 數量已更新為 ${newQuantity}`);
      res.json({ success: true, message: `叮咚！購物車裡的【${cartItem.product_name}】數量已更新為 ${newQuantity} 個！✨ 太神啦！` });

    } catch (error) {
      console.error(`🔴 更新購物車項目 ${req.params.cartItemId} 時發生錯誤：`, error);
      res.status(500).json({
        success: false,
        error: '糟糕！購物車的數量調整器好像秀逗了～🧙‍♂️',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

// ------------------------------------------------------------------------------------
// DELETE - 從購物車移除特定商品
// API 路徑: /cart/api/items/:cartItemId
// ------------------------------------------------------------------------------------
router.delete('/api/items/:cartItemId', async (req, res) => {
    try {
      const cartItemIdString = req.params.cartItemId;
      const cartItemId = parseInt(cartItemIdString, 10);

      console.log(`[後端 DELETE] 收到刪除請求，準備刪除購物車項目 ID: ${cartItemId} (原始 params: ${cartItemIdString})`);

      // --- 基本輸入驗證 ---
      if (isNaN(cartItemId) || cartItemId <= 0) {
        console.warn(`[後端 DELETE] 無效的 cartItemId: ${cartItemIdString}`);
        return res.status(400).json({ success: false, message: '購物車項目 ID (cartItemId) 請給個正常的正整數啦～ 🙏' });
      }

      // 執行刪除操作
      const [result] = await db.query(
        "DELETE FROM carts WHERE cart_id=? ", 
        [cartItemId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: `購物車項目 ${cartItemId} 本來就不在購物車裡呀，是要刪除心酸的嗎？🤷‍♀️ (可能已經被刪掉了喔)` });
      }

      console.log(`ℹ️ 購物車項目 ${cartItemId} 已被成功移除。`);
      res.json({ success: true, message: `購物車項目 ${cartItemId} 已被丟到黑洞裡，掰掰～👋` });

    } catch (error) {
      console.error(`🔴 刪除購物車項目 ${req.params.cartItemId} 時發生錯誤：`, error);
      res.status(500).json({
        success: false,
        error: '糟糕！購物車的「斷捨離」小幫手今天請假了～🧹',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

// ------------------------------------------------------------------------------------
// DELETE - 清空指定使用者的整個購物車 (可選功能)
// API 路徑: /cart/api/:userId/clear
// ------------------------------------------------------------------------------------
router.delete('/api/:userId/clear', async (req, res) => {
    try {
        const userIdString = req.params.userId;
        const userId = parseInt(userIdString, 10);

        if (isNaN(userId) || userId <= 0) {
            return res.status(400).json({ success: false, message: '使用者 ID 請給個正常的正整數啦～ 🙏' });
        }

        // 執行清空購物車操作
        const [result] = await db.query(
            "DELETE FROM carts WHERE user_id = ?",
            [userId]
        );

        if (result.affectedRows === 0) {
            console.log(`ℹ️ 使用者 ${userId} 的購物車本來就是空的，無須清空。`);
            return res.json({ success: true, message: `使用者 ${userId} 的購物車本來就比我的臉還乾淨！✨`, itemsCleared: 0 });
        }

        console.log(`ℹ️ 使用者 ${userId} 的購物車已被一鍵淨空！ ${result.affectedRows} 個項目被移除。`);
        res.json({ success: true, message: `使用者 ${userId} 的購物車已成功清空！你的錢包君給你一個讚～👍`, itemsCleared: result.affectedRows });

    } catch (error) {
        console.error(`🔴 清空使用者 ${req.params.userId} 購物車時發生錯誤：`, error);
        res.status(500).json({
            success: false,
            error: '糟糕！購物車的「一鍵清空」按鈕好像被小怪獸吃掉了～👾',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

export default router;