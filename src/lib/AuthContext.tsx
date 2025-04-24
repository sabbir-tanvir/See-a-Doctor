"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
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

  // Sign up new users
  const signUp = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Store user data in localStorage for persistence
    if (result.user) {
      storeUserData(result.user);
    }
    return result;
  };

  // Sign in existing users
  const signIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Store user data in localStorage for persistence
    if (result.user) {
      storeUserData(result.user);
    }
    return result;
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Store user data in localStorage for persistence
    if (result.user) {
      storeUserData(result.user);
    }
    return result;
  };

  // Sign out
  const logout = async () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    return signOut(auth);
  };

  // Reset password
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update user profile
  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    if (!auth.currentUser) return;
    
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL: photoURL || auth.currentUser.photoURL
    });
    
    // Update stored user data
    if (auth.currentUser) {
      storeUserData(auth.currentUser);
    }
    
    return;
  };

  // Helper function to store user data in localStorage
  const storeUserData = (user: User) => {
    try {
      // Create a serializable user object
      const userData = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
        // Add any other relevant user data here
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('authToken', 'firebase_auth_token'); // For backward compatibility
    } catch (error) {
      console.error('Error storing user data in localStorage:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      
      if (user) {
        storeUserData(user);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};