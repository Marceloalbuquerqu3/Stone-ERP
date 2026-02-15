
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Layers, AlertOctagon } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';

const MaterialsModule = () => {
  const { company } = useCompany();
  const [materials, setMaterials] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', supplier: '', quantity: '', unit: 'm²', cost: '', date: new Date().toISOString().split('T')[0] });
  const { toast } = useToast();

  useEffect(() => {
    if (company) {
       const allMaterials = JSON.parse(localStorage.getItem('materials') || '[]');
       setMaterials(allMaterials.filter(m => m.company_id === company.id));
    }
  }, [company]);

  const saveMaterials = (updated) => {
     const allMaterials = JSON.parse(localStorage.getItem('materials') || '[]');
     const otherMaterials = allMaterials.filter(m => m.company_id !== company.id);
     localStorage.setItem('materials', JSON.stringify([...otherMaterials, ...updated]));
     setMaterials(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = materials.map(m => m.id === editingId ? { ...formData, id: m.id, company_id: company.id, quantity: Number(formData.quantity), cost: Number(formData.cost) } : m);
      saveMaterials(updated);
      toast({ title: "Sucesso", description: "Material atualizado!" });
    } else {
      const newMaterial = { ...formData, id: Date.now(), company_id: company.id, quantity: Number(formData.quantity), cost: Number(formData.cost) };
      saveMaterials([...materials, newMaterial]);
      toast({ title: "Sucesso", description: "Material adicionado!" });
    }
    setIsDialogOpen(false);
  };

  const deleteMaterial = (id) => {
    if(window.confirm("Remover este material do estoque?")) {
      const updated = materials.filter(m => m.id !== id);
      saveMaterials(updated);
      toast({ title: "Removido", description: "Material excluído do sistema." });
    }
  };

  const openDialog = (item = null) => {
    setEditingId(item?.id || null);
    setFormData(item || { name: '', supplier: '', quantity: '', unit: 'm²', cost: '', date: new Date().toISOString().split('T')[0] });
    setIsDialogOpen(true);
  };

  const lowStock = materials.filter(m => m.quantity < 5);

  return (
    <div className="flex h-screen bg-stone-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Helmet><title>Estoque - Stone ERP</title></Helmet>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-stone-900">Gerenciamento de Estoque</h1>
            <Button onClick={() => openDialog()} className="bg-stone-900 hover:bg-stone-800">
              <Plus className="mr-2 h-4 w-4" /> Adicionar Material
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-stone-500">Total de Materiais</CardTitle>
                <Layers className="h-4 w-4 text-stone-500" />
              </CardHeader>
              <CardContent><div className="text-2xl font-bold">{materials.length}</div></CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-stone-500">Valor em Estoque</CardTitle>
                <span className="text-xs font-bold text-green-600">R$</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(materials.reduce((acc, m) => acc + (m.quantity * m.cost), 0))}
                </div>
              </CardContent>
            </Card>
            <Card className={lowStock.length > 0 ? "border-red-200 bg-red-50" : ""}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className={`text-sm font-medium ${lowStock.length > 0 ? "text-red-600" : "text-stone-500"}`}>Estoque Baixo</CardTitle>
                <AlertOctagon className={`h-4 w-4 ${lowStock.length > 0 ? "text-red-500" : "text-stone-300"}`} />
              </CardHeader>
              <CardContent><div className={`text-2xl font-bold ${lowStock.length > 0 ? "text-red-700" : ""}`}>{lowStock.length}</div></CardContent>
            </Card>
          </div>

          {lowStock.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertOctagon className="h-5 w-5 text-red-600" />
              <span className="text-red-800 font-medium">Atenção: {lowStock.map(m => m.name).join(', ')} estão com estoque crítico!</span>
            </div>
          )}

          <Card>
            <CardHeader><CardTitle>Inventário</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead><TableHead>Fornecedor</TableHead><TableHead>Quantidade</TableHead><TableHead>Custo Unit.</TableHead><TableHead>Total</TableHead><TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map(m => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell>{m.supplier}</TableCell>
                      <TableCell><span className={`font-bold ${m.quantity < 5 ? 'text-red-600' : 'text-stone-900'}`}>{m.quantity} {m.unit}</span></TableCell>
                      <TableCell>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(m.cost))}</TableCell>
                      <TableCell>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(m.cost) * Number(m.quantity))}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openDialog(m)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteMaterial(m.id)} className="text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
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
        <DialogContent>
          <DialogHeader><DialogTitle>{editingId ? 'Editar Material' : 'Novo Material'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
             {/* Fields kept identical to previous version but omitted for brevity in summary, assuming logic update was key */}
            <div className="space-y-2"><Label>Nome da Pedra</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
            <div className="space-y-2"><Label>Fornecedor</Label><Input value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Quantidade</Label><Input type="number" step="0.1" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} required /></div>
              <div className="space-y-2"><Label>Unidade</Label><Input value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} placeholder="m²" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Custo Unitário (R$)</Label><Input type="number" step="0.01" value={formData.cost} onChange={e => setFormData({...formData, cost: e.target.value})} required /></div>
              <div className="space-y-2"><Label>Data Compra</Label><Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-stone-900">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaterialsModule;
