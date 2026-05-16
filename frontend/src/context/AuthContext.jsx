import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';
import { getToken, getUser, setToken, setUser, clearAuth } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!getToken() && !!user;

  // Verify token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await authAPI.getProfile();
        if (data.success) {
          setUserState(data.data.user);
          setUser(data.data.user, localStorage.getItem('flux_remember') === 'true');
        }
      } catch {
        clearAuth();
        setUserState(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password, remember = false) => {
    const { data } = await authAPI.login({ email, password });
    if (data.success) {
      setToken(data.data.token, remember);
      setUser(data.data.user, remember);
      setUserState(data.data.user);
    }
    return data;
  }, []);

  const register = useCallback(async (name, email, password, remember = false) => {
    const { data } = await authAPI.register({ name, email, password });
    if (data.success) {
      setToken(data.data.token, remember);
      setUser(data.data.user, remember);
      setUserState(data.data.user);
    }
    return data;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
