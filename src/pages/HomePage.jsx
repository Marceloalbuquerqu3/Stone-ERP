import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

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
btn: 'Começar Profissional',
highlight: true,
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

<section className="py-24">

<div className="container mx-auto px-6">

<div className="text-center mb-16">

<h2 className="text-4xl font-bold text-stone-900 mb-4">

Planos para cada fase do seu negócio

</h2>

<p className="text-stone-500 text-lg">

Comece grátis e evolua conforme cresce

</p>

</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-8">

{plans.map((plan, i) => (

<motion.div
key={i}
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: i * 0.1 }}
>

<Card

className={`

relative
flex
flex-col
rounded-2xl
transition-all
duration-300
hover:scale-105

${plan.highlight

? 'border-blue-600 shadow-2xl ring-2 ring-blue-600 scale-105'

: 'border-stone-200 shadow-md'

}

`}

>

{plan.highlight && (

<div className="absolute -top-4 left-1/2 -translate-x-1/2">

<span className="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow">

MAIS POPULAR

</span>

</div>

)}

<CardContent className="p-8 flex flex-col flex-1">

<h3 className="text-xl font-bold mb-3">

{plan.name}

</h3>

<div className="mb-4">

<span className="text-4xl font-extrabold text-stone-900">

{formatPrice(plan.price)}

</span>

{plan.price !== '0' && (

<span className="text-stone-500 ml-1">

/mês

</span>

)}

</div>

<p className="text-stone-500 mb-6">

{plan.desc}

</p>

<ul className="space-y-3 mb-8 flex-1">

{plan.features.map((feature, index) => (

<li key={index} className="flex items-center gap-2">

<Check className="h-4 w-4 text-green-500"/>

<span className="text-sm">

{feature}

</span>

</li>

))}

</ul>

<Link to="/signup">

<Button

className={`

w-full
font-semibold
h-11

${plan.highlight

? 'bg-blue-600 hover:bg-blue-700 text-white'

: 'bg-stone-900 hover:bg-stone-800 text-white'

}

`}

>

{plan.btn}

</Button>

</Link>

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
