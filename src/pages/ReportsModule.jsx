
import React from 'react';
import { Helmet } from 'react-helmet';
import { Download, Lock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCompany } from '@/contexts/CompanyContext';
import UpgradeModal from '@/components/UpgradeModal';

const ReportsModule = () => {
  const { plan } = useCompany();
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);

  const handlePrint = () => {
    if (plan?.limits.reports) {
      window.print();
    } else {
      setShowUpgradeModal(true);
    }
  };

  // Check if current plan allows reports
  const isReportsEnabled = plan?.limits.reports;

  // Mock Data
  const revenueData = [
    { name: 'Jan', value: 45000 }, { name: 'Fev', value: 52000 }, { name: 'Mar', value: 48000 },
    { name: 'Abr', value: 61000 }, { name: 'Mai', value: 55000 }, { name: 'Jun', value: 75000 },
  ];

  return (
    <div className="flex h-screen bg-stone-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
          <Helmet><title>Relatórios - Stone ERP</title></Helmet>

          <div className="flex justify-between items-center print:hidden">
            <div>
              <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Relatórios Avançados</h1>
              <p className="text-stone-500">Análise de desempenho e indicadores.</p>
            </div>
            <Button onClick={handlePrint} className="bg-stone-900 hover:bg-stone-800 text-white">
              <Download className="mr-2 h-4 w-4" /> Exportar PDF
            </Button>
          </div>

          {!isReportsEnabled ? (
             <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-white rounded-xl shadow-sm border border-stone-200">
                <div className="bg-stone-100 p-6 rounded-full mb-6">
                   <Lock className="h-12 w-12 text-stone-400" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Funcionalidade Bloqueada</h2>
                <p className="text-stone-500 max-w-md mb-8">
                   Relatórios avançados estão disponíveis apenas nos planos Profissional e Empresarial. Faça upgrade para desbloquear gráficos detalhados.
                </p>
                <Button onClick={() => setShowUpgradeModal(true)} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                   Desbloquear Relatórios
                </Button>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-xl border-stone-100 shadow-sm">
                  <CardHeader><CardTitle>Faturamento mensal</CardTitle><CardDescription>Receita bruta dos últimos 6 meses</CardDescription></CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 12}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 12}} />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                {/* Additional charts here if enabled */}
             </div>
          )}
        </main>
      </div>
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  );
};

export default ReportsModule;
