import apiClient from '../axios-client';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ValidateTokenResponse,
} from '../../types/api';

export const authApi = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  /**
   * Register a new user (first user creates the client)
   */
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', userData);
    return data;
  },

  /**
   * Validate current auth token
   */
  validateToken: async (): Promise<ValidateTokenResponse> => {
    const { data } = await apiClient.post<ValidateTokenResponse>('/auth/validate');
    return data;
  },

  /**
   * Logout (client-side only - clear token)
   */
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },
};
