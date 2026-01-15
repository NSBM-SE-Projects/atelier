import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,

  login: (userData) => set({
    user: userData,
    isLoggedIn: true,
  }),

  logout: () => set({
    user: null,
    isLoggedIn: false,
  }),

  setUser: (userData) => set({
    user: userData,
    isLoggedIn: !!userData,
  }),
}));

export default useAuthStore;
