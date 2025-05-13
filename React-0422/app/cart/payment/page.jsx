"use client";
import React, { useState } from 'react'; // 修正點 1：把 use 改成 useState
import styles from '../../styles/PaymentForm.module.css';

const PaymentForm = () => {
  // 修正點 2：新增 state 來記錄目前選擇的付款方式和發票類型
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCardOnce'); // 預設選取信用卡一次付清
  const [selectedInvoiceOption, setSelectedInvoiceOption] = useState('electronicInvoice'); // 預設選取電子發票

  // 處理付款方式變更
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  // 處理發票類型變更
  const handleInvoiceOptionChange = (event) => {
    setSelectedInvoiceOption(event.target.value);
  };
  return (

    

    <div className={styles.paymentFormContainer}>
      <h2>選擇付款方式</h2>
      {/* 選項：信用卡一次付清 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="creditCardOnce"
          name="paymentMethod" 
          value="creditCardOnce"
          checked={selectedPaymentMethod === 'creditCardOnce'} // 修正點 3：用 state 控制 checked
          onChange={handlePaymentMethodChange} // 修正點 4：加上 onChange 事件
        />
        <label htmlFor="creditCardOnce">信用卡一次付清</label>
        {/* 修正點 5：條件渲染卡片資訊 */}
        {selectedPaymentMethod === 'creditCardOnce' && (
          <>
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
          </>
        )}
      </div>

      {/* 選項：信用卡分期0利率 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="creditCardInstallment"
          name="paymentMethod"
          value="creditCardInstallment"
          checked={selectedPaymentMethod === 'creditCardInstallment'}
          onChange={handlePaymentMethodChange}
        />
        <label htmlFor="creditCardInstallment">信用卡分期0利率</label>
        {selectedPaymentMethod === 'creditCardInstallment' && (
          <>
            <div className={styles.inputGroup}>
              <label htmlFor="installmentCardNumber">卡號</label>
              <input type="text" id="installmentCardNumber" placeholder="請輸入卡號" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="installmentExpiryDate">有效期限</label>
              <input type="text" id="installmentExpiryDate" placeholder="月/年，例如：12/25" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="installmentCvv">背面末三碼</label>
              <input type="text" id="installmentCvv" placeholder="CVV" />
            </div>
            {/* 這裡可以放選擇期數的下拉選單，一樣用條件渲染包起來 */}
            <div className={styles.inputGroup}>
              <label htmlFor="installmentPeriod">選擇期數</label>
              <select id="installmentPeriod" name="installmentPeriod" className={styles.selectDropdown}>
                <option value="">請選擇期數</option>
                <option value="3">3 期 0 利率</option>
                <option value="6">6 期 0 利率</option>
              </select>
            </div>
          </>
        )}
      </div>

      {/* 選項：ATM轉帳 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="atmTransfer"
          name="paymentMethod"
          value="atmTransfer"
          checked={selectedPaymentMethod === 'atmTransfer'}
          onChange={handlePaymentMethodChange}
        />
        <label htmlFor="atmTransfer">ATM轉帳</label>
        {selectedPaymentMethod === 'atmTransfer' && (
          <p className={styles.atmInfo}>會提供一組轉帳帳號，請於翌日 23:59 前完成繳費，逾期該轉帳帳號即失效。</p>
        )}
      </div>

      {/* 選項：超商代碼繳費 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="convenienceStorePayment"
          name="paymentMethod"
          value="convenienceStorePayment"
          checked={selectedPaymentMethod === 'convenienceStorePayment'}
          onChange={handlePaymentMethodChange}
        />
        <label htmlFor="convenienceStorePayment">超商代碼繳費</label>
        {selectedPaymentMethod === 'convenienceStorePayment' && (
          <p className={styles.convenienceStoreInfo}>會提供一組代碼，請於翌日 23:59 前至 7-11、全家、OK、萊爾富完成繳費，逾期該代碼即失效。</p>
        )}
      </div>
      <div className={styles.information}>
      <h3>發票資訊</h3>
      </div>
      {/* 選項：電子發票 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="electronicInvoice" 
          name="invoiceOption"  
          value="electronicInvoice"
          checked={selectedInvoiceOption === 'electronicInvoice'}
          onChange={handleInvoiceOptionChange}
        />
        <label htmlFor="electronicInvoice">電子發票</label>
        {selectedInvoiceOption === 'electronicInvoice' && (
          <p className={styles.electronicInvoiceInfo}>響應發票無紙化，依財政部規範開立電子發票，由集團自動為您對獎，並於中獎後通知您。</p>
        )}
      </div>

      {/* 選項：捐贈發票 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="donateInvoice" 
          name="invoiceOption"
          value="donateInvoice" 
          checked={selectedInvoiceOption === 'donateInvoice'}
          onChange={handleInvoiceOptionChange}
        />
        <label htmlFor="donateInvoice">捐贈發票</label> 
        {selectedInvoiceOption === 'donateInvoice' && (
          <div className={styles.donationSelectGroup}>
          {/* 以下 下拉選單 */}
          <select id="donationTarget" name="donationTarget" className={styles.selectDropdown}> 
            <option value="">捐贈單位</option>
            <option value="家福基金會">家福基金會</option>
            <option value="主婦聯盟基金會">主婦聯盟基金會</option>
            <option value="愛兔協會">愛兔協會</option>
            <option value="喜憨兒基金會">喜憨兒基金會</option>
            <option value="愛盲基金會">愛盲基金會</option>
          </select>
          </div>
        )}
      </div>

      {/* 選項：公司發票 */}
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="companyInvoice" // 修正 id
          name="invoiceOption"
          value="companyInvoice" // 修正 value
          checked={selectedInvoiceOption === 'companyInvoice'}
          onChange={handleInvoiceOptionChange}
        />
        <label htmlFor="companyInvoice">公司發票（統編）</label> 
        
          {selectedInvoiceOption === 'companyInvoice' && (
            <> {/* 使用 React Fragment (<>) 包住多個同層級的 JSX 元素 */}
              <div className={styles.inputGroup}> {/* 跟其他輸入欄位一樣的結構 */}
                <label htmlFor="companyTaxId">統一編號</label>
                <input
                  type="text"
                  id="companyTaxId" // 給它一個唯一的 id
                  placeholder="請輸入8碼統一編號" 
                />
              </div>
        
              <div className={styles.inputGroup}> {/* 第二個輸入欄位 */}
                <label htmlFor="companyName">發票抬頭</label>
                <input
                  type="text"
                  id="companyName" // 給它一個唯一的 id
                  placeholder="請輸入公司完整名稱" // placeholder 可以更明確一點
                />
              </div>
              <button>送出</button>
            </>
          )}
      </div>
    </div>
  );
};
export default PaymentForm;