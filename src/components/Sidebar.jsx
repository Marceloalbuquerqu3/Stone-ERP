
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FileText,
  Package,
  DollarSign,
  Layers,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronRight,
  CreditCard,
  CalendarDays
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Calendário', icon: CalendarDays, path: '/calendar' },
  { name: 'Clientes', icon: Users, path: '/clients' },
  { name: 'Orçamentos', icon: FileText, path: '/quotes' },
  { name: 'Produção', icon: Package, path: '/producao' },
  { name: 'Financeiro', icon: DollarSign, path: '/financeiro' },
  { name: 'Materiais', icon: Layers, path: '/materiais' },
  { name: 'Relatórios', icon: BarChart3, path: '/relatorios' },
  { name: 'Preços', icon: CreditCard, path: '/pricing' },
  { name: 'Configurações', icon: Settings, path: '/configuracoes' },
];

const Sidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3 left-4 z-50 p-2 rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-md"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div className={cn(
        "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300",
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsMobileMenuOpen(false)} />

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-stone-900 text-stone-100 flex flex-col transition-transform duration-300 ease-in-out shadow-xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Stone ERP</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden",
                      isActive
                        ? "text-white bg-stone-800 shadow-sm"
                        : "text-stone-400 hover:text-white hover:bg-stone-800/50"
                    )}
                  >
                     <div className="flex items-center gap-3 relative z-10">
                      <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-stone-200" : "text-stone-500 group-hover:text-stone-300")} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="h-3 w-3 text-stone-400 animate-in fade-in slide-in-from-left-2" />}
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-stone-800 rounded-lg"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-stone-800 bg-stone-950">
          <div className="px-4 py-3 rounded-lg bg-stone-900/50 border border-stone-800">
            <p className="text-xs font-medium text-stone-300">Stone ERP System</p>
            <p className="text-[10px] text-stone-500 mt-1">v3.2.0 • © 2026</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
