import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import Footer from './Footer'
import FeaturePage from './FeaturePage'
import GreenFundSearch from './components/GreenFundSearch'
import BuyStock from './components/BuyStock'
import TransactionPage from './components/TransactionPage'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import AuthTest from './components/auth/AuthTest'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes - Require Authentication */}
          <Route path="/features" element={
            <ProtectedRoute>
              <FeaturePage />
            </ProtectedRoute>
          } />
          <Route path="/green-funds" element={
            <ProtectedRoute>
              <GreenFundSearch />
            </ProtectedRoute>
          } />
          <Route path="/invest" element={
            <ProtectedRoute>
              <BuyStock />
            </ProtectedRoute>
          } />
          <Route path="/transaction" element={
            <ProtectedRoute>
              <TransactionPage />
            </ProtectedRoute>
          } />
          <Route path="/auth-test" element={
            <ProtectedRoute>
              <AuthTest />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
