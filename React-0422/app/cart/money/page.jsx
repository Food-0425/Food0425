import React from 'react'
import styles from '../../styles/PaymentForm.module.css' // 引入 CSS Module
// PaymentForm.module.css
const PaymentForm = () => {
  return (
    <div className={styles.paymentFormContainer}>
      <h2>付款方式</h2>

      {/* 選項：信用卡一次付清 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="creditCardOnce"
          name="paymentMethod"
          value="creditCardOnce"
          defaultChecked
        />
        <label htmlFor="creditCardOnce">信用卡一次付清</label>
        <div className={styles.inputGroup}>
          <label htmlFor="cardNumber">卡號</label>
          <input type="text" id="cardNumber" placeholder="請輸入卡號" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="expiryDate">有效期限</label>
          <input type="text" id="expiryDate" placeholder="月/年，例如：12/25" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="cvv">背面末三碼</label>
          <input type="text" id="cvv" placeholder="CVV" />
        </div>
      </div>

      {/* 選項：信用卡分期0利率 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="creditCardInstallment"
          name="paymentMethod"
          value="creditCardInstallment"
        />
        <label htmlFor="creditCardInstallment">信用卡分期0利率</label>
        <div className={styles.inputGroup}>
          <label htmlFor="installmentCardNumber">卡號</label>
          <input
            type="text"
            id="installmentCardNumber"
            placeholder="請輸入卡號"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="installmentExpiryDate">有效期限</label>
          <input
            type="text"
            id="installmentExpiryDate"
            placeholder="月/年，例如：12/25"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="installmentCvv">背面末三碼</label>
          <input type="text" id="installmentCvv" placeholder="CVV" />
        </div>
        {/* --- 新增下拉選單 --- START */}
        <div className={styles.inputGroup}>
          <label htmlFor="installmentPeriod">選擇期數</label>
          <select
            id="installmentPeriod"
            name="installmentPeriod"
            className={styles.selectDropdown}
          >
            <option value="">請選擇期數</option>
            <option value="3">3 期 0 利率</option>
            <option value="6">6 期 0 利率</option>
            <option value="12">12 期 0 利率</option>
            <option value="24">24 期 0 利率</option>
          </select>
        </div>
      </div>

      {/* 選項：ATM轉帳 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="atmTransfer"
          name="paymentMethod"
          value="atmTransfer"
        />
        <label htmlFor="atmTransfer">ATM轉帳</label>
        <p className={styles.atmInfo}>
          當您選擇此一服務後，請於23小時59分前繳費完畢，逾期訂單將被取消。
        </p>
      </div>

      {/* 選項：超商代碼繳費 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="convenienceStorePayment"
          name="paymentMethod"
          value="convenienceStorePayment"
        />
        <label htmlFor="convenienceStorePayment">超商代碼繳費</label>
        <p className={styles.convenienceStoreInfo}>
          當您選擇此一服務後，請於23小時59分前繳費完畢，逾期訂單將被取消。
        </p>
      </div>
    </div>
  )
}

export default PaymentForm
