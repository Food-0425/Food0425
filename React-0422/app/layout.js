// 伺服器端元件很多Hook不能用，所以這個檔案才沒有指定成客戶端元件
// context套用第3步: 最上(外)層元件包裹提供者元件，讓祖先元件可以提供它
// 建立P(Provider)到C(Consumer)的階段結構
import Providers from './providers'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles/globals.css'
// 這邊要先註解，不然會報錯誤
// import './builder/builder-register'

export const metadata = {
  title: '美味食譜 - 您的烹飪好夥伴',
  description: '探索美味食譜、購買優質食材，讓烹飪變得更簡單',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
