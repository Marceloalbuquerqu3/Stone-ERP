import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
Check,
ArrowRight,
Star,
BarChart,
Users,
Shield,
Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {

const plans = [
{
name: "Plano Grátis 7 Dias",
price: "Grátis",
button: "Começar Teste",
highlight: false
},
{
name: "Starter",
price: "R$49",
button: "Começar Starter",
highlight: false
},
{
name: "Profissional",
price: "R$79",
button: "Começar Profissional",
highlight: true
},
{
name: "Empresarial",
price: "R$149",
button: "Falar com vendas",
highlight: false
}
];

return (

<div className="bg-white">

{/* HERO */}

<section className="py-24">

<div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

<div>

<h1 className="text-5xl font-bold mb-6">

Sistema completo para Marmorarias

</h1>

<p className="text-lg text-gray-600 mb-6">

Controle clientes, orçamentos, produção e financeiro em um só lugar.

</p>

<Link to="/signup">

<Button size="lg">

Começar grátis

<ArrowRight className="ml-2"/>

</Button>

</Link>

</div>

<img
src="/dashboard.png"
className="rounded-xl shadow-xl"
/>

</div>

</section>


{/* LOGOS */}

<section className="py-12 border-y">

<p className="text-center text-gray-500 mb-6">

Empresas que confiam

</p>

<div className="flex justify-center gap-12 opacity-60">

<span>GranitoPro</span>
<span>StoneTech</span>
<span>MarmoBrasil</span>
<span>PedraForte</span>

</div>

</section>


{/* BENEFITS */}

<section className="py-24 bg-gray-50">

<div className="container mx-auto px-6">

<h2 className="text-4xl font-bold text-center mb-16">

Tudo que você precisa

</h2>

<div className="grid md:grid-cols-3 gap-8">

<Card>

<CardContent className="p-6">

<Users/>

<h3 className="font-bold mt-4">

Clientes

</h3>

<p>

Gerencie facilmente

</p>

</CardContent>

</Card>


<Card>

<CardContent className="p-6">

<BarChart/>

<h3 className="font-bold mt-4">

Financeiro

</h3>

<p>

Controle total

</p>

</CardContent>

</Card>


<Card>

<CardContent className="p-6">

<Shield/>

<h3 className="font-bold mt-4">

Seguro

</h3>

<p>

Seus dados protegidos

</p>

</CardContent>

</Card>

</div>

</div>

</section>


{/* PRICING */}

<section className="py-24">

<div className="container mx-auto px-6">

<h2 className="text-4xl font-bold text-center mb-16">

Planos

</h2>

<div className="grid md:grid-cols-4 gap-8">

{plans.map((plan,i)=>(

<Card key={i}

className={plan.highlight ?

"border-blue-600 ring-2 ring-blue-600 scale-105":

""}

>

<CardContent className="p-6 text-center">

<h3 className="font-bold">

{plan.name}

</h3>

<p className="text-3xl font-bold my-4">

{plan.price}

</p>

<Button>

{plan.button}

</Button>

</CardContent>

</Card>

))}

</div>

</div>

</section>


{/* TESTIMONIALS */}

<section className="py-24 bg-gray-50">

<div className="container mx-auto px-6">

<h2 className="text-4xl text-center font-bold mb-16">

Depoimentos

</h2>

<div className="grid md:grid-cols-3 gap-8">

<Card>

<CardContent className="p-6">

<Star/>

<p>

Sistema incrível

</p>

<strong>

João

</strong>

</CardContent>

</Card>

<Card>

<CardContent className="p-6">

<Star/>

<p>

Melhor investimento

</p>

<strong>

Carlos

</strong>

</CardContent>

</Card>

<Card>

<CardContent className="p-6">

<Star/>

<p>

Mudou minha empresa

</p>

<strong>

Pedro

</strong>

</CardContent>

</Card>

</div>

</div>

</section>


{/* CTA */}

<section className="py-24 text-center">

<h2 className="text-4xl font-bold mb-6">

Comece agora

</h2>

<Link to="/signup">

<Button size="lg">

Criar conta grátis

</Button>

</Link>

</section>


{/* FOOTER */}

<footer className="py-12 border-t text-center text-gray-500">

© 2026 Sistema Marmoraria

</footer>


</div>

);

}
