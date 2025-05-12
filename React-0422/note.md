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

