import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const PricingPage = () => {

const plans = [

{
name: "Plano Grátis 7 Dias",
price: "0",
desc: "Teste grátis por 7 dias",
features: [
"5 clientes",
"5 orçamentos",
"Financeiro básico",
"Suporte email"
],
highlight: false
},

{
name: "Starter",
price: "49",
desc: "Para pequenas empresas",
features: [
"15 clientes",
"30 orçamentos",
"Financeiro completo",
"PDF"
],
highlight: false
},

{
name: "Profissional",
price: "79",
desc: "Mais vendido",
features: [
"Clientes ilimitados",
"Orçamentos ilimitados",
"Produção",
"Estoque",
"Relatórios"
],
highlight: true
},

{
name: "Empresarial",
price: "149",
desc: "Empresas grandes",
features: [
"Usuários ilimitados",
"API",
"Suporte VIP",
"Tudo liberado"
],
highlight: false
}

];


return (

<div className="flex h-screen">

<Sidebar />

<div className="flex-1">

<Header />

<main className="p-10">

<h1 className="text-3xl font-bold mb-10">

Planos

</h1>


<div className="grid grid-cols-4 gap-6">


{plans.map((plan,index)=> (


<Card key={index}

className={plan.highlight

?

"border-blue-500 shadow-xl"

:

"border"

}

>


<CardHeader>

<CardTitle>

{plan.name}

</CardTitle>


<CardDescription>

R${plan.price}/mês

</CardDescription>


</CardHeader>


<CardContent>


{plan.features.map((item,i)=>(


<div key={i} className="flex gap-2 mb-2">

<Check size={16}/>

{item}

</div>


))}


</CardContent>


<CardFooter>


<Button className="w-full">

Começar

</Button>


</CardFooter>


</Card>


))}


</div>

</main>

</div>

</div>

);

};

export default PricingPage;
