import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/endpoints/auth';
import { useAuthStore } from '../store/authStore';
import type { LoginRequest, RegisterRequest } from '../types/api';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (response) => {
      const { user, client, token } = response.data;
      setAuth(user, client, token);
      navigate('/');
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      throw error;
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => authApi.register(userData),
    onSuccess: (response) => {
      const { user, client, token } = response.data;
      setAuth(user, client, token);
      navigate('/');
    },
    onError: (error: any) => {
      console.error('Register error:', error);
      throw error;
    },
  });

  // Validate token query (runs on app mount)
  const { isLoading: isValidating } = useQuery({
    queryKey: ['validateToken'],
    queryFn: authApi.validateToken,
    enabled: !!localStorage.getItem('auth_token'),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Logout function
  const logout = () => {
    authApi.logout();
    clearAuth();
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    isValidating,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
