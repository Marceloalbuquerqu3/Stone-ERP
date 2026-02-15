
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Layers, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Bem-vindo de volta",
        description: "Login realizado com sucesso.",
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Entrar - Stone ERP</title>
      </Helmet>

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side - Image */}
        <div className="hidden lg:block relative h-full w-full">
           <img 
             src="https://horizons-cdn.hostinger.com/e704d4c7-5d40-4f8d-aed0-5fb6cd955e70/4c493d8adeac71253ac470e360ecde3a.png" 
             alt="Mármore fundo"
             className="absolute inset-0 h-full w-full object-cover" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent flex flex-col justify-end p-12 text-white">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center border border-white/20">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">Stone ERP</span>
              </div>
              <p className="text-xl font-light text-stone-200 max-w-md">
                "A plataforma definitiva para gestão de marmorarias. Controle sua produção e financeiro com elegância."
              </p>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-8 bg-white">
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="w-full max-w-sm space-y-8"
          >
             <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-stone-900">Acesse sua conta</h1>
                <p className="text-stone-500">Digite seus dados para entrar no sistema.</p>
             </div>

             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="exemplo@marmoraria.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-stone-50 border-stone-200"
                  />
               </div>
               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900">Esqueceu?</a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 bg-stone-50 border-stone-200"
                  />
               </div>

               <Button type="submit" className="w-full h-11 bg-stone-900 hover:bg-stone-800 text-white font-medium" disabled={loading}>
                 {loading ? 'Entrando...' : 'Entrar'}
               </Button>
             </form>

             <div className="text-center text-sm text-stone-500">
               Não tem uma conta?{' '}
               <Link to="/signup" className="font-semibold text-stone-900 hover:underline">
                 Criar conta
               </Link>
             </div>
          </motion.div>
        </div>

      </div>
    </>
  );
};

export default LoginPage;
