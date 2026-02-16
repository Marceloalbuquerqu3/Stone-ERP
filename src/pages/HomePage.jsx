import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {

Layers,
ArrowRight,
CheckCircle,
Users,
BarChart3,
Package

} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {

const plans = [

{
name: "Grátis 7 dias",
price: "0",
button: "Começar grátis",
highlight: false,
features: [
"5 clientes",
"5 orçamentos",
"Financeiro básico"
]
},

{
name: "Starter",
price: "49",
button: "Começar Starter",
highlight: false,
features: [
"15 clientes",
"30 orçamentos",
"Gerar PDF"
]
},

{
name: "Profissional",
price: "79",
button: "Começar Profissional",
highlight: true,
features: [
"Clientes ilimitados",
"Orçamentos ilimitados",
"Estoque completo"
]
},

{
name: "Empresarial",
price: "149",
button: "Falar com vendas",
highlight: false,
features: [
"Multi usuários",
"API",
"Suporte VIP"
]
}

];

return (

<div className="bg-white">

{/* NAVBAR */}

<nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">

<div className="flex items-center gap-2">

<div className="bg-black p-2 rounded">

<Layers className="text-white"/>

</div>

<span className="font-bold text-xl">

Stone ERP

</span>

</div>

<div className="flex gap-4">

<Link to="/login">

<Button variant="ghost">

Entrar

</Button>

</Link>

<Link to="/signup">

<Button>

Começar grátis

</Button>

</Link>

</div>

</nav>


{/* HERO */}

<section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-10">


<motion.div

initial={{ opacity:0, y:40 }}

animate={{ opacity:1, y:0 }}

>

<h1 className="text-5xl font-bold leading-tight">

Sistema completo

<br/>

para Marmorarias

</h1>


<p className="text-gray-500 mt-4 text-lg">

Controle clientes, estoque e financeiro em um único lugar.

</p>


<Link to="/signup">

<Button className="mt-6">

Começar grátis

<ArrowRight className="ml-2"/>

</Button>

</Link>


</motion.div>


{/* IMAGE */}

<motion.img

initial={{ opacity:0, scale:0.9 }}

animate={{ opacity:1, scale:1 }}

transition={{ delay:0.3 }}

className="rounded-xl shadow-2xl"

src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"

/>


</section>


{/* FEATURES */}

<section className="bg-gray-50 py-20">

<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">


<Card>

<CardContent className="p-6">

<Users/>

<h3 className="font-bold mt-3">

Clientes

</h3>

<p className="text-gray-500">

Gerencie facilmente

</p>

</CardContent>

</Card>


<Card>

<CardContent className="p-6">

<BarChart3/>

<h3 className="font-bold mt-3">

Financeiro

</h3>

<p className="text-gray-500">

Controle total

</p>

</CardContent>

</Card>


<Card>

<CardContent className="p-6">

<Package/>

<h3 className="font-bold mt-3">

Estoque

</h3>

<p className="text-gray-500">

Controle completo

</p>

</CardContent>

</Card>


</div>

</section>


{/* PRICING */}

<section className="py-20 max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center mb-10">

Planos

</h2>


<div className="grid md:grid-cols-4 gap-6">

{plans.map((plan,i)=>(

<motion.div

key={i}

whileHover={{ scale:1.05 }}

>

<Card className={plan.highlight ? "border-2 border-blue-500 shadow-xl":"shadow"}>

<CardContent className="p-6">


<h3 className="font-bold text-xl">

{plan.name}

</h3>


<p className="text-4xl font-bold">

{plan.price==="0"?"Grátis":`R$${plan.price}`}

</p>


<ul className="mt-4 space-y-2">

{plan.features.map((f,i)=>(

<li key={i} className="flex gap-2">

<CheckCircle size={18}/>

{f}

</li>

))}

</ul>


<Button className="w-full mt-4">

{plan.button}

</Button>


</CardContent>

</Card>

</motion.div>

))}

</div>

</section>


{/* CTA */}

<section className="bg-black text-white text-center py-20">

<h2 className="text-4xl font-bold">

Comece grátis hoje

</h2>


<Link to="/signup">

<Button className="mt-6 bg-white text-black">

Criar conta

</Button>

</Link>


</section>


</div>

);

}
