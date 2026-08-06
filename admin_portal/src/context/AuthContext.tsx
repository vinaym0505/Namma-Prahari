import React, { createContext, useContext, useState, useEffect } from 'react';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin' | 'department_staff' | 'department_head';
  departmentId?: string;
  departmentName?: string;
}

interface AuthContextType {
  user: StaffUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: string) => Promise<void>;
  logout: () => void;
}

const DEFAULT_ADMIN: StaffUser = {
  id: 'a9999999-9999-9999-9999-999999999999',
  name: 'City Command Admin',
  email: 'admin@nammaprahari.gov.in',
  role: 'admin',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StaffUser | null>(DEFAULT_ADMIN);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, role: string = 'admin') => {
    setIsLoading(true);
    // Simulate auth check / Supabase login
    setUser({
      id: 'a9999999-9999-9999-9999-999999999999',
      name: email.split('@')[0],
      email: email,
      role: role as StaffUser['role'],
    });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AuthProvider');
  return context;
};
