
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Layers, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCompany } from '@/contexts/CompanyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { createCompany } = useCompany();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create User
      await signup(email, password, confirmPassword, name);
      
      // 2. Create Company for this user
      // Note: In a real backend, this would be transactional.
      // Here createCompany logic (in Context) will associate it with current user email or return object to link
      createCompany({ name: companyName });

      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao Stone ERP. Seu plano gratuito já está ativo.",
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cadastro - Stone ERP</title>
      </Helmet>

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side - Image */}
        <div className="hidden lg:block relative h-full w-full order-last lg:order-first">
           <img 
             src="https://horizons-cdn.hostinger.com/e704d4c7-5d40-4f8d-aed0-5fb6cd955e70/4c493d8adeac71253ac470e360ecde3a.png" 
             alt="Mármore fundo"
             className="absolute inset-0 h-full w-full object-cover" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-transparent flex flex-col justify-end p-12 text-white">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center border border-white/20">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">Stone ERP</span>
              </div>
              <p className="text-xl font-light text-stone-200 max-w-md">
                "A solução completa que faltava para elevar o nível da sua gestão de marmoraria."
              </p>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-8 bg-white overflow-y-auto">
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="w-full max-w-sm space-y-6"
          >
             <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-stone-900">Crie sua conta grátis</h1>
                <p className="text-stone-500">Comece hoje mesmo com o plano Freemium.</p>
             </div>

             <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="name">Seu Nome</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-10 bg-stone-50 border-stone-200"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Marmoraria</Label>
                  <Input 
                    id="companyName" 
                    type="text" 
                    placeholder="Ex: Pedras & Cia"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="h-10 bg-stone-50 border-stone-200"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="email">Email Profissional</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 bg-stone-50 border-stone-200"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 bg-stone-50 border-stone-200"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-10 bg-stone-50 border-stone-200"
                  />
               </div>

               <Button type="submit" className="w-full h-11 bg-stone-900 hover:bg-stone-800 text-white font-medium mt-4" disabled={loading}>
                 {loading ? 'Configurando...' : 'Criar Conta e Acessar'}
               </Button>
             </form>

             <div className="text-center text-sm text-stone-500">
               Já tem uma conta?{' '}
               <Link to="/login" className="font-semibold text-stone-900 hover:underline">
                 Entrar
               </Link>
             </div>
          </motion.div>
        </div>

      </div>
    </>
  );
};

export default SignupPage;
