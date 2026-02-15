
import React from 'react';
import { Helmet } from 'react-helmet';
import { Package } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProductionPage = () => {
  return (
    <>
      <Helmet>
        <title>Produção - Stone ERP</title>
      </Helmet>

      <div className="flex h-screen bg-stone-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
            <Card className="max-w-md w-full border-stone-200 shadow-sm">
              <CardHeader className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-stone-100 flex items-center justify-center mb-6">
                  <Package className="h-8 w-8 text-stone-500" />
                </div>
                <CardTitle className="text-xl text-stone-900">Controle de Produção</CardTitle>
                <CardDescription className="text-stone-500">Em Desenvolvimento</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <p className="text-stone-600">
                  O módulo de rastreamento de produção e controle de chão de fábrica estará disponível em breve com status em tempo real de cada peça.
                </p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductionPage;
