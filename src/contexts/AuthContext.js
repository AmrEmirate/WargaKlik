'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../utils/api';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext({});

/**
 * Secure cookie options
 * FIX: Added sameSite:'strict' to prevent CSRF attacks
 * Note: HttpOnly cannot be set via js-cookie (client-side only)
 * The backend should ideally set these via Set-Cookie headers instead.
 */
const COOKIE_OPTS_ACCESS = {
  expires: 1 / 24,      // 1 hour
  sameSite: 'strict',   // FIX: prevents CSRF
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
};

const COOKIE_OPTS_REFRESH = {
  expires: 7,           // 7 days
  sameSite: 'strict',   // FIX: prevents CSRF
  secure: process.env.NODE_ENV === 'production',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.data);
          }
        } catch (err) {
          console.error('Auth initialization failed:', err.message);
          Cookies.remove('token');
          Cookies.remove('refreshToken');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (identifier, password) => {
    const res = await api.post('/auth/login', { identifier, password });
    if (res.data.success) {
      const { user: userData, accessToken, refreshToken } = res.data.data;
      // FIX: Secure cookie flags
      Cookies.set('token', accessToken, COOKIE_OPTS_ACCESS);
      Cookies.set('refreshToken', refreshToken, COOKIE_OPTS_REFRESH);
      setUser(userData);
      return res.data;
    }
    throw new Error('Login failed');
  };

  const logout = async () => {
    try {
      const refreshToken = Cookies.get('refreshToken');
      // FIX: Revoke refresh token on server side
      if (refreshToken) {
        await api.post('/auth/logout', { refresh_token: refreshToken }).catch(() => {});
      }
    } finally {
      Cookies.remove('token');
      Cookies.remove('refreshToken');
      setUser(null);
      router.push('/login');
    }
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (Array.isArray(roles)) return roles.includes(user.role);
    return user.role === roles;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasRole, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
