import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time, return a mock client to prevent errors
    if (typeof window === 'undefined') {
      console.warn('Supabase environment variables not available during build')
      return null as any
    }
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
