import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Client } from '../types/api';

interface AuthState {
  user: User | null;
  client: Client | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, client: Client, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      client: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, client, token) => {
        localStorage.setItem('auth_token', token);
        set({
          user,
          client,
          token,
          isAuthenticated: true,
        });
      },

      clearAuth: () => {
        localStorage.removeItem('auth_token');
        set({
          user: null,
          client: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        client: state.client,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
