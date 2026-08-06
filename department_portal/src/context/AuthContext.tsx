import React, { createContext, useContext, useState } from 'react';

export interface DeptStaffUser {
  id: string;
  name: string;
  email: string;
  role: 'department_staff' | 'department_head';
  departmentId: string;
  departmentCode: 'BBMP_ROAD' | 'BBMP_SWM' | 'BWSSB_WATER' | 'BESCOM_ELEC';
  departmentName: string;
}

export const TEST_DEPT_ACCOUNTS: Record<string, DeptStaffUser> = {
  BBMP_ROAD: {
    id: 'a1111111-1111-1111-1111-111111111111',
    name: 'Road Inspector Kumar',
    email: 'road_officer@bbmp.gov.in',
    role: 'department_staff',
    departmentId: '11111111-1111-1111-1111-111111111111',
    departmentCode: 'BBMP_ROAD',
    departmentName: 'BBMP Road Infrastructure & Engineering',
  },
  BBMP_SWM: {
    id: 'a2222222-2222-2222-2222-222222222222',
    name: 'SWM Inspector Dr. Ramesh',
    email: 'garbage_officer@bbmp.gov.in',
    role: 'department_staff',
    departmentId: '22222222-2222-2222-2222-222222222222',
    departmentCode: 'BBMP_SWM',
    departmentName: 'BBMP Solid Waste Management & Sanitation',
  },
  BWSSB_WATER: {
    id: 'a3333333-3333-3333-3333-333333333333',
    name: 'Water Engineer Suresh',
    email: 'water_officer@bwssb.gov.in',
    role: 'department_staff',
    departmentId: '33333333-3333-3333-3333-333333333333',
    departmentCode: 'BWSSB_WATER',
    departmentName: 'Bengaluru Water Supply & Sewerage Board',
  },
  BESCOM_ELEC: {
    id: 'a4444444-4444-4444-4444-444444444444',
    name: 'Electrical Officer Prakash',
    email: 'electrical_officer@bescom.gov.in',
    role: 'department_staff',
    departmentId: '44444444-4444-4444-4444-444444444444',
    departmentCode: 'BESCOM_ELEC',
    departmentName: 'BESCOM Electrical & Streetlighting Grid',
  },
};

interface DeptAuthContextType {
  user: DeptStaffUser | null;
  isAuthenticated: boolean;
  switchDepartment: (deptCode: 'BBMP_ROAD' | 'BBMP_SWM' | 'BWSSB_WATER' | 'BESCOM_ELEC') => void;
  logout: () => void;
}

const DeptAuthContext = createContext<DeptAuthContextType | undefined>(undefined);

export const DeptAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DeptStaffUser | null>(TEST_DEPT_ACCOUNTS.BBMP_ROAD);

  const switchDepartment = (deptCode: 'BBMP_ROAD' | 'BBMP_SWM' | 'BWSSB_WATER' | 'BESCOM_ELEC') => {
    if (TEST_DEPT_ACCOUNTS[deptCode]) {
      setUser(TEST_DEPT_ACCOUNTS[deptCode]);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <DeptAuthContext.Provider value={{ user, isAuthenticated: !!user, switchDepartment, logout }}>
      {children}
    </DeptAuthContext.Provider>
  );
};

export const useDeptAuth = () => {
  const context = useContext(DeptAuthContext);
  if (!context) throw new Error('useDeptAuth must be used within DeptAuthProvider');
  return context;
};
