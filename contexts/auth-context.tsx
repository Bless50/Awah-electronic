"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

interface Profile {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  avatar_url: string | null
  role: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)
  
  // Handle missing environment variables gracefully
  let supabase: any = null
  try {
    supabase = createClient()
  } catch (error) {
    console.warn('Supabase client initialization failed:', error)
  }

  const fetchProfile = useCallback(async (userId: string) => {
    if (!supabase) return
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Error fetching profile:", error)
        return
      }

      setProfile(data)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }, [supabase])

  useEffect(() => {
    setIsHydrated(true)
    
    if (!supabase) {
      setLoading(false)
      return
    }
    
    const fetchUserProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

        if (error) {
          console.error("Error fetching profile:", error)
          return
        }

        setProfile(data)
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
          await fetchUserProfile(session.user.id)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error getting session:', error)
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          setUser(session.user)
          await fetchUserProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    } catch (error) {
      console.error('Error setting up auth listener:', error)
      setLoading(false)
    }
  }, [supabase])

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!supabase) return { error: 'Authentication not available' }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
          data: {
            full_name: fullName,
          },
        },
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: 'Authentication not available' }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: "No user logged in" }
    if (!supabase) return { error: 'Authentication not available' }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", user.id)
        .select()
        .single()

      if (error) return { error }

      setProfile(data)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
  }

  // Prevent hydration mismatch by providing consistent initial state
  if (!isHydrated) {
    return (
      <AuthContext.Provider value={{
        user: null,
        profile: null,
        loading: true,
        signUp: async () => ({ error: null }),
        signIn: async () => ({ error: null }),
        signOut: async () => {},
        updateProfile: async () => ({ error: null }),
        refreshProfile: async () => {},
      }}>
        {children}
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
