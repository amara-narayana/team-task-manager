import { create } from 'zustand';
import api from '../lib/api';

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>; // used to check token valid on page load
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('access_token'),
  isAuthenticated: false,
  setAuth: (user, token) => {
    localStorage.setItem('access_token', token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  fetchUser: async () => {
    const token = get().token;
    if (!token) return;
    try {
      const res = await api.get('/api/auth/me');
      set({ user: res.data, isAuthenticated: true });
    } catch {
      get().logout();
    }
  },
}));