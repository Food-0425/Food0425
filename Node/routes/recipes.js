import express from "express";
import db from "../utils/connect-mysql.js"; // 連接資料庫
import fs from "node:fs/promises";
import { z } from "zod";
import moment from "moment-timezone";
import upload from "../utils/upload-imgs.js";

const router = express.Router();



// 取得所有食譜（但會依照分頁來分別顯示不同的資料)
router.get('/api', async (req, res) => {
    try {
        const querySchema = z.object({
            page: z.string().regex(/^\d+$/).optional(),
            limit: z.string().regex(/^\d+$/).optional(),
            keyword: z.string().optional(),
        });

        const queryValidation = querySchema.safeParse(req.query);
        if (!queryValidation.success) {
            return res.status(400).json({ success: false, error: "Invalid query parameters" });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const keyword = req.query.keyword?.substring(0, 50) || ''; // 限制關鍵字長度
        const offset = (page - 1) * limit;

        const keywordCondition = keyword
        // 這行就是看關鍵字有沒有符合標題 或描述  。如果只要符合標題的話，就是把OR後面的拿調
            ? `WHERE title LIKE ? OR description LIKE ?`
            : '';
        // keywordParams 是參數化查詢，防止 SQL injection（例如使用 ? 而不是直接拼字串）
        // 如果只想要搜尋Title的話，這行就改const keywordParams = keyword ? [`%${keyword}%`] : [];
        const keywordParams = keyword ? [`%${keyword}%`, `%${keyword}%`] : [];

        const [countResult] = await db.query(
            `SELECT COUNT(*) AS total FROM recipes ${keywordCondition}`,
            keywordParams
        );
        const totalItems = countResult[0]?.total || 0;
        const totalPages = Math.ceil(totalItems / limit);

        const [rows] = await db.query(
            `SELECT * FROM recipes ${keywordCondition} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
            [...keywordParams, limit, offset]
        );

        res.json({
            success: true,
            rows,
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        console.error('取得食譜列表失敗:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});
  
// 取得單一食譜
<<<<<<< HEAD
router.get('/api/:id',async(req,res)=>{
    try{
        const [rows] = await db.query('SELECT * FROM recipes WHERE id=?', [req.params.id]);
        if(!rows.length){
            return res.status(404).json({ success: false, error:"找不到食譜" });
        }
        res.json({ success: true, data:rows[0] });
    }catch(error){
        res.status(500).json({ success: false, error:error.message });
    }
});
=======
// 這邊是取得單一食譜的API，會根據食譜ID來查詢資料庫，並且將相關的步驟、食材、調味料、關聯食譜和評論一起回傳

router.get('/api/:id', async (req, res) => {
    try {
      const recipeId = req.params.id;
  
      // 查主食譜資料
      const [recipeRows] = await db.query('SELECT * FROM recipes WHERE id = ?', [recipeId]);
      if (!recipeRows.length) {
        return res.status(404).json({ success: false, error: "找不到食譜" });
      }
  
      const recipe = recipeRows[0];
  
      // 查這個食譜對應的所有步驟
      const [stepRows] = await db.query(
        'SELECT step_id, step_order, description FROM steps WHERE recipe_id = ? ORDER BY step_order ASC',
        [recipeId]
      );
  
      // 加進 recipe 裡面
      recipe.steps = stepRows;

      // 查這個食譜對應的所有食材
      const [ingredientRows] = await db.query(
        'SELECT ingredient_id, name, quantity, unit FROM ingredients WHERE recipe_id = ? ORDER BY ingredient_id ASC',
        [recipeId]
      );
  
      // 加進 recipe 裡面
      recipe.ingredients = ingredientRows;

      // 查這個食譜對應的所有調味料
      const [condimentsRows] = await db.query(
        'SELECT condiment_id, name, quantity, unit FROM condiments WHERE recipe_id = ? ORDER BY condiment_id ASC',
        [recipeId]
      )
      
      // 加進 recipe 裡面
      recipe.condiments = condimentsRows

      // 查這個食譜對應的關聯食譜
      const [relatedRecipes] = await db.query(
        `SELECT 
           rr.related_recipe_id, 
           r.title, 
           r.description,
            r.image, 
           r.created_at 
         FROM 
           related_recipes rr 
         JOIN 
           recipes r 
         ON 
           rr.related_recipe_id = r.id 
         WHERE 
           rr.recipe_id = ? 
         ORDER BY 
           rr.id ASC`,
        [recipeId]
      );
      
      // 加進 recipe 裡面
      recipe.related_recipes = relatedRecipes;

      // 查這個食譜對應的所有評論
      const [commentRows] = await db.query(

        // 'SELECT id, context, user_id, created_at FROM user_feedbacks WHERE recipes_id = ? ORDER BY id ASC',
        // 下面這段是先將用戶名稱與食譜評論JOIN再一起，接著再將這個JOIN過的評論表塞進這個食譜查詢的JSON檔
        `SELECT 
     uf.id, uf.context,uf.title, uf.user_id, uf.created_at, u.username 
   FROM user_feedbacks uf
   JOIN users u ON uf.user_id = u.user_id
   WHERE uf.recipes_id = ? 
   ORDER BY uf.id ASC`,
        [recipeId]
      );

       // 格式化 created_at，只顯示日期（YYYY-MM-DD）
      //  這邊是先將查詢出的評論commentRows裡面的created_at格式化
      // (原本是直接把commentRows加進recipe ，但現在因為要時間格式化，所以多了下面這步驟)
      //  然後再將時間格式化過的commentsWithFormattedDate加進recipe裡面
    const commentsWithFormattedDate = commentRows.map(comment => {
      comment.created_at = moment(comment.created_at).format('YYYY-MM-DD');  // 格式化日期
      return comment;
    });
  
      // 將時間格式化之後的資料加進 recipe 裡面
      recipe.comments = commentsWithFormattedDate;
  
      res.json({ success: true, data: recipe });
  
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

// 新增評論
router.post('/api/feedback', async (req, res) => {
  const { recipeId, userId, title, context,is_like } = req.body;

  // 驗證輸入
  if (!recipeId || !userId || !title || !context || !is_like) {
      return res.status(400).json({ success: false, error: "RecipeId, UserId, Title, and Context are required" });
  }

  try {
      // 插入評論到資料庫
      const [result] = await db.query(
          'INSERT INTO user_feedbacks (recipes_id, user_id, title, context, is_like, created_at) VALUES (?, ?, ?, ?, ?,NOW())',
          [recipeId, userId, title, context,is_like]
      );

      res.json({ success: true, insertedId: result.insertId });
  } catch (error) {
      console.error('新增評論失敗:', error);
      res.status(500).json({ success: false, error: error.message });
  }
});


>>>>>>> b7ddae74ea46a666d793de76ed3940f57faedb5d

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