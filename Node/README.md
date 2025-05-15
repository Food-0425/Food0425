# Node
## 05/15
要新增ＡＰＩ功能一方面新增在product.js一方面也要在index.js新增路徑
ex: routes/products新增;在/index.js新增路由
import productRoutes from './routes/product.js';  // 引入你剛剛的商品路由
app.use('/api/products', productRoutes);  // 掛載路由，成為 /api/products/xxxx
