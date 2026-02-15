import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, Check, Users, FileText, BarChart, Package, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
const HomePage = () => {
  return <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="border-b border-stone-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-stone-900 flex items-center justify-center">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-stone-900 tracking-tight">Stone ERP</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-stone-600 hover:text-stone-900 font-medium">Funcionalidades</a>
            <a href="#pricing" className="text-stone-600 hover:text-stone-900 font-medium">Planos</a>
            <a href="#testimonials" className="text-stone-600 hover:text-stone-900 font-medium">Depoimentos</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-stone-600 hover:text-stone-900 font-semibold">
                Entrar
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-stone-900 text-white hover:bg-stone-800 font-semibold px-6 shadow-lg shadow-stone-900/20">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
         <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
         <div className="container mx-auto px-6 text-center">
            <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="max-w-4xl mx-auto">
               <h1 className="text-5xl md:text-7xl font-bold text-stone-900 tracking-tight mb-8 leading-[1.1]">
                  A gestão da sua marmoraria <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">em outro nível</span>
               </h1>
               <p className="text-xl text-stone-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Controle orçamentos, produção, estoque e financeiro em um único lugar. Simples, moderno e feito para quem trabalha com pedras.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/signup">
                     <Button size="lg" className="h-14 px-8 text-lg bg-stone-900 text-white hover:bg-stone-800 font-bold shadow-xl shadow-stone-900/20 w-full sm:w-auto">
                        Começar Agora Grátis
                        <ArrowRight className="ml-2 h-5 w-5" />
                     </Button>
                  </Link>
                  <a href="#features">
                     <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-stone-200 text-stone-700 hover:bg-stone-50 w-full sm:w-auto">
                        Ver Funcionalidades
                     </Button>
                  </a>
               </div>
            </motion.div>
            
            <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.8
        }} className="mt-20 relative mx-auto max-w-5xl">
               <div className="rounded-2xl overflow-hidden shadow-2xl border border-stone-200 bg-white">
                  <img src="https://horizons-cdn.hostinger.com/e704d4c7-5d40-4f8d-aed0-5fb6cd955e70/imagem_2026-02-14_154754028-YWIid.png" alt="Dashboard Preview" className="w-full opacity-90" />
               </div>
               <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-xl shadow-xl border border-stone-100 hidden md:block">
                  <div className="flex items-center gap-4">
                     <div className="bg-green-100 p-3 rounded-full">
                        <Check className="h-6 w-6 text-green-600" />
                     </div>
                     <div>
                        <p className="text-sm text-stone-500 font-medium">Orçamento Aprovado</p>
                        <p className="text-xl font-bold text-stone-900">R$ 12.500,00</p>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-stone-50">
         <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Tudo que você precisa</h2>
               <p className="text-stone-500 text-lg">Ferramentas integradas para eliminar planilhas e papelada.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[{
            icon: Users,
            title: 'Gestão de Clientes',
            desc: 'Mantenha histórico completo de contatos e obras.'
          }, {
            icon: FileText,
            title: 'Orçamentos Rápidos',
            desc: 'Gere propostas profissionais e envie em PDF.'
          }, {
            icon: BarChart,
            title: 'Financeiro',
            desc: 'Fluxo de caixa, contas a pagar e receber simplificado.'
          }, {
            icon: Package,
            title: 'Produção',
            desc: 'Acompanhe o status de cada peça na fábrica.'
          }, {
            icon: Layers,
            title: 'Estoque de Chapas',
            desc: 'Controle de entrada e saída de materiais.'
          }, {
            icon: Zap,
            title: 'Relatórios',
            desc: 'Inteligência de dados para crescer seu negócio.'
          }].map((feature, i) => <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                     <CardContent className="p-8">
                        <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                           <feature.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">{feature.title}</h3>
                        <p className="text-stone-500">{feature.desc}</p>
                     </CardContent>
                  </Card>)}
            </div>
         </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
         <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Planos flexíveis</h2>
               <p className="text-stone-500 text-lg">Comece grátis e cresça conforme sua necessidade.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[{
            name: 'Freemium',
            price: '0',
            desc: 'Para testar e começar.',
            btn: 'Começar Grátis',
            highlight: false
          }, {
            name: 'Starter',
            price: '49',
            desc: 'Para pequenas marmorarias.',
            btn: 'Começar Starter',
            highlight: false
          }, {
            name: 'Profissional',
            price: '79',
            desc: 'Controle total e sem limites.',
            btn: 'Começar Pro',
            highlight: true
          }, {
            name: 'Empresarial',
            price: '149',
            desc: 'Múltiplos usuários e equipes.',
            btn: 'Falar com Vendas',
            highlight: false
          }].map((plan, i) => <Card key={i} className={`relative flex flex-col ${plan.highlight ? 'border-blue-200 bg-blue-50/30 ring-1 ring-blue-500 shadow-xl scale-105 z-10' : 'border-stone-200'}`}>
                     {plan.highlight && <div className="absolute top-0 right-0 left-0 -mt-3 text-center">
                           <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">MAIS POPULAR</span>
                        </div>}
                     <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-stone-900">{plan.name}</h3>
                        <div className="mt-4 mb-2">
                           <span className="text-4xl font-extrabold text-stone-900">R${plan.price}</span>
                           <span className="text-stone-500">/mês</span>
                        </div>
                        <p className="text-sm text-stone-500 mb-6">{plan.desc}</p>
                        <ul className="space-y-3 mb-8 flex-1">
                           <li className="flex items-center text-sm text-stone-600 gap-2"><Check className="h-4 w-4 text-green-500" /> Cadastro de Clientes</li>
                           <li className="flex items-center text-sm text-stone-600 gap-2"><Check className="h-4 w-4 text-green-500" /> Orçamentos</li>
                           {i > 0 && <li className="flex items-center text-sm text-stone-600 gap-2"><Check className="h-4 w-4 text-green-500" /> Gerar PDF</li>}
                           {i > 1 && <li className="flex items-center text-sm text-stone-600 gap-2"><Check className="h-4 w-4 text-green-500" /> Ilimitado</li>}
                        </ul>
                        <Link to="/signup">
                           <Button className={`w-full ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700' : 'bg-stone-900 hover:bg-stone-800'} text-white font-semibold`}>
                              {plan.btn}
                           </Button>
                        </Link>
                     </CardContent>
                  </Card>)}
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-stone-50 overflow-hidden">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-16 text-center">Quem usa recomenda</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[{
            name: 'Ricardo Santos',
            role: 'Dono, Pedras Sul',
            text: 'Mudou completamente a organização da minha empresa. Antes era tudo no papel.',
            img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
          }, {
            name: 'Ana Oliveira',
            role: 'Gerente, Marmoraria Real',
            text: 'O financeiro integrado com os orçamentos economiza horas do meu dia.',
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
          }, {
            name: 'Carlos Mendes',
            role: 'Diretor, Granitos Express',
            text: 'Simples de usar e muito eficiente. O suporte também é excelente.',
            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
          }].map((t, i) => <Card key={i} className="border-none shadow-sm">
                     <CardContent className="p-8">
                        <div className="flex items-center gap-1 mb-4 text-amber-400">
                           {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                        </div>
                        <p className="text-stone-600 mb-6 italic">"{t.text}"</p>
                        <div className="flex items-center gap-4">
                           <img src={t.img} alt={t.name} className="h-10 w-10 rounded-full" />
                           <div>
                              <p className="font-bold text-stone-900 text-sm">{t.name}</p>
                              <p className="text-xs text-stone-500">{t.role}</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>)}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-stone-900 text-white text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto para organizar sua marmoraria?</h2>
            <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
               Crie sua conta gratuita em menos de 1 minuto. Sem cartão de crédito.
            </p>
            <Link to="/signup">
               <Button size="lg" className="h-16 px-10 text-xl bg-white text-stone-900 hover:bg-stone-100 font-bold rounded-full">
                  Começar Grátis Agora
               </Button>
            </Link>
         </div>
      </section>

      <footer className="bg-stone-950 py-12 border-t border-stone-800 text-stone-400 text-sm">
         <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <Layers className="h-5 w-5 text-white" />
               <span className="font-bold text-white text-lg">Stone ERP</span>
            </div>
            <p>© 2026 Stone ERP. Todos os direitos reservados.</p>
         </div>
      </footer>
    </div>;
};
export default HomePage;