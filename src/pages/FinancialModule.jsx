
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Wallet, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useCompany } from '@/contexts/CompanyContext';
import { useToast } from '@/components/ui/use-toast';
import PlanLimitModal from '@/components/PlanLimitModal';
import UpgradeModal from '@/components/UpgradeModal';

const FinancialModule = () => {
  const { company, checkLimit } = useCompany();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Receita',
    amount: '',
    description: '',
    category: 'Vendas',
    client: '',
    paymentMethod: 'Pix',
    status: 'Pago',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (company) {
      const allTransactions = JSON.parse(localStorage.getItem('financial_transactions') || '[]');
      const companyTransactions = allTransactions.filter(t => t.company_id === company.id);
      setTransactions(companyTransactions);
    }
  }, [company]);

  useEffect(() => {
    // Filter by Month
    const filtered = transactions.filter(t => t.date.startsWith(selectedMonth));
    setFilteredTransactions(filtered);
  }, [transactions, selectedMonth]);

  const income = filteredTransactions.filter(t => t.type === 'Receita' || t.type === 'Entrada').reduce((acc, t) => acc + Number(t.value || t.amount), 0);
  const expenses = filteredTransactions.filter(t => t.type === 'Despesa' || t.type === 'Saída').reduce((acc, t) => acc + Number(t.value || t.amount), 0);
  const balance = income - expenses;

  // Pie Chart Data
  const pieData = [
    { name: 'Receitas', value: income, color: '#10b981' },
    { name: 'Despesas', value: expenses, color: '#f43f5e' },
  ];

  const handleAddTransaction = () => {
    const limitCheck = checkLimit('financial');
    if (!limitCheck.permitido) {
      setShowLimitModal(true);
      return;
    }
    setFormData({
      type: 'Receita',
      amount: '',
      description: '',
      category: 'Vendas',
      client: '',
      paymentMethod: 'Pix',
      status: 'Pago',
      date: new Date().toISOString().split('T')[0]
    });
    setIsDialogOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      toast({ title: "Erro", description: "Preencha valor e descrição.", variant: "destructive" });
      return;
    }

    const newTransaction = {
      id: Date.now(),
      company_id: company.id,
      ...formData,
      value: Number(formData.amount), // Normalize for chart usage logic
      created_at: new Date().toISOString()
    };

    const allTransactions = JSON.parse(localStorage.getItem('financial_transactions') || '[]');
    const updated = [...allTransactions, newTransaction];
    localStorage.setItem('financial_transactions', JSON.stringify(updated));
    
    // Update local state
    const companyTransactions = updated.filter(t => t.company_id === company.id);
    setTransactions(companyTransactions);
    
    setIsDialogOpen(false);
    toast({ title: "Sucesso", description: "Transação salva com sucesso." });
  };

  const handleDelete = (id) => {
    if(window.confirm("Excluir transação?")) {
      const allTransactions = JSON.parse(localStorage.getItem('financial_transactions') || '[]');
      const updated = allTransactions.filter(t => t.id !== id);
      localStorage.setItem('financial_transactions', JSON.stringify(updated));
      
      const companyTransactions = updated.filter(t => t.company_id === company.id);
      setTransactions(companyTransactions);
      toast({ title: "Excluído", description: "Transação removida." });
    }
  };

  return (
    <div className="flex h-screen bg-stone-50 dark:bg-stone-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
          <Helmet><title>Financeiro - Stone ERP</title></Helmet>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">Financeiro</h1>
              <p className="text-stone-500 dark:text-stone-400">Gestão completa de receitas e despesas.</p>
            </div>
            <div className="flex items-center gap-4">
               <input 
                 type="month"
                 className="h-10 rounded-md border border-stone-200 bg-white dark:bg-stone-800 dark:border-stone-700 dark:text-stone-200 px-3 py-2 text-sm"
                 value={selectedMonth}
                 onChange={(e) => setSelectedMonth(e.target.value)}
               />
               <Button onClick={handleAddTransaction} className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Nova Transação
               </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="rounded-xl border-stone-100 dark:border-stone-700 shadow-sm bg-white dark:bg-stone-800">
                <CardContent className="p-6">
                   <div className="flex justify-between items-start">
                     <div>
                       <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Saldo em caixa</p>
                       <h3 className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-stone-900 dark:text-stone-100' : 'text-red-600'}`}>
                         {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance)}
                       </h3>
                     </div>
                     <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                     </div>
                   </div>
                </CardContent>
             </Card>
             <Card className="rounded-xl border-stone-100 dark:border-stone-700 shadow-sm bg-white dark:bg-stone-800">
                <CardContent className="p-6">
                   <div className="flex justify-between items-start">
                     <div>
                       <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Receitas</p>
                       <h3 className="text-3xl font-bold text-emerald-600 mt-2">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(income)}</h3>
                     </div>
                     <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                     </div>
                   </div>
                </CardContent>
             </Card>
             <Card className="rounded-xl border-stone-100 dark:border-stone-700 shadow-sm bg-white dark:bg-stone-800">
                <CardContent className="p-6">
                   <div className="flex justify-between items-start">
                     <div>
                       <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Despesas</p>
                       <h3 className="text-3xl font-bold text-rose-600 mt-2">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expenses)}</h3>
                     </div>
                     <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded-lg">
                        <TrendingDown className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                     </div>
                   </div>
                </CardContent>
             </Card>
          </div>

          {/* Table */}
          <Card className="rounded-xl border-stone-100 dark:border-stone-700 shadow-sm overflow-hidden dark:bg-stone-800">
            <CardHeader><CardTitle className="dark:text-stone-100">Transações de {selectedMonth}</CardTitle></CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent dark:border-stone-700">
                  <TableHead className="dark:text-stone-400">Data</TableHead>
                  <TableHead className="dark:text-stone-400">Descrição</TableHead>
                  <TableHead className="dark:text-stone-400">Categoria</TableHead>
                  <TableHead className="dark:text-stone-400">Tipo</TableHead>
                  <TableHead className="text-right dark:text-stone-400">Valor</TableHead>
                  <TableHead className="text-right dark:text-stone-400">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((t) => (
                  <TableRow key={t.id} className="hover:bg-stone-50 dark:hover:bg-stone-700 dark:border-stone-700">
                    <TableCell className="font-medium text-stone-600 dark:text-stone-300">{new Date(t.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="dark:text-stone-200">{t.description}</TableCell>
                    <TableCell className="dark:text-stone-400">{t.category}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${t.type === 'Receita' || t.type === 'Entrada' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-rose-50 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'}`}>{t.type}</span>
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${t.type === 'Receita' || t.type === 'Entrada' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {(t.type === 'Despesa' || t.type === 'Saída') && '- '}{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(t.amount || t.value))}
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTransactions.length === 0 && <TableRow><TableCell colSpan={6} className="h-32 text-center text-stone-500 dark:text-stone-400">Nenhuma transação neste mês.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </Card>
        </main>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="dark:bg-stone-900 dark:border-stone-700">
           <DialogHeader><DialogTitle className="dark:text-stone-100">Nova Transação</DialogTitle></DialogHeader>
           <form onSubmit={handleSave} className="space-y-4">
              <div className="flex gap-4">
                 <div className="flex items-center space-x-2">
                    <input type="radio" id="receita" name="type" value="Receita" checked={formData.type === 'Receita'} onChange={e => setFormData({...formData, type: e.target.value})} className="accent-emerald-600" />
                    <Label htmlFor="receita" className="dark:text-stone-300">Receita</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                    <input type="radio" id="despesa" name="type" value="Despesa" checked={formData.type === 'Despesa'} onChange={e => setFormData({...formData, type: e.target.value})} className="accent-rose-600" />
                    <Label htmlFor="despesa" className="dark:text-stone-300">Despesa</Label>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label className="dark:text-stone-300">Valor (R$)</Label>
                    <Input type="number" step="0.01" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200" />
                 </div>
                 <div className="space-y-2">
                    <Label className="dark:text-stone-300">Data</Label>
                    <Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200" />
                 </div>
              </div>

              <div className="space-y-2">
                 <Label className="dark:text-stone-300">Descrição</Label>
                 <Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label className="dark:text-stone-300">Categoria</Label>
                    <Select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200">
                       <option value="Vendas">Vendas</option>
                       <option value="Serviços">Serviços</option>
                       <option value="Material">Material</option>
                       <option value="Mão de obra">Mão de obra</option>
                       <option value="Energia">Energia</option>
                       <option value="Aluguel">Aluguel</option>
                       <option value="Outros">Outros</option>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label className="dark:text-stone-300">Pagamento</Label>
                    <Select value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200">
                       <option value="Pix">Pix</option>
                       <option value="Dinheiro">Dinheiro</option>
                       <option value="Cartão Crédito">Cartão Crédito</option>
                       <option value="Cartão Débito">Cartão Débito</option>
                       <option value="Boleto">Boleto</option>
                       <option value="Transferência">Transferência</option>
                    </Select>
                 </div>
              </div>
              
              <DialogFooter><Button type="submit" className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600">Salvar</Button></DialogFooter>
           </form>
        </DialogContent>
      </Dialog>
      
      <PlanLimitModal isOpen={showLimitModal} onClose={() => setShowLimitModal(false)} onUpgrade={() => setShowUpgradeModal(true)} />
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  );
};

export default FinancialModule;
