import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layers,
  ArrowRight,
  Check,
  Users,
  FileText,
  BarChart,
  Package,
  Zap,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="border-b border-stone-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-stone-900 flex items-center justify-center">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-stone-900 tracking-tight">
              Stone ERP
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-stone-600 hover:text-stone-900 font-medium"
            >
              Funcionalidades
            </a>
            <a
              href="#pricing"
              className="text-stone-600 hover:text-stone-900 font-medium"
            >
              Planos
            </a>
            <a
              href="#testimonials"
              className="text-stone-600 hover:text-stone-900 font-medium"
            >
              Depoimentos
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-stone-600 hover:text-stone-900 font-semibold"
              >
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 tracking-tight mb-8 leading-[1.1]">
              A gestão da sua marmoraria <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
