import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './LandingPage'
import Footer from './Footer'
import FeaturePage from './FeaturePage'
import FeaturesLayout from './layouts/FeaturesLayout'
import FeaturesHome from './pages/features/FeaturesHome'
import ESGGuidePage from './pages/features/ESGGuidePage'
import GreenFundsPage from './pages/features/GreenFundsPage'
import FundComparisonPage from './pages/features/FundComparisonPage'
import ImpactCalculatorPage from './pages/features/ImpactCalculatorPage'
import GreenNewsPage from './pages/features/GreenNewsPage'
import AIAssistantPage from './pages/features/AIAssistantPage'
import GreenFundSearch from './components/GreenFundSearch'
import BuyStock from './components/BuyStock'
import TransactionPage from './components/TransactionPage'
import PortfolioPage from './components/PortfolioPage'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import AuthTest from './components/auth/AuthTest'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Component to conditionally render Footer
const ConditionalFooter = () => {
  const location = useLocation();
  
  // Hide footer on feature pages
  const hideFooterRoutes = ['/features'];
  const shouldHideFooter = hideFooterRoutes.some(route => location.pathname.startsWith(route));
  
  return !shouldHideFooter ? <Footer /> : null;
};

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
          
          {/* Nested Features Routes */}
          <Route path="/features" element={
            <ProtectedRoute>
              <FeaturesLayout />
            </ProtectedRoute>
          }>
            <Route index element={<FeaturesHome />} />
            <Route path="esg-guide" element={<ESGGuidePage />} />
            <Route path="green-funds" element={<GreenFundsPage />} />
            <Route path="fund-comparison" element={<FundComparisonPage />} />
            <Route path="impact-calculator" element={<ImpactCalculatorPage />} />
            <Route path="green-news" element={<GreenNewsPage />} />
            <Route path="ai-assistant" element={<AIAssistantPage />} />
          </Route>

          {/* Legacy Features Route (for backward compatibility) */}
          <Route path="/features-legacy" element={
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
          <Route path="/portfolio" element={
            <ProtectedRoute>
              <PortfolioPage />
            </ProtectedRoute>
          } />
          <Route path="/auth-test" element={
            <ProtectedRoute>
              <AuthTest />
            </ProtectedRoute>
          } />
        </Routes>
        <ConditionalFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
