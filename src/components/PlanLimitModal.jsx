
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const PlanLimitModal = ({ isOpen, onClose, onUpgrade, message }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="text-center">
          <div className="mx-auto bg-amber-100 p-3 rounded-full w-fit mb-4">
             <Lock className="h-6 w-6 text-amber-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-stone-900">Limite do Plano Atingido</DialogTitle>
          <DialogDescription className="text-stone-500 mt-2">
            {message || "Você atingiu o limite do seu plano atual. Faça upgrade para continuar criando novos registros."}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button onClick={() => { onClose(); onUpgrade(); }} className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-white">
            Fazer Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanLimitModal;
