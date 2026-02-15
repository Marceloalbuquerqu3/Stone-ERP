
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCompany } from '@/contexts/CompanyContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, Settings, CreditCard, Sparkles, Clock, CalendarDays, Moon, Sun, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import UpgradeModal from './UpgradeModal';

const Header = () => {
  const { user, logout } = useAuth();
  const { company, plan } = useCompany();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso.",
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getTrialDaysLeft = () => {
    if (!company?.trialStartDate) return 0;
    const start = new Date(company.trialStartDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, 7 - diffDays); // Updated to 7 days as per plan name
  };
  const trialDaysLeft = getTrialDaysLeft();

  const defaultLogo = "https://horizons-cdn.hostinger.com/e704d4c7-5d40-4f8d-aed0-5fb6cd955e70/e515c8efa5340c740a50fdf641c51d86.png";

  return (
    <header className="h-16 border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-all">
      <div className="flex items-center gap-4">
        {company && (
          <div className="hidden md:flex items-center gap-3">
             <div className="h-8 w-8 rounded-md overflow-hidden bg-stone-100 flex items-center justify-center border border-stone-200">
               <img src={company.logo || defaultLogo} alt="Company Logo" className="h-full w-full object-cover" />
             </div>
             <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">{company.name}</span>
          </div>
        )}
      </div>
      
      <div className="hidden lg:flex items-center gap-3">
        {company && plan?.id === 'freemium' && (
          <div className="flex items-center gap-2">
            <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-amber-200">
               <Clock className="h-3 w-3" />
               {trialDaysLeft} dias restantes
            </div>
            <Button 
              onClick={() => setShowUpgradeModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-md h-8 text-xs font-semibold px-4 rounded-full flex items-center gap-2"
            >
              <Sparkles className="h-3 w-3" />
              FAZER UPGRADE
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-full">
           {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button
               variant="ghost"
               size="icon"
               className="relative text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full"
             >
               <Bell className="h-5 w-5" />
               {unreadCount > 0 && <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-stone-950"></span>}
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent className="w-80 dark:bg-stone-900 dark:border-stone-800" align="end">
              <DropdownMenuLabel className="dark:text-stone-100 flex justify-between items-center">
                 Notificações
                 {notifications.length > 0 && <span className="text-xs font-normal text-stone-500 cursor-pointer hover:underline" onClick={clearAll}>Limpar</span>}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-stone-800" />
              <div className="max-h-[300px] overflow-y-auto">
                 {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-stone-500 dark:text-stone-400">Nenhuma notificação.</div>
                 ) : (
                    notifications.map(n => (
                       <DropdownMenuItem key={n.id} onClick={() => markAsRead(n.id)} className={`flex flex-col items-start p-3 cursor-pointer dark:focus:bg-stone-800 ${n.read ? 'opacity-60' : 'bg-blue-50/50 dark:bg-blue-900/10'}`}>
                          <div className="flex justify-between w-full">
                             <span className="font-medium text-sm dark:text-stone-200">{n.message}</span>
                             {!n.read && <span className="h-2 w-2 rounded-full bg-blue-500 mt-1"></span>}
                          </div>
                          <span className="text-[10px] text-stone-400 mt-1">{new Date(n.created_at).toLocaleDateString()}</span>
                       </DropdownMenuItem>
                    ))
                 )}
              </div>
           </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-stone-100 dark:ring-stone-800 hover:ring-stone-200 dark:hover:ring-stone-700 transition-all p-0 overflow-hidden">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatar} alt={user?.name} className="object-cover" />
                <AvatarFallback className="bg-stone-800 text-stone-100 font-medium">
                  {getInitials(user?.name || user?.email)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 dark:bg-stone-900 dark:border-stone-800" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-stone-900 dark:text-stone-100">{user?.name || 'Usuário'}</p>
                <p className="text-xs leading-none text-stone-500 dark:text-stone-400 font-normal truncate">
                  {user?.email}
                </p>
                {company && (
                  <div className="pt-2 flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] px-1.5 h-5 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-normal">
                      {plan?.name || 'Gratuito'}
                    </Badge>
                  </div>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-stone-800" />
            <DropdownMenuItem onClick={() => navigate('/meu-plano')} className="cursor-pointer text-stone-600 dark:text-stone-400 focus:text-stone-900 dark:focus:text-stone-100 focus:bg-stone-50 dark:focus:bg-stone-800 p-2.5">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Meu Plano</span>
            </DropdownMenuItem>
             <DropdownMenuItem onClick={() => navigate('/calendar')} className="cursor-pointer text-stone-600 dark:text-stone-400 focus:text-stone-900 dark:focus:text-stone-100 focus:bg-stone-50 dark:focus:bg-stone-800 p-2.5">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>Calendário de Produção</span>
            </DropdownMenuItem>
             <DropdownMenuItem onClick={() => navigate('/equipe')} className="cursor-pointer text-stone-600 dark:text-stone-400 focus:text-stone-900 dark:focus:text-stone-100 focus:bg-stone-50 dark:focus:bg-stone-800 p-2.5">
              <Users className="mr-2 h-4 w-4" />
              <span>Equipe</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/configuracoes')} className="cursor-pointer text-stone-600 dark:text-stone-400 focus:text-stone-900 dark:focus:text-stone-100 focus:bg-stone-50 dark:focus:bg-stone-800 p-2.5">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-stone-800" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-900/10 p-2.5">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </header>
  );
};

export default Header;
