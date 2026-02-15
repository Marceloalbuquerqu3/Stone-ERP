
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ArrowRight,
  FileText
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCompany } from '@/contexts/CompanyContext';
import { mockProductionJobs, mockTransactions, mockQuotes } from '@/lib/mockData';

const DashboardPage = () => {
  const { company } = useCompany();
  const navigate = useNavigate();
  const [jobs] = useLocalStorage('production_jobs', mockProductionJobs);
  const [transactions] = useLocalStorage('financial_transactions', mockTransactions);
  const [quotes] = useLocalStorage('quotes', mockQuotes);

  // Filter Data by Company
  const companyJobs = jobs.filter(j => j.company_id === company?.id);
  const companyTransactions = transactions.filter(t => t.company_id === company?.id);
  const companyQuotes = quotes.filter(q => q.company_id === company?.id);

  // Calculate Metrics
  const income = companyTransactions.filter(t => t.type === 'Entrada').reduce((acc, t) => acc + Number(t.value), 0);
  const expenses = companyTransactions.filter(t => t.type === 'Saída').reduce((acc, t) => acc + Number(t.value), 0);
  const profit = income - expenses;

  // Production Metrics
  const inProgressJobs = companyJobs.filter(j => j.status !== 'Concluído').length;
  const completedJobs = companyJobs.filter(j => j.status === 'Concluído').length;

  // Quotes Metrics
  const approvedQuotes = companyQuotes.filter(q => q.status === 'Aprovado' || q.status === 'Convertido em Produção').length;
  const pendingQuotes = companyQuotes.filter(q => q.status !== 'Aprovado' && q.status !== 'Recusado' && q.status !== 'Convertido em Produção').length;

  // Prepare Chart Data (Mock data with real structure for visual consistency)
  const chartData = [
    { name: 'Sem 1', entrada: 4000, saida: 2400 },
    { name: 'Sem 2', entrada: 3000, saida: 1398 },
    { name: 'Sem 3', entrada: 9800, saida: 2000 },
    { name: 'Sem 4', entrada: 3908, saida: 2780 },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Stone ERP</title>
      </Helmet>

      <div className="flex h-screen bg-stone-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
            
            {/* 1. Welcome Section */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-stone-900 tracking-tight"
              >
                Bem-vindo de volta, {company?.name?.split(' ')[0] || 'Gestor'}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-stone-500 mt-1 text-lg"
              >
                Aqui está o resumo da sua marmoraria hoje.
              </motion.p>
            </div>

            {/* 2. Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Faturamento', value: income, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', format: true },
                { title: 'Lucro Líquido', value: profit, icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50', format: true },
                { title: 'Orçamentos Aprovados', value: approvedQuotes, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', format: false },
                { title: 'Produção Ativa', value: inProgressJobs, icon: Package, color: 'text-orange-600', bg: 'bg-orange-50', format: false }
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="rounded-xl border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${metric.bg}`}>
                          <metric.icon className={`h-6 w-6 ${metric.color}`} />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-stone-500">{metric.title}</p>
                      <h3 className="text-2xl font-bold text-stone-900 mt-1">
                        {metric.format 
                           ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(metric.value)
                           : metric.value}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* 3. Large Line Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2"
              >
                <Card className="rounded-xl border-stone-100 shadow-sm h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-stone-900">Visão financeira</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorSaida" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} tickFormatter={(value) => `R$${value/1000}k`} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#d6d3d1', strokeWidth: 1 }}
                          />
                          <Area type="monotone" dataKey="entrada" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEntrada)" name="Entradas" />
                          <Area type="monotone" dataKey="saida" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorSaida)" name="Saídas" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 4. Production Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="rounded-xl border-stone-100 shadow-sm h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-stone-900 flex items-center gap-2">
                      <Package className="h-5 w-5 text-stone-500" />
                      Produção
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-lg bg-stone-50 border border-stone-100">
                      <p className="text-sm font-medium text-stone-500 mb-1">Projetos em andamento</p>
                      <div className="flex items-end justify-between">
                         <span className="text-3xl font-bold text-stone-900">{inProgressJobs}</span>
                         <div className="h-2 w-2 rounded-full bg-blue-500 mb-2 animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-stone-50 border border-stone-100">
                      <p className="text-sm font-medium text-stone-500 mb-1">Projetos concluídos</p>
                      <div className="flex items-end justify-between">
                         <span className="text-3xl font-bold text-stone-900">{completedJobs}</span>
                         <div className="h-2 w-2 rounded-full bg-emerald-500 mb-2"></div>
                      </div>
                    </div>

                    <Button onClick={() => navigate('/producao')} className="w-full mt-4 flex items-center justify-center text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors group">
                      Ver todos os projetos
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
