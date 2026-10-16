import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const STORAGE_KEY = 'shopsphere_auth_user';

// Mock seed users for instant testing/demo
export const DEMO_USERS = [
  {
    id: 'usr-01',
    name: 'Alex Vance',
    email: 'alex.vance@sphere.network',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    tier: 'Visionary Member',
    joinedDate: 'October 2026',
    savedAddresses: [
      {
        id: 'addr-01',
        title: 'Studio Headquarters',
        address: '742 Evergreen Terrace, Suite 400',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94107'
      }
    ]
  },
  {
    id: 'usr-02',
    name: 'Elena Rostova',
    email: 'elena.rostova@sphere.network',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
    tier: 'Acoustic Specialist',
    joinedDate: 'September 2026',
    savedAddresses: []
  }
];

export function AuthProvider({ children }) {
  const { toastSuccess, toastInfo, toastError } = useToast();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // storage unavailable
    }
  }, [user]);

  const login = useCallback(async ({ email, password, rememberMe = true }) => {
    setIsLoading(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        const normalizedEmail = email.trim().toLowerCase();

        // Check if demo user or new registered user
        const matched = DEMO_USERS.find(u => u.email.toLowerCase() === normalizedEmail);

        if (matched) {
          const authUser = {
            ...matched,
            rememberMe,
            isDemo: true,
            lastLogin: new Date().toISOString()
          };
          setUser(authUser);
          toastSuccess('Welcome back!', `Signed in as ${authUser.name} (${authUser.tier}).`);
          resolve(authUser);
        } else {
          // Allow any valid email for flexible testing in demo mode
          const customUser = {
            id: `usr-${Date.now().toString(36)}`,
            name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            email: normalizedEmail,
            avatar: null,
            tier: 'Member',
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            rememberMe,
            isDemo: true,
            lastLogin: new Date().toISOString()
          };
          setUser(customUser);
          toastSuccess('Welcome to ShopSphere!', `Signed in as ${customUser.name}.`);
          resolve(customUser);
        }
      }, 750);
    });
  }, [toastSuccess]);

  const register = useCallback(async ({ name, email, password }) => {
    setIsLoading(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        const normalizedEmail = email.trim().toLowerCase();

        const newUser = {
          id: `usr-${Date.now().toString(36)}`,
          name: name.trim(),
          email: normalizedEmail,
          avatar: null,
          tier: 'New Visionary',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          isDemo: true,
          lastLogin: new Date().toISOString()
        };

        setUser(newUser);
        toastSuccess('Account Created!', `Welcome to ShopSphere, ${newUser.name}.`);
        resolve(newUser);
      }, 850);
    });
  }, [toastSuccess]);

  const logout = useCallback(() => {
    const prevName = user?.name || 'User';
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // storage unavailable
    }
    toastInfo('Signed Out', `${prevName} has safely signed out of ShopSphere.`);
  }, [user, toastInfo]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        demoUsers: DEMO_USERS
      }}
    >
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
