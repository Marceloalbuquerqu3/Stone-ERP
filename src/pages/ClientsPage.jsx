
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';
import PlanLimitModal from '@/components/PlanLimitModal';
import UpgradeModal from '@/components/UpgradeModal';

const ClientsPage = () => {
  const { company, checkLimit, usage, plan } = useCompany();
  const [clients, setClients] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', notes: '', status: 'Ativo' });
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (company) {
      const allClients = JSON.parse(localStorage.getItem('clients') || '[]');
      const companyClients = allClients.filter(c => c.company_id === company.id);
      setClients(companyClients);
    }
  }, [company]);

  const saveClients = (updatedList) => {
    // We need to merge with other companies' clients in LS to persist correctly
    const allClients = JSON.parse(localStorage.getItem('clients') || '[]');
    const otherClients = allClients.filter(c => c.company_id !== company.id);
    const newStorage = [...otherClients, ...updatedList];
    
    setClients(updatedList);
    localStorage.setItem('clients', JSON.stringify(newStorage));
  };

  const handleAddClient = () => {
    const limitCheck = checkLimit('clients');
    if (!limitCheck.permitido) {
      setShowLimitModal(true);
      return;
    }

    setEditingClient(null);
    setFormData({ name: '', email: '', phone: '', address: '', notes: '', status: 'Ativo' });
    setIsDialogOpen(true);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setFormData(client);
    setIsDialogOpen(true);
  };

  const handleDeleteClient = (id) => {
    if(window.confirm('Tem certeza que deseja excluir este cliente?')) {
      const updated = clients.filter(c => c.id !== id);
      saveClients(updated);
      toast({ title: "Cliente excluído", description: "O cliente foi removido com sucesso." });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      const updated = clients.map(c => c.id === editingClient.id ? { ...formData, id: c.id, company_id: company.id } : c);
      saveClients(updated);
      toast({ title: "Cliente atualizado", description: "As informações foram salvas com sucesso." });
    } else {
      const newClient = { ...formData, id: Date.now().toString(), company_id: company.id };
      saveClients([...clients, newClient]);
      toast({ title: "Cliente criado", description: "Novo cliente adicionado ao sistema." });
    }
    setIsDialogOpen(false);
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet><title>Clientes - Stone ERP</title></Helmet>
      <div className="flex h-screen bg-stone-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Clientes</h1>
                <div className="flex items-center gap-2 mt-1">
                   <p className="text-stone-500">Gerencie sua base de clientes.</p>
                   <Badge variant="secondary" className="text-xs">
                     {clients.length} / {plan?.limits.clients === Infinity ? '∞' : plan?.limits.clients}
                   </Badge>
                </div>
              </div>
              <Button onClick={handleAddClient} className="bg-stone-900 hover:bg-stone-800 text-white shadow-md">
                <Plus className="h-4 w-4 mr-2" /> Adicionar Cliente
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-4 border-b border-stone-100 flex gap-4">
                 <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <Input 
                      placeholder="Buscar por nome ou email..." 
                      className="pl-9 bg-stone-50 border-stone-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-stone-50 border-stone-100">
                    <TableHead className="font-semibold text-stone-900">Nome</TableHead>
                    <TableHead className="font-semibold text-stone-900">Email</TableHead>
                    <TableHead className="font-semibold text-stone-900">Telefone</TableHead>
                    <TableHead className="font-semibold text-stone-900">Status</TableHead>
                    <TableHead className="text-right font-semibold text-stone-900">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id} className="hover:bg-stone-50 border-stone-100 transition-colors">
                      <TableCell className="font-medium text-stone-900">{client.name}</TableCell>
                      <TableCell className="text-stone-600">{client.email}</TableCell>
                      <TableCell className="text-stone-600">{client.phone}</TableCell>
                      <TableCell>
                        <Badge variant={client.status === 'Ativo' ? 'success' : 'secondary'} className={client.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-600'}>
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditClient(client)} className="hover:bg-stone-100">
                            <Edit className="h-4 w-4 text-stone-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteClient(client.id)} className="hover:bg-red-50">
                            <Trash2 className="h-4 w-4 text-stone-500 hover:text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredClients.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-stone-500">Nenhum cliente encontrado.</TableCell>
                     </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>{editingClient ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
            <DialogDescription>{editingClient ? 'Atualize as informações.' : 'Preencha os dados do novo cliente.'}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-stone-900">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PlanLimitModal isOpen={showLimitModal} onClose={() => setShowLimitModal(false)} onUpgrade={() => setShowUpgradeModal(true)} />
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </>
  );
};

export default ClientsPage;
