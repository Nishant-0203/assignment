import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if token exists and fetch user data on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/api/auth/me');
        if (data.success) {
          setUser(data.data);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Failed to load user session', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      });
      return { success: true };
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Registration failed';
      setError(errMsg);
      setLoading(false);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      });
      return { success: true };
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Login failed';
      setError(errMsg);
      setLoading(false);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAdmin = user && user.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAdmin,
        isAuthenticated: !!user,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
