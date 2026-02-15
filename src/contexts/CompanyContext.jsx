
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { checkPlanLimits, getPlanDetails, PLANS } from '@/lib/SubscriptionManager';
import { mockSettings } from '@/lib/mockData';

const CompanyContext = createContext(null);

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany deve ser usado dentro de um CompanyProvider');
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [usage, setUsage] = useState({
    clients: 0,
    quotes: 0,
    financial: 0
  });

  // Load company data
  useEffect(() => {
    if (user) {
      // In a real app, this would fetch from Supabase based on user.id or user.company_id
      // For now, we mimic this with localStorage
      const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
      let userCompany = storedCompanies.find(c => c.owner_email === user.email);

      if (!userCompany) {
        // Fallback to mock data if not found in LS (for demo purposes)
        if (user.email === 'admin@stoneerp.com.br') {
           userCompany = mockSettings.company;
           // Ensure it's in LS for consistency
           localStorage.setItem('companies', JSON.stringify([userCompany]));
        }
      }

      if (userCompany) {
        setCompany(userCompany);
      }
    } else {
      setCompany(null);
    }
  }, [user]);

  // Load Usage Data
  useEffect(() => {
    if (company) {
       const calculateUsage = () => {
         const clients = JSON.parse(localStorage.getItem('clients') || '[]').filter(c => c.company_id === company.id).length;
         const quotes = JSON.parse(localStorage.getItem('quotes') || '[]').filter(q => q.company_id === company.id).length;
         const transactions = JSON.parse(localStorage.getItem('financial_transactions') || '[]').filter(t => t.company_id === company.id).length;
         setUsage({ clients, quotes, financial: transactions });
       };
       
       calculateUsage();
       // Set interval to refresh usage periodically (mocking real-time updates)
       const interval = setInterval(calculateUsage, 2000);
       return () => clearInterval(interval);
    }
  }, [company]);

  const updateCompany = (updatedData) => {
    if (!company) return;
    const newCompany = { ...company, ...updatedData };
    setCompany(newCompany);
    
    // Update in localStorage
    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const index = storedCompanies.findIndex(c => c.id === company.id);
    if (index !== -1) {
      storedCompanies[index] = newCompany;
      localStorage.setItem('companies', JSON.stringify(storedCompanies));
    } else {
      // If mock company, add it to LS
      localStorage.setItem('companies', JSON.stringify([...storedCompanies, newCompany]));
    }
  };

  const updateCompanyLogo = (logoBase64) => {
    updateCompany({ logo: logoBase64 });
  };

  const upgradePlan = (newPlanId) => {
     updateCompany({ 
       plan: newPlanId,
       status_assinatura: 'Ativo'
     });
  };

  const checkLimit = (type) => {
    if (!company) return { permitido: false, mensagem: 'Empresa não encontrada' };
    
    // Map usage keys to limits keys
    const usageKey = type; // assuming type matches keys in usage object: clients, quotes, financial
    const currentUsage = usage[usageKey] || 0;
    
    return checkPlanLimits(type, currentUsage, company.plan?.toLowerCase());
  };

  const createCompany = (companyData) => {
     const newCompany = {
       id: Date.now().toString(),
       ...companyData,
       plan: 'freemium',
       status_assinatura: 'Ativo',
       data_criacao: new Date().toISOString(),
       data_expiracao: null,
       trialStartDate: new Date().toISOString(),
       logo: null,
       owner_email: user?.email // Link current user as owner
     };
     
     const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
     localStorage.setItem('companies', JSON.stringify([...storedCompanies, newCompany]));
     setCompany(newCompany);
     return newCompany;
  };

  const value = {
    company,
    plan: getPlanDetails(company?.plan),
    usage,
    checkLimit,
    upgradePlan,
    createCompany,
    updateCompany,
    updateCompanyLogo,
    loading: !company && !!user // simplistic loading state
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};
