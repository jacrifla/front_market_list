import { createContext, useEffect, useState } from 'react';
import userService from '../services/UserService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (!storedUser || !storedToken) {
        logout();
        setLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        const validatedUser = await userService.getById(parsedUser.userId);
        setUser(validatedUser);
        setToken(storedToken);
        localStorage.setItem('user', JSON.stringify(validatedUser));
        localStorage.setItem('token', storedToken);
      } catch (error) {
        console.error('Usuário inválido ou token expirado:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    validateUser();
  }, []);

  const login = async (credential) => {
    const res = await userService.login(credential);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const register = async (userData) => userService.createUser(userData);
  const restoreUser = async (email) => userService.restoreUser(email);

  const updateUser = async (userData) => {
    if (!user?.userId) throw new Error('Usuário não autenticado');
    const updatedUser = await userService.updateUser(user.userId, userData);
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
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
