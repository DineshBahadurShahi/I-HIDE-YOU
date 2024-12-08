import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { generateRandomUsername } from '../utils/username';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call - in production, this would be a real API call
      const username = generateRandomUsername();
      setUser({
        id: crypto.randomUUID(),
        username,
        email
      });
      
      toast.success('Successfully logged in!');
      navigate('/rooms');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setUser({
        id: crypto.randomUUID(),
        username,
        email
      });
      
      toast.success('Account created successfully!');
      navigate('/rooms');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}