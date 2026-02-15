
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';

const ProductionModule = () => {
  const { company } = useCompany();
  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({ client: '', project: '', startDate: '', deliveryDate: '', value: '', status: 'Aguardando material', notes: '' });
  const { toast } = useToast();

  useEffect(() => {
    if (company) {
       const allJobs = JSON.parse(localStorage.getItem('production_jobs') || '[]');
       setJobs(allJobs.filter(j => j.company_id === company.id));

       const allClients = JSON.parse(localStorage.getItem('clients') || '[]');
       setClients(allClients.filter(c => c.company_id === company.id));

       const allQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
       setQuotes(allQuotes.filter(q => q.company_id === company.id && (q.status === 'Aprovado' || q.status === 'Convertido em Produção')));
    }
  }, [company]);

  const saveJobs = (updated) => {
     const allJobs = JSON.parse(localStorage.getItem('production_jobs') || '[]');
     const otherJobs = allJobs.filter(j => j.company_id !== company.id);
     localStorage.setItem('production_jobs', JSON.stringify([...otherJobs, ...updated]));
     setJobs(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingJob) {
      const updated = jobs.map(j => j.id === editingJob.id ? { ...formData, id: j.id, company_id: company.id, value: Number(formData.value) } : j);
      saveJobs(updated);
      toast({ title: "Sucesso", description: "Job atualizado com sucesso!" });
    } else {
      const newJob = { ...formData, id: Date.now(), company_id: company.id, value: Number(formData.value) };
      saveJobs([...jobs, newJob]);
      toast({ title: "Sucesso", description: "Novo job criado!" });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Confirmar exclusão?")) {
      const updated = jobs.filter(j => j.id !== id);
      saveJobs(updated);
      toast({ title: "Deletado", description: "Job removido." });
    }
  };

  const openDialog = (job = null) => {
    setEditingJob(job);
    setFormData(job || { client: '', project: '', startDate: '', deliveryDate: '', value: '', status: 'Aguardando material', notes: '' });
    setIsDialogOpen(true);
  };

  const handleQuoteSelect = (quoteNumber) => {
    const quote = quotes.find(q => q.quoteNumber === quoteNumber);
    if (quote) {
      setFormData(prev => ({
        ...prev,
        project: `Projeto ${quote.quoteNumber}`,
        client: quote.client,
        value: quote.totalValue,
        notes: `${quote.stoneType} - ${quote.squareMeters}m²`
      }));
    } else {
      setFormData(prev => ({ ...prev, project: quoteNumber })); // Allow manual input if not found/custom
    }
  };

  const statusColors = {
    'Aguardando material': 'bg-gray-100 text-gray-800',
    'Em corte': 'bg-blue-100 text-blue-800',
    'Em acabamento': 'bg-orange-100 text-orange-800',
    'Instalação agendada': 'bg-purple-100 text-purple-800',
    'Concluído': 'bg-green-100 text-green-800'
  };

  const stats = {
    total: jobs.filter(j => j.status !== 'Concluído').length,
    completed: jobs.filter(j => j.status === 'Concluído').length,
    late: jobs.filter(j => new Date(j.deliveryDate) < new Date() && j.status !== 'Concluído').length
  };

  return (
    <div className="flex h-screen bg-stone-50 dark:bg-stone-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Helmet><title>Produção - Stone ERP</title></Helmet>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Gestão de Produção</h1>
            <Button onClick={() => openDialog()} className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600">
              <Plus className="mr-2 h-4 w-4" /> Novo Projeto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="dark:bg-stone-800 dark:border-stone-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-stone-500 dark:text-stone-400">Em Produção</CardTitle><Package className="h-4 w-4 text-blue-500" /></CardHeader>
              <CardContent><div className="text-2xl font-bold dark:text-stone-100">{stats.total}</div></CardContent>
            </Card>
            <Card className="dark:bg-stone-800 dark:border-stone-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-stone-500 dark:text-stone-400">Concluídos</CardTitle><CheckCircle className="h-4 w-4 text-green-500" /></CardHeader>
              <CardContent><div className="text-2xl font-bold dark:text-stone-100">{stats.completed}</div></CardContent>
            </Card>
            <Card className="dark:bg-stone-800 dark:border-stone-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-stone-500 dark:text-stone-400">Atrasados</CardTitle><AlertTriangle className="h-4 w-4 text-red-500" /></CardHeader>
              <CardContent><div className="text-2xl font-bold text-red-600">{stats.late}</div></CardContent>
            </Card>
          </div>

          <Card className="mb-6 dark:bg-stone-800 dark:border-stone-700">
            <CardHeader><CardTitle className="dark:text-stone-100">Projetos</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="dark:border-stone-700">
                    <TableHead className="dark:text-stone-400">Projeto</TableHead>
                    <TableHead className="dark:text-stone-400">Cliente</TableHead>
                    <TableHead className="dark:text-stone-400">Status</TableHead>
                    <TableHead className="dark:text-stone-400">Entrega</TableHead>
                    <TableHead className="dark:text-stone-400">Valor</TableHead>
                    <TableHead className="text-right dark:text-stone-400">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map(job => (
                    <TableRow key={job.id} className="dark:border-stone-700">
                      <TableCell className="font-medium dark:text-stone-200">{job.project}</TableCell>
                      <TableCell className="dark:text-stone-300">{job.client}</TableCell>
                      <TableCell><Badge className={`${statusColors[job.status]} hover:bg-opacity-80 border-0`}>{job.status}</Badge></TableCell>
                      <TableCell className="dark:text-stone-300">{new Date(job.deliveryDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="dark:text-stone-300">R$ {Number(job.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openDialog(job)} className="hover:bg-stone-100 dark:hover:bg-stone-700"><Edit className="h-4 w-4 text-stone-500 dark:text-stone-400" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="dark:bg-stone-900 dark:border-stone-700">
           <DialogHeader><DialogTitle className="dark:text-stone-100">{editingJob ? 'Editar Job' : 'Novo Job'}</DialogTitle></DialogHeader>
           <form onSubmit={handleSave} className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label className="dark:text-stone-300">Cliente</Label>
                   <Select value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200">
                      <option value="">Selecione um cliente...</option>
                      {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                   </Select>
                 </div>
                 <div className="space-y-2">
                   <Label className="dark:text-stone-300">Projeto / Orçamento</Label>
                   <Select value={formData.project.startsWith('Projeto ') ? formData.project.replace('Projeto ', '') : ''} onChange={e => handleQuoteSelect(e.target.value)} className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200">
                      <option value="">Selecione um orçamento...</option>
                      {quotes.map(q => <option key={q.id} value={q.quoteNumber}>{q.quoteNumber} - {q.client}</option>)}
                   </Select>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="dark:text-stone-300">Projeto (Nome Manual)</Label>
                    <Input value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200" placeholder="Ou digite o nome..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="dark:text-stone-300">Valor</Label>
                    <Input type="number" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} required className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200" />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label className="dark:text-stone-300">Início</Label><Input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} required className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200" /></div>
                  <div className="space-y-2"><Label className="dark:text-stone-300">Entrega</Label><Input type="date" value={formData.deliveryDate} onChange={e => setFormData({...formData, deliveryDate: e.target.value})} required className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200" /></div>
               </div>
               
               <div className="space-y-2">
                 <Label className="dark:text-stone-300">Status</Label>
                 <Select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200">
                   {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
                 </Select>
               </div>
               
               <DialogFooter><Button type="submit" className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600">Salvar</Button></DialogFooter>
           </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductionModule;
