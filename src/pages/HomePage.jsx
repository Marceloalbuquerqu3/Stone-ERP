import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HomePage = () => {

const plans = [
{
name: 'Plano Grátis 7 Dias',
price: '0',
desc: 'Teste todas as funções por 7 dias.',
btn: 'Começar Teste Grátis',
highlight: false,
features: [
'Até 5 clientes',
'Até 5 orçamentos',
'Financeiro básico',
'Suporte por email'
]
},
{
name: 'Plano Starter',
price: '49',
desc: 'Para pequenas marmorarias.',
btn: 'Começar Starter',
highlight: false,
features: [
'Até 15 clientes',
'Até 30 orçamentos',
'Gerar PDF',
'Financeiro completo',
'Suporte prioritário'
]
},
{
name: 'Plano Profissional',
price: '79',
desc: 'Mais vendido e completo.',
highlight: true,
btn: 'Começar Profissional',
features: [
'Clientes ilimitados',
'Orçamentos ilimitados',
'Financeiro completo',
'Controle de produção',
'Estoque completo',
'Relatórios avançados'
]
},
{
name: 'Plano Empresarial',
price: '149',
desc: 'Para grandes empresas.',
btn: 'Falar com vendas',
highlight: false,
features: [
'Tudo do Profissional',
'Múltiplos usuários',
'Controle total',
'API integração',
'Suporte VIP'
]
}
];

const formatPrice = (price) => {

if(price === '0') return 'Grátis';

return `R$ ${price},00`;

};

return (

<div className="min-h-screen bg-white">

{/* HERO */}

<section className="py-20">

<div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

<div>

<h1 className="text-5xl font-bold mb-6">

Sistema para Marmorarias

</h1>

<p className="text-lg text-stone-600 mb-6">

Controle clientes, orçamentos, produção e financeiro em um só lugar.

</p>

<Link to="/signup">

<Button size="lg">

Começar agora

<ArrowRight className="ml-2"/>

</Button>

</Link>

</div>

<div>

<img

src="/dashboard.png"

className="rounded-xl shadow-xl"

/>

</div>

</div>

</section>


{/* PRICING */}

<section className="py-24 bg-stone-50">

<div className="container mx-auto px-6">

<div className="text-center mb-16">

<h2 className="text-4xl font-bold mb-4">

Planos para cada fase do seu negócio

</h2>

<p className="text-stone-500">

Comece grátis e evolua conforme cresce

</p>

</div>

<div className="grid md:grid-cols-4 gap-8">

{plans.map((plan, i) => (

<motion.div

key={i}

initial={{ opacity: 0, y: 30 }}

animate={{ opacity: 1, y: 0 }}

>

<Card

className={`

flex flex-col

${plan.highlight

?

'border-blue-600 ring-2 ring-blue-600 scale-105'

:

''

}

`}

>

<CardContent className="p-8 flex flex-col flex-1">

<h3 className="text-xl font-bold mb-2">

{plan.name}

</h3>

<div className="text-4xl font-bold mb-4">

{formatPrice(plan.price)}

<span className="text-lg text-stone-500">

{plan.price !== '0' && '/mês'}

</span>

</div>

<p className="mb-6 text-stone-500">

{plan.desc}

</p>

<ul className="space-y-2 flex-1">

{plan.features.map((f, index) => (

<li key={index} className="flex gap-2">

<Check className="text-green-500"/>

{f}

</li>

))}

</ul>

<Button className="mt-6 w-full">

{plan.btn}

</Button>

</CardContent>

</Card>

</motion.div>

))}

</div>

</div>

</section>

</div>

);

};

export default HomePage;
