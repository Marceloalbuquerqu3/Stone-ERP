

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Check, Zap, ArrowUpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCompany } from '@/contexts/CompanyContext';
import { PLANS } from '@/lib/SubscriptionManager';
import UpgradeModal from '@/components/UpgradeModal';

const MyPlanPage = () => {
  const { company, plan, usage } = useCompany();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState('profissional');

  // Simple progress bar helper
  const UsageBar = ({ label, current, max }) => {
    const percentage = max === Infinity ? 100 : Math.min(100, (current / max) * 100);
    const isUnlimited = max === Infinity;

    return (
      <div className="space-y-1 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-stone-600 font-medium">{label}</span>
          <span className="text-stone-900 font-bold">{current} / {isUnlimited ? '∞' : max}</span>
        </div>
        <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
          <div 
             className={`h-full rounded-full ${percentage > 90 ? 'bg-red-500' : 'bg-blue-600'}`} 
             style={{ width: isUnlimited ? '100%' : `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const handleUpgradeClick = (planId) => {
    setSelectedUpgradePlan(planId);
    setUpgradeModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-stone-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Helmet><title>Meu Plano - Stone ERP</title></Helmet>
          
          <h1 className="text-3xl font-bold text-stone-900 mb-8">Assinatura e Limites</h1>

          {/* Current Plan Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="lg:col-span-1 border-blue-200 bg-blue-50/50 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-stone-900">Plano Atual</CardTitle>
                    <CardDescription>Sua assinatura está <span className="text-green-600 font-bold">Ativa</span></CardDescription>
                  </div>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-base py-1 px-3">
                    {plan?.name}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                   <p className="text-3xl font-bold text-stone-900 mb-6">
                      R${plan?.price}<span className="text-lg font-normal text-stone-500">/mês</span>
                   </p>
                   <Button onClick={() => handleUpgradeClick('profissional')} className="w-full bg-stone-900 text-white">
                      Gerenciar Assinatura
                   </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-stone-900">Uso do Sistema</CardTitle>
                <CardDescription>Acompanhe o consumo dos recursos do seu plano</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <UsageBar label="Clientes Cadastrados" current={usage.clients} max={plan?.limits.clients} />
                      <UsageBar label="Orçamentos Gerados" current={usage.quotes} max={plan?.limits.quotes} />
                   </div>
                   <div>
                      <UsageBar label="Transações Financeiras (mês)" current={usage.financial} max={plan?.limits.financial} />
                      {/* Placeholder for Storage if we tracked it */}
                      <UsageBar label="Armazenamento (MB)" current={Math.round(Math.random() * 50)} max={plan?.limits.storage} />
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-stone-900 mb-6">Planos Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(PLANS).map((p) => {
              const isCurrent = plan?.id === p.id;
              return (
                <Card key={p.id} className={`flex flex-col ${isCurrent ? 'ring-2 ring-blue-500 border-transparent' : 'border-stone-200 hover:shadow-lg transition-shadow'}`}>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{p.name}</CardTitle>
                    <div className="mt-2">
                       <span className="text-3xl font-bold">R${p.price}</span>
                       <span className="text-stone-500 text-sm">/mês</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm text-stone-600">
                       <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          {p.limits.clients === Infinity ? 'Clientes Ilimitados' : `Até ${p.limits.clients} Clientes`}
                       </li>
                       <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          {p.limits.quotes === Infinity ? 'Orçamentos Ilimitados' : `Até ${p.limits.quotes} Orçamentos`}
                       </li>
                       <li className="flex items-center gap-2">
                          {p.limits.pdf ? <Check className="h-4 w-4 text-green-500" /> : <span className="text-stone-300">-</span>}
                          Geração de PDF
                       </li>
                       <li className="flex items-center gap-2">
                          {p.limits.reports ? <Check className="h-4 w-4 text-green-500" /> : <span className="text-stone-300">-</span>}
                          Relatórios Avançados
                       </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {isCurrent ? (
                      <Button disabled className="w-full bg-stone-100 text-stone-400">Plano Atual</Button>
                    ) : (
                      <Button onClick={() => handleUpgradeClick(p.id)} className="w-full bg-stone-900 hover:bg-stone-800 text-white">
                        {p.price > plan.price ? 'Fazer Upgrade' : 'Mudar Plano'}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
      
      <UpgradeModal 
         isOpen={upgradeModalOpen} 
         onClose={() => setUpgradeModalOpen(false)} 
         targetPlanId={selectedUpgradePlan} 
      />
    </div>
  );
};

export default MyPlanPage;
