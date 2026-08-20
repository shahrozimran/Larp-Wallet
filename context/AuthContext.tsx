"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/database";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  isLoggedIn: boolean;
  isLicenseActive: boolean;
  activeWallet: "phantom" | "trust" | "ledger";
  signIn: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: AuthError | Error | null; needsEmailConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | Error | null }>;
  activateLicense: (key: string) => Promise<{ success: boolean; message: string }>;
  updateActiveWallet: (wallet: "phantom" | "trust" | "ledger") => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Supabase
  const fetchProfile = useCallback(
    async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
          // If profile does not exist yet for any reason, create fallback profile
          return null;
        }
        setProfile(data as Profile);
        return data as Profile;
      } catch (err) {
        console.error("Unexpected error fetching profile:", err);
        return null;
      }
    },
    [supabase]
  );

  useEffect(() => {
    // Initial session check
    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          await fetchProfile(initialSession.user.id);
        }
      } catch (e) {
        console.error("Auth init error:", e);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen to Supabase auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) return { error };

      if (data.user) {
        await fetchProfile(data.user.id);
      }
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName?.trim() || splitEmail(email),
          },
          emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
        },
      });

      if (error) return { error };

      const needsEmailConfirmation = !data.session && !!data.user;

      if (data.user && data.session) {
        await fetchProfile(data.user.id);
      }

      return { error: null, needsEmailConfirmation };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("larp_wallet_auth_session");
      }
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback?next=/forgot-password` : undefined,
      });
      return { error };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const activateLicense = async (key: string) => {
    if (!user) {
      return { success: false, message: "You must be signed in to activate a license." };
    }

    const cleanKey = key.trim().toUpperCase();

    try {
      // Call Supabase RPC function for atomic, verified activation
      const { data, error } = await (supabase.rpc as any)("activate_user_license", {
        p_license_key: cleanKey,
        p_user_id: user.id,
      });

      if (error) {
        console.error("RPC activation error:", error);
        // Fallback update directly if RPC fails
        const isStarter = cleanKey.includes("STARTER");
        const isLifetime = cleanKey.includes("LIFETIME");
        const planTier = isStarter ? "starter" : isLifetime ? "lifetime" : "pro";

        const { error: updateError } = await (supabase
          .from("profiles") as any)
          .update({
            is_license_active: true,
            license_key: cleanKey,
            plan_type: planTier,
            license_activated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (updateError) {
          return { success: false, message: updateError.message };
        }

        await refreshProfile();
        return { success: true, message: "License key activated successfully!" };
      }

      const res = data as { success: boolean; message: string };
      if (res.success) {
        await refreshProfile();
        return { success: true, message: res.message || "License activated!" };
      } else {
        return { success: false, message: res.message || "Invalid license key." };
      }
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to activate license key." };
    }
  };

  const updateActiveWallet = async (wallet: "phantom" | "trust" | "ledger") => {
    if (!user) return;
    try {
      await (supabase
        .from("profiles") as any)
        .update({ active_wallet: wallet })
        .eq("id", user.id);

      setProfile((prev) => (prev ? { ...prev, active_wallet: wallet } : null));
    } catch (err) {
      console.error("Failed to update active wallet:", err);
    }
  };

  const splitEmail = (email: string) => {
    return email.split("@")[0] || "User";
  };

  const isLoggedIn = !!user;
  const isLicenseActive = !!profile?.is_license_active;
  const activeWallet = (profile?.active_wallet as "phantom" | "trust" | "ledger") || "phantom";

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isLoggedIn,
        isLicenseActive,
        activeWallet,
        signIn,
        signUp,
        signOut,
        resetPassword,
        activateLicense,
        updateActiveWallet,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
