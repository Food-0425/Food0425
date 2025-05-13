# Food0425

**\* 處理BUG \*\***
遇到的問題
MAC的安裝一開始要用ＨＯＭＥＢＲＥＷ去做安裝腳本語言
ＭＹＳＱＬ的安裝設定密碼時登不進去？
直接重灌而且要將檔案完全刪除乾淨，ＷＯＲＫＢＥＮＣＨ是ＭＹＳＱＬ的圖形程式，可以直接不用透過ＴＥＲＭＩＮＡＬ直接圖形化介面操作，之後匯入套件
mac的node.js套件會自動安裝最新版23.0，但會造成套件版本衝突所以要使用NVM套件控制版本降到20
使用vscode的外掛套件database可將資料庫資料表格化對應通訊阜3306,本機位置127.0.0.12的端口
apache跟homebrew是會衝突的
顯示在檔案名稱[---]中括號是動態路由－－》會去抓取資料庫的ＩＤ
prettier套件運行問題？
-->"prettier.configPath": ".prettierrc.json"以vsCodeˇˇ的setting.json根目錄運行
但此專案是以node.modules的套件也就是套件是基於node.modules的套件下去做運行
所以
-->"prettier.configPath": ".prettierrc.json"要修改成
"prettier.prettierPath": "./node_modules/prettier" 來除錯

在react裡面製作ＡＰＩ的時後不可以把const在寫變數<--不合邏輯
const app ={...`{$...}`}錯誤
Clint ----- Server ----- MYSQL 發送ＡＰＩ請求
Clint request請求(通常是使用Fetchc或或)--> Server

**05/13**
新增顯示產品列表ＡPI：
遇見問題->沒抓到資料用fetch的方式因為前後端檔案名稱不一樣'products,prouduct'一開始先檢查F12的network確定狀態是 500 or 404 前端要確定有沒有正確送出請求，後端檢查路由是否有對上名稱，而後端ＡＰＩ路由的路徑系統是‘／’為根路徑代筆index.js的路由第一層如果我寫router.get(./api)表示是/『api（第一層）』/api（第二層）所以顯示上以“/”為主

重點整理：
通常ＡＰＩ回傳跟渲染是兩回事，回傳回來的東西要去定義，所以先確認data裡面的物件
{
food:true
[
XXX
XXX -- Json格式 --
XXX -- 中括號都是包裹陣列 --
]
}
-- 大括號包裹物件 --
專案裡面得是data.row所以要去確認
map裡面的渲染要特別注意如果不想讓他特別報錯，就可以使用？這樣有問題不會直接報錯，不建議常用

-- 點擊ProductCard組件的時候，導向products/[id]動態路由進入商品詳細頁 --
－－》他直接導向一個沒有意義的頁面
