
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Users, UserPlus, Shield, Trash2, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCompany } from '@/contexts/CompanyContext';
import { useToast } from '@/components/ui/use-toast';
import UpgradeModal from '@/components/UpgradeModal';

const TeamPage = () => {
  const { company, plan } = useCompany();
  const { toast } = useToast();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Funcionário');

  // Mock team members
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@stoneerp.com.br', role: 'Admin', status: 'Ativo' }
  ]);

  const handleInvite = (e) => {
    e.preventDefault();
    if (!plan?.limits.team) {
      setShowUpgradeModal(true);
      return;
    }
    
    // Mock invite logic
    const newMember = {
       id: Date.now(),
       name: 'Convidado',
       email: inviteEmail,
       role: inviteRole,
       status: 'Pendente'
    };
    setTeamMembers([...teamMembers, newMember]);
    setInviteEmail('');
    setIsInviteOpen(false);
    toast({ title: "Convite enviado", description: `Um email foi enviado para ${inviteEmail}.` });
  };

  const handleRemove = (id) => {
    if(window.confirm("Remover este membro da equipe?")) {
       setTeamMembers(teamMembers.filter(m => m.id !== id));
       toast({ title: "Membro removido", description: "Acesso revogado." });
    }
  };

  return (
    <div className="flex h-screen bg-stone-50 dark:bg-stone-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Helmet><title>Equipe - Stone ERP</title></Helmet>

          <div className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Gerenciar Equipe</h1>
               <p className="text-stone-500 dark:text-stone-400">Adicione membros e gerencie permissões.</p>
            </div>
            <Button onClick={() => plan?.limits.team ? setIsInviteOpen(true) : setShowUpgradeModal(true)} className="bg-stone-900 dark:bg-stone-700 text-white">
               <UserPlus className="mr-2 h-4 w-4" /> Convidar Membro
            </Button>
          </div>

          {!plan?.limits.team && (
             <Card className="mb-6 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <CardContent className="flex items-center gap-4 p-4">
                   <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                   <div>
                      <h3 className="font-bold text-blue-900 dark:text-blue-100">Funcionalidade Empresarial</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Faça upgrade para o plano Empresarial para adicionar membros à sua equipe.</p>
                   </div>
                </CardContent>
             </Card>
          )}

          <Card className="dark:bg-stone-800 dark:border-stone-700">
             <CardHeader>
                <CardTitle className="dark:text-stone-100">Membros ({teamMembers.length})</CardTitle>
             </CardHeader>
             <CardContent>
                <Table>
                   <TableHeader>
                      <TableRow className="dark:border-stone-700">
                         <TableHead className="dark:text-stone-400">Nome</TableHead>
                         <TableHead className="dark:text-stone-400">Email</TableHead>
                         <TableHead className="dark:text-stone-400">Cargo</TableHead>
                         <TableHead className="dark:text-stone-400">Status</TableHead>
                         <TableHead className="text-right dark:text-stone-400">Ações</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      {teamMembers.map(member => (
                         <TableRow key={member.id} className="dark:border-stone-700">
                            <TableCell className="font-medium dark:text-stone-200">{member.name}</TableCell>
                            <TableCell className="dark:text-stone-300">{member.email}</TableCell>
                            <TableCell className="dark:text-stone-300">{member.role}</TableCell>
                            <TableCell>
                               <span className={`px-2 py-1 rounded-full text-xs font-medium ${member.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'}`}>
                                  {member.status}
                               </span>
                            </TableCell>
                            <TableCell className="text-right">
                               <Button variant="ghost" size="icon" onClick={() => handleRemove(member.id)} disabled={member.role === 'Admin'} className="hover:bg-red-50 text-stone-500 hover:text-red-600 dark:hover:bg-red-900/20 dark:text-stone-400">
                                  <Trash2 className="h-4 w-4" />
                               </Button>
                            </TableCell>
                         </TableRow>
                      ))}
                   </TableBody>
                </Table>
             </CardContent>
          </Card>
        </main>
      </div>

      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
         <DialogContent className="dark:bg-stone-900 dark:border-stone-700">
            <DialogHeader><DialogTitle className="dark:text-stone-100">Convidar para Equipe</DialogTitle></DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4">
               <div className="space-y-2">
                  <Label className="dark:text-stone-300">Email do Colaborador</Label>
                  <Input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="colaborador@email.com" required className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200" />
               </div>
               <div className="space-y-2">
                  <Label className="dark:text-stone-300">Permissão</Label>
                  <Select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className="dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200">
                     <option value="Funcionário">Funcionário (Acesso limitado)</option>
                     <option value="Admin">Admin (Acesso total)</option>
                  </Select>
               </div>
               <DialogFooter>
                  <Button type="submit" className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600">Enviar Convite</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
      
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  );
};

export default TeamPage;
