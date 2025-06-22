import { createContext, useEffect, useState } from 'react';
import userService from '../services/UserService'; // Importa o serviço certo

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado do usuário e token
  const [user, setUser] = useState(() => {
    // Tenta puxar o user do localStorage na primeira render
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      // Se não tem user ou token no storage, limpa tudo
      if (!user || !token) {
        logout();
        setLoading(false);
        return;
      }

      try {
        // Busca usuário atualizado pelo id usando getById do serviço
        const validatedUser = await userService.getById(user.userId);
        setUser(validatedUser);
        setToken(token);
        // Atualiza localStorage com dados "frescos"
        localStorage.setItem('user', JSON.stringify(validatedUser));
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Usuário inválido ou token expirado:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    validateUser();
  }, []); // Roda só na primeira carga do contexto

  // Login: chama o serviço, guarda token e user no estado e storage
  const login = async (credential) => {
    try {
      const res = await userService.login(credential);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    } catch (error) {
      console.error('Erro ao fazer login: ', error);
      throw error;
    }
  };

  // Logout: limpa estado e localStorage
  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Registro de usuário
  const register = async (userData) => {
    return userService.createUser(userData);
  };

  // Recuperação de usuário (email)
  const restoreUser = async (email) => {
    return userService.restoreUser(email);
  };

  // Atualização dos dados do usuário autenticado
  const updateUser = async (userData) => {
    if (!user || !user.userId) throw new Error("Usuário não autenticado");

    try {
      const updatedUser = await userService.updateUser(user.userId, userData);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar usuário: ', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        register,
        restoreUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
