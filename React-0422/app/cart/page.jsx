'use client'

import React, { useState, useEffect, useCallback } from 'react'
// useState 記東西的（購物車裡商品）
// useEffect 在特定時間做事
import { useAuth } from '@/hooks/auth-context'
import './style.css' // style.css 在同一資料夾或正確路徑

export default function CartPage() {
  //箱子
  const [cartItems, setCartItems] = useState([])
  //狀態指示燈
  const [loading, setLoading] = useState(true)
  //錯誤訊息
  const [error, setError] = useState(null)

  const { auth } = useAuth()
  const currentUserId = auth?.id

  // 後端api port
  const API_BASE_URL = 'http://localhost:3001'

  useEffect(() => {
    if (auth && currentUserId && currentUserId !== 0) {
      console.log(`✅ 使用者 ${currentUserId} 已登入，準備撈取購物車！`)
      setLoading(true)
      setError(null)
      fetch(`${API_BASE_URL}/cart/api/${currentUserId}`)
        .then((response) => {
          console.log(
            `📞 後端 API (${response.url}) 回應狀態：${response.status}${currentUserId}`
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
          console.log(
            `🎉 成功從後端拿到使用者 ${currentUserId} 的購物車資料：`,
            dataFromApi
          )
          setCartItems(dataFromApi)
        })
        .catch((err) => {
          console.error('😭 撈取購物車資料時發生悲劇：', err)
          setError(err.message || '發生未知的錯誤，請稍後再試。')
          setCartItems([])
        })
        .finally(() => {
          setLoading(false)
          console.log('🏁 初始購物車 API 請求流程結束。')
        })
    } else {
      console.log(
        '🚫 使用者未登入或 userId 無效，不執行 API 請求。 auth:',
        auth,
        'userId:',
        currentUserId
      )
      let userMessage = '請先登入才能查看您的購物車喔～😉'
      if (auth && (!currentUserId || currentUserId === 0)) {
        userMessage = '登入狀態好像有點怪怪的，拿不到正確的使用者ID耶～🤔'
      }
      setError(userMessage)
      setCartItems([])
      setLoading(false)
    }
  }, [currentUserId, auth]) // 依賴 currentUserId 和 auth

  // --- 更新購物車項目數量的函式 ---
  const handleUpdateQuantity = useCallback(
    async (cartItemId, currentQuantity, change) => {
      const newQuantity = currentQuantity + change

      if (newQuantity < 1) {
        if (
          window.confirm(
            `確定要從購物車移除這個商品嗎？再按下去就莎呦娜拉囉～👋`
          )
        ) {
          await handleDeleteItem(cartItemId) // 直接呼叫刪除函式
        }
        return // 不往下執行更新數量
      }

      // 暫時先不實作庫存檢查的 loading
      // setLoading(true); // 如果要加 loading 狀態可以打開
      // setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/cart/api/items/${cartItemId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${yourAuthToken}`, // 如果需要 JWT
            },
            body: JSON.stringify({ quantity: newQuantity }),
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.message || `更新商品數量失敗，狀態碼：${response.status}`
          )
        }

        // 更新成功後，直接修改前端的 cartItems state
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: newQuantity }
              : item
          )
        )
        console.log(`🛒 商品 ${cartItemId} 數量已更新為 ${newQuantity}`)
      } catch (err) {
        console.error(`💔 更新購物車項目 ${cartItemId} 數量失敗：`, err)
        setError(err.message || '更新數量時發生錯誤，請稍後再試。')
        // 這裡可以考慮是否要回復到更新前的數量，或者重新 fetch 一次購物車
      } finally {
        // setLoading(false); // 如果前面有打開 loading
      }
    },
    [API_BASE_URL]
  ) // useCallback 的依賴，如果 API_BASE_URL 會變的話

  // --- 從購物車移除商品的函式 ---
  const handleDeleteItem = useCallback(
    async (cartItemId) => {
      // 暫時先不實作刪除的 loading
      // setLoading(true);
      // setError(null);
      console.log(`🗑️ 準備刪除購物車項目 ID: ${cartItemId}`)
      try {
        const response = await fetch(
          `${API_BASE_URL}/cart/api/items/${cartItemId}`,
          {
            method: 'DELETE',
            // headers: { 'Authorization': `Bearer ${yourAuthToken}` }, // 如果需要 JWT
          }
        )
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.message || `刪除商品失敗，狀態碼：${response.status}`
          )
        }
        // 成功刪除後，從前端的 cartItems 狀態中移除該商品
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cartItemId !== cartItemId)
        )
        console.log(`✅ 商品 ${cartItemId} 已成功從購物車移除！`)
      } catch (err) {
        console.error(`💣 刪除購物車項目 ${cartItemId} 失敗：`, err)
        setError(err.message || '刪除商品時發生錯誤，請稍後再試。')
      } finally {
        // setLoading(false);
      }
    },
    [API_BASE_URL]
  ) // useCallback 的依賴

  // --- 計算訂單金額 ---
  const calculateSubtotal = useCallback(() => {
    if (!cartItems || cartItems.length === 0) {
      return 0
    }
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }, [cartItems]) // 當 cartItems 改變時，重新計算

  const subtotal = calculateSubtotal()
  const shippingFee = 0 // 假設運費暫時是 0，之後可以再調整
  const grandTotal = subtotal + shippingFee

  // --- JSX 渲染邏輯 ---
  if (loading && cartItems.length === 0) {
    // 只有在初始載入且還沒有任何 cartItems 時才顯示全頁 loading
    return (
      <div className="cart-page-status">
        <p>購物車努力搬貨中... 🚚💨 請稍等一下下，好料馬上來！</p>
      </div>
    )
  }

  if (error && cartItems.length === 0) {
    // 只有在購物車也沒東西時才優先顯示整個頁面的錯誤
    return (
      <div className="cart-page-status cart-page-error">
        <h2>糟糕，出包了！😱</h2>
        <p>{error}</p>
        <p>
          你可以試試看
          <button
            onClick={() => window.location.reload()}
            style={{ marginLeft: '5px', padding: '5px 10px' }}
          >
            重新整理
          </button>
          ，或檢查一下登入狀態喔！
        </p>
      </div>
    )
  }

  if (!loading && cartItems.length === 0 && !error) {
    // 載入完成，但購物車是空的 (且沒有致命錯誤)
    return (
      <div className="cart-page-status cart-page-empty">
        <link rel="stylesheet" href="style.css" /> {/* 確保空狀態也有樣式 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css"
        />
        <h1>我的購物清單</h1>
        <p>你的購物車空空如也～ 🛒 是時候發揮你的購物慾啦！</p>
        <p>快去把心愛的商品通通加進來吧！Let's Go Shopping! 🛍️</p>
        {error && (
          <p style={{ color: 'orange', marginTop: '10px' }}>
            小小提示：{error}
          </p>
        )}{' '}
        {/* 如果有非致命錯誤，還是可以提示一下 */}
      </div>
    )
  }

  // 購物車有商品時的渲染
  return (
    <div>
      <link rel="stylesheet" href="style.css" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css"
      />
      {/* 你的 Header 元件可以放在這裡 (如果 AuthProvider 是在更外層) */}
      <main>
        <div className="container">
          <h1>
            購物清單 (
            {cartItems.length > 0
              ? `${cartItems.length} 件好物！`
              : '快來裝滿我吧！'}
            )
          </h1>
          {error && (
            <p
              style={{
                color: 'orange',
                textAlign: 'center',
                marginBottom: '15px',
              }}
            >
              小小提示：{error}
            </p>
          )}

          <div className="checkout-layout">
            <div className="checkout-left">
              <section className="shopping-list">
                {cartItems.map((item) => (
                  <div
                    className="cart-item"
                    key={item.cartItemId || item.productId} // 優先使用 cartItemId
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
                        border: '1px solid #eee',
                      }}
                    />
                    <div className="item-details">
                      <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: '0.9em', color: '#777' }}>
                        商品ID: {item.productId}
                      </p>
                    </div>
                    <div className="item-quantity">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.cartItemId,
                            item.quantity,
                            -1
                          )
                        }
                        disabled={loading}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        style={{
                          width: '40px',
                          textAlign: 'center',
                          margin: '0 5px',
                          padding: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                      />
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.cartItemId,
                            item.quantity,
                            1
                          )
                        }
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>
                    <div
                      className="item-price"
                      style={{
                        minWidth: '80px',
                        textAlign: 'right',
                        fontWeight: 'bold',
                      }}
                    >
                      $
                      {item.price
                        ? (item.price * item.quantity).toFixed(2)
                        : 'N/A'}{' '}
                      {/* 顯示該項目總價 */}
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.cartItemId)}
                      disabled={loading}
                      title="移除商品"
                      style={{
                        marginLeft: '15px',
                        background: 'transparent',
                        border: 'none',
                        color: '#e74c3c',
                        cursor: 'pointer',
                        fontSize: '1.2em',
                      }}
                    >
                      <i className="bi bi-trash3-fill"></i>{' '}
                      {/* 使用 Bootstrap Icon */}
                    </button>
                  </div>
                ))}
                {cartItems.length > 0 && ( // 只有購物車有東西才顯示優惠券
                  <div className="coupon-code">
                    <input type="text" placeholder="輸入優惠券代碼" />
                    <button>使用優惠券</button>
                  </div>
                )}
              </section>

              {/* --- 其他 section (收件人資料、訂單備註等) --- */}
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
                <textarea
                  placeholder="有什麼想跟我們說的嗎？寫在這裡吧！"
                  defaultValue={''}
                />
              </section>
              <section className="important-notes">
                <h3>注意事項</h3>
                <ul>
                  <li>訂單成立後，將以Email通知您訂單成立。</li>
                  <li>付款完成後約1-3個工作日內出貨，如遇例假日則順延。</li>
                  <li>
                    目前暫不提供離島寄送服務，金門馬祖澎湖的朋友們搜哩啦！
                  </li>
                  <li>
                    為保障彼此之權益，收到您的訂單後仍保有決定是否接受訂單及出貨與否之權利。(老闆有時候會任性一下
                    XD)
                  </li>
                </ul>
              </section>
            </div>

            <aside className="checkout-right">
              <div className="order-summary">
                <h2>訂單總計</h2>
                <div className="summary-item">
                  <span>商品小計</span>
                  <span>NT ${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>運費</span>
                  <span>NT ${shippingFee.toFixed(2)}</span>
                </div>
                <hr />
                <div className="summary-item total">
                  <span>總金額</span>
                  <span>NT ${grandTotal.toFixed(2)}</span>
                </div>
                <button
                  className="btn-proceed-payment"
                  disabled={cartItems.length === 0 || loading}
                >
                  {' '}
                  {/* 沒商品或載入中不能按 */}
                  下一步 前往付款方式 🚀
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      {/* 你的 Footer 元件可以放在這裡 */}
    </div>
  )
}
