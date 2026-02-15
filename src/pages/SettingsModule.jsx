
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Save, User, Building, Upload, Image as ImageIcon } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';
import { useAuth } from '@/contexts/AuthContext';

const SettingsModule = () => {
  const { company, updateCompany, updateCompanyLogo } = useCompany();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    company: { name: '', email: '', phone: '', address: '', defaultMargin: 30 },
    user: { name: '', email: '' }
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (company) {
      setFormData(prev => ({
        ...prev,
        company: {
          name: company.name || '',
          email: company.email || '',
          phone: company.phone || '',
          address: company.address || '',
          defaultMargin: company.defaultMargin || 30
        }
      }));
      setLogoPreview(company.logo);
    }
    if (user) {
      setFormData(prev => ({
        ...prev,
        user: { name: user.name || '', email: user.email || '' }
      }));
    }
  }, [company, user]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        toast({ title: "Arquivo muito grande", description: "O logo deve ter no máximo 1MB.", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        updateCompanyLogo(reader.result);
        toast({ title: "Logo atualizado", description: "O logo da empresa foi salvo." });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    updateCompany(formData.company);
    toast({ title: "Configurações Salvas", description: "Dados da empresa atualizados com sucesso." });
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    // Simulate user update - in real app would call auth update
    toast({ title: "Perfil Atualizado", description: "Seus dados foram salvos (Simulação)." });
  };

  return (
    <div className="flex h-screen bg-stone-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Helmet><title>Configurações - Stone ERP</title></Helmet>
          <h1 className="text-3xl font-bold text-stone-900 mb-8">Configurações</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Company Settings */}
            <Card className="rounded-xl shadow-sm border-stone-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5" /> Dados da Empresa</CardTitle>
                <CardDescription>Informações exibidas em orçamentos e relatórios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col items-center">
                   <div className="h-24 w-24 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center overflow-hidden mb-3 relative group">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-contain" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-stone-300" />
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <Upload className="h-6 w-6 text-white" />
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleLogoUpload}
                      />
                   </div>
                   <p className="text-xs text-stone-500">Clique para alterar o logo (Max 1MB)</p>
                </div>

                <form onSubmit={handleSaveCompany} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome da Empresa</Label>
                    <Input value={formData.company.name} onChange={e => setFormData({...formData, company: {...formData.company, name: e.target.value}})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label>Telefone</Label>
                       <Input value={formData.company.phone} onChange={e => setFormData({...formData, company: {...formData.company, phone: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                       <Label>Margem Lucro Padrão (%)</Label>
                       <Input type="number" value={formData.company.defaultMargin} onChange={e => setFormData({...formData, company: {...formData.company, defaultMargin: e.target.value}})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Comercial</Label>
                    <Input type="email" value={formData.company.email} onChange={e => setFormData({...formData, company: {...formData.company, email: e.target.value}})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Endereço Completo</Label>
                    <Input value={formData.company.address} onChange={e => setFormData({...formData, company: {...formData.company, address: e.target.value}})} />
                  </div>
                  <Button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white mt-4"><Save className="mr-2 h-4 w-4" /> Salvar Empresa</Button>
                </form>
              </CardContent>
            </Card>

            {/* User Settings */}
            <Card className="rounded-xl shadow-sm border-stone-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Perfil do Usuário</CardTitle>
                <CardDescription>Gerencie suas credenciais de acesso</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveUser} className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="h-16 w-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold text-xl">
                        {formData.user.name.charAt(0)}
                     </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Seu Nome</Label>
                    <Input value={formData.user.name} onChange={e => setFormData({...formData, user: {...formData.user, name: e.target.value}})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Seu Email</Label>
                    <Input type="email" value={formData.user.email} onChange={e => setFormData({...formData, user: {...formData.user, email: e.target.value}})} />
                  </div>
                  <div className="pt-4 border-t border-stone-100">
                    <h4 className="text-sm font-semibold mb-3">Alterar Senha</h4>
                    <div className="space-y-3">
                       <Input type="password" placeholder="Senha Atual" disabled />
                       <Input type="password" placeholder="Nova Senha" disabled />
                       <p className="text-xs text-stone-400">Alteração de senha desabilitada na demonstração.</p>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white mt-4"><Save className="mr-2 h-4 w-4" /> Salvar Perfil</Button>
                </form>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsModule;
