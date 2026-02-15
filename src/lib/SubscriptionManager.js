
export const PLANS = {
  FREEMIUM: {
    id: 'freemium',
    name: 'Plano Grátis 7 Dias',
    price: 0,
    limits: {
      clients: 5,
      quotes: 5,
      financial: 50, // transactions per month
      storage: 100, // MB
      pdf: false,
      reports: false,
      team: false
    }
  },
  STARTER: {
    id: 'starter',
    name: 'Starter',
    price: 30,
    limits: {
      clients: 50,
      quotes: 50,
      financial: false, // Sem financeiro avançado
      storage: 1024,
      pdf: true,
      reports: false,
      team: false
    }
  },
  PROFISSIONAL: {
    id: 'profissional',
    name: 'Profissional',
    price: 59.90,
    limits: {
      clients: Infinity,
      quotes: Infinity,
      financial: true,
      storage: 10240,
      pdf: true,
      reports: true,
      team: false
    }
  },
  EMPRESARIAL: {
    id: 'empresarial',
    name: 'Empresarial',
    price: 99,
    limits: {
      clients: Infinity,
      quotes: Infinity,
      financial: true,
      storage: Infinity,
      pdf: true,
      reports: true,
      team: true // Multi-usuários
    }
  }
};

export const checkPlanLimits = (type, currentUsage, planId) => {
  const plan = Object.values(PLANS).find(p => p.id === planId) || PLANS.FREEMIUM;
  const limit = plan.limits[type];

  // If feature is boolean (enabled/disabled)
  if (typeof limit === 'boolean') {
    return {
      permitido: limit,
      mensagem: limit ? '' : `Funcionalidade indisponível no plano ${plan.name}. Faça upgrade para acessar.`,
      limite: limit ? 'Sim' : 'Não',
      uso: 0
    };
  }

  // If feature is numeric limit
  if (limit === Infinity) {
    return {
      permitido: true,
      mensagem: '',
      limite: Infinity,
      uso: currentUsage
    };
  }

  const permitido = currentUsage < limit;
  return {
    permitido,
    mensagem: permitido ? '' : `Você atingiu o limite de ${type} do plano ${plan.name} (${limit}). Faça upgrade para continuar.`,
    limite: limit,
    uso: currentUsage
  };
};

export const getPlanDetails = (planId) => {
  return Object.values(PLANS).find(p => p.id === planId?.toLowerCase()) || PLANS.FREEMIUM;
};
