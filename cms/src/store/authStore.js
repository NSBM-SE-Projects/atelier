import { create } from 'zustand';
import api from '../lib/api';

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('adminToken'),
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post('/admin/login', { username, password });

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        set({ isAuthenticated: true, isLoading: false, error: null });
        return { success: true };
      } else {
        set({ isLoading: false, error: response.data.message });
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  logout: async () => {
    try {
      await api.post('/admin/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      set({ isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      set({ isAuthenticated: false });
      return false;
    }

    try {
      const response = await api.get('/admin/validate');
      const isValid = response.data.valid;
      set({ isAuthenticated: isValid });
      return isValid;
    } catch (error) {
      localStorage.removeItem('adminToken');
      set({ isAuthenticated: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
