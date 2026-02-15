
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao ler usuário:', error);
        localStorage.removeItem('authUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    if (password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    }

    // Mock login logic
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      name: email.split('@')[0], // Use part of email as name mock
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email.split('@')[0]}`,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('authUser', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);

    return mockUser;
  };

  const signup = async (email, password, confirmPassword, name) => {
    if (!email || !password || !confirmPassword || !name) {
      throw new Error('Todos os campos são obrigatórios');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Por favor, insira um email válido');
    }

    if (password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    }

    if (password !== confirmPassword) {
      throw new Error('As senhas não coincidem');
    }

    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      name: name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('authUser', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);

    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
