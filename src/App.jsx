
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CompanyProvider } from '@/contexts/CompanyContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import DashboardPage from '@/pages/DashboardPage';
import ClientsPage from '@/pages/ClientsPage';
import QuotesPage from '@/pages/QuotesPage';
import ProductionModule from '@/pages/ProductionModule';
import FinancialModule from '@/pages/FinancialModule';
import MaterialsModule from '@/pages/MaterialsModule';
import ReportsModule from '@/pages/ReportsModule';
import SettingsModule from '@/pages/SettingsModule';
import PricingPage from '@/pages/PricingPage';
import MyPlanPage from '@/pages/MyPlanPage';
import ProductionCalendar from '@/pages/ProductionCalendar';
import TeamPage from '@/pages/TeamPage';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <CompanyProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/clients" element={<ProtectedRoute><ClientsPage /></ProtectedRoute>} />
                <Route path="/quotes" element={<ProtectedRoute><QuotesPage /></ProtectedRoute>} />
                <Route path="/calendar" element={<ProtectedRoute><ProductionCalendar /></ProtectedRoute>} />
                
                {/* Modules Routes */}
                <Route path="/producao" element={<ProtectedRoute><ProductionModule /></ProtectedRoute>} />
                <Route path="/financeiro" element={<ProtectedRoute><FinancialModule /></ProtectedRoute>} />
                <Route path="/materiais" element={<ProtectedRoute><MaterialsModule /></ProtectedRoute>} />
                <Route path="/relatorios" element={<ProtectedRoute><ReportsModule /></ProtectedRoute>} />
                <Route path="/configuracoes" element={<ProtectedRoute><SettingsModule /></ProtectedRoute>} />
                <Route path="/pricing" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />
                <Route path="/meu-plano" element={<ProtectedRoute><MyPlanPage /></ProtectedRoute>} />
                <Route path="/equipe" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />

                {/* Legacy/Fallback */}
                <Route path="/production" element={<ProtectedRoute><ProductionModule /></ProtectedRoute>} />
                <Route path="/financial" element={<ProtectedRoute><FinancialModule /></ProtectedRoute>} />
                <Route path="/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
              </Routes>
              <Toaster />
            </Router>
          </CompanyProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
