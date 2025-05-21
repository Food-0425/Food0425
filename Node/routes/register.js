// Node/routes/register.js
import express from "express";
import db from "../utils/connect-mysql.js";
import bcrypt from "bcrypt";
import { z } from "zod";

const router = express.Router();

// 使用 Zod 來驗證輸入資料
const registerSchema = z
  .object({
    username: z.string().min(3, { message: "使用者名稱至少需要 3 個字元" }),
    email: z.string().email({ message: "無效的 Email 格式" }),
    password: z
      .string()
      .min(8, { message: "密碼至少需要 8 個字元" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: "密碼需包含大小寫英文字母及數字",
      }),
    confirmPassword: z.string(),
    full_name: z.string().optional(),
    phone_number: z
      .string()
      .regex(/^09\d{8}$/, { message: "無效的手機號碼格式" })
      .optional()
      .or(z.literal("")),
    birthday: z.string().date({ message: "無效的生日格式" }).optional().or(z.literal("")),
    gender: z.string().optional(),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密碼與確認密碼不相符",
    path: ["confirmPassword"], // 指向錯誤的欄位
  });

router.post("/api", async (req, res) => {
  const validationResult = registerSchema.safeParse(req.body);

  if (!validationResult.success) {
    // 如果驗證失敗，回傳錯誤訊息
    return res.status(400).json({
      success: false,
      error: "輸入資料驗證失敗",
      errors: validationResult.error.flatten().fieldErrors,
    });
  }

  const { username, email, password, full_name, phone_number, birthday, gender, address } =
    validationResult.data;

  try {
    // 檢查 Email 是否已經存在
    const emailCheckSql = "SELECT user_id FROM users WHERE email = ?";
    const [emailRows] = await db.query(emailCheckSql, [email]);
    if (emailRows.length > 0) {
      return res.status(409).json({ success: false, error: "此 Email 已經註冊過了" });
    }

    // 檢查 Username 是否已經存在
    const usernameCheckSql = "SELECT user_id FROM users WHERE username = ?";
    const [usernameRows] = await db.query(usernameCheckSql, [username]);
    if (usernameRows.length > 0) {
      return res.status(409).json({ success: false, error: "此使用者名稱已經被使用" });
    }

    // 密碼加密
    const password_hash = await bcrypt.hash(password, 10);

    // 準備要插入資料庫的資料
    const newUser = {
      username,
      email,
      password_hash,
      full_name: full_name || null, // 如果沒有提供，設為 null
      phone_number: phone_number || null,
      birthday: birthday || null,
      gender: gender || null,
      address: address || null,
    };

    // 插入資料到資料庫
    const insertSql = "INSERT INTO users SET ?";
    const [result] = await db.query(insertSql, newUser);

    if (result.insertId) {
      res.status(201).json({ success: true, message: "會員註冊成功", userId: result.insertId });
    } else {
      res.status(500).json({ success: false, error: "註冊失敗，請稍後再試" });
    }
  } catch (error) {
    console.error("註冊 API 錯誤:", error);
    res.status(500).json({ success: false, error: "伺服器內部錯誤" });
  }
});

export default router;
