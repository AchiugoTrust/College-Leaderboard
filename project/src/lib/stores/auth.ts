import { writable } from 'svelte/store';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'lecturer' | 'staff';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

export const authStore = writable<AuthState>(initialState);

export const logout = () => {
  authStore.set(initialState);
};