"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from './api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, role?: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (name: string, email?: string) => Promise<void>;
  isDoctor: boolean;
  setIsDoctor: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDoctor, setIsDoctor] = useState(() => {
    // Initialize isDoctor from localStorage if available
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        return parsedUser.role === 'doctor';
      }
      return false;
    }
    return false;
  });

  // Sign up new users
  const signUp = async (email: string, password: string, name: string, role: string = 'user') => {
    try {
      const response = await authAPI.register({
        name,
        email,
        password,
        role
      });
      
      // Store token and user data
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setUser(response.data.data);
        setIsDoctor(response.data.data.role === 'doctor');
      }
      
      return response;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  // Sign in existing users
  const signIn = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      
      // Store token and user data
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setUser(response.data.data);
        setIsDoctor(response.data.data.role === 'doctor');
      }
      
      return response;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await authAPI.logout();
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsDoctor(false);
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if API fails, clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsDoctor(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await authAPI.forgotPassword(email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (name: string, email?: string) => {
    try {
      const updateData: any = { name };
      if (email) updateData.email = email;
      
      const response = await authAPI.updateDetails(updateData);
      
      if (response.data.data) {
        // Update local user data
        const userData = { ...user, ...response.data.data };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Skip this check during server-side rendering
      if (typeof window === 'undefined') return;
      
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Verify token by getting user profile
          const response = await authAPI.getMe();
          setUser(response.data.data);
          setIsDoctor(response.data.data.role === 'doctor');
        }
      } catch (error) {
        // If there's an error or token is invalid, clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsDoctor(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logout,
    resetPassword,
    updateUserProfile,
    isDoctor,
    setIsDoctor
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};