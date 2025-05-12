import React from 'react'
import './style.css' // style.css 在同一資料夾或正確路徑

export default function CartPage() {
  return (
    <div>
      <link rel="stylesheet" href="style.css" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css"
      />
      <header>
        <div className="container">
          <div className="logo">FOOD</div>
          <nav>
            <ul>
              <li>
                <a href="#">美食分類</a>
              </li>
              <li>
                <a href="#">食譜總覽</a>
              </li>
              <li>
                <a href="#">精選</a>
              </li>
            </ul>
          </nav>
          <div className="header-right">
            <div className="search-bar">
              <input type="text" placeholder="搜尋" />
              <button type="submit">
                <i className="bi bi-search" />
              </button>
            </div>
            <div className="user-actions">
              <a href="#">
                <i className="bi bi-person-fill" />
              </a>
              <a href="#">
                <i className="bi bi-cart-plus-fill" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <h1>購物清單</h1>
          <div className="checkout-layout">
            <div className="checkout-left">
              <section className="shopping-list">
                <div className="cart-item">
                  <img src="/images/cart/brocoli.avif" alt="嚴選綠花椰菜" />
                  <div className="item-details">
                    <p>嚴選綠花椰菜</p>
                  </div>
                  <div className="item-quantity">
                    <button>-</button>
                    <input type="text" defaultValue={1} readOnly />
                    <button>+</button>
                  </div>
                  <div className="item-price">$40</div>
                </div>
                <div className="cart-item">
                  <img src="/images/cart/chili.avif" alt="新鮮辣椒" />
                  <div className="item-details">
                    <p>新鮮辣椒</p>
                  </div>
                  <div className="item-quantity">
                    <button>-</button>
                    <input type="text" defaultValue={1} readOnly />
                    <button>+</button>
                  </div>
                  <div className="item-price">$25</div>
                </div>
                <div className="coupon-code">
                  <input type="text" placeholder="使用優惠券" />
                  <button>使用優惠券</button>
                </div>
              </section>
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
                <div className="summary-item">
                  <span>小計</span>
                  <span>NT $65</span>
                </div>
                <div className="summary-item">
                  <span>運費</span>
                  <span>NT $0</span>
                </div>
                <hr />
                <div className="summary-item total">
                  <span>總計</span>
                  <span>NT $65</span>
                </div>
                <button className="btn-proceed-payment">
                  下一步 前往付款方式
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <footer>
        <div className="container">
          <div className="footer-left">
            <p>謝謝您來逛我們的網站！有您的瀏覽，我們超開心！</p>
            <p>如果您願意也歡迎您留下回饋，讓我們做得更好、更貼近您的期待！</p>
            <textarea
              placeholder="請留下您寶貴的意見，讓我們做得更好。"
              defaultValue={''}
            />
          </div>
          <div className="footer-right">
            <button className="btn-faq">常見問題</button>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="bi bi-facebook" />
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-instagram" />
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-youtube" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
