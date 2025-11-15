import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import Footer from './Footer'
import FeaturePage from './FeaturePage'
import GreenFundSearch from './components/GreenFundSearch'
import BuyStock from './components/BuyStock'
import TransactionPage from './components/TransactionPage'

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturePage />} />
          <Route path="/green-funds" element={<GreenFundSearch />} />
          <Route path="/invest" element={<BuyStock />} />
          <Route path="/transaction" element={<TransactionPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
