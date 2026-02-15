
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { useCompany } from '@/contexts/CompanyContext';
import { useToast } from '@/components/ui/use-toast';
import { PLANS } from '@/lib/SubscriptionManager';

const UpgradeModal = ({ isOpen, onClose, targetPlanId = 'profissional' }) => {
  const { upgradePlan } = useCompany();
  const { toast } = useToast();
  
  const targetPlan = Object.values(PLANS).find(p => p.id === targetPlanId) || PLANS.PROFISSIONAL;

  const handleUpgrade = () => {
    upgradePlan(targetPlan.id);
    toast({
      title: "Parabéns! Upgrade realizado.",
      description: `Você agora está no plano ${targetPlan.name}.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-none shadow-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
             <Star className="h-6 w-6 text-blue-600 fill-blue-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-stone-900">Faça Upgrade para {targetPlan.name}</DialogTitle>
          <DialogDescription className="text-stone-500 text-base mt-2">
            Desbloqueie todo o potencial do sistema e remova os limites.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-stone-50 p-6 rounded-xl my-4 space-y-4 border border-stone-100">
           <div className="flex items-end justify-center text-stone-900 mb-2">
              <span className="text-4xl font-extrabold">R${targetPlan.price}</span>
              <span className="text-stone-500 font-medium mb-1">/mês</span>
           </div>
           
           <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                 <span className="text-sm font-medium text-stone-700">Clientes e Orçamentos Ilimitados</span>
              </div>
              <div className="flex items-center gap-3">
                 <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                 <span className="text-sm font-medium text-stone-700">Relatórios Avançados</span>
              </div>
              <div className="flex items-center gap-3">
                 <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                 <span className="text-sm font-medium text-stone-700">Geração de PDF Profissional</span>
              </div>
           </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button onClick={handleUpgrade} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-semibold shadow-lg shadow-blue-200">
            Fazer Upgrade Agora
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full text-stone-500">
            Talvez depois
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
