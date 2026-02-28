import { createContext, useContext, useState } from 'react';
import { api } from './api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  async function login(email, password) {
    const { token } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', token);
    setToken(token);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
