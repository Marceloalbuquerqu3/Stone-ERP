import React from 'react';
import { Helmet } from 'react-helmet';
import { Check, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PricingPage = () => {
  return (
    <div className="flex h-screen bg-stone-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Header />

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">

          <Helmet>
            <title>Preços - Stone ERP</title>
          </Helmet>

          <div className="text-center max-w-2xl mx-auto mb-12">

            <h1 className="text-3xl font-bold text-stone-900 tracking-tight mb-4">

              Planos Flexíveis para sua Marmoraria

            </h1>

            <p className="text-stone-500 text-lg">

              Teste grátis por 7 dias. Sem compromisso.

            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto items-end">


            {/* PLANO GRÁTIS 7 DIAS */}

            <Card className="rounded-2xl border-emerald-500 border-2 shadow-sm bg-white hover:shadow-lg transition-all duration-300">

              <CardHeader className="p-8">

                <CardTitle className="text-xl font-bold text-stone-900">

                  Plano Grátis 7 Dias

                </CardTitle>


                <div className="mt-4 flex items-baseline text-emerald-600">

                  <span className="text-4xl font-extrabold tracking-tight">

                    Grátis

                  </span>

                </div>


                <CardDescription className="mt-4 text-stone-500">

                  Teste todas as funcionalidades gratuitamente.

                </CardDescription>

              </CardHeader>


              <CardContent className="p-8 pt-0">

                <ul className="space-y-4">

                  {[

                    'Clientes ilimitados',

                    'Orçamentos ilimitados',

                    'Financeiro completo',

                    'Produção completa',

                    'Suporte básico'

                  ].map((feature) => (

                    <li key={feature} className="flex items-start">

                      <Check className="h-5 w-5 text-emerald-500" />

                      <p className="ml-3 text-sm text-stone-600">

                        {feature}

                      </p>

                    </li>

                  ))}

                </ul>

              </CardContent>


              <CardFooter className="p-8 pt-0">

                <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-600 font-semibold group">

                  Começar teste grátis

                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />

                </Button>

              </CardFooter>

            </Card>



            {/* PLANO BÁSICO */}

            <Card className="rounded-2xl border-stone-200 shadow-sm bg-white hover:shadow-lg transition-all duration-300">

              <CardHeader className="p-8">

                <CardTitle className="text-xl font-bold text-stone-900">

                  Plano Básico

                </CardTitle>


                <div className="mt-4 flex items-baseline text-stone-900">

                  <span className="text-4xl font-extrabold tracking-tight">

                    R$29

                  </span>

                  <span className="ml-1 text-xl font-semibold text-stone-500">

                    /mês

                  </span>

                </div>


                <CardDescription className="mt-4 text-stone-500">

                  Para pequenas marmorarias.

                </CardDescription>

              </CardHeader>


              <CardFooter className="p-8 pt-0">

                <Button className="w-full bg-stone-100 text-stone-900 hover:bg-stone-200 font-semibold group">

                  Assinar

                </Button>

              </CardFooter>

            </Card>



            {/* PLANO PRO */}

            <Card className="rounded-2xl border-stone-200 shadow-xl bg-white relative scale-105 z-10 border-t-4 border-t-stone-900">


              <div className="absolute top-0 right-0 -mt-3 mr-4">

                <Badge className="bg-stone-900 text-white">

                  MAIS POPULAR

                </Badge>

              </div>


              <CardHeader className="p-8">

                <CardTitle className="text-xl font-bold text-stone-900">

                  Plano Pro

                </CardTitle>


                <div className="mt-4 flex items-baseline text-stone-900">

                  <span className="text-5xl font-extrabold tracking-tight">

                    R$49

                  </span>

                  <span className="ml-1 text-xl font-semibold text-stone-500">

                    /mês

                  </span>

                </div>


                <CardDescription className="mt-4 text-stone-500">

                  Melhor custo benefício.

                </CardDescription>

              </CardHeader>


              <CardFooter className="p-8 pt-0">

                <Button className="w-full bg-stone-900 text-white hover:bg-stone-800 font-semibold h-12 text-base group shadow-lg">

                  Assinar

                </Button>

              </CardFooter>

            </Card>



            {/* EMPRESARIAL */}

            <Card className="rounded-2xl border-stone-200 shadow-sm bg-white hover:shadow-lg transition-all duration-300">

              <CardHeader className="p-8">

                <CardTitle className="text-xl font-bold text-stone-900">

                  Empresarial

                </CardTitle>


                <div className="mt-4 flex items-baseline text-stone-900">

                  <span className="text-4xl font-extrabold tracking-tight">

                    R$99

                  </span>

                  <span className="ml-1 text-xl font-semibold text-stone-500">

                    /mês

                  </span>

                </div>

              </CardHeader>


              <CardFooter className="p-8 pt-0">

                <Button className="w-full bg-stone-100 text-stone-900 hover:bg-stone-200 font-semibold group">

                  Assinar

                </Button>

              </CardFooter>

            <
