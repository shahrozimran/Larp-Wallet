"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/plans";

  const { signUp, isLoggedIn, loading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push(redirectPath);
    }
  }, [loading, isLoggedIn, redirectPath, router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const { error, needsEmailConfirmation } = await signUp(
        email,
        password,
        fullName
      );

      if (error) {
        setErrorMessage(error.message || "Failed to create account.");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);

      if (needsEmailConfirmation) {
        setSuccessMessage(
          "Registration successful! Please check your email to confirm your account."
        );
      } else {
        setSuccessMessage("Account created successfully! Redirecting...");
        setTimeout(() => {
          router.push(redirectPath);
        }, 800);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl glass-card-dark border border-[#7c5ce8]/30 shadow-[0_0_50px_rgba(124,92,232,0.2)] space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#7c5ce8]/20 border border-[#7c5ce8]/40 mx-auto flex items-center justify-center text-[#c4b5fd]">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Create Your Account</h1>
        <p className="text-xs text-gray-400">
          Get started with Larp Wallet to customize and simulate crypto balances
        </p>
      </div>

      {/* Alerts */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-start space-x-2.5 text-xs text-red-300 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start space-x-2.5 text-xs text-emerald-300 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0a24] border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#7c5ce8] transition-colors"
            />
            <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0a24] border border-white/10 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#7c5ce8] transition-colors"
            />
            <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0a24] border border-white/10 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#7c5ce8] transition-colors"
            />
            <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0a24] border border-white/10 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#7c5ce8] transition-colors"
            />
            <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl btn-hero-primary font-bold text-sm tracking-wide cursor-pointer flex items-center justify-center space-x-2 mt-2 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Create Free Account</span>
            </>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="text-center pt-2 border-t border-white/8 text-xs text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#a78bfa] hover:text-[#c4b5fd] font-bold transition-colors inline-flex items-center gap-1"
        >
          <span>Sign In</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#08061a] text-white flex flex-col font-sans relative selection:bg-[#7c5ce8] selection:text-white">
      {/* Background Ambient Spotlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#7c5ce8]/12 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#4a2db8]/08 rounded-full blur-[200px] pointer-events-none" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#08061a]/90 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-[#7c5ce8]/50 shadow-[0_0_16px_rgba(124,92,232,0.5)] transition-all">
              <img src="/img.jpeg" alt="Larp Wallet Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">
              Larp <span className="text-[#a78bfa]">Wallet</span>
            </span>
          </Link>

          <Link
            href="/login"
            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
          <SignupForm />
        </Suspense>
      </main>
    </div>
  );
}
