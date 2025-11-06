import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/apiAuth'
import axios from 'axios';

interface TypeAuthContext {
  nameUser: string
  userId: string;
  isAuthenticated: boolean;
  login: (name: string, userId: string) => void;
  logout: () => Promise<void>;
  loading: boolean;
  errorMessage: string;
}

const AuthContext = createContext<TypeAuthContext | undefined>(undefined);

export default function AuthProvider ({ children }: { children: ReactNode }) {
  const [nameUser, setNameUser] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true)
    const getName = localStorage.getItem('name');
    const getUserId = localStorage.getItem('userId');

    if(getName && getUserId) {
      setNameUser(getName);
      setUserId(getUserId);
    }
    setLoading(false);
  }, [])

  const login = (nameUser: string, userId: string) => {
    localStorage.setItem('name', nameUser);
    localStorage.setItem('userId', userId);
    setNameUser(nameUser);
    setUserId(userId);
  }

  const logout = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await api.post('/auth/logout');
      localStorage.clear();
      setNameUser('');
      setUserId('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Logout failed");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
    value={{
      nameUser,
      userId,
      isAuthenticated: !!nameUser,
      login,
      logout,
      loading,
      errorMessage
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};