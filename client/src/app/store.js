import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      token: null,
      login: (user, token) =>
        set({ currentUser: user, isAuthenticated: true, token }),
      logout: () =>
        set({ currentUser: null, isAuthenticated: false, token: null }),
      setUser: (user) => set({ currentUser: user }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useEventStore = create((set) => ({
  events: [],
  loading: false,
  error: null,
  setEvents: (events) => set({ events }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
