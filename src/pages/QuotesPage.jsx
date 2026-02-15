
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Calculator, Download, FileText, Send, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';
import PlanLimitModal from '@/components/PlanLimitModal';
import UpgradeModal from '@/components/UpgradeModal';
import { generateQuotePDF } from '@/lib/QuotePDFGenerator';

const QuotesPage = () => {
  const { company, checkLimit, plan } = useCompany();
  const [quotes, setQuotes] = useState([]);
  const [clients, setClients] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Todos');
  
  const [formData, setFormData] = useState({
    quoteNumber: '', client: '', stoneType: '', thickness: '', width: '', length: '', squareMeters: 0, pricePerMeter: 0,
    finishType: '', installCost: 0, profitMargin: 30, status: 'Rascunho', date: new Date().toISOString().split('T')[0]
  });

  const { toast } = useToast();

  useEffect(() => {
    if (company) {
      const allQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
      setQuotes(allQuotes.filter(q => q.company_id === company.id));
      
      const allClients = JSON.parse(localStorage.getItem('clients') || '[]');
      setClients(allClients.filter(c => c.company_id === company.id));
    }
  }, [company]);

  const saveQuotes = (updatedQuotes) => {
    const allQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    const otherQuotes = allQuotes.filter(q => q.company_id !== company.id);
    const newStorage = [...otherQuotes, ...updatedQuotes];
    
    setQuotes(updatedQuotes);
    localStorage.setItem('quotes', JSON.stringify(newStorage));
  };

  const calculateFinancials = () => {
     let area = parseFloat(formData.squareMeters) || 0;
     
     // Auto calc area if width and length present
     if (formData.width && formData.length) {
        area = parseFloat(formData.width) * parseFloat(formData.length);
     }

     const materialCost = area * parseFloat(formData.pricePerMeter || 0);
     const totalCost = materialCost + parseFloat(formData.installCost || 0);
     const profitAmount = totalCost * (parseFloat(formData.profitMargin || 0) / 100);
     const sellingPrice = totalCost + profitAmount;
     
     return {
        area: isNaN(area) ? 0 : area,
        materialCost: isNaN(materialCost) ? 0 : materialCost,
        profitAmount: isNaN(profitAmount) ? 0 : profitAmount,
        sellingPrice: isNaN(sellingPrice) ? 0 : sellingPrice
     };
  };
  const financials = calculateFinancials();

  // Update squareMeters when width/length change
  useEffect(() => {
    if (formData.width && formData.length) {
       const area = (parseFloat(formData.width) * parseFloat(formData.length)).toFixed(2);
       setFormData(prev => ({ ...prev, squareMeters: area }));
    }
  }, [formData.width, formData.length]);

  const handleAddQuote = () => {
    const limitCheck = checkLimit('quotes');
    if (!limitCheck.permitido) {
      setShowLimitModal(true);
      return;
    }

    const nextNumber = `ORC-${String(quotes.length + 1).padStart(3, '0')}`;
    setEditingQuote(null);
    setFormData({
      quoteNumber: nextNumber, client: '', stoneType: '', thickness: '', width: '', length: '', squareMeters: 0, pricePerMeter: 0,
      finishType: '', installCost: 0, profitMargin: 30, status: 'Rascunho', date: new Date().toISOString().split('T')[0]
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, totalValue: financials.sellingPrice };
    
    if (editingQuote) {
      const updated = quotes.map(q => q.id === editingQuote.id ? { ...finalData, id: q.id, company_id: company.id } : q);
      saveQuotes(updated);
      toast({ title: "Orçamento atualizado", description: "Salvo com sucesso." });
    } else {
      const newQuote = { ...finalData, id: Date.now().toString(), company_id: company.id };
      saveQuotes([...quotes, newQuote]);
      toast({ title: "Orçamento criado", description: "Novo orçamento gerado." });
    }
    setIsDialogOpen(false);
  };

  const handleDeleteQuote = (id) => {
      if(window.confirm('Excluir este orçamento?')) {
        const updated = quotes.filter(q => q.id !== id);
        saveQuotes(updated);
        toast({ title: "Excluído", description: "Orçamento removido." });
      }
  };

  const handleConvertToProduction = (quote) => {
    if (window.confirm(`Converter orçamento ${quote.quoteNumber} em projeto de produção?`)) {
       // Create Production Job
       const allJobs = JSON.parse(localStorage.getItem('production_jobs') || '[]');
       const newJob = {
          id: Date.now(),
          company_id: company.id,
          client: quote.client,
          project: `Projeto ${quote.quoteNumber}`,
          startDate: new Date().toISOString().split('T')[0],
          deliveryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +15 days default
          value: quote.totalValue,
          status: 'Aguardando material',
          notes: `Gerado a partir do orçamento ${quote.quoteNumber}`
       };
       localStorage.setItem('production_jobs', JSON.stringify([...allJobs, newJob]));

       // Create Financial Transaction (Pending)
       const allTransactions = JSON.parse(localStorage.getItem('financial_transactions') || '[]');
       const newTransaction = {
          id: Date.now(),
          company_id: company.id,
          date: new Date().toISOString().split('T')[0],
          client: quote.client,
          description: `Receita Projeto ${quote.quoteNumber}`,
          type: 'Entrada',
          value: quote.totalValue,
          status: 'Pendente' // Assumes logic for status
       };
       localStorage.setItem('financial_transactions', JSON.stringify([...allTransactions, newTransaction]));

       // Update Quote Status
       const updated = quotes.map(q => q.id === quote.id ? { ...q, status: 'Convertido em Produção' } : q);
       saveQuotes(updated);

       toast({ title: "Convertido!", description: "Projeto criado em Produção e lançamento financeiro gerado." });
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Rascunho': 'bg-stone-100 text-stone-600 border-stone-200',
      'Enviado': 'bg-blue-100 text-blue-700 border-blue-200',
      'Visualizado': 'bg-purple-100 text-purple-700 border-purple-200',
      'Aprovado': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Recusado': 'bg-red-100 text-red-700 border-red-200',
      'Convertido em Produção': 'bg-amber-100 text-amber-700 border-amber-200'
    };
    return <Badge className={`${styles[status] || styles['Rascunho']} border font-medium`}>{status}</Badge>;
  };

  const filteredQuotes = filterStatus === 'Todos' ? quotes : quotes.filter(q => q.status === filterStatus);

  return (
    <>
      <Helmet><title>Orçamentos - Stone ERP</title></Helmet>
      <div className="flex h-screen bg-stone-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Orçamentos</h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-stone-500">Gerencie suas propostas comerciais.</p>
                </div>
              </div>
              <Button onClick={handleAddQuote} className="bg-stone-900 hover:bg-stone-800 text-white shadow-md">
                <Plus className="h-4 w-4 mr-2" /> Novo Orçamento
              </Button>
            </div>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
               {['Todos', 'Rascunho', 'Enviado', 'Aprovado', 'Convertido em Produção'].map(status => (
                  <Button 
                    key={status} 
                    variant={filterStatus === status ? "default" : "outline"} 
                    onClick={() => setFilterStatus(status)}
                    size="sm"
                    className={filterStatus === status ? "bg-stone-900" : "bg-white"}
                  >
                    {status}
                  </Button>
               ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-stone-50/50">
                    <TableHead>Nº Orçamento</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor Total</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotes.map((quote) => (
                    <TableRow key={quote.id} className="hover:bg-stone-50">
                      <TableCell className="font-medium">{quote.quoteNumber}</TableCell>
                      <TableCell>{quote.client}</TableCell>
                      <TableCell>{new Date(quote.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{getStatusBadge(quote.status)}</TableCell>
                      <TableCell className="text-right font-bold text-stone-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quote.totalValue || 0)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                           <Button variant="ghost" size="icon" onClick={() => generateQuotePDF(quote, company)} title="Baixar PDF">
                              <Download className="h-4 w-4 text-stone-500" />
                           </Button>
                           <Button variant="ghost" size="icon" onClick={() => { setEditingQuote(quote); setFormData(quote); setIsDialogOpen(true); }}>
                             <Edit className="h-4 w-4 text-stone-500" />
                           </Button>
                           {quote.status === 'Aprovado' && (
                              <Button variant="ghost" size="icon" onClick={() => handleConvertToProduction(quote)} title="Converter em Produção">
                                <FileText className="h-4 w-4 text-emerald-600" />
                              </Button>
                           )}
                           <Button variant="ghost" size="icon" onClick={() => handleDeleteQuote(quote.id)}>
                             <Trash2 className="h-4 w-4 text-stone-500 hover:text-red-600" />
                           </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredQuotes.length === 0 && <TableRow><TableCell colSpan={6} className="h-32 text-center text-stone-500">Nenhum orçamento encontrado.</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader><DialogTitle>{editingQuote ? 'Editar Orçamento' : 'Novo Orçamento'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <h3 className="font-semibold text-stone-900 border-b pb-2">Informações</h3>
                   <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2"><Label>Nº Orçamento</Label><Input value={formData.quoteNumber} readOnly className="bg-stone-50" /></div>
                       <div className="space-y-2"><Label>Data</Label><Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
                   </div>
                   <div className="space-y-2">
                      <Label>Cliente</Label>
                      {clients.length > 0 ? (
                        <Select value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full h-10 rounded-md border border-stone-200 px-3 py-2 text-sm">
                            <option value="">Selecione...</option>
                            {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </Select>
                      ) : <Input placeholder="Nome do cliente" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />}
                   </div>
                   <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full h-10 rounded-md border border-stone-200 px-3 py-2 text-sm">
                         <option value="Rascunho">Rascunho</option>
                         <option value="Enviado">Enviado</option>
                         <option value="Visualizado">Visualizado</option>
                         <option value="Aprovado">Aprovado</option>
                         <option value="Recusado">Recusado</option>
                         <option value="Convertido em Produção">Convertido em Produção</option>
                      </Select>
                   </div>
                </div>
                <div className="space-y-4">
                   <h3 className="font-semibold text-stone-900 border-b pb-2">Detalhes da Pedra</h3>
                   <div className="space-y-2"><Label>Tipo de Pedra</Label><Input value={formData.stoneType} onChange={e => setFormData({...formData, stoneType: e.target.value})} placeholder="Ex: Granito Preto" /></div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Largura (m)</Label><Input type="number" step="0.01" value={formData.width} onChange={e => setFormData({...formData, width: e.target.value})} placeholder="0.00" /></div>
                      <div className="space-y-2"><Label>Comprimento (m)</Label><Input type="number" step="0.01" value={formData.length} onChange={e => setFormData({...formData, length: e.target.value})} placeholder="0.00" /></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Espessura</Label><Input value={formData.thickness} onChange={e => setFormData({...formData, thickness: e.target.value})} /></div>
                      <div className="space-y-2"><Label>Acabamento</Label><Input value={formData.finishType} onChange={e => setFormData({...formData, finishType: e.target.value})} /></div>
                   </div>
                </div>
             </div>
             <div className="mt-6 bg-stone-50 p-4 rounded-lg border border-stone-200">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Calculator className="h-4 w-4" /> Cálculo de Valores</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="space-y-2"><Label>Área Total (m²)</Label><Input type="number" step="0.01" value={formData.squareMeters} onChange={e => setFormData({...formData, squareMeters: e.target.value})} /></div>
                   <div className="space-y-2"><Label>Preço por m² (R$)</Label><Input type="number" step="0.01" value={formData.pricePerMeter} onChange={e => setFormData({...formData, pricePerMeter: e.target.value})} /></div>
                   <div className="space-y-2"><Label>Instalação (R$)</Label><Input type="number" step="0.01" value={formData.installCost} onChange={e => setFormData({...formData, installCost: e.target.value})} /></div>
                   <div className="space-y-2"><Label>Margem Lucro (%)</Label><Input type="number" value={formData.profitMargin} onChange={e => setFormData({...formData, profitMargin: e.target.value})} /></div>
                </div>
                <div className="mt-6 flex justify-end items-center gap-4">
                   <div className="text-right">
                      <p className="text-xs text-stone-500">Custo Material</p>
                      <p className="font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financials.materialCost)}</p>
                   </div>
                   <div className="text-right border-l pl-4">
                      <p className="text-sm uppercase font-bold text-stone-500">Total Orçamento</p>
                      <p className="text-2xl font-bold text-stone-900">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financials.sellingPrice)}</p>
                   </div>
                </div>
             </div>
             <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button type="submit" className="bg-stone-900">Salvar Orçamento</Button>
             </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <PlanLimitModal isOpen={showLimitModal} onClose={() => setShowLimitModal(false)} onUpgrade={() => setShowUpgradeModal(true)} />
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </>
  );
};

export default QuotesPage;
