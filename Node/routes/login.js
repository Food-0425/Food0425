import express from "express";
import db from "../utils/connect-mysql.js"; // 連接資料庫

const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/api/login", async (req, res) => {
  const output = {
    success: false,
    error: "",
    data: null,
  };

  const { email, password } = req.body;

  if (!email || !password) {
    output.error = "請輸入帳號和密碼";
    return res.json(output);
  }

  try {
    // 查詢使用者
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(sql, [email]);

    if (!rows.length) {
      output.error = "帳號或密碼錯誤";
      return res.json(output);
    }

    // 驗證密碼
    const match = await bcrypt.compare(password, rows[0].password);

    if (!match) {
      output.error = "帳號或密碼錯誤";
      return res.json(output);
    }

    // 登入成功
    output.success = true;
    output.data = {
      id: rows[0].id,
      email: rows[0].email,
      name: rows[0].name,
    };

    // 設定 session
    req.session.user = output.data;

    res.json(output);
  } catch (error) {
    output.error = "登入失敗，請稍後再試";
    res.json(output);
  }
});

export default router;