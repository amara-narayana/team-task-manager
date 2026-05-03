import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import { useAuthStore } from '../store/useAuthStore';

interface SignupData {
  email: string;
  password: string;
  full_name: string;
}

interface LoginData {
  email: string;
  password: string;
}

export function useSignup() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (data: SignupData) => api.post('/api/auth/signup', data),
    onSuccess: (res) => {
      setAuth(res.data.user, res.data.access_token);
    },
  });
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (data: LoginData) => api.post('/api/auth/login', data),
    onSuccess: (res) => {
      setAuth(res.data.user, res.data.access_token);
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  return () => logout();
}