import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
{
name: 'Plano Grátis 7 Dias',
price: 'Grátis',
button: 'Começar Teste',
features: [
'Até 5 clientes',
'Até 5 orçamentos',
'Financeiro básico',
'Suporte email'
]
},
{
name: 'Starter',
price: 'R$49',
button: 'Começar Starter',
features: [
'Até 15 clientes',
'Até 30 orçamentos',
'Gerar PDF',
'Financeiro completo'
]
},
{
name: 'Profissional',
price: 'R$79',
button: 'Começar Profissional',
highlight: true,
features: [
'Clientes ilimitados',
'Orçamentos ilimitados',
'Estoque',
'Relatórios'
]
},
{
name: 'Empresarial',
price: 'R$149',
button: 'Falar com vendas',
features: [
'Múltiplos usuários',
'API',
'Suporte VIP'
]
}
]

export default function HomePage() {

return (

<div>

{/* HERO */}

<section className="py-24">

<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">


<div>

<h1 className="text-5xl font-bold mb-4">

Sistema completo para Marmorarias

</h1>

<p className="text-xl text-gray-600 mb-6">

Controle clientes, financeiro e produção em um só lugar

</p>

<Link to="/signup">

<Button size="lg">

Começar grátis

</Button>

</Link>

</div>


<img

src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"

className="rounded-xl shadow-xl"

/>

</div>

</section>


{/* PLANOS */}

<section className="py-24 bg-gray-50">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center mb-12">

Planos

</h2>


<div className="grid md:grid-cols-4 gap-6">


{plans.map(plan => (

<div

className={`bg-white p-6 rounded-xl shadow-md ${
plan.highlight && 'border-2 border-blue-600 scale-105'
}`}

>


<h3 className="text-xl font-bold">

{plan.name}

</h3>


<div className="text-3xl font-bold my-4">

{plan.price}

</div>


<ul className="space-y-2 mb-6">

{plan.features.map(f => (

<li className="flex gap-2">

<Check size={16}/>

{f}

</li>

))}

</ul>


<Button className="w-full">

{plan.button}

</Button>


</div>

))}


</div>

</div>

</section>


{/* CTA */}

<section className="py-24 text-center">

<h2 className="text-4xl font-bold mb-6">

Comece agora

</h2>

<Button size="lg">

Criar conta grátis

</Button>

</section>


</div>

)

}
