import { createContext, useEffect, useState } from 'react';
import userService from '../services/UserService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storeToken = localStorage.getItem('token');

        if (storedUser && storeToken) {
          setUser(storedUser);
          setToken(storeToken);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário: ', error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

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

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const register = async (userData) => {
    return userService.createUser(userData);
  };

  const restoreUser = async (email) => {
    return userService.restoreUser(email);
  };

  const updateUser = async (userData) => {
    if (!user || !user.userId) throw new Error("Usuário não autenticado");

    try {
      const updateUser = await userService.updateUser(user.userId, userData);
      setUser(updateUser);
      localStorage.setItem('user', JSON.stringify(updateUser));

      return updateUser;
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
