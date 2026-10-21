/**
 * Supabase Frontend Client & Authentication Service
 * Seamlessly integrates Supabase Auth with automatic offline fallback.
 */

import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  SUPABASE_URL.includes('supabase.co')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const LOCAL_USER_KEY = 'yatra_ai_mock_user';

export async function getCurrentUser(): Promise<User | { email: string; id: string } | null> {
  if (isSupabaseConfigured && supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return user;
  }
  // Check local mock user
  const raw = localStorage.getItem(LOCAL_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function signInUser(email: string, password: string):Promise<{ user: any; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error: error.message };
    return { user: data.user, error: null };
  }

  // Local fallback auth
  const mockUser = {
    id: `guest-${Date.now()}`,
    email: email.trim().toLowerCase(),
    created_at: new Date().toISOString()
  };
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
  return { user: mockUser, error: null };
}

export async function signUpUser(email: string, password: string): Promise<{ user: any; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { user: null, error: error.message };
    return { user: data.user, error: null };
  }

  // Local fallback auth
  const mockUser = {
    id: `guest-${Date.now()}`,
    email: email.trim().toLowerCase(),
    created_at: new Date().toISOString()
  };
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
  return { user: mockUser, error: null };
}

export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(LOCAL_USER_KEY);
}
