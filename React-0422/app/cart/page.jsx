'use client'

import React, { useState, useEffect } from 'react'
// useState 記東西的（購物車裡商品）
// useEffect 在特定時間做事
import { useAuth } from '@/hooks/auth-context' 
import './style.css' // style.css 在同一資料夾或正確路徑

export default function CartPage() {
  //箱子
  const [cartItems, setCartItems] = useState()
  //狀態指示燈
  const [loading, setLoading] = useState(true)
  //錯誤訊息
  const [error, setError] = useState(null)

  const { user, isAuth } = useAuth()
  const currentUserId = user?.id

  useEffect(() => {
    // 1.使用者有無登入
    if (isAuth && currentUserId && currentUserId !== 0) {
      // defaultUser.id 是 0，排除
      console.log(`✅ 使用者 ${currentUserId} 已登入，準備撈取購物車！`)
      setLoading(true)
      setError(null)
      // 2. 呼叫正確的 API URL (加上 currentUserId)
      fetch(`http://localhost:3001/cart/api/${currentUserId}`)
        .then((response) => {
          console.log(
            `📞 後端 API (${response.url}) 回應狀態：${response.status}`
          )
          if (!response.ok) {
            return response
              .json()
              .then((errorData) => {
                throw new Error(
                  errorData.message || `請求失敗，狀態碼：${response.status}`
                )
              })
              .catch(() => {
                throw new Error(
                  `請求失敗，狀態碼：${response.status} (且錯誤內容非JSON)`
                )
              })
          }
          return response.json()
        })
        .then((dataFromApi) => {
          // 3. dataFromApi 就是後端回傳的購物車商品陣列！
          console.log(
            `🎉 成功從後端拿到使用者 ${currentUserId} 的購物車資料：`,
            dataFromApi
          )
          setCartItems(dataFromApi) // 用 API 回傳的資料更新購物車狀態
        })
        .catch((err) => {
          // 4. 捕捉所有錯誤
          console.error('😭 撈取購物車資料時發生悲劇：', err)
          setError(err.message || '發生未知的錯誤，請稍後再試。')
          setCartItems([]) // 清空購物車
        })
        .finally(() => {
          // 5. 不管成功或失敗，最後都要做的事
          setLoading(false)
          console.log('🏁 API 請求流程結束。')
        })
    } else {
      // 如果未登入，或 currentUserId 無效
      console.log(
        '🚫 使用者未登入或 userId 無效，不執行 API 請求。 isAuth:',
        isAuth,
        'userId:',
        currentUserId
      )
      let userMessage = '請先登入才能查看您的購物車喔～😉'
      if (isAuth && (!currentUserId || currentUserId === 0)) {
        userMessage = '登入狀態好像有點怪怪的，拿不到正確的使用者ID耶～🤔'
      }
      setError(userMessage)
      setCartItems([]) // 確保購物車是空的
      setLoading(false)
    }
  }, [currentUserId, isAuth]) // 6. useEffect 的依賴：當 currentUserId 或 isAuth 改變時，重新觸發！

  // 狀態一：還在載入中...
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>
        <p>購物車努力跑跑跑... 🏃‍♀️💨 請稍等一下下！</p>
      </div>
    )
  }

  // 狀態二：發生錯誤了...
  if (error && (!cartItems || cartItems.length === 0)) {
    // 只有在購物車也沒東西時才優先顯示錯誤
    return (
      <div
        style={{
          color: 'red',
          textAlign: 'center',
          padding: '50px',
          //border: '1px solid red',
          margin: '20px',
        }}
      >
        <h2>糟糕，出狀況了！😱</h2>
        <p>{error}</p>
        <p>
          你可以試試看
          <button
            onClick={() => window.location.reload()}
            style={{ marginLeft: '5px', padding: '5px 10px' }}
          >
            重新整理
          </button>
          ，或者檢查一下登入狀態。
        </p>
      </div>
    )
  }

  // 狀態三：成功載入，但購物車是空的 (或因錯誤而清空)
  if (!cartItems || cartItems.length === 0) {
    return (
      <div>
        {/*  Header 等等 */}
        <main>
          <div
            className="container"
            style={{ textAlign: 'center', padding: '50px' }}
          >
            <h1>我的購物清單</h1>
            <p style={{ fontSize: '1.2em', color: '#555' }}>
              你的購物車目前空空如也～ 🛒
            </p>
            <p>快去把心愛的商品加進來吧！Let's Go Shopping! 🛍️</p>
            {error && (
              <p style={{ color: 'orange', marginTop: '10px' }}>
                提示：{error}
              </p>
            )}{' '}
            {/* 如果有錯誤但還是顯示空購物車，可以把錯誤提示放在這裡 */}
          </div>
        </main>
      </div>
    )
  }

  // 四：成功載入，且購物車有商品！
  return (
    <div>
      <link rel="stylesheet" href="style.css" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css"
      />
      
      <main>
        <div className="container">
          <h1>購物清單 ({cartItems.length} 件好物！)</h1>
          {error && (
            <p style={{ color: 'orange', textAlign: 'center' }}>
              小小提示：{error}
            </p>
          )}{' '}
          {/* 如果 fetch 過程中有非致命錯誤，但還是有舊資料可以顯示，可以提示 */}
          <div className="checkout-layout">
            <div className="checkout-left">
              <section className="shopping-list">
                {/* --- 動態渲染購物車商品 --- */}
                {cartItems.map((item) => (
                  <div
                    className="cart-item"
                    key={item.cartItemId || item.productId}
                  >
                    <img
                      src={item.imageUrl || '/images/default_product.png'}
                      alt={item.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        marginRight: '15px',
                        borderRadius: '4px',
                      }}
                    />
                    <div className="item-details">
                      <p style={{ fontWeight: 'bold' }}>{item.name}</p>
                    </div>
                    <div className="item-quantity">
                      <button>-</button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        style={{
                          width: '40px',
                          textAlign: 'center',
                          margin: '0 5px',
                        }}
                      />
                      <button>+</button>
                    </div>
                    <div
                      className="item-price"
                      style={{ minWidth: '70px', textAlign: 'right' }}
                    >
                      ${item.price ? item.price.toFixed(2) : 'N/A'}
                    </div>
                  </div>
                ))}
                <div className="coupon-code">
                  <input type="text" placeholder="使用優惠券" />
                  <button>使用優惠券</button>
                </div>
              </section>
              {/* 其他的 section */}
              <section className="recipient-info">
                <h2>收件人資料</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">姓名</label>
                    <input type="text" id="name" name="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">手機號碼</label>
                    <input type="tel" id="phone" name="phone" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />
                  </div>
                  <div className="form-group address-group">
                    <label>收件地址</label>
                    <input type="text" placeholder="縣市" />
                    <input type="text" placeholder="鄉鎮市區" />
                    <input type="text" placeholder="地址" />
                  </div>
                </form>
              </section>
              <section className="order-notes">
                <h2>訂單備註</h2>
                <textarea placeholder="請輸入備註" defaultValue={''} />
              </section>
              <section className="important-notes">
                <h3>注意事項</h3>
                <ul>
                  <li>訂單成立後，將以Email通知您訂單成立。</li>
                  <li>付款完成後約1-3個工作日內出貨，如遇例假日則順延。</li>
                  <li>目前暫不提供離島寄送服務。</li>
                  <li>
                    為保障彼此之權益，收到您的訂單後仍保有決定是否接受訂單及出貨與否之權利。
                  </li>
                </ul>
              </section>
            </div>
            <aside className="checkout-right">
              <div className="order-summary">
                <h2>訂單總計</h2>
                {/* 這裡的總計金額之後也要改成動態計算 */}
                <div className="summary-item">
                  <span>小計</span>
                  <span>NT ${/* 計算 cartItems 的總金額 */}</span>
                </div>
                <div className="summary-item">
                  <span>運費</span>
                  <span>NT $0</span>
                </div>
                <hr />
                <div className="summary-item total">
                  <span>總計</span>
                  <span>NT ${/* 計算 cartItems 的總金額 */}</span>
                </div>
                <button className="btn-proceed-payment">
                  下一步 前往付款方式
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      {/* 你的 Footer 可以放回來 */}
    </div>
  )
}
