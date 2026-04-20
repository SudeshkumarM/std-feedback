/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Lazy initialization to prevent app crash if environment variables are missing
let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error(
        'Supabase configuration missing. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment.'
      );
      // Return a dummy client or throw a descriptive error when used
      // For now, we'll try to create it and let it fail with a better message if needed, 
      // but only when getSupabase() is called.
    }
    
    if (!supabaseUrl) {
      throw new Error('VITE_SUPABASE_URL is required to initialize Supabase client.');
    }
    if (!supabaseAnonKey) {
      throw new Error('VITE_SUPABASE_ANON_KEY is required to initialize Supabase client.');
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

// For backward compatibility, but this might still crash if imported as a variable 
// depending on how the module is evaluated. Better to export a proxy or a getter.
// Given the grep results, I will update those files to use getSupabase() or a proxy.
export const supabase = new Proxy({} as SupabaseClient, {
  get: (target, prop) => {
    return (getSupabase() as any)[prop];
  }
});
