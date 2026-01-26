import { createClient } from '@supabase/supabase-js';

const getEnvVar = (viteKey: string, nodeKey: string, fallback = '') => {
  const vite = (typeof import.meta !== 'undefined' && (import.meta as any)?.env) ? (import.meta as any).env[viteKey] : undefined;
  const node = (typeof process !== 'undefined') ? (process.env as any)[nodeKey] : undefined;
  return vite ?? node ?? fallback;
};

const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL', 'SUPABASE_URL', '');
const SUPABASE_ANON_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY', '');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase credentials. Set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (Vite) or SUPABASE_URL / SUPABASE_ANON_KEY (Node/CI).');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);